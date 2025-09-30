'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import HolidayPreview from '@/components/HolidayPreview'
import ServiceSlider from '@/components/ServiceSlider'
import HeroScrollEffect from '@/components/HeroScrollEffect'

declare global {
  interface Window {
    google: any
    initAutocomplete: () => void
  }
}

export default function Home() {
  const router = useRouter()
  const [showEstimateModal, setShowEstimateModal] = useState(false)
  const [estimateAddress, setEstimateAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [autocomplete, setAutocomplete] = useState<any>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (showEstimateModal && addressInputRef.current) {
      // Check if Google Maps is loaded
      const initializeAutocomplete = () => {
        if (window.google && window.google.maps && window.google.maps.places && addressInputRef.current) {
          const newAutocomplete = new window.google.maps.places.Autocomplete(
            addressInputRef.current,
            {
              types: ['address'],
              componentRestrictions: { country: 'us' },
              fields: ['formatted_address']
            }
          )

          newAutocomplete.addListener('place_changed', () => {
            const place = newAutocomplete.getPlace()
            if (place.formatted_address) {
              setEstimateAddress(place.formatted_address)
            }
          })

          setAutocomplete(newAutocomplete)
        } else {
          // Try again in 100ms if Google Maps isn't loaded yet
          setTimeout(initializeAutocomplete, 100)
        }
      }

      initializeAutocomplete()
    }

    // Cleanup on unmount
    return () => {
      if (autocomplete && window.google && window.google.maps) {
        window.google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [showEstimateModal])

  const handleEstimateSubmit = (e: React.FormEvent) => {
    if (!estimateAddress || !estimateAddress.trim()) {
      return
    }

    const addressToPass = estimateAddress
    setIsSubmitting(true)
    setSubmitSuccess(true)

    window.setTimeout(() => {
      const encodedAddress = encodeURIComponent(addressToPass)
      const bookingUrl = `/booking?address=${encodedAddress}`
      window.location.replace(bookingUrl)
    }, 1500)
  }

  // Parallax effect for SVG accent
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <HeroScrollEffect />

      {/* Hero Section - Night House */}
      <section id="hero" className="relative h-screen flex items-center overflow-hidden -mt-24">
        {/* Background Image - Zoomed and Anchored Right */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-house.jpg"
            alt="Holiday lights on home at night"
            className="w-full h-full object-cover"
            style={{
              objectPosition: '85% 20%',
              transform: 'scale(1.1)',
              transformOrigin: 'center'
            }}
            loading="eager"
          />
          <style jsx>{`
            @media (max-width: 768px) {
              img {
                object-position: 85% 20% !important;
              }
            }
            @media (min-width: 769px) {
              img {
                object-position: 70% 20% !important;
              }
            }
          `}</style>

          {/* Subtle indigo overlay for text contrast */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(26, 40, 69, 0.35) 0%, rgba(26, 40, 69, 0.15) 50%, transparent 70%)'
          }}></div>

          {/* Dark overlay behind text for contrast */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(90deg, rgba(13, 20, 36, 0.5) 0%, rgba(13, 20, 36, 0.3) 25%, transparent 50%)'
          }}></div>
        </div>

        {/* Hero Content - About Block on Left */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl lg:max-w-xl mt-52">
            <div
              id="hero-text"
              className="text-white"
              style={{
                background: 'rgba(13, 20, 36, 0.25)',
                backdropFilter: 'blur(6px)',
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 220, 150, 0.2)'
              }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Light Up Your Holidays
              </h1>
              <p className="text-sm sm:text-base md:text-xl mb-4 md:mb-6 text-gray-100 leading-relaxed">
                RVA Glow Co turns your home into a seasonal showstopper — full-service, fully custom, and completely hands-off for you. From crisp roofline accents to elegant tree and shrub highlights, we design, install, maintain, remove, and securely store your lights — all included.
              </p>
              <div>
                <Link
                  href="/booking"
                  className="inline-block text-white px-8 py-4 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold hover:scale-105 transform transition-all duration-250 min-h-[44px] flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(90deg, rgba(26, 40, 69, 0.95) 0%, rgba(139, 74, 58, 0.92) 60%, rgba(168, 88, 69, 0.90) 100%)',
                    border: '1.5px solid #ffdc96',
                    boxShadow: '0 0 0 0.5px rgba(255, 220, 150, 0.5), 0 8px 24px rgba(255, 220, 150, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Curved Bottom Edge with Gold Highlight - Right-leaning sweep */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
          <svg
            className="w-full h-auto hero-curve-desktop"
            viewBox="0 0 1920 220"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', height: '14vh' }}
          >
            <defs>
              <filter id="curveDropShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="3" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.25"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Main curve shape - right-leaning asymmetrical sweep */}
            <path
              d="M 0 60 Q 400 140, 960 90 T 1920 30 L 1920 220 L 0 220 Z"
              fill="white"
              filter="url(#curveDropShadow)"
            />

            {/* Gold hairline along the crest */}
            <path
              d="M 0 60 Q 400 140, 960 90 T 1920 30"
              stroke="#ffdc96"
              strokeWidth="1.5"
              fill="none"
              style={{
                filter: 'drop-shadow(0 -1px 3px rgba(255, 220, 150, 0.4))'
              }}
            />
          </svg>

          {/* Tablet curve */}
          <svg
            className="w-full h-auto hero-curve-tablet"
            viewBox="0 0 1024 140"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'none', height: '12vh' }}
          >
            <path
              d="M 0 45 Q 200 90, 512 65 T 1024 25 L 1024 140 L 0 140 Z"
              fill="white"
              filter="url(#curveDropShadow)"
            />
            <path
              d="M 0 45 Q 200 90, 512 65 T 1024 25"
              stroke="#ffdc96"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          {/* Mobile curve */}
          <svg
            className="w-full h-auto hero-curve-mobile"
            viewBox="0 0 375 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'none', height: '10vh' }}
          >
            <path
              d="M 0 40 Q 150 65, 375 30 L 375 90 L 0 90 Z"
              fill="white"
              filter="url(#curveDropShadow)"
            />
            <path
              d="M 0 40 Q 150 65, 375 30"
              stroke="#ffdc96"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RVA Glow Co</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">Full-service holiday lighting that's truly hands-off for you</p>
          </div>

          <ServiceSlider />

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Holiday Preview Section */}
      <HolidayPreview />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a2845] to-[#1a2845] text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to glow?</h2>
          <p className="text-xl mb-8 text-[#e8dcc8]">Book a free design consult or request an estimate and we'll show you exactly how your home will look.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-white text-[#1a2845] px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Book Free Design Consult
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#1a2845] transition-all duration-200"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Instant Estimate Modal */}
      {showEstimateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 transform transition-all animate-fade-in">
            {submitSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Address Received!</h3>
                <p className="text-gray-600">We'll prepare your instant estimate and get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Get Your Instant Estimate</h3>
                  <button
                    onClick={() => {
                      setShowEstimateModal(false)
                      setEstimateAddress('')
                      setAutocomplete(null)
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Success! Preparing your estimate...</h3>
                    <p className="text-gray-600">Redirecting you to complete your booking...</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-6">
                      Enter your address and we'll use Google Earth to provide you with a quick estimate for your holiday lighting installation.
                    </p>

                    <div>
                      <div className="mb-6">
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                          Property Address
                        </label>
                        <input
                          ref={addressInputRef}
                          type="text"
                          id="address"
                          value={estimateAddress}
                          onChange={(e) => setEstimateAddress(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && estimateAddress.trim()) {
                              e.preventDefault()
                              handleEstimateSubmit(e)
                            }
                          }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                          placeholder="Start typing your address..."
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          We'll look up your property on Google Earth to estimate lighting requirements
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!estimateAddress || estimateAddress.trim() === '') {
                            return
                          }

                          const encodedAddress = encodeURIComponent(estimateAddress)
                          const url = `/booking?address=${encodedAddress}`
                          window.location.href = url
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        Get My Estimate
                      </button>

                      <p className="text-center text-xs text-gray-500 mt-4">
                        For a detailed quote, <Link href="/booking" className="text-[#1a2845] hover:underline">book a free consultation</Link>
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}