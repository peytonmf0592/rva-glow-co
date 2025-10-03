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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return

    try {
      // Initialize autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
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
    } catch (error) {
      console.error('Error initializing autocomplete:', error)
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isLoaded, onChange])

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
      />
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={className}
        placeholder={placeholder}
        autoComplete="off"
      />
    </>
  )
}