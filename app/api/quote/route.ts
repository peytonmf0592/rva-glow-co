import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { name, email, phone, address, package_interest, message } = body

    // Insert quote request into Supabase
    const { data, error } = await supabase
      .from('quote_requests')
      .insert([
        {
          name,
          email,
          phone,
          address,
          package_interest,
          message,
          created_at: new Date().toISOString(),
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit quote request' },
        { status: 500 }
      )
    }

    // You could also send an email notification here
    // using a service like SendGrid, Resend, or AWS SES

    return NextResponse.json(
      {
        message: 'Quote request submitted successfully!',
        data: data[0]
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}