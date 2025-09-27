'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
  details?: string[]
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems)
    if (newOpen.has(id)) {
      newOpen.delete(id)
    } else {
      newOpen.add(id)
    }
    setOpenItems(newOpen)
  }

  const quickAnswers: FAQItem[] = [
    {
      question: "How much does professional holiday lighting cost?",
      answer: "Our roofline lighting starts at $7-10 per linear foot for standard installations, all-inclusive.",
      details: ["Includes materials, installation, service, and removal", "Steeper roofs: pricing varies based on pitch and complexity", "Free on-site quote for accurate pricing"]
    },
    {
      question: "What's included in your service?",
      answer: "Everything: professional-grade lights, installation, seasonal maintenance, takedown, and storage options.",
      details: ["Commercial C9 LED bulbs", "Heavy-duty SPT-1 wiring", "Timer and all hardware", "Mid-season service calls", "Safe removal in January"]
    },
    {
      question: "When do you install holiday lights?",
      answer: "We begin installations in late October and continue through December 24th.",
      details: ["Book by September for best scheduling", "Most installs happen November 1-20", "Emergency installs available at premium rates"]
    },
    {
      question: "Do you service my lights during the season?",
      answer: "Yes, all packages include complimentary service calls for any issues.",
      details: ["48-hour response time", "Replace burned bulbs", "Fix weather-related issues", "Adjust timers as needed"]
    },
    {
      question: "Should I lease or buy my lights?",
      answer: "Leasing keeps the same price yearly with fresh lights; buying saves money after year one.",
      details: ["Lease: Same price each year, we store lights", "Buy: ~40% less in year 2 (labor only)", "Most customers prefer buying for long-term savings"]
    }
  ]

  const fullFAQSections: FAQSection[] = [
    {
      title: "Materials & Quality",
      items: [
        {
          question: "What type of lights do you use?",
          answer: "We use commercial-grade C9 LED bulbs with faceted, smooth, or opaque options.",
          details: [
            "SMD LED technology for brightness and efficiency",
            "C9 bulbs are the industry standard (also offer G50 for a different look)",
            "15\" socket spacing recommended (12\", 18\", 24\", 36\" available)",
            "SPT-1 commercial socket cord rated for outdoor use"
          ]
        },
        {
          question: "How do you attach lights without damaging my roof?",
          answer: "We use specialized clips designed for your specific roof and gutter type.",
          details: [
            "Circle clips that rotate for both shingles and gutters",
            "Ridge clips for peaks that protect shingles",
            "No nails, staples, or permanent attachments",
            "Clips designed to withstand Richmond weather"
          ]
        },
        {
          question: "What about ground lighting and yard decorations?",
          answer: "We use professional-grade Caney snap-around stakes that won't damage wires.",
          details: [
            "Secure hold in all weather conditions",
            "Clean, straight lines along walkways",
            "Won't chew through wire insulation",
            "Easy to adjust and reposition"
          ]
        }
      ]
    },
    {
      title: "Design & Installation",
      items: [
        {
          question: "What areas of my home can you light?",
          answer: "We outline your entire roofline, plus gables, dormers, ridges, and architectural features.",
          details: [
            "Primary focus: main roofline perimeter",
            "Accent lighting for peaks and valleys",
            "Ridge lines with clean inline connections",
            "Trees, shrubs, and ground lighting available"
          ]
        },
        {
          question: "Can I choose custom colors and patterns?",
          answer: "Absolutely! We offer single colors, alternating patterns, or custom designs.",
          details: [
            "Popular: warm white, multicolor, or red/green",
            "3-2 pattern for balanced red/green displays",
            "Note: Blues and greens appear brighter than reds and oranges",
            "We install one color first, then add second for perfect spacing"
          ]
        },
        {
          question: "How long does installation take?",
          answer: "A typical single-story home (150 linear feet) takes 2.5-3 hours.",
          details: [
            "Larger homes: 4-6 hours",
            "Complex designs with trees: full day",
            "We work efficiently without compromising quality",
            "Weather dependent for safety"
          ]
        }
      ]
    },
    {
      title: "Power & Safety",
      items: [
        {
          question: "How do you handle electrical connections?",
          answer: "We use vampire plugs and professional connections that are weatherproof and safe.",
          details: [
            "Male/female vampire plugs bite into SPT-1 wire",
            "Inline females for clean ridge connections",
            "Termination caps on all dead ends (safer than exposed plugs)",
            "GFCI-protected circuits recommended"
          ]
        },
        {
          question: "Where do you run the extension cords?",
          answer: "We route power discreetly along downspouts and hidden areas.",
          details: [
            "Zip cord runs beside (not inside) downspouts",
            "Single spiral wrap for strain relief",
            "Hidden behind J-channel when possible",
            "Timer placement in accessible location"
          ]
        },
        {
          question: "How do you handle steep or difficult roofs?",
          answer: "Our installers are trained and equipped for all roof types.",
          details: [
            "Special shoes with padding for secure footing",
            "Steep assist devices designed for difficult pitches",
            "Full insurance coverage",
            "Will recommend alternatives if unsafe"
          ]
        }
      ]
    },
    {
      title: "Pricing & What's Included",
      items: [
        {
          question: "What's your pricing structure?",
          answer: "We charge per linear foot with all-inclusive pricing - no hidden fees.",
          details: [
            "Standard roofline: $7-10 per linear foot",
            "Steeper roofs: pricing varies based on pitch and complexity",
            "Mini lights on shrubs: $25-30 per string installed",
            "Tree wrapping: custom quote based on size"
          ]
        },
        {
          question: "What exactly is included in the price?",
          answer: "Everything needed for a worry-free holiday season.",
          details: [
            "All materials (bulbs, wire, clips, timer)",
            "Professional installation",
            "Service calls during the season",
            "Safe removal in January",
            "Storage (lease model) or available as add-on"
          ]
        },
        {
          question: "Do you require a deposit?",
          answer: "Yes, we require 50% deposit to reserve your installation date.",
          details: [
            "Deposit locks in your preferred install date",
            "Balance due upon completion",
            "Early bird deposits (July-August) get priority",
            "All major payment methods accepted"
          ]
        }
      ]
    },
    {
      title: "Trees, Shrubs & Specialty Lighting",
      items: [
        {
          question: "How do you light trees?",
          answer: "We offer trunk wrapping or branch wrapping with commercial mini lights.",
          details: [
            "Canopy wrap: spiral up the trunk",
            "Branch wrap: spiral out and back, creating an 'X' pattern",
            "21-23 ft commercial strings with 70 lights each",
            "Time-intensive work priced accordingly"
          ]
        },
        {
          question: "What about bushes and shrubs?",
          answer: "We drape or wrap shrubs with mini lights for a magical glow.",
          details: [
            "$25-30 per string for installation",
            "Materials cost ~$10 per string",
            "Creates depth and layers in your display",
            "Complements roofline lighting beautifully"
          ]
        }
      ]
    },
    {
      title: "Service, Repairs & Warranty",
      items: [
        {
          question: "What if lights go out during the season?",
          answer: "We provide free service calls for any issues - typically within 48 hours.",
          details: [
            "Replace individual bulbs or sections",
            "Fix weather-related problems",
            "Adjust or replace timers",
            "No charge for standard service calls"
          ]
        },
        {
          question: "What happens if weather damages the display?",
          answer: "We'll repair or replace damaged sections at no charge during the season.",
          details: [
            "Wind damage covered",
            "Ice and snow issues addressed",
            "Fallen branches cleared and lights replaced",
            "Only exclusion: acts of vandalism"
          ]
        }
      ]
    },
    {
      title: "Storage & Off-Season",
      items: [
        {
          question: "Do you store the lights?",
          answer: "Storage included with lease option; available as add-on for purchased lights.",
          details: [
            "Climate-controlled storage facility",
            "Lights tested before next season",
            "Labeled and organized by property",
            "Convenient - no garage clutter"
          ]
        },
        {
          question: "When do you take down the lights?",
          answer: "Removal typically happens the first two weeks of January.",
          details: [
            "Weather permitting for safety",
            "Flexible scheduling available",
            "Lights carefully packed and labeled",
            "Ready for next year's installation"
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to know about our premium holiday lighting service.
              Can't find your answer? <Link href="/contact" className="underline hover:text-white">Contact us directly</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answers Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Answers</h2>
          <div className="space-y-4">
            {quickAnswers.map((item, index) => (
              <div
                key={`quick-${index}`}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(`quick-${index}`)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openItems.has(`quick-${index}`) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="mt-2 text-gray-600">{item.answer}</p>
                </button>
                {openItems.has(`quick-${index}`) && item.details && (
                  <div className="px-6 pb-4 border-t">
                    <ul className="mt-3 space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full FAQ Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Complete FAQ Guide</h2>
          {fullFAQSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[#1a2845]">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={`${sectionIndex}-${itemIndex}`}
                    className="bg-gray-50 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(`${sectionIndex}-${itemIndex}`)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                        <svg
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${
                            openItems.has(`${sectionIndex}-${itemIndex}`) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {openItems.has(`${sectionIndex}-${itemIndex}`) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 mb-3">{item.answer}</p>
                        {item.details && (
                          <ul className="space-y-2">
                            {item.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-[#1a2845] mr-2">✓</span>
                                <span className="text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Proudly Serving Greater Richmond</h3>
          <p className="text-gray-600 mb-8">
            Richmond • Henrico • Short Pump • Midlothian • Chesterfield • Mechanicsville • Glen Allen • And surrounding areas
          </p>
          <Link
            href="/booking"
            className="inline-block bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Book Your Free Design Consultation
          </Link>
        </div>
      </section>

      {/* What We'll Confirm Locally */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Notes</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>NEED LOCAL RESEARCH:</strong> Exact Richmond market rates, HOA requirements in specific neighborhoods</p>
              <p><strong>CALL SUPPLIER:</strong> SiteOne inventory for C9 clips, ridge clips, Caney stakes, local bulk pricing</p>
              <p><strong>LEGAL REVIEW:</strong> Virginia contractor licensing, insurance minimums, service agreement templates</p>
              <p><strong>POLICY CHOICE:</strong> Storage pricing structure, multi-year discount programs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}