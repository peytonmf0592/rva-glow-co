import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    // Public variables (safe to expose status)
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    // Private variables (only check if they exist)
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: !!process.env.DATABASE_URL,
  }

  const allSet = Object.values(envVars).every(value => value === true)
  const missingVars = Object.entries(envVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  return NextResponse.json({
    status: allSet ? 'success' : 'incomplete',
    message: allSet
      ? '✅ All environment variables are configured!'
      : `⚠️ Missing: ${missingVars.join(', ')}`,
    variables: envVars,
    missing: missingVars,
    totalRequired: Object.keys(envVars).length,
    totalSet: Object.values(envVars).filter(v => v).length,
  })
}
