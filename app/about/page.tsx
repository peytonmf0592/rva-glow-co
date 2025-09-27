'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#e8dcc8] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">
              About
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] mx-auto"></div>
          </div>

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

          {/* Commercial Materials Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Commercial-Grade Materials We Use</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SP</span>
                </div>
                <p className="text-sm font-medium text-gray-800">SPT-1 Wire</p>
                <p className="text-xs text-gray-500 mt-1">Heavy-duty</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ZC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Zip Cord</p>
                <p className="text-xs text-gray-500 mt-1">& Plugs</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">TC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Termination Caps</p>
                <p className="text-xs text-gray-500 mt-1">Weatherproof</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">RC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Ridge Clips</p>
                <p className="text-xs text-gray-500 mt-1">Secure mount</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ML</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Mini-Light Strings</p>
                <p className="text-xs text-gray-500 mt-1">Premium grade</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">C9</span>
                </div>
                <p className="text-sm font-medium text-gray-800">C9 LED Bulbs</p>
                <p className="text-xs text-gray-500 mt-1">Commercial-grade</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">OB</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Outdoor Bulbs</p>
                <p className="text-xs text-gray-500 mt-1">& Sockets</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">EC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Extension Cords</p>
                <p className="text-xs text-gray-500 mt-1">Heavy-duty</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Weatherproof</p>
                <p className="text-xs text-gray-500 mt-1">Connectors</p>
              </div>
            </div>

            {/* Premium Holiday Lighting in Action */}
            <div className="mt-16 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_12px_48px_rgba(47,126,128,0.2)] transition-all duration-500" style={{
              background: 'rgba(255, 255, 255, 0.80)',
              backdropFilter: 'blur(14px) saturate(190%)',
              border: '1.5px solid rgba(212, 175, 55, 0.25)',
              boxShadow: '0 12px 40px rgba(26, 40, 69, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(212, 175, 55, 0.1)'
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
              background: 'rgba(255, 255, 255, 0.80)',
              backdropFilter: 'blur(14px) saturate(190%)',
              border: '1.5px solid rgba(212, 175, 55, 0.25)',
              boxShadow: '0 12px 40px rgba(26, 40, 69, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
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
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#1a2845' }}>50,000+</div>
                  <div className="text-sm text-gray-700">Hour Lifespan</div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#8b4a3a' }}>90%</div>
                  <div className="text-sm text-gray-700">Energy Savings</div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#a85845' }}>100%</div>
                  <div className="text-sm text-gray-700">Commercial Grade</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-block px-6 py-3 rounded-full" style={{
                  background: 'linear-gradient(90deg, rgba(26, 40, 69, 0.2) 0%, rgba(139, 74, 58, 0.2) 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 4px 12px rgba(26, 40, 69, 0.15)'
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

          {/* Process Section */}
          <div className="bg-[#e8dcc8]/30 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Simple Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Consultation', description: 'Free on-site assessment and custom design plan' },
                { step: '2', title: 'Installation', description: 'Professional installation by certified technicians' },
                { step: '3', title: 'Enjoyment', description: 'Sit back and enjoy your beautiful display' },
                { step: '4', title: 'Removal', description: 'Complete removal and storage after the season' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1a2845] to-[#8b4a3a] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Details */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing Details</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">What's Included in Every Package:</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Free consultation and custom design',
                  'Professional installation and removal',
                  'Commercial-grade LED lights',
                  'Timer system for automatic operation',
                  'Full-season maintenance and support',
                  'Storage of materials between seasons',
                  'Liability insurance coverage'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-[#ffd4c1]/30 border border-[#8b4a3a]/30 rounded-lg p-4">
                <p className="text-[#db4009]">
                  <strong>Note:</strong> Final pricing depends on home size, roof complexity, and specific design requirements.
                  Schedule a free consultation for an exact quote.
                </p>
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