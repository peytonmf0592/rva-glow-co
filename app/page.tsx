'use client'

import { useState } from 'react'
import Link from 'next/link'
import HolidayPreview from '@/components/HolidayPreview'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-home.png"
            alt="Holiday lights on home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
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
            <span className="bg-gradient-to-r from-amber-300 via-white to-blue-300 bg-clip-text text-transparent">
              Light Up Your Holidays
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Professional Holiday Light Installation in Richmond, VA
          </p>
          <Link
            href="/booking"
            className="inline-block bg-gradient-to-r from-blue-500 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transform transition-all duration-300 shadow-lg animate-fade-in"
            style={{ animationDelay: '1s' }}
          >
            Book Your Lights Now →
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to RVA Glow Co</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-xl text-gray-800 mb-6 leading-relaxed">
                Welcome to RVA Glow Co — where holiday lighting becomes an investment in joy, comfort, and curb appeal.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We&apos;re not just installing lights — we&apos;re helping you transform your property into a show-stopping celebration of the season. Our design-forward approach and white-glove service make your home the envy of the neighborhood without lifting a finger.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Whether it&apos;s a classic, elegant roofline or a full-scale winter wonderland, we tailor every install to match your vision and maximize your home&apos;s beauty. From consultation to takedown, every step is handled with care, precision, and professionalism.
              </p>
              <p className="text-lg text-gray-800 mb-12 font-medium">
                Let RVA Glow Co handle the work — so you can focus on what matters most this holiday season. Your home deserves it.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-800 font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-800 font-medium">100% Satisfaction</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-800 font-medium">Free Estimates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">Professional installation from rooflines to trees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 - Roofline Lighting */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="/images/roofline-lighting.png"
                  alt="Professional roofline lighting installation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Roofline Lighting</h3>
                <p className="text-gray-600">Classic C9 or mini lights along your roofline for that perfect holiday glow</p>
              </div>
            </div>

            {/* Service 2 - Tree Wrapping */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="/images/tree-wrapping.png"
                  alt="Professional tree wrapping with lights"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tree Wrapping</h3>
                <p className="text-gray-600">Transform your trees into magical pillars of light with our wrapping service</p>
              </div>
            </div>

            {/* Service 3 - Custom Designs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="/images/custom-designs.png"
                  alt="Custom holiday light designs"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Designs</h3>
                <p className="text-gray-600">Unique displays tailored to your home&apos;s architecture and style</p>
              </div>
            </div>

            {/* Service 4 - Holiday Decor */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="/images/holiday-decor.png"
                  alt="Holiday wreaths and decorations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Holiday Decor</h3>
                <p className="text-gray-600">Wreaths, garlands, and festive decorations to complete your display</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-gradient-to-r from-blue-500 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Holiday Preview Section */}
      <HolidayPreview />

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;RVA Glow Co transformed our home into the best-looking house on the block! Professional, efficient, and the results were stunning.&quot;
              </p>
              <div className="font-semibold text-gray-900">- Sarah M., Short Pump</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-xl p-6 border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;Best decision we made this holiday season! The team was professional, the installation was flawless, and removal was included!&quot;
              </p>
              <div className="font-semibold text-gray-900">- Mike T., Richmond</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;The custom design they created for our business was absolutely perfect. Increased our holiday traffic significantly!&quot;
              </p>
              <div className="font-semibold text-gray-900">- Lisa R., Midlothian</div>
            </div>
          </div>
        </div>
      </section>

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
                <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-6 my-6">
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-amber-500/20 blur-3xl"></div>
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
      <section className="py-20 bg-gradient-to-r from-slate-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Make Your Home Shine?</h2>
          <p className="text-xl mb-8 text-blue-100">Book early and save 20% on your holiday light installation!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-white text-slate-800 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-800 transition-all duration-200"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}