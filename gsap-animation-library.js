/**
 * GSAP Animation Library
 * A complete animation wrapper library with 15+ presets
 * Built on top of GSAP 3.x
 * 
 * @version 1.0.0
 * @author Your Name
 * @license MIT
 */

class GSAPAnimationLibrary {
    constructor() {
        // Check if GSAP is available
        if (typeof gsap === 'undefined') {
            throw new Error('GSAP is required. Please install gsap: npm install gsap');
        }

        this.activeAnimations = new Set();
        this.timelines = new Map();
        
        // Register ScrollTrigger plugin if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }

    /**
     * Base animation method
     * @param {HTMLElement} element - The element to animate
     * @param {Object} properties - Animation properties
     * @param {Object} options - Animation options (duration, ease, delay, etc.)
     * @returns {gsap.core.Tween} - GSAP animation instance
     */
    animate(element, properties, options = {}) {
        const defaults = {
            duration: 1,
            ease: 'power2.out',
            delay: 0,
            onComplete: null,
            onStart: null,
        };

        const config = { ...defaults, ...options, ...properties };
        
        if (options.onStart) config.onStart = options.onStart;
        if (options.onComplete) config.onComplete = options.onComplete;

        const animation = gsap.to(element, config);
        this.activeAnimations.add(animation);
        
        return animation;
    }

    /**
     * Fade in animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    fadeIn(element, options = {}) {
        gsap.set(element, { opacity: 0 });
        return this.animate(element, { opacity: 1 }, options);
    }

    /**
     * Fade out animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    fadeOut(element, options = {}) {
        return this.animate(element, { opacity: 0 }, options);
    }

    /**
     * Slide up animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options (distance: number of pixels)
     * @returns {gsap.core.Tween}
     */
    slideUp(element, options = {}) {
        const distance = options.distance || 100;
        gsap.set(element, { y: distance, opacity: 0 });
        return this.animate(element, { y: 0, opacity: 1 }, options);
    }

    /**
     * Slide down animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options (distance: number of pixels)
     * @returns {gsap.core.Tween}
     */
    slideDown(element, options = {}) {
        const distance = options.distance || 100;
        gsap.set(element, { y: -distance, opacity: 0 });
        return this.animate(element, { y: 0, opacity: 1 }, options);
    }

    /**
     * Slide from left animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options (distance: number of pixels)
     * @returns {gsap.core.Tween}
     */
    slideLeft(element, options = {}) {
        const distance = options.distance || 100;
        gsap.set(element, { x: distance, opacity: 0 });
        return this.animate(element, { x: 0, opacity: 1 }, options);
    }

    /**
     * Slide from right animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options (distance: number of pixels)
     * @returns {gsap.core.Tween}
     */
    slideRight(element, options = {}) {
        const distance = options.distance || 100;
        gsap.set(element, { x: -distance, opacity: 0 });
        return this.animate(element, { x: 0, opacity: 1 }, options);
    }

    /**
     * Scale up animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    scaleUp(element, options = {}) {
        gsap.set(element, { scale: 0, opacity: 0 });
        return this.animate(element, { scale: 1, opacity: 1 }, { ease: 'back.out(1.7)', ...options });
    }

    /**
     * Scale down animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    scaleDown(element, options = {}) {
        return this.animate(element, { scale: 0, opacity: 0 }, { ease: 'back.in(1.7)', ...options });
    }

    /**
     * Rotate in animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    rotateIn(element, options = {}) {
        gsap.set(element, { rotation: -180, scale: 0, opacity: 0 });
        return this.animate(element, { rotation: 0, scale: 1, opacity: 1 }, { ease: 'back.out(1.7)', ...options });
    }

    /**
     * Rotate out animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    rotateOut(element, options = {}) {
        return this.animate(element, { rotation: 180, scale: 0, opacity: 0 }, { ease: 'back.in(1.7)', ...options });
    }

    /**
     * Bounce in animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    bounceIn(element, options = {}) {
        gsap.set(element, { y: -100, opacity: 0 });
        return this.animate(element, { y: 0, opacity: 1 }, { ease: 'bounce.out', duration: 1.5, ...options });
    }

    /**
     * Elastic animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    elastic(element, options = {}) {
        gsap.set(element, { scale: 0, opacity: 0 });
        return this.animate(element, { scale: 1, opacity: 1 }, { ease: 'elastic.out(1, 0.5)', duration: 1.5, ...options });
    }

    /**
     * Flip animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options
     * @returns {gsap.core.Tween}
     */
    flip(element, options = {}) {
        return this.animate(element, { rotationY: 360 }, { duration: 1, ...options });
    }

    /**
     * Shake animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options (intensity: number of pixels)
     * @returns {gsap.core.Timeline}
     */
    shake(element, options = {}) {
        const tl = gsap.timeline();
        const intensity = options.intensity || 10;
        
        tl.to(element, { x: -intensity, duration: 0.1 })
          .to(element, { x: intensity, duration: 0.1 })
          .to(element, { x: -intensity, duration: 0.1 })
          .to(element, { x: intensity, duration: 0.1 })
          .to(element, { x: 0, duration: 0.1 });
        
        return tl;
    }

    /**
     * Pulse animation
     * @param {HTMLElement} element - Element to animate
     * @param {Object} options - Animation options (repeat: number of repetitions)
     * @returns {gsap.core.Timeline}
     */
    pulse(element, options = {}) {
        const tl = gsap.timeline({ repeat: options.repeat || 2 });
        tl.to(element, { scale: 1.1, duration: 0.3 })
          .to(element, { scale: 1, duration: 0.3 });
        return tl;
    }

    /**
     * Stagger fade in animation for multiple elements
     * @param {Array|NodeList} elements - Elements to animate
     * @param {Object} options - Animation options (stagger: delay between elements)
     * @returns {gsap.core.Tween}
     */
    staggerFadeIn(elements, options = {}) {
        gsap.set(elements, { opacity: 0 });
        return gsap.to(elements, {
            opacity: 1,
            duration: options.duration || 1,
            stagger: options.stagger || 0.2,
            ease: options.ease || 'power2.out',
            delay: options.delay || 0
        });
    }

    /**
     * Stagger slide up animation for multiple elements
     * @param {Array|NodeList} elements - Elements to animate
     * @param {Object} options - Animation options (stagger: delay, distance: pixels)
     * @returns {gsap.core.Tween}
     */
    staggerSlideUp(elements, options = {}) {
        const distance = options.distance || 50;
        gsap.set(elements, { y: distance, opacity: 0 });
        return gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: options.duration || 1,
            stagger: options.stagger || 0.2,
            ease: options.ease || 'power2.out',
            delay: options.delay || 0
        });
    }

    /**
     * Stagger scale animation for multiple elements
     * @param {Array|NodeList} elements - Elements to animate
     * @param {Object} options - Animation options (stagger: delay between elements)
     * @returns {gsap.core.Tween}
     */
    staggerScale(elements, options = {}) {
        gsap.set(elements, { scale: 0, opacity: 0 });
        return gsap.to(elements, {
            scale: 1,
            opacity: 1,
            duration: options.duration || 1,
            stagger: options.stagger || 0.2,
            ease: options.ease || 'back.out(1.7)',
            delay: options.delay || 0
        });
    }

    /**
     * Create a GSAP timeline
     * @param {string} name - Timeline name for reference
     * @param {Object} options - Timeline options
     * @returns {gsap.core.Timeline}
     */
    createTimeline(name, options = {}) {
        const timeline = gsap.timeline(options);
        this.timelines.set(name, timeline);
        return timeline;
    }

    /**
     * Get a timeline by name
     * @param {string} name - Timeline name
     * @returns {gsap.core.Timeline}
     */
    getTimeline(name) {
        return this.timelines.get(name);
    }

    /**
     * Play a timeline
     * @param {string} name - Timeline name
     */
    playTimeline(name) {
        const timeline = this.timelines.get(name);
        if (timeline) timeline.play();
    }

    /**
     * Pause a timeline
     * @param {string} name - Timeline name
     */
    pauseTimeline(name) {
        const timeline = this.timelines.get(name);
        if (timeline) timeline.pause();
    }

    /**
     * Reverse a timeline
     * @param {string} name - Timeline name
     */
    reverseTimeline(name) {
        const timeline = this.timelines.get(name);
        if (timeline) timeline.reverse();
    }

    /**
     * Restart a timeline
     * @param {string} name - Timeline name
     */
    restartTimeline(name) {
        const timeline = this.timelines.get(name);
        if (timeline) timeline.restart();
    }

    /**
     * Create a scroll-triggered animation
     * @param {HTMLElement} element - Trigger element
     * @param {Function} animation - Animation callback
     * @param {Object} options - ScrollTrigger options
     * @returns {ScrollTrigger}
     */
    scrollTrigger(element, animation, options = {}) {
        if (typeof ScrollTrigger === 'undefined') {
            console.warn('ScrollTrigger plugin not loaded. Install: npm install gsap');
            return null;
        }

        return ScrollTrigger.create({
            trigger: element,
            start: options.start || 'top 80%',
            end: options.end || 'bottom 20%',
            onEnter: () => animation(),
            markers: options.markers || false,
            ...options
        });
    }

    /**
     * Kill all active animations
     */
    killAll() {
        this.activeAnimations.forEach(anim => anim.kill());
        this.activeAnimations.clear();
        gsap.killTweensOf('*');
    }

    /**
     * Kill a specific animation
     * @param {gsap.core.Tween} animation - Animation to kill
     */
    killAnimation(animation) {
        if (animation) {
            animation.kill();
            this.activeAnimations.delete(animation);
        }
    }

    /**
     * Reset an element to its initial state
     * @param {HTMLElement} element - Element to reset
     */
    resetElement(element) {
        gsap.set(element, { clearProps: 'x,y,scale,rotation,opacity,transform' });
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = GSAPAnimationLibrary;
}

if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() {
        return GSAPAnimationLibrary;
    });
}

// Browser global
if (typeof window !== 'undefined') {
    window.GSAPAnimationLibrary = GSAPAnimationLibrary;
}
