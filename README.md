# GSAP Animation Library

A powerful animation wrapper library built on GSAP 3.x with 15+ animation presets, timeline management, and scroll triggers.

[![npm version](https://img.shields.io/npm/v/@harini_priya/gsap-animation-library.svg)](https://www.npmjs.com/package/@harini_priya/gsap-animation-library)
[![license](https://img.shields.io/npm/l/@harini_priya/gsap-animation-library.svg)](https://github.com/Hariniha/gsap-animation-library/blob/main/LICENSE)

## 🔗 Links

- **[📺 Live Demo](https://gsap-animation-library.vercel.app/)** - Interactive demo with live code generation
- **[📚 Complete Documentation](https://github.com/Hariniha/gsap-animation-library/blob/main/USAGE.md)** - Full usage guide with examples
- **[📦 npm Package](https://www.npmjs.com/package/@harini_priya/gsap-animation-library)**

## Installation

```bash
npm install gsap @harini_priya/gsap-animation-library
```

## Quick Start

```javascript
import GSAPAnimationLibrary from '@harini_priya/gsap-animation-library';

const gsapLib = new GSAPAnimationLibrary();
gsapLib.fadeIn(element, { duration: 1, ease: 'power2.out' });
```

## Features

- 15+ Animation Presets (fade, slide, scale, rotate, bounce, elastic, shake, pulse, flip)
- Timeline Management
- Stagger Effects
- Scroll Triggers
- Works with React, Vue, Angular, and vanilla JS

## API Reference

### Animation Presets

```javascript
// Fade animations
gsapLib.fadeIn(element, options);
gsapLib.fadeOut(element, options);

// Slide animations
gsapLib.slideUp(element, options);
gsapLib.slideDown(element, options);
gsapLib.slideLeft(element, options);
gsapLib.slideRight(element, options);

// Scale animations
gsapLib.scaleUp(element, options);
gsapLib.scaleDown(element, options);

// Rotate animations
gsapLib.rotateIn(element, options);
gsapLib.rotateOut(element, options);
gsapLib.flip(element, options);

// Special effects
gsapLib.bounceIn(element, options);
gsapLib.elastic(element, options);
gsapLib.shake(element, { intensity: 10 });
gsapLib.pulse(element, { repeat: 3 });
```

### Options Object

```javascript
{
    duration: 1,              // Animation duration (seconds)
    delay: 0,                 // Delay before animation starts (seconds)
    ease: 'power2.out',       // Easing function
    distance: 100,            // For slide animations (pixels)
    intensity: 10,            // For shake animation (pixels)
    repeat: 2,                // For pulse animation
    stagger: 0.2,             // For stagger animations (seconds)
    onComplete: () => {},     // Callback when animation completes
    onStart: () => {}         // Callback when animation starts
}
```

### Stagger Animations

Animate multiple elements with sequential delays:

```javascript
const elements = document.querySelectorAll('.card');

gsapLib.staggerFadeIn(elements, {
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
});

gsapLib.staggerSlideUp(elements, {
    duration: 1,
    stagger: 0.15,
    distance: 50
});

gsapLib.staggerScale(elements, {
    duration: 0.8,
    stagger: 0.1
});
```

### Timeline Management

Create complex animation sequences:

```javascript
// Create a timeline
const tl = gsapLib.createTimeline('myTimeline', {
    paused: true,
    onComplete: () => console.log('Done!')
});

// Add animations
tl.to(element, { x: 200, duration: 1 })
  .to(element, { y: 100, duration: 1 })
  .to(element, { rotation: 360, duration: 1 });

// Control timeline
gsapLib.playTimeline('myTimeline');
gsapLib.pauseTimeline('myTimeline');
gsapLib.reverseTimeline('myTimeline');
gsapLib.restartTimeline('myTimeline');

// Get timeline for direct access
const timeline = gsapLib.getTimeline('myTimeline');
```

### Scroll Triggers

Trigger animations on scroll:

```javascript
gsapLib.scrollTrigger(element, () => {
    gsapLib.fadeIn(element, { duration: 1 });
}, {
    start: 'top 80%',
    end: 'bottom 20%',
    markers: false
});
```

### Utility Methods

```javascript
// Kill all animations
gsapLib.killAll();

// Kill specific animation
const anim = gsapLib.fadeIn(element);
gsapLib.killAnimation(anim);

// Reset element to initial state
gsapLib.resetElement(element);
```

## Available Easing Functions

- `none`
- `power1/2/3/4.out`, `power1/2/3/4.in`, `power1/2/3/4.inOut`
- `back.out(1.7)`, `back.in(1.7)`, `back.inOut(1.7)`
- `elastic.out(1, 0.5)`, `elastic.in(1, 0.5)`, `elastic.inOut(1, 0.5)`
- `bounce.out`, `bounce.in`, `bounce.inOut`
- `circ.out`, `circ.in`, `circ.inOut`
- `expo.out`, `expo.in`, `expo.inOut`

## React Example

```javascript
import { useEffect, useRef } from 'react';
import GSAPAnimationLibrary from 'gsap-animation-library';

function MyComponent() {
    const boxRef = useRef(null);
    const gsapLib = useRef(new GSAPAnimationLibrary());

    useEffect(() => {
        gsapLib.current.fadeIn(boxRef.current, { duration: 1 });
        return () => gsapLib.current.killAll();
    }, []);

    return <div ref={boxRef}>Hello World!</div>;
}
```

## Vue Example

```javascript
import { ref, onMounted, onUnmounted } from 'vue';
import GSAPAnimationLibrary from 'gsap-animation-library';

export default {
    setup() {
        const box = ref(null);
        const gsapLib = new GSAPAnimationLibrary();

        onMounted(() => {
            gsapLib.fadeIn(box.value, { duration: 1 });
        });

        onUnmounted(() => {
            gsapLib.killAll();
        });

        return { box };
    }
}
```

## Documentation

- **USAGE.md** - Complete usage guide with examples
- **examples.js** - 16 real-world usage examples
- **demo.html** - Interactive demo with live code generation

## License

MIT

## Dependencies

- GSAP 3.x (peer dependency)
