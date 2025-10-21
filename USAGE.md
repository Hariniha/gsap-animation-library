# GSAP Animation Library

A powerful, easy-to-use animation wrapper library built on top of GSAP 3.x. This library provides 15+ animation presets, timeline management, stagger effects, and scroll triggers with a simple, intuitive API.

## Features

- 15+ Animation Presets (fadeIn, slideUp, scaleUp, bounceIn, etc.)
- Timeline Management (create, control, chain animations)
- Stagger Effects (animate multiple elements with delays)
- Scroll Triggers (trigger animations on scroll)
- Easy-to-use API
- Fully documented
- Works in browsers, Node.js, React, Vue, Angular, etc.

## Installation

### NPM/Yarn

```bash
npm install gsap gsap-animation-library
# or
yarn add gsap gsap-animation-library
```

### CDN (Browser)

```html
<!-- Include GSAP first -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<!-- Optional: ScrollTrigger plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<!-- Include the library -->
<script src="path/to/gsap-animation-library.js"></script>
```

## Quick Start

### Basic Usage

```javascript
// Import (ES6 modules)
import GSAPAnimationLibrary from 'gsap-animation-library';

// Or CommonJS
const GSAPAnimationLibrary = require('gsap-animation-library');

// Or Browser (already available as global)
// const gsapLib = new GSAPAnimationLibrary();

// Initialize
const gsapLib = new GSAPAnimationLibrary();

// Select element
const element = document.querySelector('.my-element');

// Animate!
gsapLib.fadeIn(element, {
    duration: 1,
    ease: 'power2.out',
    delay: 0.5
});
```

## Animation Presets

### Fade Animations

```javascript
gsapLib.fadeIn(element, { duration: 1 });
gsapLib.fadeOut(element, { duration: 1 });
```

### Slide Animations

```javascript
gsapLib.slideUp(element, { duration: 1, distance: 100 });
gsapLib.slideDown(element, { duration: 1, distance: 100 });
gsapLib.slideLeft(element, { duration: 1, distance: 100 });
gsapLib.slideRight(element, { duration: 1, distance: 100 });
```

### Scale Animations

```javascript
gsapLib.scaleUp(element, { duration: 1 });
gsapLib.scaleDown(element, { duration: 1 });
```

### Rotate Animations

```javascript
gsapLib.rotateIn(element, { duration: 1 });
gsapLib.rotateOut(element, { duration: 1 });
gsapLib.flip(element, { duration: 1 });
```

### Special Effects

```javascript
gsapLib.bounceIn(element, { duration: 1.5 });
gsapLib.elastic(element, { duration: 1.5 });
gsapLib.shake(element, { intensity: 10 });
gsapLib.pulse(element, { repeat: 3 });
```

## Stagger Animations

Animate multiple elements with delays:

```javascript
const elements = document.querySelectorAll('.card');

gsapLib.staggerFadeIn(elements, {
    duration: 1,
    stagger: 0.2,  // 0.2s delay between each element
    ease: 'power2.out'
});

gsapLib.staggerSlideUp(elements, {
    duration: 1,
    stagger: 0.15,
    distance: 50
});

gsapLib.staggerScale(elements, {
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.7)'
});
```

## Timeline Management

Create complex animation sequences:

```javascript
// Create a timeline
const tl = gsapLib.createTimeline('myTimeline', {
    paused: true,
    onComplete: () => console.log('Timeline complete!')
});

// Add animations to timeline
tl.to(element, { x: 200, duration: 1 })
  .to(element, { y: 100, duration: 1 })
  .to(element, { rotation: 360, duration: 1 });

// Control timeline
gsapLib.playTimeline('myTimeline');
gsapLib.pauseTimeline('myTimeline');
gsapLib.reverseTimeline('myTimeline');
gsapLib.restartTimeline('myTimeline');

// Get timeline for direct manipulation
const timeline = gsapLib.getTimeline('myTimeline');
timeline.timeScale(2); // Play at 2x speed
```

## Scroll Triggers

Trigger animations on scroll:

```javascript
const element = document.querySelector('.animate-on-scroll');

gsapLib.scrollTrigger(element, () => {
    gsapLib.fadeIn(element, { duration: 1 });
}, {
    start: 'top 80%',  // Start when top of element hits 80% of viewport
    end: 'bottom 20%',
    markers: false     // Set to true for debugging
});
```

## React Example

```jsx
import { useEffect, useRef } from 'react';
import GSAPAnimationLibrary from 'gsap-animation-library';

function MyComponent() {
    const boxRef = useRef(null);
    const gsapLib = useRef(new GSAPAnimationLibrary());

    useEffect(() => {
        // Animate on mount
        gsapLib.current.fadeIn(boxRef.current, {
            duration: 1,
            ease: 'power2.out'
        });

        // Cleanup
        return () => {
            gsapLib.current.killAll();
        };
    }, []);

    return (
        <div ref={boxRef} className="animated-box">
            Hello World!
        </div>
    );
}
```

## Vue Example

```vue
<template>
    <div ref="box" class="animated-box">
        Hello World!
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import GSAPAnimationLibrary from 'gsap-animation-library';

export default {
    setup() {
        const box = ref(null);
        const gsapLib = new GSAPAnimationLibrary();

        onMounted(() => {
            gsapLib.fadeIn(box.value, {
                duration: 1,
                ease: 'power2.out'
            });
        });

        onUnmounted(() => {
            gsapLib.killAll();
        });

        return { box };
    }
}
</script>
```

## API Reference

### Constructor

```javascript
const gsapLib = new GSAPAnimationLibrary();
```

### Animation Options

All animation methods accept an options object:

```javascript
{
    duration: 1,              // Animation duration in seconds
    delay: 0,                 // Delay before animation starts
    ease: 'power2.out',       // Easing function
    onComplete: () => {},     // Callback when animation completes
    onStart: () => {},        // Callback when animation starts
    distance: 100,            // For slide animations (pixels)
    intensity: 10,            // For shake animation (pixels)
    repeat: 2,                // For pulse animation (number of repeats)
    stagger: 0.2              // For stagger animations (delay between elements)
}
```

### Available Easing Functions

- `none`
- `power1/2/3/4.out/in/inOut`
- `back.out/in/inOut(1.7)`
- `elastic.out/in/inOut(1, 0.5)`
- `bounce.out/in/inOut`
- `circ.out/in/inOut`
- `expo.out/in/inOut`

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

## Examples

Check the `examples.js` file for 16 real-world usage examples including:

- Page load animations
- Button hover effects
- Modal animations
- Card reveal effects
- Navigation menu animations
- Image gallery transitions
- Scroll-based reveals
- Loading spinners
- And more!

## Browser Support

Works in all modern browsers that support GSAP 3.x:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Dependencies

- GSAP 3.x (peer dependency)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Demo

Open `demo.html` in your browser to see an interactive demo with all animations and live code generation.
