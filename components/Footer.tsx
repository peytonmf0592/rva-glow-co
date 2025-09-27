import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#147878] to-[#eb834f] bg-clip-text text-transparent">
              RVA Glow Co
            </h3>
            <p className="text-gray-300">
              Bringing holiday magic to Richmond homes since 2024. Professional, insured, and dedicated to making your holidays shine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Book Installation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Service Areas</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Richmond</li>
              <li>Henrico</li>
              <li>Chesterfield</li>
              <li>Midlothian</li>
              <li>Short Pump</li>
              <li>Glen Allen</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <span className="mr-2">Phone:</span>
                (804) 555-GLOW
              </p>
              <p className="flex items-center">
                <span className="mr-2">Email:</span>
                hello@rvaglowco.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">Hours:</span>
                Mon-Sat: 8AM - 6PM
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 RVA Glow Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}