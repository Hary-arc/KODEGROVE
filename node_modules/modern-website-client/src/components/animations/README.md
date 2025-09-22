# CodeFlow Animation System

A comprehensive animation and design system built with Motion (Framer Motion) for the CodeFlow website.

## Overview

The animation system implements five core animation themes across all pages:
1. **Scroll-triggered reveals** (fade, slide, parallax)
2. **Micro-animations** on hover, focus, click
3. **Lightweight animations** for enhanced UX
4. **Performance-aware** optimizations
5. **Accessibility-aware** with reduced motion fallbacks

## Architecture

### Core Components

#### `/components/animations/ScrollReveal.tsx`
- `ScrollReveal` - Main scroll-triggered animation component
- `StaggeredReveal` - Staggers animations for multiple elements
- `Parallax` - Parallax scrolling effects
- `useScrollReveal` - Hook for intersection observer

**Variants Available:**
- `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`
- `scale`, `rotate`

```tsx
<ScrollReveal variant="fadeUp" delay={0.2}>
  <h1>Animated Heading</h1>
</ScrollReveal>

<StaggeredReveal staggerDelay={0.1}>
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</StaggeredReveal>
```

#### `/components/animations/MicroInteractions.tsx`
- `HoverLift` - Hover lift effect with customizable distance and scale
- `MagneticHover` - Magnetic attraction effect following mouse
- `RippleButton` - Button with ripple click effect
- `AnimatedIcon` - Icon with hover animations
- `Typewriter` - Typewriter text effect
- `FloatingElement` - Subtle floating animations
- `Pulse` - Pulsing scale animation

```tsx
<HoverLift liftDistance={12} scale={1.05}>
  <Card>Content</Card>
</HoverLift>

<RippleButton onClick={handleClick} variant="primary">
  Click Me
</RippleButton>

<Typewriter text="Hello World" speed={100} />
```

#### `/components/animations/usePerformantAnimation.tsx`
Performance optimization hooks:

- `usePerformantAnimation()` - Checks reduced motion preferences
- `useScrollAnimation()` - Optimized scroll position tracking
- `useViewportAnimation()` - Responsive viewport information
- `useIntersectionObserver()` - Performance-optimized visibility detection
- `useMousePosition()` - Mouse tracking for parallax effects
- `useParallax()` - Optimized parallax scrolling
- `useGPUAcceleration()` - GPU acceleration utilities

```tsx
const { prefersReducedMotion, shouldAnimate } = usePerformantAnimation()
const { scrollY, scrollDirection } = useScrollAnimation()
const viewport = useViewportAnimation()
```

#### `/components/animations/VideoBackground.tsx`
- `VideoBackground` - Responsive video backgrounds with fallbacks
- `CaseStudyVideo` - Interactive video components
- `VideoModal` - Full-screen video modal

#### `/components/animations/LottieAnimation.tsx`
Lightweight animation alternatives:
- `AnimatedIcon` - CSS-based animated icons (star, heart, check, etc.)
- `AnimatedPath` - SVG path drawing animations
- `LoadingAnimation` - Various loading states
- `SuccessAnimation` - Success feedback animations
- `ErrorAnimation` - Error feedback animations

## Implementation Status

### ✅ Enhanced Pages

#### HomePage (EnhancedHomePage.tsx)
- Hero section with parallax background
- Scroll-triggered reveals for all sections
- Interactive service cards with hover states
- Animated statistics counters
- Portfolio showcase with advanced hover effects
- Testimonials with magnetic hover
- Comprehensive scroll indicators

#### AboutPage.tsx
- Animated page header with typewriter effect
- Parallax background elements
- Scroll-triggered section reveals
- Enhanced company timeline
- Animated statistics counters
- Team member hover effects

#### PortfolioPage.tsx
- Enhanced hero with floating elements
- Animated statistics grid
- Project filtering with smooth transitions
- Masonry/grid view transitions
- Interactive project cards

#### ServicesPage.tsx
- Already comprehensive with advanced animations
- Parallax backgrounds
- Interactive service sections
- Scroll-triggered reveals

#### ContactPage.tsx
- Already comprehensive with form animations
- Floating label effects
- Ripple button interactions
- Map animations

#### BlogPage.tsx
- Already comprehensive with blog-specific animations
- Article hover effects
- Category filtering transitions

#### CareersPage.tsx
- Already comprehensive with career-specific animations
- Job listing animations
- Culture section effects

### ✅ Enhanced Components

#### AboutSection.tsx
- Complete animation system
- Timeline animations
- Counter animations
- Team member effects

#### PortfolioSection.tsx
- Advanced portfolio grid
- Filter transitions
- Case study modals
- Hover effects

## Global CSS Animations

Located in `/styles/globals.css`:

### Keyframe Animations
- `@keyframes float` - Floating elements
- `@keyframes pulse-glow` - Glowing effects
- `@keyframes marquee` - Scrolling text
- `@keyframes fadeUp` - Fade up transitions
- `@keyframes slideInLeft/Right` - Slide transitions
- `@keyframes drawLine` - Line drawing effects
- `@keyframes scaleIn` - Scale in effects

### Utility Classes
- `.animate-float` - 6s floating animation
- `.animate-pulse-glow` - 4s glow pulse
- `.animate-marquee` - 30s marquee scroll
- `.glass` - Glass morphism effect
- `.gradient-electric` - Electric gradient
- `.magnetic` - Magnetic hover effect
- `.optimized` - GPU acceleration

## Performance Optimizations

### GPU Acceleration
- `transform: translateZ(0)` for hardware acceleration
- `will-change: transform` for animation optimization
- `backface-visibility: hidden` for smoother animations

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled or reduced */
}
```

### Lazy Loading
- Intersection Observer for scroll-triggered animations
- Performance monitoring with FPS detection
- Debounced resize and scroll events

## Best Practices

### Animation Timing
- **Micro-interactions**: 0.2-0.3s
- **Page transitions**: 0.6-0.8s
- **Scroll reveals**: 0.8-1.2s
- **Complex sequences**: 1.5-2.5s

### Easing Functions
- **Default**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Spring**: `type: "spring", stiffness: 300, damping: 20`
- **Smooth**: `ease-in-out`

### Stagger Delays
- **Cards/Grid**: 0.1-0.2s between items
- **Text words**: 0.05-0.1s between words
- **Menu items**: 0.05s between items

## Usage Examples

### Basic Scroll Reveal
```tsx
import { ScrollReveal } from './components/animations/ScrollReveal'

<ScrollReveal variant="fadeUp" delay={0.2}>
  <div>Content that fades up when scrolled into view</div>
</ScrollReveal>
```

### Interactive Button
```tsx
import { RippleButton } from './components/animations/MicroInteractions'

<RippleButton 
  onClick={handleClick} 
  variant="primary"
  className="px-8 py-4"
>
  Interactive Button
</RippleButton>
```

### Performance-Aware Animation
```tsx
import { usePerformantAnimation } from './components/animations/usePerformantAnimation'

const { prefersReducedMotion, shouldAnimate } = usePerformantAnimation()

return (
  <motion.div
    animate={shouldAnimate ? { y: 0 } : {}}
    transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
  >
    Content
  </motion.div>
)
```

## Browser Support

- **Modern browsers**: Full animation support
- **Older browsers**: Graceful degradation with CSS fallbacks
- **Reduced motion**: Automatic detection and accommodation
- **Low performance devices**: Simplified animations when FPS < 30

## Contributing

When adding new animations:

1. Use the existing animation utilities
2. Follow the established timing guidelines
3. Include reduced motion fallbacks
4. Test performance on low-end devices
5. Ensure accessibility compliance

## Dependencies

- `motion/react` (Framer Motion) - Core animation library
- `lucide-react` - Icons
- Custom CSS animations in `globals.css`