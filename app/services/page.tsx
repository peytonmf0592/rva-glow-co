import Image from 'next/image'

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#e8dcc8] to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">Our Services</h1>
            <p className="text-xl text-gray-600">Professional holiday lighting tailored to your vision and budget</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Roofline Lighting Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all flex flex-col">
              <div className="py-2 text-sm font-semibold" style={{ visibility: 'hidden' }}>
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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all flex flex-col">
              <div className="bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white text-center py-2 text-sm font-semibold">
                MOST POPULAR
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

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white py-16 mt-16">
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
    </>
  )
}