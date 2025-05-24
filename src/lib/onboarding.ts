/**
 * Utility functions for handling user onboarding
 */

/**
 * Checks if a user has completed onboarding
 * 
 * @param supabase - Supabase client instance
 * @param userId - User ID to check
 * @returns Promise<boolean> - True if onboarding is completed, false otherwise
 */
export async function hasCompletedOnboarding(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string
): Promise<boolean> {
  if (!userId) {
    return false
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', userId)
      .single()

    if (error || !data) {
      return false
    }

    return !!data.onboarding_completed
  } catch (error) {
    console.error('Error checking onboarding status:', error)
    return false
  }
}