import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            RVA Glow Co ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Name, email address, and phone number</li>
            <li>Property address for service estimates</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Communication preferences</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
          <p className="text-gray-700 mb-4">When you visit our website, we may automatically collect:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Click patterns and navigation paths</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Provide, maintain, and improve our holiday lighting services</li>
            <li>Process your service requests and bookings</li>
            <li>Send you appointment confirmations and service updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Analyze usage patterns to improve our website and services</li>
            <li>Detect, prevent, and address technical issues or fraud</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-4">We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (payment processing, email services, analytics)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of our business</li>
            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights and Choices</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Access and receive a copy of your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
          <p className="text-gray-700 mb-6">
            To exercise these rights, please contact us at <a href="mailto:getlit@rvaglowco.com" className="text-[#1a2845] hover:underline">getlit@rvaglowco.com</a> or call <a href="tel:8045186955" className="text-[#1a2845] hover:underline">(804) 518-6955</a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookies through your browser settings, but disabling them may affect website functionality.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 mb-6">
            Our website may use third-party services including Google Maps, Google Analytics, and payment processors. These services have their own privacy policies governing how they use information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our services are not directed to children under 13, and we do not knowingly collect personal information from children. If we learn we have collected information from a child under 13, we will delete it promptly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions or concerns about this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-2"><strong>RVA Glow Co</strong></p>
            <p className="text-gray-700 mb-2">Email: <a href="mailto:getlit@rvaglowco.com" className="text-[#1a2845] hover:underline">getlit@rvaglowco.com</a></p>
            <p className="text-gray-700 mb-2">Phone: <a href="tel:8045186955" className="text-[#1a2845] hover:underline">(804) 518-6955</a></p>
            <p className="text-gray-700">Serving Richmond, VA and surrounding areas</p>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}