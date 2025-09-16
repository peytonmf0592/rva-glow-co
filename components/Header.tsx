'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // This helper function checks if we're on the current page
  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              ✨ RVA Glow Co
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`${
                isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`${
                isActive('/services') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 transition-colors duration-200`}
            >
              Services
            </Link>
            <Link
              href="/booking"
              className={`${
                isActive('/booking') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 transition-colors duration-200`}
            >
              Book Now
            </Link>
            <Link
              href="/faq"
              className={`${
                isActive('/faq') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 transition-colors duration-200`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`${
                isActive('/contact') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 transition-colors duration-200`}
            >
              Contact
            </Link>
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="bg-gradient-to-r from-blue-500 to-amber-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Book Now →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`${
                  isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={`${
                  isActive('/services') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/booking"
                className={`${
                  isActive('/booking') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
              <Link
                href="/faq"
                className={`${
                  isActive('/faq') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className={`${
                  isActive('/contact') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}