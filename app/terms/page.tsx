import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-blue-100">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing or using RVA Glow Co's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Services Description</h2>
          <p className="text-gray-700 mb-6">
            RVA Glow Co provides professional holiday lighting installation, maintenance, removal, and storage services for residential and commercial properties in the Richmond, Virginia area. Our services include consultation, design, installation, seasonal maintenance, takedown, and optional storage of holiday lighting displays.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Booking and Payment</h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Booking Process</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>All service bookings are subject to availability and confirmation</li>
            <li>We reserve the right to refuse service for any reason</li>
            <li>Booking dates are estimates and may be adjusted based on weather and scheduling</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Payment Terms</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>A 50% deposit is required to reserve your installation date</li>
            <li>The remaining balance is due upon completion of installation</li>
            <li>We accept major credit cards, checks, and electronic payments</li>
            <li>Late payments may result in service delays or cancellation</li>
            <li>All prices quoted are valid for 30 days unless otherwise stated</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cancellation Policy</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Cancellations made 7+ days before installation: Full refund of deposit</li>
            <li>Cancellations made 3-6 days before installation: 50% refund of deposit</li>
            <li>Cancellations made less than 3 days before installation: No refund</li>
            <li>We reserve the right to cancel or reschedule due to unsafe weather conditions</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Service Scope and Limitations</h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Installation Services</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>We will inspect your property and determine the safest installation methods</li>
            <li>We reserve the right to decline installation on unsafe roofing or structures</li>
            <li>Installation schedules are weather-dependent and may be rescheduled</li>
            <li>Access to electrical outlets and ladder placement areas must be provided</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Maintenance and Repairs</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Seasonal maintenance is included with all packages</li>
            <li>We will respond to service calls within 48 hours</li>
            <li>Damage caused by vandalism or customer negligence is not covered</li>
            <li>Additional charges may apply for custom modifications after installation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Customer Responsibilities</h2>
          <p className="text-gray-700 mb-4">As a customer, you agree to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Provide accurate property information and site access</li>
            <li>Ensure outdoor electrical outlets are functional and properly grounded</li>
            <li>Notify us of any roof or structural concerns before installation</li>
            <li>Keep pets secured during installation and service visits</li>
            <li>Not modify, remove, or adjust installed lights without our authorization</li>
            <li>Notify us immediately of any electrical issues or damage</li>
            <li>Provide reasonable notice for service calls or changes</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Property Access and Safety</h2>
          <p className="text-gray-700 mb-6">
            By booking our services, you grant RVA Glow Co and its technicians permission to access your property for installation, maintenance, and removal. You agree to maintain safe access to your property, including cleared pathways, driveway parking, and secured pets. We will treat your property with respect and care.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Liability and Insurance</h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Our Insurance</h3>
          <p className="text-gray-700 mb-6">
            RVA Glow Co maintains comprehensive general liability insurance. We are fully insured and bonded for your protection. Our technicians are trained professionals who follow strict safety protocols.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Limitation of Liability</h3>
          <p className="text-gray-700 mb-6">
            While we take every precaution, RVA Glow Co is not liable for damage to pre-existing roof or gutter conditions, electrical system issues caused by faulty wiring, or damage resulting from severe weather events (hurricanes, tornadoes, etc.). Our liability is limited to the amount paid for services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Equipment and Materials</h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Lease Option</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Equipment remains the property of RVA Glow Co</li>
            <li>Storage is included in lease pricing</li>
            <li>You may upgrade or modify displays each season</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Purchase Option</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Equipment becomes your property upon full payment</li>
            <li>Storage is available for an additional fee</li>
            <li>Warranty covers manufacturing defects for one year</li>
            <li>You are responsible for equipment care when stored on your property</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Warranty and Guarantees</h2>
          <p className="text-gray-700 mb-6">
            We guarantee our workmanship and will address any installation issues at no charge during the service period. LED bulbs are warrantied against manufacturing defects. We do not guarantee lights will remain lit 100% of the time due to weather, power outages, or electrical issues beyond our control.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Weather and Force Majeure</h2>
          <p className="text-gray-700 mb-6">
            RVA Glow Co is not liable for delays or inability to perform services due to weather conditions, natural disasters, labor disputes, government restrictions, or other events beyond our reasonable control. We will reschedule services as soon as conditions permit.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            All content on our website, including text, graphics, logos, and images, is the property of RVA Glow Co and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Dispute Resolution</h2>
          <p className="text-gray-700 mb-6">
            Any disputes arising from these terms or our services will be resolved through good-faith negotiation. If negotiation fails, disputes will be resolved through binding arbitration in Richmond, Virginia, in accordance with Virginia law. Each party will bear its own costs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Modifications to Terms</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the modified terms. Material changes will be communicated via email to active customers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These Terms of Service are governed by the laws of the Commonwealth of Virginia, without regard to conflict of law principles. Any legal action must be brought in the courts of Richmond, Virginia.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Severability</h2>
          <p className="text-gray-700 mb-6">
            If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            For questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-2"><strong>RVA Glow Co</strong></p>
            <p className="text-gray-700 mb-2">Email: <a href="mailto:getlit@rvaglowco.com" className="text-[#1a2845] hover:underline">getlit@rvaglowco.com</a></p>
            <p className="text-gray-700 mb-2">Phone: <a href="tel:8045554569" className="text-[#1a2845] hover:underline">(804) 555-4569</a></p>
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