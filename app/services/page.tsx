import Image from 'next/image'

const services = [
  {
    title: 'Roofline Lighting',
    price: '',
    image: '/images/roofline-lighting.png',
    features: [
      'Professional-grade C9 LED bulbs',
      'Custom-fit to your roofline',
      'Energy-efficient operation',
      'Full-season maintenance'
    ],
    description: 'Transform your home\'s architecture with elegant roofline lighting that highlights every peak, gable, and eave.',
    popular: false
  },
  {
    title: 'Complete Package',
    price: '',
    image: '/images/tree-wrapping.png',
    features: [
      'Full roofline coverage',
      'Tree and shrub wrapping',
      'Landscape accent lighting',
      'Pathway illumination'
    ],
    description: 'Our most popular package combines architectural and landscape lighting for a truly magical display.',
    popular: true
  }
]

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#e7f5f6] to-white">
        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#147878] to-[#eb834f] bg-clip-text text-transparent">Our Services</h1>
            <p className="text-xl text-gray-600">Professional holiday lighting tailored to your vision and budget</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                {service.popular && (
                  <div className="bg-gradient-to-r from-[#147878] to-[#eb834f] text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="aspect-video relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-[#147878] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/contact?service=${service.title.toLowerCase().replace(' ', '-')}`}
                    className="block text-center px-6 py-3 bg-gradient-to-r from-[#147878] to-[#eb834f] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Get Quote →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Commercial Materials Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Commercial-Grade Materials We Use</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SP</span>
                </div>
                <p className="text-sm font-medium text-gray-800">SPT-1 Wire</p>
                <p className="text-xs text-gray-500 mt-1">Heavy-duty</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ZC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Zip Cord</p>
                <p className="text-xs text-gray-500 mt-1">& Plugs</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">TC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Termination Caps</p>
                <p className="text-xs text-gray-500 mt-1">Weatherproof</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">RC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Ridge Clips</p>
                <p className="text-xs text-gray-500 mt-1">Secure mount</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ML</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Mini-Light Strings</p>
                <p className="text-xs text-gray-500 mt-1">Premium grade</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">C9</span>
                </div>
                <p className="text-sm font-medium text-gray-800">C9 LED Bulbs</p>
                <p className="text-xs text-gray-500 mt-1">Commercial-grade</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">OB</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Outdoor Bulbs</p>
                <p className="text-xs text-gray-500 mt-1">& Sockets</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">EC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Extension Cords</p>
                <p className="text-xs text-gray-500 mt-1">Heavy-duty</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#147878] to-[#eb834f] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WC</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Weatherproof</p>
                <p className="text-xs text-gray-500 mt-1">Connectors</p>
              </div>
            </div>
            {/* C9 LED Bulb Options */}
            <div className="mt-8 bg-gradient-to-br from-[#e7f5f6]/30 to-white rounded-xl p-6">
              <h4 className="text-lg font-semibold text-center mb-4 text-gray-900">C9 LED Bulb Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="w-10 h-10 bg-[#147878]/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-[#147878] font-bold text-sm">F</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">Faceted</p>
                  <p className="text-xs text-gray-500 mt-1">Diamond-cut brilliance</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="w-10 h-10 bg-[#147878]/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-[#147878] font-bold text-sm">S</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">Smooth</p>
                  <p className="text-xs text-gray-500 mt-1">Classic uniform glow</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="w-10 h-10 bg-[#147878]/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-[#147878] font-bold text-sm">O</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">Opaque</p>
                  <p className="text-xs text-gray-500 mt-1">Soft diffused light</p>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">All C9 bulbs are commercial-grade LED for maximum durability and energy efficiency</p>
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 italic">For specific model numbers and supplier information: <span className="font-semibold">CALL SUPPLIER</span></p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-[#e7f5f6]/30 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Simple Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Consultation', description: 'Free on-site assessment and custom design plan' },
                { step: '2', title: 'Installation', description: 'Professional installation by certified technicians' },
                { step: '3', title: 'Enjoyment', description: 'Sit back and enjoy your beautiful display' },
                { step: '4', title: 'Removal', description: 'Complete removal and storage after the season' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#147878] to-[#eb834f] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4">
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
              <div className="bg-[#ffd4c1]/30 border border-[#eb834f]/30 rounded-lg p-4">
                <p className="text-[#db4009]">
                  <strong>Note:</strong> Final pricing depends on home size, roof complexity, and specific design requirements.
                  Schedule a free consultation for an exact quote.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#147878] to-[#eb834f] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Light Up Your Holidays?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of Richmond families who trust us with their holiday displays
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="px-8 py-4 bg-white text-[#147878] rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Book Installation
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#147878] transition-all"
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