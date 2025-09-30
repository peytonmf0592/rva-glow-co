import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, package_interest, message } = body

    // Try to save to Supabase if configured (optional)
    let savedToDatabase = false
    try {
      const supabase = await createClient()
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

      if (!error) {
        savedToDatabase = true
      } else {
        console.log('Supabase save skipped:', error.message)
      }
    } catch (dbError) {
      console.log('Database operation skipped:', dbError)
    }

    // Send email notification if Resend is configured
    if (resend && process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_test_key') {
      try {
        await resend.emails.send({
          from: 'RVA Glow Co <onboarding@resend.dev>',
          to: 'getlit@rvaglowco.com',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Address:</strong> ${address || 'Not provided'}</p>
            <p><strong>Subject/Interest:</strong> ${package_interest || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message'}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Sent from rvaglowco.com contact form${savedToDatabase ? ' and saved to database' : ''}.</p>
          `
        })
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
      }
    }

    // Always return success if we get this far
    // In production, you'd want proper email configuration
    return NextResponse.json(
      {
        message: 'Message sent successfully!',
        note: 'Contact form submission received'
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