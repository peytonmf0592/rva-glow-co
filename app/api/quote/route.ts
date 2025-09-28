import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

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

    // Send email notification if Resend is configured
    if (resend && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'RVA Glow Co <onboarding@resend.dev>',
          to: 'getlit@rvaglowco.com',
          subject: `New Quote Request from ${name}`,
          html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Address:</strong> ${address || 'Not provided'}</p>
            <p><strong>Package Interest:</strong> ${package_interest || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message'}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">This quote request has been saved to your Supabase database.</p>
          `
        })
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
        // Don't fail the request if email fails
      }
    }

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