import { supabase } from '@/lib/supabase'

export interface Relationship {
  id: string
  name: string
  description?: string
  type: 'couple' | 'roommates' | 'friends' | 'family' | 'group'
  created_by: string
  created_at: string
  updated_at: string
}

export interface RelationshipMember {
  id: string
  relationship_id: string
  user_id: string
  role: 'admin' | 'member' | 'viewer'
  joined_at: string
}

export const relationshipService = {
  // Get all relationships for current user
  async getUserRelationships() {
    const { data, error } = await supabase
      .from('relationship_members')
      .select(`
        *,
        relationships (*)
      `)
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
    
    return { data, error }
  },

  // Create a new relationship
  async createRelationship(relationship: {
    name: string
    description?: string
    type: Relationship['type']
  }) {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('relationships')
      .insert([{
        ...relationship,
        created_by: user.id
      }])
      .select()
      .single()
    
    if (data && !error) {
      // Add creator as admin member
      await supabase
        .from('relationship_members')
        .insert([{
          relationship_id: data.id,
          user_id: user.id,
          role: 'admin'
        }])
    }

    return { data, error }
  },

  // Add member to relationship
  async addMember(relationshipId: string, userEmail: string, role: RelationshipMember['role'] = 'member') {
    // First, find user by email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (userError || !userData) {
      return { data: null, error: userError || new Error('User not found') }
    }

    const { data, error } = await supabase
      .from('relationship_members')
      .insert([{
        relationship_id: relationshipId,
        user_id: userData.id,
        role
      }])
      .select()
      .single()

    return { data, error }
  },

  // Remove member from relationship
  async removeMember(relationshipId: string, userId: string) {
    const { data, error } = await supabase
      .from('relationship_members')
      .delete()
      .eq('relationship_id', relationshipId)
      .eq('user_id', userId)

    return { data, error }
  },

  // Update member role
  async updateMemberRole(relationshipId: string, userId: string, role: RelationshipMember['role']) {
    const { data, error } = await supabase
      .from('relationship_members')
      .update({ role })
      .eq('relationship_id', relationshipId)
      .eq('user_id', userId)
      .select()
      .single()

    return { data, error }
  },

  // Get relationship members
  async getRelationshipMembers(relationshipId: string) {
    const { data, error } = await supabase
      .from('relationship_members')
      .select(`
        *,
        users (id, email, display_name, avatar_url)
      `)
      .eq('relationship_id', relationshipId)

    return { data, error }
  },

  // Delete relationship (admin only)
  async deleteRelationship(relationshipId: string) {
    const { data, error } = await supabase
      .from('relationships')
      .delete()
      .eq('id', relationshipId)

    return { data, error }
  }
}