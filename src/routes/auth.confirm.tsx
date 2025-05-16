import { createClient } from '@/lib/supabase/server'
import { hasCompletedOnboarding } from '@/lib/onboarding'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type LoaderFunctionArgs, redirect } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const next = requestUrl.searchParams.get('next') || '/'

  if (token_hash && type) {
    const { supabase, headers } = createClient(request)
    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // Check if user has completed onboarding
      if (data?.user) {
        const onboardingCompleted = await hasCompletedOnboarding(supabase, data.user.id);
        
        // If onboarding not completed, redirect to onboarding
        if (!onboardingCompleted) {
          return redirect('/onboarding', { headers })
        }
        
        // If onboarding is completed, redirect to home
        return redirect('/home', { headers })
      }
      return redirect(next, { headers })
    } else {
      return redirect(`/auth/error?error=${error?.message}`)
    }
  }

  // redirect the user to an error page with some instructions
  return redirect(`/auth/error?error=No token hash or type`)
}
