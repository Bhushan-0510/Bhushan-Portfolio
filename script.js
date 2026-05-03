/**
 * BHUSHAN GALGUNDE — BRUTALIST PORTFOLIO JS
 * POWERED BY GSAP & LENIS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    infinite: false,
  });

  // Integrate Lenis with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // 2. Custom Cursor Logic
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    });

    // Hover effects for links and interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card-brutalist');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  // 3. GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Hero Reveal
  const heroTimeline = gsap.timeline();
  
  heroTimeline.from('.hero-line > *', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power4.out',
    delay: 0.5
  })
  .from('.hero-footer', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.5');

  // Generic Reveal on Scroll
  const revealElements = document.querySelectorAll('[data-gsap]');
  
  revealElements.forEach(el => {
    const type = el.dataset.gsap;
    const delay = parseFloat(el.dataset.gsapDelay) || 0;
    
    let animProps = {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 1.2,
      delay: delay,
      ease: 'power3.out'
    };

    if (type === 'fade-up') {
      animProps.y = 60;
      animProps.opacity = 0;
    } else if (type === 'fade-right') {
      animProps.x = -60;
      animProps.opacity = 0;
    } else if (type === 'fade-left') {
      animProps.x = 60;
      animProps.opacity = 0;
    }

    gsap.from(el, animProps);
  });

  // Parallax Effect for Project Images
  const projectImages = document.querySelectorAll('.project-img-placeholder');
  projectImages.forEach(img => {
    gsap.to(img, {
      y: -30,
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // 4. Clock Update
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    function updateClock() {
      const now = new Date();
      const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false,
        timeZone: 'Asia/Kolkata' 
      };
      timeElement.textContent = now.toLocaleTimeString('en-GB', options) + ' IST';
    }
    setInterval(updateClock, 1000);
    updateClock();
  }

  // 5. Mobile Menu Toggle
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle && navMenu && navbar) {
    const toggleMenu = () => {
      navbar.classList.toggle('active');
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      if (navMenu.classList.contains('active')) {
        gsap.to(navMenu, {
          display: 'flex',
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else {
        gsap.to(navMenu, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power3.in',
          onComplete: () => {
            navMenu.style.display = 'none';
          }
        });
      }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // 6. Year Update
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Developer Greeting
console.log(
  '%c BHUSHAN GALGUNDE %c BRUTALIST PORTFOLIO V2 ',
  'background: #ccff00; color: #000; font-weight: bold; padding: 5px;',
  'background: #000; color: #fff; padding: 5px;'
);
