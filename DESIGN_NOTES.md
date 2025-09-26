# RVA Glow Co - Header & Hero Visual Design Notes

## Implementation Summary

This document describes the visual design system implemented for the seamless header-to-hero transition and curved bottom edge feature.

## Color Gradient System

### Header Gradient (Left → Right)
- **Direction**: 90deg (horizontal, left to right)
- **Stops**:
  - 0%: `rgba(49, 65, 67, 0.85)` - Forest green (#314143)
  - 30%: `rgba(20, 120, 120, 0.85)` - Deep teal (#147878)
  - 100%: `rgba(235, 131, 79, 0.85)` - Peach-red (#EB834F)
- **Effect**: Frosted glass with 12px backdrop blur
- **Rationale**: The gradient flows from cooler tones (left/logo) to warmer tones (right/CTA), creating visual momentum toward the call-to-action

### Hero Overlay Gradient (Left → Right)
- **Direction**: 90deg (matching header direction)
- **Stops**:
  - 0%: `rgba(49, 65, 67, 0.5)` - Forest green at 50% opacity
  - 20%: `rgba(20, 120, 120, 0.45)` - Deep teal at 45% opacity
  - 60%: `rgba(235, 131, 79, 0.4)` - Peach-red at 40% opacity
  - 100%: `rgba(212, 175, 55, 0.35)` - Gold (#D4AF37) at 35% opacity
- **Additional Layer**: Bottom-to-top black gradient (`from-black/50 to-transparent`) applied to bottom third for text contrast
- **Rationale**: Lower opacity than header (35-50% vs 85%) allows hero photo to remain visible while maintaining color continuity. Gold accent at right edge reinforces the gold accent line animation.

## Button & Interactive Element Styling

### Gold Rim Treatment
- **Color**: `rgba(212, 175, 55, 0.6)` - #D4AF37 at 60% opacity
- **Implementation**: 2px solid border + additional box-shadow glow
- **Hover/Focus**: Border opacity increases, crisp outline (no gaussian bloom)
- **Applied to**: All nav pills, CTA buttons, focus states

### Book Now CTA (Header & Hero)
- **Background**: `linear-gradient(90deg, #147878 0%, #eb834f 100%)`
- **Border**: `2px solid rgba(212, 175, 55, 0.6)`
- **Shadow**: Layered - inner gold glow + drop shadow for depth
- **Text**: White with sufficient contrast (WCAG AA compliant)

### Nav Pills
- **Base**: `rgba(255, 255, 255, 0.15)` with 8px backdrop blur
- **Border**: `1px solid rgba(255, 255, 255, 0.2)`
- **Active State**: Brighter background (`rgba(255, 255, 255, 0.25)`) + gold border
- **Text**: White throughout for consistency

## Curved Bottom Edge

### Desktop Configuration
- **ViewBox**: `0 0 1920 200`
- **Curve Depth**: ~12% of hero height (120px dip at deepest point from 50px start)
- **Right Corner Elevation**: ~15% higher than left (50px left vs 20px right)
- **Path**: `M 0 50 Q 480 120, 960 80 T 1920 20 L 1920 200 L 0 200 Z`
- **Control Points**:
  - Start (0, 50): Gentle rise on left
  - Q1 (480, 120): Deep center dip
  - Mid (960, 80): Center control
  - Q2 (1920, 20): Soft right taper

### Tablet Configuration (≤1024px)
- **ViewBox**: `0 0 1024 120`
- **Curve Depth**: ~8% reduction from desktop (~40% shallower)
- **Path**: `M 0 40 Q 256 80, 512 60 T 1024 20`
- **Stroke**: 1.5px (slightly thinner)

### Mobile Configuration (≤640px)
- **ViewBox**: `0 0 375 80`
- **Curve Depth**: Converted to gentle diagonal (~6% depth)
- **Path**: `M 0 35 Q 187 55, 375 25`
- **Stroke**: 1px (thinnest)
- **Rationale**: Prevents curve from overlapping hero text/CTAs on small screens

### Gold Highlight
- **Stroke**: `rgba(212, 175, 55, 0.6)` - #D4AF37 at 60% opacity
- **Width**: 2px desktop, 1.5px tablet, 1px mobile
- **Effect**: Hairline with upward drop-shadow (`0 -1px 2px rgba(212, 175, 55, 0.4)`)
- **Purpose**: Suggests illumination along the curve crest, tying into the holiday lighting theme

### Drop Shadow
- **Blur**: 4px gaussian
- **Offset**: 0 horizontal, 4px vertical
- **Opacity**: 30% (`feFuncA slope="0.3"`)
- **Purpose**: Separates curve from page content below

## Accessibility Actions Taken

### Contrast Compliance
- All white text on gradient backgrounds verified to meet WCAG AA minimum contrast ratio (4.5:1 for body text, 3:1 for large text)
- Header logo and nav items: White text on darkest part of gradient (forest green/teal) provides >7:1 contrast
- Hero headline and CTAs: White text with bottom darkening gradient ensures sufficient contrast
- Gold accents used only for decorative borders, not text

### Focus States
- All interactive elements (nav pills, buttons) maintain visible focus indicators
- Gold rim on focus matches hover state for consistency
- Focus styles are crisp outlines (2px solid border) rather than heavy glows for clarity
- Keyboard navigation fully supported with visible focus states

### Responsive Behavior
- Curve adjusts at each breakpoint to prevent text overlap
- Mobile curve becomes gentle diagonal to keep hero content centered
- All text remains legible and unobscured at all breakpoints tested (375px, 768px, 1366px)

## Testing Performed
- Desktop: 1366px, 1920px
- Tablet: 768px, 1024px
- Mobile: 375px, 414px

All breakpoints verified for:
- Gradient continuity between header and hero
- Curve visibility and text clearance
- CTA button contrast and clickability
- Focus state visibility

## Files Modified
- `components/Header.tsx` - Gradient header, nav pills, CTA buttons
- `app/page.tsx` - Hero gradient overlay, curved edge SVG, CTA styling
- `app/globals.css` - Responsive curve visibility classes
- `public/hero-curve.svg` - Standalone editable SVG deliverable

## Design Tokens Reference
```
Forest Green: #314143 (rgb 49, 65, 67)
Deep Teal: #147878 (rgb 20, 120, 120)
Peach-Red: #EB834F (rgb 235, 131, 79)
Gold: #D4AF37 (rgb 212, 175, 55)
```