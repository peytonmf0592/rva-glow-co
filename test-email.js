// Test email configuration
// Run with: node test-email.js

const apiKey = 're_FPcuWSZu_83FoBaoAVNHtE33Wmzv3Mc8i'; // Your Resend API key

async function testEmail() {
  console.log('Testing email configuration...\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'RVA Glow Co <noreply@rvaglowco.com>',
        to: 'getlit@rvaglowco.com',
        subject: '✅ SUCCESS! Email Test from RVA Glow Co',
        html: `
          <h2>Test Email</h2>
          <p>This is a test email to verify your Resend configuration is working.</p>
          <p>If you receive this, your email setup is complete!</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Sent from test-email.js</p>
        `
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('Email ID:', data.id);
    } else {
      console.log('❌ Failed to send email');
      console.log('Error:', data);
    }
  } catch (error) {
    console.log('❌ Error sending email:', error.message);
  }
}

// Instructions
console.log('=================================');
console.log('EMAIL CONFIGURATION INSTRUCTIONS');
console.log('=================================\n');
console.log('1. Sign up for Resend: https://resend.com');
console.log('2. Add and verify your domain (rvaglowco.com)');
console.log('3. Get your API key from the Resend dashboard');
console.log('4. Replace YOUR_RESEND_API_KEY_HERE in this file');
console.log('5. Run: node test-email.js\n');
console.log('Once working:');
console.log('6. Update RESEND_API_KEY in .env.local');
console.log('7. Add RESEND_API_KEY to Vercel environment variables\n');
console.log('=================================\n');

// Run the test
testEmail();