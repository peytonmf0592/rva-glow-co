'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-red-600">
              RVA Glow Co
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-red-600">
              Services
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-red-600">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600">
              Contact
            </Link>
            <Link href="/quote" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Get Quote
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-red-600">
                Home
              </Link>
              <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-red-600">
                Services
              </Link>
              <Link href="/gallery" className="block px-3 py-2 text-gray-700 hover:text-red-600">
                Gallery
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-red-600">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-red-600">
                Contact
              </Link>
              <Link href="/quote" className="block px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}