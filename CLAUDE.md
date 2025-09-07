# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
RVA Glow Co - A Next.js website for selling holiday light installation services in the Richmond, VA area. The project uses:
- Next.js as the web framework
- Vercel for deployment
- Supabase for backend services
- GitHub for version control

## Common Commands

### Initial Setup
```bash
npx create-next-app@latest . --typescript --tailwind --app
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Testing
```bash
npm test             # Run all tests
npm test -- --watch  # Run tests in watch mode
```

## Architecture

### Directory Structure
```
/app                 # Next.js App Router pages and layouts
  /api              # API routes
  /(auth)           # Authentication pages
  /(marketing)      # Public marketing pages
  /(app)            # Protected application pages
/components         # Reusable React components
  /ui               # Base UI components
  /forms            # Form components
/lib                # Utility functions and configurations
  /supabase         # Supabase client and utilities
/public             # Static assets
/types              # TypeScript type definitions
```

### Key Integration Points

#### Supabase Setup
- Environment variables needed in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

#### Vercel Deployment
- Automatic deployments from GitHub main branch
- Preview deployments for pull requests
- Environment variables configured in Vercel dashboard

### Database Schema (Supabase)
Expected tables for the holiday light service:
- `customers` - Customer information
- `service_requests` - Service booking requests
- `quotes` - Price quotes for services
- `appointments` - Scheduled installations
- `service_areas` - Richmond area coverage zones

### API Routes Pattern
- `/api/booking` - Handle service booking requests
- `/api/quote` - Generate and manage quotes
- `/api/contact` - Contact form submissions
- `/api/availability` - Check installation availability

## Development Guidelines

### Component Creation
When creating new components, follow the existing pattern:
- Use TypeScript for all components
- Implement responsive design with Tailwind CSS
- Create server components by default, use 'use client' only when needed
- Place shared components in `/components`

### State Management
- Use React Server Components where possible
- Client-side state with React hooks for interactive features
- Supabase real-time subscriptions for live updates

### Styling
- Tailwind CSS for styling
- Follow mobile-first responsive design
- Use CSS modules for component-specific styles if needed

## Testing and Quality
Before committing:
1. Run `npm run lint` and fix any issues
2. Run `npm run type-check` to ensure TypeScript compilation
3. Run `npm run build` to verify production build works
4. Test on mobile and desktop viewports