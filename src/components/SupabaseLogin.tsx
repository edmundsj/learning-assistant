import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/models/supabase'

export const SupabaseLogin = () => {
  const session = useSession()
  const supabase = useSupabaseClient<Database>()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0', maxWidth: '500px', margin: '0 auto' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['google', 'github']} />
      ) : (
        <p>Account page will go here.</p>
      )}
    </div>
  )
}
