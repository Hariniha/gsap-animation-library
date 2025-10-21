/**
 * GSAP Animation Library - Usage Examples
 * 
 * This file contains practical examples of how to use the GSAP Animation Library
 * in real-world scenarios. Copy and adapt these examples for your projects.
 */

// ============================================================
// EXAMPLE 1: Simple Fade-In on Page Load
// ============================================================

function Example1_PageLoadAnimation() {
  const gsapLib = new GSAPAnimationLibrary();
  const hero = document.querySelector('.hero');
  
  // Fade in hero section when page loads
  window.addEventListener('DOMContentLoaded', () => {
    gsapLib.fadeIn(hero, {
      duration: 1.5,
      ease: 'power2.out'
    });
  });
}

// ============================================================
// EXAMPLE 2: Menu Animation with Stagger
// ============================================================

function Example2_MenuAnimation() {
  const gsapLib = new GSAPAnimationLibrary();
  const menuItems = document.querySelectorAll('.menu-item');
  const menuButton = document.querySelector('.menu-button');
  
  let isOpen = false;
  
  menuButton.addEventListener('click', () => {
    if (!isOpen) {
      gsapLib.staggerSlideUp(menuItems, {
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        distance: 30
      });
    } else {
      gsapLib.staggerFadeOut(menuItems, {
        duration: 0.4,
        stagger: 0.05
      });
    }
    isOpen = !isOpen;
  });
}

// ============================================================
// EXAMPLE 3: Scroll-Triggered Card Animations
// ============================================================

function Example3_ScrollAnimations() {
  const gsapLib = new GSAPAnimationLibrary();
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    gsapLib.scrollTrigger(
      card,
      () => {
        const animations = [
          () => gsapLib.slideUp(card, { duration: 0.8 }),
          () => gsapLib.scaleUp(card, { duration: 0.8 }),
          () => gsapLib.rotateIn(card, { duration: 0.8 })
        ];
        
        // Use different animation for each card
        animations[index % 3]();
      },
      {
        start: 'top 85%',
        once: true // Only animate once
      }
    );
  });
}

// ============================================================
// EXAMPLE 4: Button Click with Feedback
// ============================================================

function Example4_ButtonFeedback() {
  const gsapLib = new GSAPAnimationLibrary();
  const submitButton = document.querySelector('.submit-button');
  const successMessage = document.querySelector('.success-message');
  
  submitButton.addEventListener('click', async () => {
    // Pulse button on click
    gsapLib.pulse(submitButton, { repeat: 1 });
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hide button
    await gsapLib.scaleDown(submitButton, { duration: 0.5 });
    
    // Show success message
    gsapLib.bounceIn(successMessage, {
      duration: 1,
      ease: 'bounce.out'
    });
  });
}

// ============================================================
// EXAMPLE 5: Image Gallery with Timeline
// ============================================================

function Example5_ImageGallery() {
  const gsapLib = new GSAPAnimationLibrary();
  const images = document.querySelectorAll('.gallery-image');
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  
  let currentIndex = 0;
  
  function showImage(index) {
    const tl = gsapLib.createTimeline('gallery');
    
    // Hide current image
    tl.to(images[currentIndex], {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in'
    });
    
    // Show next image
    tl.to(images[index], {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });
    
    currentIndex = index;
    gsapLib.playTimeline('gallery');
  }
  
  nextButton.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(nextIndex);
  });
  
  prevButton.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex);
  });
}

// ============================================================
// EXAMPLE 6: Modal with Overlay Animation
// ============================================================

function Example6_ModalAnimation() {
  const gsapLib = new GSAPAnimationLibrary();
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  const openButton = document.querySelector('.open-modal');
  const closeButton = document.querySelector('.close-modal');
  
  function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    
    const tl = gsapLib.createTimeline('modal');
    
    tl.to(overlay, {
      opacity: 1,
      duration: 0.3
    })
    .add(() => {
      gsapLib.scaleUp(modal, {
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    });
    
    gsapLib.playTimeline('modal');
  }
  
  function closeModal() {
    const tl = gsapLib.createTimeline('modalClose');
    
    tl.add(() => {
      gsapLib.scaleDown(modal, {
        duration: 0.3,
        ease: 'power2.in'
      });
    })
    .to(overlay, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
      }
    });
    
    gsapLib.playTimeline('modalClose');
  }
  
  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}

// ============================================================
// EXAMPLE 7: Form Validation with Animation Feedback
// ============================================================

function Example7_FormValidation() {
  const gsapLib = new GSAPAnimationLibrary();
  const form = document.querySelector('.signup-form');
  const inputs = form.querySelectorAll('input');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value) {
        // Shake invalid field
        gsapLib.shake(input, {
          intensity: 5
        });
        
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = 'green';
        
        // Subtle pulse for valid input
        gsapLib.pulse(input, {
          repeat: 1
        });
      }
    });
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate form elements on submit
    gsapLib.staggerFadeOut(inputs, {
      duration: 0.5,
      stagger: 0.1
    });
  });
}

// ============================================================
// EXAMPLE 8: Loading Spinner Animation
// ============================================================

function Example8_LoadingSpinner() {
  const gsapLib = new GSAPAnimationLibrary();
  const spinner = document.querySelector('.spinner');
  const content = document.querySelector('.content');
  
  // Infinite rotation for spinner
  const tl = gsapLib.createTimeline('spinner', {
    repeat: -1
  });
  
  tl.to(spinner, {
    rotation: 360,
    duration: 1,
    ease: 'none'
  });
  
  gsapLib.playTimeline('spinner');
  
  // Simulate loading
  setTimeout(() => {
    // Fade out spinner
    gsapLib.fadeOut(spinner, {
      duration: 0.5,
      onComplete: () => {
        spinner.style.display = 'none';
        gsapLib.pauseTimeline('spinner');
      }
    });
    
    // Fade in content
    gsapLib.fadeIn(content, {
      duration: 0.8,
      delay: 0.3
    });
  }, 3000);
}

// ============================================================
// EXAMPLE 9: Parallax Scroll Effect
// ============================================================

function Example9_ParallaxScroll() {
  const gsapLib = new GSAPAnimationLibrary();
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    
    gsapLib.scrollTrigger(
      element,
      () => {
        gsap.to(element, {
          y: -window.scrollY * speed,
          ease: 'none'
        });
      },
      {
        start: 'top bottom',
        end: 'bottom top',
        scrub: true // Smooth scrubbing
      }
    );
  });
}

// ============================================================
// EXAMPLE 10: Counter Animation
// ============================================================

function Example10_CounterAnimation() {
  const gsapLib = new GSAPAnimationLibrary();
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    
    gsapLib.scrollTrigger(
      counter,
      () => {
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 }, // Snap to integers
          onUpdate: function() {
            counter.innerText = Math.ceil(this.targets()[0].innerText);
          }
        });
      },
      {
        start: 'top 80%',
        once: true
      }
    );
  });
}

// ============================================================
// EXAMPLE 11: Navbar Scroll Effect
// ============================================================

function Example11_NavbarScroll() {
  const gsapLib = new GSAPAnimationLibrary();
  const navbar = document.querySelector('.navbar');
  
  let lastScrollY = 0;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (scrollY > lastScrollY && scrollY > 100) {
          // Scrolling down - hide navbar
          gsapLib.animate(navbar, {
            y: -100,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          // Scrolling up - show navbar
          gsapLib.animate(navbar, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
        
        lastScrollY = scrollY;
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// ============================================================
// EXAMPLE 12: Typing Effect
// ============================================================

function Example12_TypingEffect() {
  const gsapLib = new GSAPAnimationLibrary();
  const text = document.querySelector('.typing-text');
  const originalText = text.textContent;
  
  text.textContent = '';
  
  const tl = gsapLib.createTimeline('typing');
  
  originalText.split('').forEach((char, index) => {
    tl.add(() => {
      text.textContent += char;
    }, index * 0.05); // 50ms per character
  });
  
  gsapLib.playTimeline('typing');
}

// ============================================================
// EXAMPLE 13: Hover Card Effect
// ============================================================

function Example13_HoverCards() {
  const gsapLib = new GSAPAnimationLibrary();
  const cards = document.querySelectorAll('.hover-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsapLib.animate(card, {
        y: -10,
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsapLib.animate(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ============================================================
// EXAMPLE 14: Progress Bar Animation
// ============================================================

function Example14_ProgressBar() {
  const gsapLib = new GSAPAnimationLibrary();
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');
  
  function updateProgress(percentage) {
    const tl = gsapLib.createTimeline('progress');
    
    tl.to(progressBar, {
      width: `${percentage}%`,
      duration: 1,
      ease: 'power2.out'
    })
    .to(progressText, {
      innerText: percentage,
      duration: 1,
      ease: 'none',
      snap: { innerText: 1 },
      onUpdate: function() {
        progressText.innerText = Math.ceil(this.targets()[0].innerText) + '%';
      }
    }, 0); // Start at the same time as width animation
    
    gsapLib.playTimeline('progress');
  }
  
  // Example: Animate to 75%
  updateProgress(75);
}

// ============================================================
// EXAMPLE 15: Tabs Animation
// ============================================================

function Example15_AnimatedTabs() {
  const gsapLib = new GSAPAnimationLibrary();
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  let currentTab = 0;
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      if (index === currentTab) return;
      
      // Hide current content
      gsapLib.fadeOut(tabContents[currentTab], {
        duration: 0.3,
        onComplete: () => {
          tabContents[currentTab].style.display = 'none';
        }
      });
      
      // Show new content
      tabContents[index].style.display = 'block';
      gsapLib.slideUp(tabContents[index], {
        duration: 0.5,
        ease: 'power2.out',
        distance: 30
      });
      
      currentTab = index;
    });
  });
}

// ============================================================
// EXAMPLE 16: React Component Example
// ============================================================

// Example React Component using the library
const ReactExample = () => {
  const { useRef, useEffect } = React;
  
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const gsapLib = useRef(new GSAPAnimationLibrary());
  
  useEffect(() => {
    // Animate hero on mount
    gsapLib.current.fadeIn(heroRef.current, {
      duration: 1.5,
      ease: 'power2.out'
    });
    
    // Stagger animate cards
    setTimeout(() => {
      gsapLib.current.staggerSlideUp(cardsRef.current, {
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });
    }, 500);
    
    // Cleanup
    return () => {
      gsapLib.current.killAll();
    };
  }, []);
  
  const handleCardClick = (index) => {
    gsapLib.current.pulse(cardsRef.current[index], {
      repeat: 2
    });
  };
  
  return (
    <div>
      <h1 ref={heroRef}>Welcome to My Site</h1>
      <div className="cards">
        {[1, 2, 3].map((num, index) => (
          <div
            key={num}
            ref={el => cardsRef.current[index] = el}
            onClick={() => handleCardClick(index)}
          >
            Card {num}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// USAGE TIPS
// ============================================================

/*

1. PERFORMANCE TIPS:
   - Use `will-change` CSS property for animated elements
   - Avoid animating width/height (use scale instead)
   - Use transform properties (x, y, scale, rotation) for best performance
   - Clean up animations on component unmount

2. TIMING TIPS:
   - Default duration (1s) works for most cases
   - Use shorter durations (0.3-0.5s) for UI feedback
   - Use longer durations (1.5-2s) for attention-grabbing animations
   - Stagger between 0.1-0.3s for sequential animations

3. EASING TIPS:
   - Use 'power2.out' for most enter animations
   - Use 'power2.in' for exit animations
   - Use 'back.out(1.7)' for playful, bouncy effects
   - Use 'elastic' for spring-like effects
   - Use 'none' for linear animations (progress bars, etc.)

4. ACCESSIBILITY:
   - Respect prefers-reduced-motion media query
   - Provide alternatives for critical functionality
   - Don't rely solely on animation to convey information

5. DEBUGGING:
   - Use `markers: true` in ScrollTrigger for debugging
   - Use `onUpdate` callback to log animation progress
   - Check GSAP DevTools (https://greensock.com/docs/v3/Plugins/GSDevTools)

*/

// ============================================================
// EXPORT (if using modules)
// ============================================================

// export {
//   Example1_PageLoadAnimation,
//   Example2_MenuAnimation,
//   Example3_ScrollAnimations,
//   // ... etc
// };
