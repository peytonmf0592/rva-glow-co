export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#e7f5f6] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#147878] to-[#eb834f] bg-clip-text text-transparent">
              About
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#147878] to-[#eb834f] mx-auto"></div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Professional Portrait */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-[#e7f5f6] to-[#ffd4c1]/30 rounded-2xl p-4 w-full max-w-md">
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
              <div className="bg-[#e7f5f6]/30 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Core Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#147878] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Custom Design Consultation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#147878] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Professional Installation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#147878] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Seasonal Maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#147878] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Takedown & Secure Storage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#147878] mr-3 mt-1">▸</span>
                    <span className="text-gray-700">Flexible Lease or Own Options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Free Quote Form */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#e7f5f6]/50 to-white rounded-2xl shadow-xl p-8">
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#147878] transition-all"
                  placeholder="Tell us about your vision, special requests, or any specific areas you'd like lit..."
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="cta-button bg-gradient-to-r from-[#147878] to-[#eb834f] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-250"
                >
                  Request Quote →
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}