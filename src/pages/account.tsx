import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import {SupabaseLogin} from "@/components/SupabaseLogin";
import {AccountProfile} from "@/components/AccountProfile";

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className={'container'}>
      {!!session ? (
        <AccountProfile session={session}/>
      ): (
        <SupabaseLogin/>
      )}
    </div>
  )
}

export default Home
