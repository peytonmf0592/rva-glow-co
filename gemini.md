# Instructions for Holiday Light Preview Feature Enhancement

## Overview
Transform the holiday light preview feature from the current overlay-based system to use Gemini 2.5 Flash Image Preview model for direct image-to-image generation. Remove all lighting plan text displays and add lead capture functionality after users view their preview.

## Core Changes Required

### 1. Replace Image Processing Pipeline
**Current System**: Uses overlay components and text-based AI analysis to describe lighting placement
**New System**: Direct image-to-image transformation using gemini-2.5-flash-image-preview model

- Update the `/api/render-preview` route to use gemini-2.5-flash-image-preview model
- Send the cropped house image directly as input to Gemini
- Prompt Gemini to transform the house image to nighttime with professional holiday lighting based on the selected package (roof-only vs complete)
- Return the AI-generated image directly to the frontend
- Remove all text analysis and lighting description generation

### 2. Update Frontend Display Logic
**Remove Completely**:
- All lighting plan text display sections (the AI analysis box with lighting descriptions)
- The HolidayLightsOverlay component usage
- Any state variables related to storing lighting descriptions
- The blue-tinted overlay system

**Update Results Display**:
- Show simple side-by-side comparison: original image vs AI-generated holiday lighting image
- Change the right side heading to "With Professional Holiday Lights" instead of package-specific text
- Display the raw AI-generated image without any additional overlays or processing

### 3. Add Lead Capture Flow
**After Preview Generation**:
- Add a prominent lead capture form between the image comparison and the existing CTA buttons
- Include fields for: Name, Phone, Email
- Style it as an attractive call-to-action with messaging like "Love What You See? Get a free quote for this exact lighting design!"
- Connect the form submission to the existing `/api/quote` endpoint
- Include the address and selected lighting package in the quote request
- Add a note that this lead came from the preview tool
- Show success/error states for form submission

### 4. Simplify User Experience
**Prompting Strategy for Gemini**:
- For "Roofline Only": Prompt to add warm white LED lights to all visible rooflines and architectural edges, convert to nighttime
- For "Complete Package": Prompt to add comprehensive holiday lighting including rooflines, trees, bushes, landscaping, and pathway lighting, convert to nighttime
- Emphasize keeping the house structure exactly the same while adding realistic lighting effects

**Remove Complexity**:
- Eliminate the lighting plan analysis completely
- No more overlay components or manual light placement
- Let Gemini handle the entire nighttime conversion and lighting placement automatically

### 5. Update State Management
- Remove all state variables related to lighting descriptions
- Add state management for the lead capture form (name, phone, email)
- Add states for lead submission loading and success/error handling
- Update the reset functionality to clear lead form data as well

### 6. Error Handling Updates
- Update error messages to reflect the new image generation process
- Handle Gemini API rate limits and quota issues specifically for image generation
- Provide user-friendly error messaging if image generation fails

### 7. Performance Considerations
- Image generation with Gemini may take 10-15 seconds - ensure loading states are clear
- Consider adding progress indicators during the AI generation step
- Maintain the existing image capture and cropping functionality as-is

## Expected User Flow After Changes

1. **Address Input** - Unchanged
2. **Street View Adjustment** - Unchanged
3. **House Cropping & Package Selection** - Unchanged
4. **AI Image Generation** - Now uses direct image transformation instead of overlay
5. **Results Display** - Clean side-by-side comparison with AI-generated holiday lighting
6. **Lead Capture** - NEW: Form to capture interested prospects immediately
7. **Booking CTA** - Existing functionality preserved

## Key Benefits
- More realistic and impressive holiday lighting visualizations
- Simplified technical architecture by removing overlay complexity
- Better lead generation by capturing interest at peak engagement moment
- Faster development since Gemini handles all lighting placement logic
- More professional-looking results that will drive higher conversion rates

## Technical Notes
- The gemini-2.5-flash-image-preview model excels at architectural lighting and nighttime scene conversion
- No need for manual light positioning or overlay calculations
- The model can handle various house styles and lighting scenarios automatically
- Ensure proper error handling for API quotas and rate limits

This update will transform the preview tool from a technical demonstration into a powerful lead generation and sales tool that showcases realistic, professional-quality holiday lighting visualizations.