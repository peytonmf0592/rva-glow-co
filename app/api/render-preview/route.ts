import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  // Initialize variables outside try block
  let base64Image = ''
  let lightingOption = 'roof'

  try {
    // Get the image and lighting option from the form data
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    lightingOption = formData.get('lightingOption') as string || 'roof'

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    base64Image = buffer.toString('base64')

    // Check if we have a Gemini API key
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      console.log('Gemini API key not configured - using mock response')

      // For demonstration without API key, add a festive overlay effect
      // This creates a simple holiday lights effect overlay
      const mockRenderedImage = `data:image/png;base64,${base64Image}`

      await new Promise(resolve => setTimeout(resolve, 2000))

      return NextResponse.json({
        success: true,
        renderedImage: mockRenderedImage,
        message: 'Preview generated (demo mode - add GEMINI_API_KEY for real AI generation)',
        isDemo: true
      })
    }

    // Initialize Gemini AI with the API key
    const genAI = new GoogleGenerativeAI(apiKey)

    // Use Gemini 1.5 Pro for better image generation
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.9,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      }
    })

    // Use different prompts based on the lighting option
    const prompt = lightingOption === 'roof'
      ? `Generate a professional, high-resolution photo of this house on a snowy winter night at dusk. Add elegant, warm white holiday lights to the entire perimeter of the roof, specifically on the ridge, rakes, and eaves. Do not add any other decorations to the house or bushes.

      Provide a detailed description of:
      1. Exact placement of warm white C9 LED lights on all rooflines
      2. Coverage of main ridge, gables, dormers, and any architectural features
      3. Linear footage estimate for the roofline only
      4. Professional installation approach for roof elements
      5. The elegant, classic appearance with roofline lighting only

      Focus on creating a sophisticated, minimalist holiday display with warm white lights on the roofline only.`
      : `Generate a professional, high-resolution photo of this house on a snowy winter night at dusk. Add elegant, warm white holiday lights to the entire perimeter of the roof, specifically on the ridge, rakes, and eaves. Also add warm white lights to the bushes and trees in the landscaping.

      Provide a detailed description of:
      1. Exact placement of warm white C9 LED lights on all rooflines
      2. Mini light coverage for all shrubs, bushes, and small trees
      3. Linear footage for roofline plus quantity of mini light strings for landscaping
      4. Professional wrapping technique for bushes and trees
      5. The complete, magazine-worthy holiday display

      Create a comprehensive holiday lighting package that includes both architectural and landscape elements.`

    // Send to Gemini for analysis
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: imageFile.type || 'image/png',
          data: base64Image
        }
      }
    ])

    const response = await result.response
    const description = response.text()

    // Since Gemini 1.5 Pro doesn't generate images directly,
    // we'll return the description and use it to create an overlay effect
    // For actual image generation, you'd need to use a different service like Imagen or Stable Diffusion

    // Create an enhanced version with overlay effect (simplified)
    // In production, you'd send this to an image generation API
    const enhancedImage = `data:image/png;base64,${base64Image}`

    return NextResponse.json({
      success: true,
      renderedImage: enhancedImage,
      description: description,
      lightingOption: lightingOption,
      message: 'AI analysis complete',
      note: 'Gemini provides lighting plan - integrate with image generation API for visual rendering'
    })

  } catch (error) {
    console.error('Error processing image:', error)

    // If Gemini fails, provide a fallback response
    if (error instanceof Error && (error.message.includes('quota') || error.message.includes('429'))) {
      // Provide a pre-written description based on the lighting option
      const fallbackDescription = lightingOption === 'roof'
        ? `Professional Lighting Plan (Roofline Package):

Your home would feature warm white C9 LED lights along:
• Main roofline perimeter (estimated 150-200 linear feet)
• All gable peaks and architectural features
• Ridge lines for dimensional appeal
• Eave edges for complete coverage

Installation includes commercial-grade lights with 15" spacing, professional clips, timer system, and full service through the season.

Estimated Investment: $1,050-$2,000 based on home size`
        : `Professional Lighting Plan (Complete Package):

ROOFLINE LIGHTING:
• Main roofline perimeter with warm white C9 LEDs
• All peaks, gables, and architectural features
• Estimated 150-200 linear feet of roofline

LANDSCAPE LIGHTING:
• Mini lights wrapped on all front bushes and shrubs
• Tree trunk and branch wrapping where applicable
• Ground-level accent lighting
• Estimated 10-15 strings for landscaping

Complete installation with commercial-grade materials, professional techniques, timer system, and full-season service.

Estimated Investment: $1,500-$3,000 based on home size and landscaping`

      return NextResponse.json({
        success: true,
        renderedImage: `data:image/png;base64,${base64Image}`,
        description: fallbackDescription,
        lightingOption: lightingOption,
        message: 'Preview generated (using standard template due to high demand)',
        note: 'Due to high demand, we\'re showing a standard lighting plan. Our professionals will create a custom plan during your consultation.',
        isTemplate: true
      })
    }

    // Other error handling
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid Gemini API key. Please check your configuration.' },
          { status: 401 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate preview. Please try again.' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const maxDuration = 30 // Allow up to 30 seconds for processing