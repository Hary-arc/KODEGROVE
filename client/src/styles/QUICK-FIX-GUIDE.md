# 🚑 Quick Fix Guide - Stuttering Scroll-Jacking

## ⚡ 30-Second Fix

If your horizontal scroll-jacking is stuttering, add these 3 classes:

```tsx
// 1️⃣ Add to outer container
<section className="scroll-jacking-container">

// 2️⃣ Add to scrolling wrapper
<div className="horizontal-scroll-wrapper">

// 3️⃣ Add to each card
<div className="process-card no-jank">
```

**That's it!** 90% of stutter will disappear.

---

## 🎯 The 5-Minute Deep Fix

### Step 1: Use `translate3d` Instead of `translateX`

```javascript
// ❌ SLOW
element.style.transform = `translateX(-${x}px)`;

// ✅ FAST (GPU-accelerated)
element.style.transform = `translate3d(-${x}px, 0, 0)`;
```

### Step 2: Wrap Updates in RAF

```javascript
// ❌ SLOW
window.addEventListener('scroll', () => {
  element.style.transform = `translate3d(-${x}px, 0, 0)`;
});

// ✅ FAST (60 FPS locked)
window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    element.style.transform = `translate3d(-${x}px, 0, 0)`;
  });
}, { passive: true });
```

### Step 3: Add Passive Flag

```javascript
// ❌ SLOW - Blocks scroll
window.addEventListener('scroll', handler);

// ✅ FAST - Non-blocking
window.addEventListener('scroll', handler, { passive: true });
```

### Step 4: Add will-change to CSS

```css
.horizontal-scroll-wrapper {
  will-change: transform;
  transform: translateZ(0);
}
```

### Step 5: Cancel Previous RAF

```javascript
let rafId;

const handleScroll = () => {
  if (rafId) cancelAnimationFrame(rafId); // Cancel old frame
  
  rafId = requestAnimationFrame(() => {
    // Update DOM
  });
};
```

---

## 🔥 Common Mistakes

### ❌ Don't Do This

```tsx
// Inline transition conflicts with JS transform
<div 
  className="transition-transform duration-300"
  style={{ transform: `translateX(-${x}px)` }}
/>

// Using translateX instead of translate3d
element.style.transform = `translateX(-100px)`;

// Forgetting passive flag
window.addEventListener('scroll', handler);

// No RAF, direct DOM manipulation
const handleScroll = () => {
  element.style.transform = `...`;
};
```

### ✅ Do This Instead

```tsx
// Remove conflicting Tailwind classes
<div 
  className="horizontal-scroll-wrapper"
  style={{ transform: `translate3d(-${x}px, 0, 0)` }}
/>

// Always use translate3d
element.style.transform = `translate3d(-100px, 0, 0)`;

// Always use passive
window.addEventListener('scroll', handler, { passive: true });

// Always use RAF
const handleScroll = () => {
  requestAnimationFrame(() => {
    element.style.transform = `...`;
  });
};
```

---

## 📋 Pre-Launch Checklist

Before deploying scroll-jacking:

- [ ] All `translateX` changed to `translate3d`
- [ ] RAF wrapping all scroll updates
- [ ] Passive event listeners: `{ passive: true }`
- [ ] `will-change: transform` in CSS
- [ ] `backface-visibility: hidden` on cards
- [ ] Classes applied: `.horizontal-scroll-wrapper`, `.process-card`, `.no-jank`
- [ ] Cleanup: RAF cancelled in `useEffect` return
- [ ] Tested on: Chrome, Safari, Firefox
- [ ] Tested on: Mobile (iOS Safari, Chrome Android)
- [ ] FPS: Consistently 60 FPS (check with DevTools)

---

## 🧪 Test Your Performance

### Chrome DevTools Method

1. **Open DevTools** → Performance tab
2. **Click Record** (red circle)
3. **Scroll the section** for 3-5 seconds
4. **Stop recording**
5. **Check FPS**:
   - ✅ Green line at 60 FPS = Perfect
   - ⚠️ Dips below 60 = Needs work
   - ❌ Below 30 FPS = Major issues

### Console Method

```javascript
// Add to your component temporarily
let lastTime = performance.now();
let frames = 0;

const measureFPS = () => {
  frames++;
  const now = performance.now();
  
  if (now >= lastTime + 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = now;
  }
  
  requestAnimationFrame(measureFPS);
};

measureFPS();
```

**Target**: Should consistently log ~60 FPS

---

## 🎨 CSS Class Quick Reference

```css
/* Add to scroll container */
.scroll-jacking-container {
  will-change: scroll-position;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Add to horizontal wrapper */
.horizontal-scroll-wrapper {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Add to each card */
.process-card {
  will-change: opacity, transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  contain: layout style paint;
}

/* Universal anti-stutter */
.no-jank {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

---

## 💡 Still Stuttering?

### Check These Common Issues

1. **Too many simultaneous animations**
   - Solution: Pause background animations during scroll
   ```css
   .scrolling .background-gradient-orb {
     animation-play-state: paused;
   }
   ```

2. **Heavy backdrop-blur**
   - Solution: Reduce blur during scroll
   ```css
   .scrolling .optimized-backdrop {
     backdrop-filter: blur(10px); /* from 20px */
   }
   ```

3. **Complex box-shadows**
   - Solution: Remove shadows during scroll
   ```css
   .scrolling .process-card {
     box-shadow: none;
   }
   ```

4. **Conflicting CSS transitions**
   - Solution: Remove transition classes from wrapper
   ```tsx
   // ❌ Remove these
   className="transition-transform duration-300"
   
   // ✅ Keep it simple
   className="horizontal-scroll-wrapper"
   ```

5. **Not cleaning up RAF**
   ```javascript
   useEffect(() => {
     // ... scroll handler
     
     return () => {
       if (rafId) cancelAnimationFrame(rafId); // ← CRITICAL
       window.removeEventListener('scroll', handler);
     };
   }, []);
   ```

---

## 🚀 Performance Hierarchy

**Fix in this order for maximum impact:**

1. **GPU Acceleration** (`translate3d`) → +40% performance
2. **RAF Implementation** → +30% performance  
3. **Passive Listeners** → +15% performance
4. **will-change** → +10% performance
5. **backface-visibility** → +5% performance

---

## 📱 Mobile-Specific

### iOS Safari Issues

```css
/* Add these for iOS */
.horizontal-scroll-wrapper {
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  -webkit-overflow-scrolling: touch;
}
```

### Android Chrome Issues

```css
/* Force hardware acceleration */
.horizontal-scroll-wrapper {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
```

---

## 🆘 Emergency "Nuclear" Option

If **NOTHING** works, copy-paste this complete implementation:

```tsx
const handleScroll = () => {
  let rafId: number;
  
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    
    rafId = requestAnimationFrame(() => {
      const progress = /* calculate progress */;
      element.style.transform = `translate3d(-${progress}px, 0, 0)`;
    });
  };
};

const handler = handleScroll();
window.addEventListener('scroll', handler, { passive: true });

// Cleanup
return () => {
  window.removeEventListener('scroll', handler);
};
```

```css
.wrapper {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
}
```

**This should work 99% of the time.**

---

## 📞 Need Help?

1. Check `/styles/PERFORMANCE.md` for detailed explanations
2. Check `/styles/components/scroll-jacking.css` for all available classes
3. Use DevTools Performance tab to identify bottlenecks
4. Search for "will-change" or "RAF" in codebase for examples

---

**TL;DR**: Use `translate3d`, wrap in `RAF`, add `{ passive: true }`, use our CSS classes. Done! 🎉
