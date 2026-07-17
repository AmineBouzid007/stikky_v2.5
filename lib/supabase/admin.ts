import { createClient } from "@supabase/supabase-js"

/**
 * Service-role client. Bypasses RLS. NEVER import this into client components.
 * Only use inside server actions / route handlers that have already verified
 * the caller is an authenticated admin.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
}
