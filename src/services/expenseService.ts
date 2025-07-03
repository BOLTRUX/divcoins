import { supabase } from '@/lib/supabase'

export interface Expense {
  id: string
  relationship_id: string
  title: string
  amount: number
  currency: string
  category: string
  description?: string
  receipt_url?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface ExpenseSplit {
  id: string
  expense_id: string
  user_id: string
  amount: number
  percentage?: number
  status: 'pending' | 'paid' | 'settled'
  paid_at?: string
}

export const expenseService = {
  // Get expenses for a relationship
  async getRelationshipExpenses(relationshipId: string) {
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        *,
        expense_splits (*),
        users!expenses_created_by_fkey (id, email, display_name)
      `)
      .eq('relationship_id', relationshipId)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  // Create new expense
  async createExpense(expense: {
    relationship_id: string
    title: string
    amount: number
    currency?: string
    category: string
    description?: string
    splits: Array<{
      user_id: string
      amount: number
      percentage?: number
    }>
  }) {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) throw new Error('User not authenticated')

    // Create expense
    const { data: expenseData, error: expenseError } = await supabase
      .from('expenses')
      .insert([{
        relationship_id: expense.relationship_id,
        title: expense.title,
        amount: expense.amount,
        currency: expense.currency || 'USD',
        category: expense.category,
        description: expense.description,
        created_by: user.id
      }])
      .select()
      .single()

    if (expenseError || !expenseData) {
      return { data: null, error: expenseError }
    }

    // Create expense splits
    const splits = expense.splits.map(split => ({
      expense_id: expenseData.id,
      user_id: split.user_id,
      amount: split.amount,
      percentage: split.percentage,
      status: 'pending' as const
    }))

    const { data: splitsData, error: splitsError } = await supabase
      .from('expense_splits')
      .insert(splits)
      .select()

    if (splitsError) {
      // Rollback expense creation
      await supabase.from('expenses').delete().eq('id', expenseData.id)
      return { data: null, error: splitsError }
    }

    return { 
      data: { 
        expense: expenseData, 
        splits: splitsData 
      }, 
      error: null 
    }
  },

  // Update expense
  async updateExpense(expenseId: string, updates: Partial<Expense>) {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', expenseId)
      .select()
      .single()

    return { data, error }
  },

  // Delete expense
  async deleteExpense(expenseId: string) {
    const { data, error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expenseId)

    return { data, error }
  },

  // Mark split as paid
  async markSplitPaid(splitId: string) {
    const { data, error } = await supabase
      .from('expense_splits')
      .update({ 
        status: 'paid',
        paid_at: new Date().toISOString()
      })
      .eq('id', splitId)
      .select()
      .single()

    return { data, error }
  },

  // Get user's expense summary
  async getUserExpenseSummary(relationshipId?: string) {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) throw new Error('User not authenticated')

    let query = supabase
      .from('expense_splits')
      .select(`
        *,
        expenses!inner (*, relationships!inner (*))
      `)
      .eq('user_id', user.id)

    if (relationshipId) {
      query = query.eq('expenses.relationship_id', relationshipId)
    }

    const { data, error } = await query

    return { data, error }
  },

  // Calculate debt between users
  async calculateDebts(relationshipId: string) {
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select(`
        *,
        expense_splits (*)
      `)
      .eq('relationship_id', relationshipId)

    if (error || !expenses) {
      return { data: null, error }
    }

    // Calculate who owes whom
    const debts: Record<string, Record<string, number>> = {}
    
    expenses.forEach(expense => {
      const paidBy = expense.created_by
      const splits = expense.expense_splits || []
      
      splits.forEach((split: ExpenseSplit) => {
        if (split.user_id !== paidBy && split.status === 'pending') {
          if (!debts[split.user_id]) debts[split.user_id] = {}
          if (!debts[split.user_id][paidBy]) debts[split.user_id][paidBy] = 0
          debts[split.user_id][paidBy] += split.amount
        }
      })
    })

    // Simplify debts (A owes B $10, B owes A $3 = A owes B $7)
    const simplifiedDebts: Array<{
      from_user: string
      to_user: string
      amount: number
    }> = []

    Object.keys(debts).forEach(fromUser => {
      Object.keys(debts[fromUser]).forEach(toUser => {
        const forwardAmount = debts[fromUser][toUser] || 0
        const backwardAmount = debts[toUser]?.[fromUser] || 0
        const netAmount = forwardAmount - backwardAmount
        
        if (netAmount > 0) {
          simplifiedDebts.push({
            from_user: fromUser,
            to_user: toUser,
            amount: netAmount
          })
        }
      })
    })

    return { data: simplifiedDebts, error: null }
  },

  // Upload receipt
  async uploadReceipt(file: File, expenseId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${expenseId}-${Math.random()}.${fileExt}`
    const filePath = `receipts/${fileName}`

    const { error } = await supabase.storage
      .from('receipts')
      .upload(filePath, file)

    if (error) {
      return { data: null, error }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('receipts')
      .getPublicUrl(filePath)

    // Update expense with receipt URL
    await supabase
      .from('expenses')
      .update({ receipt_url: urlData.publicUrl })
      .eq('id', expenseId)

    return { data: urlData.publicUrl, error: null }
  }
}