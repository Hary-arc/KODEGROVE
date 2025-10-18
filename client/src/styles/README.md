# CodeFlow CSS Architecture

## 📁 Structure Overview

Your CSS has been refactored from a monolithic 2000+ line file into a modular, maintainable architecture:

```
/styles/
├── globals.css              # Main entry point (imports only)
├── README.md               # This file
├── base/                   # Foundation styles
│   ├── variables.css       # CSS custom properties & theme tokens
│   ├── typography.css      # Font imports & typography rules
│   └── reset.css          # Browser resets & scrollbar
├── animations/            # All animations
│   ├── keyframes.css      # @keyframes definitions
│   └── transitions.css    # Animation utility classes
├── utilities/            # Reusable utilities
│   ├── effects.css       # Glass, gradients, magnetic effects
│   ├── responsive.css    # Grid systems, spacing, images
│   └── accessibility.css # a11y features (reduced motion, etc.)
└── components/          # Page-specific styles
    ├── team.css         # Team member components
    ├── portfolio.css    # Portfolio cards
    ├── contact.css      # Contact form styles
    └── careers.css      # Careers page components
```

## 🎯 Benefits

### Before (Monolithic)
- ❌ 2000+ lines in one file
- ❌ Hard to find specific styles
- ❌ Merge conflicts in teams
- ❌ Slow development
- ❌ Difficult debugging

### After (Modular)
- ✅ Each file < 200 lines
- ✅ Easy to locate styles
- ✅ Minimal merge conflicts
- ✅ Fast development
- ✅ Simple debugging
- ✅ Better code organization
- ✅ Faster build times

## 📖 File Guide

### Base Files

**variables.css** - All CSS custom properties
- Light/dark theme tokens
- Color system
- Spacing & radius values
- Chart colors
- Sidebar theme

**typography.css** - Text styling
- Google Fonts imports (Inter, Outfit)
- Base typography rules
- Fluid text utilities
- Line clamp utilities
- Prose styles for blog content

**reset.css** - Browser normalization
- Tailwind base layer
- Custom scrollbar
- Selection styling
- Scroll lock utility
- Parallax container

### Animation Files

**keyframes.css** - All @keyframes definitions
- Core animations (float, pulse-glow)
- Marquee animations
- Scroll reveal (fadeUp, slideIn, etc.)
- Timeline animations
- Portfolio animations
- Contact page animations
- Careers page animations
- Floating nav animations

**transitions.css** - Animation utility classes
- `.animate-float`, `.animate-pulse-glow`
- `.animate-marquee`, `.animate-marquee-rtl`, `.animate-marquee-ltr`
- `.animate-fade-up`, `.slide-in-left`, etc.
- Portfolio classes (`.shimmer`, `.portfolio-badge`)
- Contact classes (`.ripple-effect`, `.map-zoom`)
- Careers classes (`.perk-float`, `.badge-glow`)
- Floating nav classes (`.fab-pulse`, `.support-active`)

### Utility Files

**effects.css** - Visual effects
- `.glass` - Glass morphism
- `.gradient-premium`, `.gradient-electric`, `.gradient-cosmic`
- `.magnetic`, `.magnetic-strong` - Hover lift effects
- `.hover-scale`, `.hover-glow`, `.glow-on-hover`
- `.btn-ripple` - Button ripple effect
- `.card-flip-container` - 3D card flips
- Calculator modal styles

**responsive.css** - Responsive patterns
- `.responsive-card` - Responsive card system
- `.grid-responsive-sm/md/lg` - Responsive grids
- `.masonry-responsive` - Masonry layouts
- `.responsive-padding/margin/gap` - Fluid spacing
- Image containers with aspect ratios
- Touch device optimizations
- Print styles

**accessibility.css** - a11y features
- High contrast mode support
- Reduced motion preferences
- Disables animations for users with motion sensitivity
- Focus states

### Component Files

**team.css** - Team member styles
- Grayscale to color on hover
- Image zoom effects
- Overlay animations

**portfolio.css** - Portfolio components
- Portfolio card hover effects
- Image zoom animations
- Overlay fade effects

**contact.css** - Contact form styles
- Floating label animations
- Form field focus states
- Input validation styling

**careers.css** - Careers page styles
- Job listing hover effects
- Culture grid masonry
- Perk card 3D effects
- Value card animations

## 🔧 How to Use

### Adding New Styles

1. **Determine the category** - Is it a base style, animation, utility, or component-specific?

2. **Add to the appropriate file**:
   ```css
   /* In /styles/utilities/effects.css */
   .my-new-effect {
     /* your styles */
   }
   ```

3. **No need to update globals.css** - It already imports everything!

### Creating New Categories

If you need a new component category:

1. **Create the file**:
   ```
   /styles/components/blog.css
   ```

2. **Add the import to globals.css**:
   ```css
   @import "./components/blog.css";
   ```

### Best Practices

✅ **DO:**
- Keep files under 300 lines
- Use descriptive class names
- Add comments for complex styles
- Group related styles together
- Use CSS custom properties from variables.css

❌ **DON'T:**
- Put everything in one file
- Duplicate animations across files
- Override Tailwind classes unnecessarily
- Create inline styles when a utility class exists

## 🚀 Performance

### Before
- Single 2000+ line file
- Harder for browser to parse
- All styles loaded at once

### After
- Modular imports
- Better caching (modify one file, others cache)
- Easier to identify unused CSS
- Tree-shaking potential with build tools

## 🔍 Finding Styles Quickly

**Looking for a color?** → `base/variables.css`

**Need an animation?** → `animations/keyframes.css`

**Want a hover effect?** → `utilities/effects.css`

**Portfolio card style?** → `components/portfolio.css`

**Responsive grid?** → `utilities/responsive.css`

**Accessibility feature?** → `utilities/accessibility.css`

## 📝 Maintenance Tips

### Weekly
- Review new styles added
- Check for duplicates
- Ensure proper file placement

### Monthly
- Look for unused styles
- Optimize animation performance
- Update documentation

### Quarterly
- Refactor long files (>300 lines)
- Consider new component categories
- Update color tokens if needed

## 🎨 Extending the System

### Adding a New Page Category

Example: Creating a dashboard category

```bash
# Create the file
/styles/components/dashboard.css
```

```css
/* In dashboard.css */
.dashboard-card {
  /* styles */
}

.dashboard-chart {
  /* styles */
}
```

```css
/* In globals.css, add import */
@import "./components/dashboard.css";
```

### Adding New Animations

```css
/* In animations/keyframes.css */
@keyframes myNewAnimation {
  from { /* ... */ }
  to { /* ... */ }
}
```

```css
/* In animations/transitions.css */
.animate-my-new {
  animation: myNewAnimation 1s ease-in-out;
}
```

## 🐛 Debugging

**Style not applying?**
1. Check if the file is imported in globals.css
2. Verify CSS specificity
3. Check browser dev tools for overrides
4. Ensure Tailwind isn't conflicting

**Animation not working?**
1. Check keyframe is defined in `animations/keyframes.css`
2. Verify utility class in `animations/transitions.css`
3. Check for reduced motion preferences

## 🚀 Performance Guides

### Scroll-Jacking Performance Issues?

If you're experiencing stuttering or jank in horizontal scroll animations:

1. **Quick Fix** → Read `/styles/QUICK-FIX-GUIDE.md` (30 seconds to fix)
2. **Deep Dive** → Read `/styles/PERFORMANCE.md` (Complete optimization guide)
3. **Classes** → Use `.horizontal-scroll-wrapper`, `.process-card`, `.no-jank`

**Common fixes**:
- Change `translateX` to `translate3d` for GPU acceleration
- Wrap scroll handlers in `requestAnimationFrame`
- Add `{ passive: true }` to event listeners
- Use `will-change: transform` in CSS

## 📚 Additional Resources

- [Tailwind v4 Documentation](https://tailwindcss.com/docs)
- [CSS Architecture Best Practices](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing)
- [ITCSS Methodology](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [CSS Triggers Reference](https://csstriggers.com/)
- [Web Performance Best Practices](https://web.dev/performance/)

---

**Last Updated**: 2025-10-14  
**Maintained by**: CodeFlow Development Team  
**Performance Status**: ✅ 60 FPS Optimized
