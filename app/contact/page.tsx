'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact-page',
          address: 'Not provided',
          lightingOption: formData.subject
        })
      })

      if (!response.ok) throw new Error('Failed to submit contact form')

      setSubmitted(true)
    } catch (err) {
      setError('Failed to send message. Please call us at (804) 555-0123')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <>
        <main className="min-h-screen bg-gradient-to-b from-[#e7f5f6] to-white py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-[#e7f5f6] border-2 border-[#147878]/30 rounded-xl p-12">
              <svg className="w-20 h-20 mx-auto mb-6 text-[#147878]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h1>
              <p className="text-lg text-gray-600 mb-8">
                We'll get back to you within 24 hours. For immediate assistance, call us at (804) 555-0123.
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#147878] to-[#eb834f] text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Return Home
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#e7f5f6] to-white">
        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#147878] to-[#eb834f] bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-xl text-gray-600">We're here to help make your holidays magical</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#147878] to-[#eb834f] bg-clip-text text-transparent">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
                      placeholder="(804) 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="booking">Schedule Installation</option>
                    <option value="support">Customer Support</option>
                    <option value="service">Service Call</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#147878] to-[#eb834f] text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#e7f5f6] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg className="w-6 h-6 text-[#147878]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600">(804) 555-0123</p>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#ffd4c1] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg className="w-6 h-6 text-[#eb834f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">info@rvaglowco.com</p>
                      <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#e7f5f6] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg className="w-6 h-6 text-[#147878]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Service Area</h4>
                      <p className="text-gray-600">Richmond, VA & Surrounding Areas</p>
                      <p className="text-sm text-gray-500 mt-1">Henrico, Chesterfield, Hanover Counties</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-[#e7f5f6] to-[#ffd4c1]/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Business Hours</h3>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Monday - Friday</span>
                    <span className="text-gray-600">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Saturday</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-700">Sunday</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#ffd4c1]/30 rounded-lg">
                  <p className="text-sm text-[#db4009]">
                    <strong>Holiday Season Hours:</strong> Extended hours November through January.
                    Emergency support available 24/7 for existing customers.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/booking"
                    className="block text-center px-6 py-3 bg-gradient-to-r from-[#147878] to-[#eb834f] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Book Installation
                  </a>
                  <a
                    href="/services"
                    className="block text-center px-6 py-3 bg-[#e7f5f6]/50 text-[#3d4547] rounded-full font-semibold hover:bg-[#e7f5f6] transition-all"
                  >
                    View Services
                  </a>
                  <a
                    href="/faq"
                    className="block text-center px-6 py-3 bg-[#e7f5f6]/50 text-[#3d4547] rounded-full font-semibold hover:bg-[#e7f5f6] transition-all"
                  >
                    Read FAQs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}