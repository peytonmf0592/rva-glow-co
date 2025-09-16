# Setting Up Google Gemini AI for Holiday Light Preview

## Important Note
Google's Gemini 1.5 Pro can analyze images and provide detailed descriptions, but it **does not generate new images**. For actual image generation with holiday lights added, you would need to integrate with:
- **Google's Imagen API** (when publicly available)
- **Stable Diffusion API**
- **DALL-E API from OpenAI**
- **Midjourney API**

## To Get Started with Gemini:

### 1. Get Your API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Add to Your Environment
Add this line to your `.env.local` file:
```
GEMINI_API_KEY=your-actual-api-key-here
```

### 3. Restart Your Dev Server
```bash
npm run dev
```

## What Gemini Will Do:
- ✅ Analyze the house image
- ✅ Identify where lights should go
- ✅ Provide professional installation description
- ✅ Estimate linear footage needed
- ❌ Generate a new image with lights (requires separate image generation service)

## For Full Image Generation:
To actually generate images with holiday lights, you would need to:

1. **Use Gemini** to analyze and describe the lighting plan
2. **Send to an image generation API** with a prompt like:
   - Original image +
   - Gemini's description +
   - "Add warm white C9 holiday lights as described"

## Alternative Solutions:
1. **Canvas Overlay Approach**: Draw SVG lights over the original image using JavaScript
2. **Pre-rendered Examples**: Show generic before/after examples
3. **Partner with an AI Image Service**: Use RunwayML, Replicate, or similar services

## Testing Without API Key:
The current implementation will work in "demo mode" without an API key, returning the same image. This lets you test the full user flow.