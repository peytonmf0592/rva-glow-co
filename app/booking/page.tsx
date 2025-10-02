'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ChristmasLights from '@/components/ChristmasLights'

function BookingForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: 'roofline',
    preferredDate: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Pre-fill address from URL parameter if present
  useEffect(() => {
    const addressFromUrl = searchParams.get('address')
    if (addressFromUrl) {
      setFormData(prev => ({
        ...prev,
        address: decodeURIComponent(addressFromUrl)
      }))
    }
  }, [searchParams])

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
          source: 'booking-page',
          lightingOption: formData.service
        })
      })

      if (!response.ok) throw new Error('Failed to submit booking')

      setSubmitted(true)
    } catch (err) {
      setError('Failed to submit booking. Please call us at (804) 518-6955')
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
                    Booking Request Received!
                  </h1>

                  <div className="space-y-3 mb-8">
                    <p className="text-lg text-white/90 drop-shadow">
                      🎄 Thanks for choosing RVA Glow Co
                    </p>
                    <p className="text-white/80">
                      We'll reply within 24 hours to plan your holiday lighting and help you Get Lit!
                    </p>
                    <p className="text-white/80">
                      For immediate assistance, call us at <span className="font-semibold text-[#FFD700]">(804) 518-6955</span>
                    </p>
                  </div>

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
        </main>
      </>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#e8dcc8] to-white">
        {/* Booking Form */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">Book Your Installation</h1>
            <p className="text-xl text-gray-600">Transform your home with professional holiday lighting</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Schedule Your Free Consultation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
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
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
                    placeholder="(804) 518-6955"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all min-h-[48px]"
                    placeholder="123 Main St, Richmond, VA 23220"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Your Package *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all min-h-[48px]"
                >
                  <option value="roofline">Roofline Only</option>
                  <option value="complete">Complete Package - Roofline + Landscape</option>
                  <option value="custom">Custom Design - Let's Discuss</option>
                </select>
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Installation Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all min-h-[48px]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all min-h-[48px]"
                  placeholder="Tell us about any specific requests, roof concerns, or design preferences..."
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
                {isSubmitting ? 'Submitting...' : 'Book My Free Consultation'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-[#e8dcc8] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1a2845]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Quick Response</h3>
                  <p className="text-sm text-gray-600">We'll contact you within 24 hours</p>
                </div>
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-[#ffd4c1] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#8b4a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Free Quote</h3>
                  <p className="text-sm text-gray-600">No obligation consultation</p>
                </div>
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 bg-[#e8dcc8] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1a2845]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Professional Service</h3>
                  <p className="text-sm text-gray-600">Fully insured experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  )
}