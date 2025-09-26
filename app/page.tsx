'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import HolidayPreview from '@/components/HolidayPreview'

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
    console.log('=== handleEstimateSubmit called ===')
    console.log('Current address:', estimateAddress)

    if (!estimateAddress || !estimateAddress.trim()) {
      console.log('No address entered, returning')
      return
    }

    // Store the address before any state changes
    const addressToPass = estimateAddress
    console.log('Address to pass:', addressToPass)

    // Show submitting state
    setIsSubmitting(true)
    setSubmitSuccess(true)
    console.log('States updated - showing success message')

    // Direct navigation after a short delay
    const timeoutId = window.setTimeout(() => {
      console.log('Timeout executed - navigating now!')
      const encodedAddress = encodeURIComponent(addressToPass)
      const bookingUrl = `/booking?address=${encodedAddress}`
      console.log('Final URL:', bookingUrl)

      // Force navigation using location.replace
      window.location.replace(bookingUrl)
    }, 1500)

    console.log('Timeout scheduled with ID:', timeoutId)
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
      {/* Abstract SVG Accent Line - Floating on Border */}
      <div className="absolute top-20 left-0 right-0 h-24 pointer-events-none z-30 overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1920 150"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `translateY(${scrollY * -0.3}px)`
          }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Desktop: Flowing curves */}
          <g className="hidden md:block">
            <path
              d="M -100 75 Q 400 25, 700 75 T 1400 55 Q 1700 35, 2020 75"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              opacity="0.8"
            >
              <animate
                attributeName="d"
                values="M -100 75 Q 400 25, 700 75 T 1400 55 Q 1700 35, 2020 75;
                        M -100 85 Q 500 45, 900 85 T 1600 70 Q 1800 50, 2020 85;
                        M -100 75 Q 400 25, 700 75 T 1400 55 Q 1700 35, 2020 75"
                dur="10s"
                repeatCount="indefinite"/>
            </path>

            {/* Shimmer effect */}
            <circle r="20" fill="#FFD700" opacity="0">
              <animateMotion
                path="M -100 75 Q 400 25, 700 75 T 1400 55 Q 1700 35, 2020 75"
                dur="6s"
                repeatCount="indefinite"/>
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur="6s"
                repeatCount="indefinite"/>
              <animate
                attributeName="r"
                values="5;15;5"
                dur="6s"
                repeatCount="indefinite"/>
            </circle>
          </g>

          {/* Mobile: Simple single curve */}
          <g className="block md:hidden">
            <path
              d="M -50 75 Q 480 25, 970 75"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              opacity="0.8"
            />
          </g>
        </svg>
      </div>

      {/* Hero Section - Shifted Up */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-home.png"
            alt="Holiday lights on home"
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Frosted Teal Gradient Overlay - top to bottom */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(47, 126, 128, 0.45) 0%, rgba(174, 231, 231, 0.15) 30%, transparent 60%, rgba(47, 126, 128, 0.25) 100%)'
          }}></div>

          {/* Bokeh Light Points - sparse, varying sizes */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left cluster */}
            <div className="absolute" style={{top: '8%', left: '12%', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.65) 0%, transparent 60%)', filter: 'blur(20px)', opacity: 0.4}}></div>
            <div className="absolute" style={{top: '15%', left: '8%', width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 60%)', filter: 'blur(16px)', opacity: 0.3}}></div>
            <div className="absolute" style={{top: '5%', left: '20%', width: '60px', height: '60px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, transparent 60%)', filter: 'blur(14px)', opacity: 0.25}}></div>

            {/* Lower-right cluster */}
            <div className="absolute" style={{bottom: '12%', right: '15%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 60%)', filter: 'blur(18px)', opacity: 0.35}}></div>
            <div className="absolute" style={{bottom: '8%', right: '10%', width: '70px', height: '70px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 60%)', filter: 'blur(12px)', opacity: 0.3}}></div>
            <div className="absolute" style={{bottom: '18%', right: '8%', width: '50px', height: '50px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, transparent 60%)', filter: 'blur(10px)', opacity: 0.2}}></div>
          </div>

          {/* Static Snow Specks - very low opacity */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              radial-gradient(circle at 45% 35%, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
              radial-gradient(circle at 75% 55%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              radial-gradient(circle at 25% 65%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              radial-gradient(circle at 60% 75%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              radial-gradient(circle at 90% 45%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              radial-gradient(circle at 35% 85%, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
              radial-gradient(circle at 10% 50%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '800px 600px'
          }}></div>

          {/* Bottom Frosted Band */}
          <div className="absolute inset-x-0 bottom-0 h-1/3" style={{
            background: 'linear-gradient(to top, rgba(47, 126, 128, 0.35) 0%, transparent 100%)'
          }}></div>
        </div>


        {/* Light Glow Overlay - matches actual light positions in photo */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Main roof peak - horizontal line along the highest roofline */}
          <div
            className="absolute top-[25%] left-[25%] right-[25%] h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 220, 150, 0.8), rgba(255, 220, 150, 0.8), transparent)',
              filter: 'blur(10px)',
              animation: 'lightPulse 3s ease-in-out infinite'
            }}
          />

          {/* Main roof left slope */}
          <div
            className="absolute"
            style={{
              top: '25%',
              left: '15%',
              width: '200px',
              height: '2px',
              background: 'linear-gradient(135deg, rgba(255, 220, 150, 0.7), transparent)',
              transform: 'rotate(30deg)',
              transformOrigin: 'left center',
              filter: 'blur(8px)',
              animation: 'lightPulse 2.8s ease-in-out infinite',
              animationDelay: '0.3s'
            }}
          />

          {/* Main roof right slope */}
          <div
            className="absolute"
            style={{
              top: '25%',
              right: '15%',
              width: '200px',
              height: '2px',
              background: 'linear-gradient(-135deg, rgba(255, 220, 150, 0.7), transparent)',
              transform: 'rotate(-30deg)',
              transformOrigin: 'right center',
              filter: 'blur(8px)',
              animation: 'lightPulse 2.8s ease-in-out infinite',
              animationDelay: '0.5s'
            }}
          />

          {/* Front gable peak (triangular section above entrance) */}
          <div
            className="absolute top-[35%] left-[42%] right-[42%] h-[1px]"
            style={{
              background: 'rgba(255, 220, 150, 0.6)',
              filter: 'blur(6px)',
              animation: 'lightPulse 2.5s ease-in-out infinite',
              animationDelay: '0.8s'
            }}
          />

          {/* Front gable left edge */}
          <div
            className="absolute"
            style={{
              top: '35%',
              left: '38%',
              width: '80px',
              height: '1px',
              background: 'rgba(255, 220, 150, 0.6)',
              transform: 'rotate(35deg)',
              transformOrigin: 'left center',
              filter: 'blur(6px)',
              animation: 'lightPulse 2.6s ease-in-out infinite',
              animationDelay: '1s'
            }}
          />

          {/* Front gable right edge */}
          <div
            className="absolute"
            style={{
              top: '35%',
              right: '38%',
              width: '80px',
              height: '1px',
              background: 'rgba(255, 220, 150, 0.6)',
              transform: 'rotate(-35deg)',
              transformOrigin: 'right center',
              filter: 'blur(6px)',
              animation: 'lightPulse 2.6s ease-in-out infinite',
              animationDelay: '1.2s'
            }}
          />

          {/* Upper dormer roofline */}
          <div
            className="absolute top-[20%] left-[45%] right-[45%] h-[1px]"
            style={{
              background: 'rgba(255, 220, 150, 0.5)',
              filter: 'blur(5px)',
              animation: 'lightPulse 2.4s ease-in-out infinite',
              animationDelay: '0.7s'
            }}
          />

          {/* Lower horizontal roof edge */}
          <div
            className="absolute top-[45%] left-[20%] right-[20%] h-[1px]"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 220, 150, 0.6), rgba(255, 220, 150, 0.7), rgba(255, 220, 150, 0.6))',
              filter: 'blur(7px)',
              animation: 'lightPulse 3s ease-in-out infinite',
              animationDelay: '0.4s'
            }}
          />

          {/* Front porch columns - left */}
          <div
            className="absolute top-[48%] left-[42%] w-[1px] h-[15%]"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 220, 150, 0.6), rgba(255, 220, 150, 0.4))',
              filter: 'blur(6px)',
              animation: 'lightPulse 2.7s ease-in-out infinite',
              animationDelay: '1.5s'
            }}
          />

          {/* Front porch columns - right */}
          <div
            className="absolute top-[48%] right-[42%] w-[1px] h-[15%]"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 220, 150, 0.6), rgba(255, 220, 150, 0.4))',
              filter: 'blur(6px)',
              animation: 'lightPulse 2.7s ease-in-out infinite',
              animationDelay: '1.7s'
            }}
          />

          {/* Door wreath glow */}
          <div
            className="absolute top-[52%] left-[48%] w-12 h-12"
            style={{
              background: 'radial-gradient(circle, rgba(255, 220, 150, 0.5) 0%, transparent 70%)',
              filter: 'blur(10px)',
              animation: 'lightPulse 2.5s ease-in-out infinite',
              animationDelay: '2s'
            }}
          />

          {/* Bushes/shrubs glow - far left */}
          <div
            className="absolute bottom-[35%] left-[15%] w-24 h-20"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255, 220, 150, 0.5) 0%, transparent 60%)',
              filter: 'blur(15px)',
              animation: 'lightPulse 2.8s ease-in-out infinite',
              animationDelay: '0.6s'
            }}
          />

          {/* Bushes/shrubs glow - left center */}
          <div
            className="absolute bottom-[35%] left-[30%] w-20 h-18"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255, 220, 150, 0.5) 0%, transparent 60%)',
              filter: 'blur(15px)',
              animation: 'lightPulse 2.6s ease-in-out infinite',
              animationDelay: '0.9s'
            }}
          />

          {/* Bushes/shrubs glow - right center */}
          <div
            className="absolute bottom-[35%] right-[30%] w-20 h-18"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255, 220, 150, 0.5) 0%, transparent 60%)',
              filter: 'blur(15px)',
              animation: 'lightPulse 2.6s ease-in-out infinite',
              animationDelay: '1.1s'
            }}
          />

          {/* Bushes/shrubs glow - far right */}
          <div
            className="absolute bottom-[35%] right-[15%] w-24 h-20"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255, 220, 150, 0.5) 0%, transparent 60%)',
              filter: 'blur(15px)',
              animation: 'lightPulse 2.8s ease-in-out infinite',
              animationDelay: '1.4s'
            }}
          />

          {/* Ground/pathway lights - create a subtle glow along the bottom */}
          <div
            className="absolute bottom-[25%] left-[10%] right-[10%] h-[1px]"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 220, 150, 0.3), rgba(255, 220, 150, 0.4), rgba(255, 220, 150, 0.3))',
              filter: 'blur(12px)',
              animation: 'lightPulse 3s ease-in-out infinite',
              animationDelay: '1.8s'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-[#eb834f] via-white to-[#147878] bg-clip-text text-transparent">
              Light Up Your Holidays
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            RVA Glow Co turns your home into a seasonal showstopper — full-service, fully custom, and completely hands-off for you.
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            From crisp roofline accents to elegant tree and shrub highlights, we design, install, maintain, remove, and securely store your lights — all included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link
              href="/booking"
              className="inline-block text-white px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-250"
              style={{
                background: 'linear-gradient(90deg, rgba(47, 126, 128, 0.95) 0%, rgba(235, 132, 79, 0.92) 60%, rgba(214, 156, 122, 0.90) 100%)',
                border: '1.5px solid #D4AF37',
                boxShadow: '0 0 0 0.5px rgba(212, 175, 55, 0.5), 0 8px 24px rgba(47, 126, 128, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(8px)'
              }}
            >
              Book a Free Design Consult →
            </Link>
            <button
              onClick={() => {
                setEstimateAddress('')
                setSubmitSuccess(false)
                setShowEstimateModal(true)
              }}
              className="inline-block text-white px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-250"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1.5px solid #D4AF37',
                boxShadow: '0 0 0 0.5px rgba(212, 175, 55, 0.4), 0 6px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px) saturate(180%)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              Request Instant Estimate
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Curved Bottom Edge with Gold Highlight */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            className="w-full h-auto hero-curve-desktop"
            viewBox="0 0 1920 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <defs>
              <filter id="curveDropShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Main curve shape - asymmetrical sweep to right */}
            <path
              d="M 0 50 Q 480 120, 960 80 T 1920 20 L 1920 200 L 0 200 Z"
              fill="white"
              filter="url(#curveDropShadow)"
            />

            {/* Gold highlight along the crest */}
            <path
              d="M 0 50 Q 480 120, 960 80 T 1920 20"
              stroke="rgba(212, 175, 55, 0.6)"
              strokeWidth="2"
              fill="none"
              style={{
                filter: 'drop-shadow(0 -1px 2px rgba(212, 175, 55, 0.4))'
              }}
            />
          </svg>

          {/* Tablet curve - reduced depth */}
          <svg
            className="w-full h-auto hero-curve-tablet"
            viewBox="0 0 1024 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'none' }}
          >
            <path
              d="M 0 40 Q 256 80, 512 60 T 1024 20 L 1024 120 L 0 120 Z"
              fill="white"
              filter="url(#curveDropShadow)"
            />
            <path
              d="M 0 40 Q 256 80, 512 60 T 1024 20"
              stroke="rgba(212, 175, 55, 0.6)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          {/* Mobile curve - gentle diagonal */}
          <svg
            className="w-full h-auto hero-curve-mobile"
            viewBox="0 0 375 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'none' }}
          >
            <path
              d="M 0 35 Q 187 55, 375 25 L 375 80 L 0 80 Z"
              fill="white"
              filter="url(#curveDropShadow)"
            />
            <path
              d="M 0 35 Q 187 55, 375 25"
              stroke="rgba(212, 175, 55, 0.5)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RVA Glow Co</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#147878] to-[#eb834f] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">Full-service holiday lighting that's truly hands-off for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - True Full Service */}
            <div className="rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(47, 126, 128, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 p-2" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid #D4AF37',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
              }}>
                <img src="/icons/tree-service.svg" alt="Full Service" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">True Full Service</h3>
              <p className="text-gray-600">Design → Install → Seasonal maintenance → Takedown → Storage. We handle everything from start to finish and beyond.</p>
            </div>

            {/* Feature 2 - Damage-Free Installation */}
            <div className="rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(47, 126, 128, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 p-2" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid #D4AF37',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
              }}>
                <img src="/icons/damage-free.svg" alt="Damage-Free" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Damage-Free Installation</h3>
              <p className="text-gray-600">Installation uses removable clips that attach securely without damaging your roof, gutters, or shingles. No holes, no nails, no worries.</p>
            </div>

            {/* Feature 3 - Color Options */}
            <div className="rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(47, 126, 128, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 p-2" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid #D4AF37',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
              }}>
                <img src="/icons/color-options.svg" alt="Color Options" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Color Options Without Automation</h3>
              <p className="text-gray-600">Pick the color palette you want — warm white, multicolor, or custom themes.</p>
            </div>

            {/* Feature 4 - Flexible Ownership */}
            <div className="rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(47, 126, 128, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 p-2" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid #D4AF37',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
              }}>
                <img src="/icons/flexible-ownership.svg" alt="Flexible Ownership" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Ownership</h3>
              <p className="text-gray-600">Lease or buy — transparent pricing with core services included in every package.</p>
            </div>

            {/* Feature 5 - Safety & Quality */}
            <div className="rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(47, 126, 128, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 p-2" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid #D4AF37',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
              }}>
                <img src="/icons/safety-quality.svg" alt="Safety & Quality" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety & Quality</h3>
              <p className="text-gray-600">Fall protection, weather-rated bulbs & wiring, and industry-grade termination caps for lasting beauty.</p>
            </div>

            {/* Feature 6 - Commercial */}
            <div className="rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(47, 126, 128, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 p-2" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid #D4AF37',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
              }}>
                <img src="/icons/commercial.svg" alt="Commercial" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Commercial</h3>
              <p className="text-gray-600">Professional holiday lighting solutions for businesses, storefronts, and office buildings.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-gradient-to-r from-[#147878] to-[#eb834f] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Holiday Preview Section */}
      <HolidayPreview />

      {/* Your Vision Our Precision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Vision. Our Precision.
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  No matter the size, slope, or shape of your home — if it has a roof, we can light it. From steep pitches to complex ridgelines, RVA Glow Co handles every install with expert precision and clean, custom results.
                </p>
                <p className="text-lg leading-relaxed">
                  You choose the colors. You choose exactly where the lights go — from rooflines to ridges, peaks to dormers. The image below is exactly what you can expect: crisp, professional, customized lighting that transforms your home.
                </p>
                <div className="bg-gradient-to-r from-[#e7f5f6] to-[#ffd4c1] rounded-xl p-6 my-6">
                  <p className="font-semibold text-gray-900 mb-4">Every quote you receive includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Full installation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Service calls during the season</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Safe takedown after the holidays</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>Off-season storage</span>
                    </li>
                  </ul>
                </div>
                <p className="text-lg leading-relaxed">
                  Plus, you can choose to either <span className="font-semibold">lease or own</span> your lights depending on your needs. No stress, no clutter, no hassle — just brilliant lights and total peace of mind.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#147878]/20 to-[#eb834f]/20 blur-3xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/showcase-home.png"
                    alt="Professional holiday light installation by RVA Glow Co"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#3d4547] to-[#147878] text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to glow?</h2>
          <p className="text-xl mb-8 text-[#e7f5f6]">Book a free design consult or request an instant estimate and we'll show you exactly how your home will look.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-white text-[#3d4547] px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Book Free Design Consult
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#3d4547] transition-all duration-200"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Google Maps Script for Autocomplete */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="afterInteractive"
      />

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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
                          placeholder="Start typing your address..."
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          We'll look up your property on Google Earth to estimate lighting requirements
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          // Immediate test
                          alert(`Button clicked! Address: ${estimateAddress}`)
                          console.log('BUTTON CLICKED!', estimateAddress)

                          if (!estimateAddress || estimateAddress.trim() === '') {
                            alert('Please enter an address')
                            return
                          }

                          // Direct navigation without any state changes
                          const encodedAddress = encodeURIComponent(estimateAddress)
                          const url = `/booking?address=${encodedAddress}`
                          console.log('Navigating to:', url)
                          window.location.href = url
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#147878] to-[#eb834f] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        Get My Estimate →
                      </button>

                      <p className="text-center text-xs text-gray-500 mt-4">
                        For a detailed quote, <Link href="/booking" className="text-[#147878] hover:underline">book a free consultation</Link>
                      </p>

                      {/* Debug button */}
                      <button
                        type="button"
                        onClick={() => alert('Test button works!')}
                        className="w-full mt-4 py-2 bg-gray-500 text-white rounded"
                      >
                        Test Button (Debug)
                      </button>
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