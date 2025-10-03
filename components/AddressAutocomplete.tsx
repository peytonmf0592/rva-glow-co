'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
  name?: string
  id?: string
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "123 Main St, Richmond, VA 23220",
  required = false,
  className = "",
  name = "address",
  id = "address"
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [manualEntry, setManualEntry] = useState(false)
  const autocompleteRef = useRef<any>(null)

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current || manualEntry) return

    try {
      // Check if google maps is available
      if (typeof window !== 'undefined' && (window as any).google?.maps?.places) {
        // Initialize autocomplete
        autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'us' },
          fields: ['formatted_address'],
          types: ['address']
        })

        // Add place changed listener
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace()
          if (place?.formatted_address) {
            onChange(place.formatted_address)
          }
        })
      }
    } catch (error) {
      console.error('Error initializing autocomplete:', error)
    }

    return () => {
      if (autocompleteRef.current && typeof window !== 'undefined' && (window as any).google?.maps?.event) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isLoaded, onChange, manualEntry])

  // Clean up autocomplete when switching to manual entry
  useEffect(() => {
    if (manualEntry && autocompleteRef.current) {
      if (typeof window !== 'undefined' && (window as any).google?.maps?.event) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
      autocompleteRef.current = null
    }
  }, [manualEntry])

  return (
    <div>
      {!manualEntry && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={className}
        placeholder={manualEntry ? "Enter complete address" : placeholder}
        autoComplete="off"
      />
      <div className="mt-2">
        <label className="flex items-center text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={manualEntry}
            onChange={(e) => setManualEntry(e.target.checked)}
            className="mr-2 rounded border-gray-300 text-[#1a2845] focus:ring-[#1a2845]"
          />
          <span>Can't find your address? Check here to enter manually</span>
        </label>
      </div>
    </div>
  )
}