'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-house.jpg"
              alt="Beautiful holiday lighting installation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2845]/80 to-[#8b4a3a]/80"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Your Vision. <span className="text-[#d4af37]">Our Precision.</span>
              </h1>

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mt-8 border-l-4 border-[#d4af37]">
                <h3 className="text-2xl font-bold mb-4 text-[#d4af37]">Every quote includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-lg">
                    <span className="text-[#d4af37] text-2xl mr-3">✓</span>
                    Full installation
                  </li>
                  <li className="flex items-center text-lg">
                    <span className="text-[#d4af37] text-2xl mr-3">✓</span>
                    Service calls during season
                  </li>
                  <li className="flex items-center text-lg">
                    <span className="text-[#d4af37] text-2xl mr-3">✓</span>
                    Safe takedown after holidays
                  </li>
                  <li className="flex items-center text-lg">
                    <span className="text-[#d4af37] text-2xl mr-3">✓</span>
                    Off-season storage
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Curved Bottom Edge with Gold Highlight - Right-aligned */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20" style={{ transform: 'translateY(20px)' }}>
            <svg
              className="w-full h-auto hero-curve-desktop"
              viewBox="0 0 1920 220"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block', height: '14vh' }}
            >
              <defs>
                <filter id="aboutCurveDropShadow">
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

              {/* Main curve shape - left-leaning asymmetrical sweep (flipped) */}
              <path
                d="M 1920 60 Q 1520 140, 960 90 T 0 30 L 0 220 L 1920 220 Z"
                fill="white"
                filter="url(#aboutCurveDropShadow)"
              />

              {/* Gold hairline along the crest */}
              <path
                d="M 1920 60 Q 1520 140, 960 90 T 0 30"
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
                d="M 1024 45 Q 824 90, 512 65 T 0 25 L 0 140 L 1024 140 Z"
                fill="white"
                filter="url(#aboutCurveDropShadow)"
              />
              <path
                d="M 1024 45 Q 824 90, 512 65 T 0 25"
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
                d="M 375 40 Q 225 65, 0 30 L 0 90 L 375 90 Z"
                fill="white"
                filter="url(#aboutCurveDropShadow)"
              />
              <path
                d="M 375 40 Q 225 65, 0 30"
                stroke="#ffdc96"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Professional Portrait */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-[#e8dcc8] to-[#ffd4c1]/30 rounded-2xl p-4 w-full max-w-md">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img
                    src="/images/peyton-fowlkes.jpg"
                    alt="Peyton Fowlkes - Founder of RVA Glow Co"
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-gray-900">Peyton Fowlkes</h3>
                  <p className="text-gray-600">Founder</p>
                </div>
              </div>
            </div>

            {/* Right Column - Company Description */}
            <div className="flex flex-col justify-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                RVA Glow Co. designs, installs, and cares for premium residential and commercial holiday lighting. We pair thoughtful design with commercial-grade materials and white-glove service — from custom consultation through installation, seasonal maintenance, takedown, and secure storage. Our team handles every detail so your property looks spectacular without you lifting a finger.
              </p>

              {/* Core Services List */}
              <div className="bg-[#e8dcc8]/30 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Core Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#1a2845] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Custom Design Consultation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1a2845] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Professional Installation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1a2845] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Seasonal Maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1a2845] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Takedown & Secure Storage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1a2845] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Flexible Lease or Own Options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Premium Holiday Lighting in Action */}
          <div className="mb-16">
            <div className="mt-16 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_12px_48px_rgba(212,175,55,0.2)] transition-all duration-500" style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(212, 175, 55, 0.25)',
              boxShadow: '0 12px 40px rgba(26, 40, 69, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}>
              <div className="relative p-6">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg" style={{
                  border: '2px solid rgba(212, 175, 55, 0.2)'
                }}>
                  <Image
                    src="/images/c9-installed.jpg"
                    alt="Faceted C9 LED bulbs illuminated on roofline - diamond-cut brilliance"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="px-8 pb-8 text-center">
                <h4 className="text-2xl font-bold mb-3" style={{
                  background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Premium Holiday Lighting in Action</h4>
                <p className="text-gray-700 text-lg">Experience the diamond-cut brilliance of our faceted C9 LED bulbs</p>
              </div>
            </div>

            {/* C9 LED Bulb Specifications */}
            <div className="mt-12 rounded-2xl p-8" style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(212, 175, 55, 0.25)',
              boxShadow: '0 12px 40px rgba(26, 40, 69, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}>
              <h4 className="text-3xl font-bold text-center mb-3" style={{
                background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Premium Faceted C9 LED Bulbs</h4>
              <p className="text-center text-gray-600 mb-8 text-lg">The only choice for professional-grade holiday lighting</p>

              <div className="max-w-2xl mx-auto grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl" style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#1a2845' }}>50,000+</div>
                  <div className="text-sm text-gray-700">Hour Lifespan</div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#8b4a3a' }}>90%</div>
                  <div className="text-sm text-gray-700">Energy Savings</div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#a85845' }}>100%</div>
                  <div className="text-sm text-gray-700">Commercial Grade</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-block px-6 py-3 rounded-full" style={{
                  background: 'linear-gradient(90deg, rgba(26, 40, 69, 0.1) 0%, rgba(139, 74, 58, 0.1) 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 4px 12px rgba(26, 40, 69, 0.08)'
                }}>
                  <span className="text-base font-bold" style={{
                    background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Diamond-Cut Faceted Design</span>
                </div>
                <p className="text-sm text-gray-600 mt-4 max-w-xl mx-auto">Our faceted bulbs feature precision-cut surfaces that refract light into brilliant sparkles, creating an elegant, high-end display that stands out from standard bulbs</p>
              </div>
            </div>
          </div>

          {/* Free Quote Form */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#e8dcc8]/50 to-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get Your Free Quote</h3>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                service: formData.get('service'),
                preferredDate: formData.get('preferredDate'),
                message: formData.get('message'),
                source: 'about-page'
              }

              fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              }).then(() => {
                alert('Quote request submitted! We\'ll be in touch within 24 hours.')
                e.currentTarget.reset()
              })
            }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quote-name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="quote-name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="quote-email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="quote-email"
                    name="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="quote-phone"
                    name="phone"
                    required
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                    placeholder="804-555-0123"
                  />
                </div>
                <div>
                  <label htmlFor="quote-address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Address *
                  </label>
                  <input
                    type="text"
                    id="quote-address"
                    name="address"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                    placeholder="123 Main St, Richmond, VA"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quote-service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Package *
                  </label>
                  <select
                    id="quote-service"
                    name="service"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                  >
                    <option value="">Choose a package</option>
                    <option value="roofline">Roofline Lighting</option>
                    <option value="complete">Complete Package</option>
                    <option value="custom">Custom Design</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quote-date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Install Window
                  </label>
                  <input
                    type="date"
                    id="quote-date"
                    name="preferredDate"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="quote-message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="quote-message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1a2845] transition-all"
                  placeholder="Tell us about your vision, special requests, or any specific areas you'd like lit..."
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="cta-button bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-250"
                >
                  Request Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}