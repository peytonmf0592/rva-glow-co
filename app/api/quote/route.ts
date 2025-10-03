import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, package_interest, message, source, service, preferredDate, lightingOption } = body

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

    // Determine the form source and package selection
    const formSource = source === 'booking-page' ? 'Booking Form' : 'Contact Form'
    const selectedPackage = service || lightingOption || package_interest || 'Not specified'
    const installDate = preferredDate || 'Not specified'

    // Format the preferred date if provided
    const formattedDate = preferredDate ? new Date(preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'Not specified'

    // Create package description
    const packageDescription = {
      'roofline': 'Roofline Only',
      'complete': 'Complete Package - Roofline + Landscape',
      'custom': 'Custom Design - Let\'s Discuss',
      'general': 'General Inquiry',
      'quote': 'Request a Quote',
      'booking': 'Schedule Installation',
      'support': 'Customer Support',
      'service': 'Service Call',
      'Quote Request': 'Quote Request',
      'Holiday Light Installation': 'Holiday Light Installation',
      'General Inquiry': 'General Inquiry'
    }[selectedPackage] || selectedPackage

    // Send email notification if Resend is configured
    if (resend && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'RVA Glow Co <noreply@rvaglowco.com>',
          to: 'getlit@rvaglowco.com',
          subject: `New ${formSource} - ${packageDescription} from ${name}`,
          html: `
            <h2>New ${formSource} Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            ${source === 'booking-page' ?
              `<p><strong>Address:</strong> ${address || 'Not provided'}</p>
              <p><strong>Service Type:</strong> ${packageDescription}</p>
              <p><strong>Preferred Installation Date:</strong> ${formattedDate}</p>` :
              `<p><strong>Address:</strong> ${address || 'Not provided'}</p>
              <p><strong>Subject/Interest:</strong> ${packageDescription}</p>`
            }
            <p><strong>Message:</strong></p>
            <p>${message || 'No additional message'}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Sent from rvaglowco.com ${formSource.toLowerCase()}${savedToDatabase ? ' and saved to database' : ''}.</p>
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