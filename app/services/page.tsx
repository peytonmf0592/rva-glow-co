'use client'

import Image from 'next/image'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[700px] overflow-hidden">
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

            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mt-8 border-l-4 border-[#d4af37]">
              <h3 className="text-xl font-bold mb-3 text-[#d4af37]">Every quote includes:</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-base">
                  <span className="text-[#d4af37] text-xl mr-2">✓</span>
                  Full installation
                </li>
                <li className="flex items-center text-base">
                  <span className="text-[#d4af37] text-xl mr-2">✓</span>
                  Service calls during season
                </li>
                <li className="flex items-center text-base">
                  <span className="text-[#d4af37] text-xl mr-2">✓</span>
                  Safe takedown after holidays
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Precision Content */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p className="text-xl bg-gradient-to-r from-[#e8dcc8] to-white p-6 rounded-xl border-l-4 border-[#d4af37]">
              Professional holiday lighting that's <span className="font-bold text-[#1a2845]">completely hands-off</span> for you. No stress, no clutter, no hassle — just brilliant lights and total peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1a2845] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white px-12 py-6 rounded-2xl shadow-2xl">
                <h2 className="text-5xl font-bold">Our Services</h2>
              </div>
            </div>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">Choose the perfect lighting package for your home</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Roofline Lighting Card */}
            <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border-2 border-gray-100">
              <div className="py-3 text-sm font-semibold text-center text-gray-400" style={{ visibility: 'hidden' }}>
                PLACEHOLDER
              </div>
              <div className="aspect-video relative">
                <Image
                  src="/images/roofline-lighting.png"
                  alt="Roofline Lighting"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Roofline Lighting</h3>
                </div>
                <p className="text-gray-600 mb-6">Transform your home's architecture with elegant roofline lighting that highlights every peak, gable, and eave.</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional-grade C9 LED bulbs
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom-fit to your roofline
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Energy-efficient operation
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Full-season maintenance
                  </li>
                </ul>
                <a
                  href="/contact?service=roofline-lighting"
                  className="block text-center px-6 py-3 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all mt-auto"
                >
                  Get Quote
                </a>
              </div>
            </div>

            {/* Complete Package Card */}
            <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border-2 border-[#d4af37]">
              <div className="bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white text-center py-3 text-sm font-bold tracking-wide relative">
                <span className="relative z-10">⭐ MOST POPULAR ⭐</span>
              </div>
              <div className="aspect-video relative">
                <Image
                  src="/images/tree-wrapping.png"
                  alt="Complete Package"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Complete Package</h3>
                </div>
                <p className="text-gray-600 mb-6">Our most popular package combines architectural and landscape lighting for a truly magical display.</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Full roofline coverage
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tree and shrub wrapping
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Landscape accent lighting
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Pathway illumination
                  </li>
                </ul>
                <a
                  href="/contact?service=complete-package"
                  className="block text-center px-6 py-3 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all mt-auto"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#e8dcc8]/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Simple Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Consultation', description: 'Free on-site assessment and custom design plan' },
                { step: '2', title: 'Installation', description: 'Professional installation by certified technicians' },
                { step: '3', title: 'Enjoyment', description: 'Sit back and enjoy your beautiful display' },
                { step: '4', title: 'Removal', description: 'Complete removal after the season' }
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
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Light Up Your Holidays?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of Richmond families who trust us with their holiday displays
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="px-8 py-4 bg-white text-[#1a2845] rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Book Installation
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#1a2845] transition-all"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}