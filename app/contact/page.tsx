'use client'

import { useState } from 'react'
import ChristmasLights from '@/components/ChristmasLights'
import AddressAutocomplete from '@/components/AddressAutocomplete'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || 'Not provided',
          package_interest: formData.subject,
          message: formData.message,
          source: 'contact-page'
        })
      })

      if (!response.ok) throw new Error('Failed to submit contact form')

      setSubmitted(true)
    } catch (err) {
      setError('Failed to send message. Please call us at (804) 518-6955')
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
        <main className="min-h-screen bg-gradient-to-b from-[#0d1424] via-[#1a2845] to-[#2d1b1a] relative overflow-hidden">
          {/* Christmas Lights Animation Background */}
          <ChristmasLights />

          <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
            <div className="max-w-2xl w-full">
              <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-12 shadow-2xl relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Success Icon with festive colors */}
                <div className="relative z-10">
                  <svg className="w-24 h-24 mx-auto mb-6" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="11" stroke="url(#gradient)" strokeWidth="2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="#4CAF50" d="M9 12l2 2 4-4" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#FF6B6B" />
                        <stop offset="100%" stopColor="#4ECDC4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
                    Message Sent Successfully!
                  </h1>

                  <div className="space-y-3 mb-8">
                    <p className="text-lg text-white/90 drop-shadow">
                      Thanks for choosing RVA Glow Co
                    </p>
                    <p className="text-white/80">
                      We'll reply within 24 hours to plan your holiday lighting and help you Get Lit!
                    </p>
                    <p className="text-white/80">
                      For immediate assistance, call us at <span className="font-semibold text-[#FFD700]">(804) 518-6955</span>
                    </p>
                  </div>

                  <div className="text-center">
                    <a
                      href="/"
                      className="inline-block px-10 py-4 bg-gradient-to-r from-[#1a2845] via-[#8b4a3a] to-[#1a2845] text-white rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      style={{
                        boxShadow: '0 10px 25px rgba(139, 74, 58, 0.3)',
                      }}
                    >
                      Return to Home
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

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#e8dcc8] to-white">
        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-xl text-gray-600">Light up your holidays — Get Lit with RVA Glow Co</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">
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
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
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
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
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
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
                      placeholder="(804) 518-6955"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Address (optional)
                  </label>
                  <AddressAutocomplete
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(value) => setFormData({ ...formData, address: value })}
                    required={false}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
                    placeholder="Start typing your address..."
                  />
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
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
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
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
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
                  className="w-full py-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <div className="w-12 h-12 bg-[#e8dcc8] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg className="w-6 h-6 text-[#1a2845]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600">(804) 518-6955</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#ffd4c1] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg className="w-6 h-6 text-[#8b4a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">getlit@rvaglowco.com</p>
                      <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#e8dcc8] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg className="w-6 h-6 text-[#1a2845]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/booking"
                    className="block text-center px-6 py-3 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Book Installation
                  </a>
                  <a
                    href="/services"
                    className="block text-center px-6 py-3 bg-[#e8dcc8]/50 text-[#1a2845] rounded-full font-semibold hover:bg-[#e8dcc8] transition-all"
                  >
                    View Services
                  </a>
                  <a
                    href="/faq"
                    className="block text-center px-6 py-3 bg-[#e8dcc8]/50 text-[#1a2845] rounded-full font-semibold hover:bg-[#e8dcc8] transition-all"
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