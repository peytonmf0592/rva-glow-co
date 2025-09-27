'use client'

import Image from 'next/image'

export default function ServicesPage() {
  return (
    <>
      <style jsx>{`
        .hero-header {
          position: relative;
          padding-top: 61.93333333%;
          overflow: hidden;
          background: url('/images/hero-house.jpg') no-repeat center center;
          background-size: cover;
        }

        .hero-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/images/hero-house.jpg') no-repeat center center;
          background-size: cover;
          z-index: 10;
          clip-path: polygon(
            0 75%,
            28% 50%,
            34% 45%,
            38% 40%,
            42% 37%,
            45% 34%,
            47% 32%,
            49% 33%,
            53% 35%,
            57% 38%,
            63% 41%,
            69% 43%,
            75% 44%,
            81% 45%,
            87% 46%,
            93% 48%,
            100% 50%,
            100% 100%,
            0 100%
          );
        }

        .hero-text {
          position: fixed;
          top: 12%;
          right: 15%;
          transform: none;
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: bold;
          text-align: right;
          color: white;
          text-shadow: 3px 3px 10px rgba(0,0,0,0.9), 0 0 30px rgba(212, 175, 55, 0.6);
          z-index: 5;
          line-height: 1.1;
          padding: 0 2rem;
          margin: 0;
        }

        .hero-text span {
          display: block;
          font-size: clamp(1.8rem, 6vw, 4.5rem);
          color: #d4af37;
          margin-top: 0.5rem;
        }

        .quote-includes {
          position: absolute;
          top: 25%;
          left: 5%;
          color: white;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8);
          z-index: 3;
          max-width: 350px;
        }

        .quote-includes h3 {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: bold;
          margin-bottom: 1rem;
          color: #d4af37;
        }

        .quote-includes ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .quote-includes li {
          font-size: clamp(1rem, 2vw, 1.3rem);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
        }

        .quote-includes li:before {
          content: "✓";
          color: #d4af37;
          font-weight: bold;
          font-size: 1.5rem;
          margin-right: 0.75rem;
        }

        @media (max-width: 768px) {
          .quote-includes {
            position: static;
            margin: 2rem auto;
            max-width: 100%;
            padding: 2rem;
            background: rgba(0,0,0,0.7);
            border-radius: 1rem;
          }
        }
      `}</style>
      <main className="min-h-screen bg-white">
        {/* Hero Header with Scrolling Text */}
        <header className="hero-header">
          <h1 className="hero-text">
            Your Vision. <span>Our Precision.</span>
          </h1>

          <div className="quote-includes">
            <h3>Every quote includes:</h3>
            <ul>
              <li>Full installation</li>
              <li>Service calls during season</li>
              <li>Safe takedown after holidays</li>
              <li>Off-season storage</li>
            </ul>
          </div>
        </header>

        {/* Vision and Precision Content */}
        <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="order-2 lg:order-1">
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p className="text-xl">
                    No matter the size, slope, or shape of your home — if it has a roof, <span className="font-bold text-[#1a2845]">we can light it</span>. From steep pitches to complex ridgelines, RVA Glow Co handles every install with expert precision and clean, custom results.
                  </p>

                  <p className="text-xl bg-gradient-to-r from-[#e8dcc8] to-white p-6 rounded-xl border-l-4 border-[#d4af37]">
                    Choose to either <span className="font-bold text-[#1a2845]">lease or own</span> your lights. No stress, no clutter, no hassle — just brilliant lights and total peace of mind.
                  </p>
                </div>
              </div>

              {/* Image Grid */}
              <div className="order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#1a2845] to-[#8b4a3a]"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 mt-8">
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#8b4a3a] to-[#d4af37]"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#d4af37] to-[#1a2845]"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 mt-8">
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#1a2845] to-[#8b4a3a]"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </div>
              </div>
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
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">Our Services</h2>
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