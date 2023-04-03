import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app';
import '../styles/globals.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const queryClient = new QueryClient();


  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  )
}
export default MyApp