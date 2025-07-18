// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all functionality
    initMobileMenu()
    initScrollAnimations()
    initFAQ()
    initSmoothScrolling()
    initHeaderScroll()
    initParallaxEffect()
    initSectionTransitions()
    initMascotInteractions()
    initEnhancedFloatingElements()
    initSmoothSectionNavigation()
  })
  
  // Mobile Menu Functionality
  function initMobileMenu() {
    const mobileToggle = document.getElementById("mobile-toggle")
    const nav = document.getElementById("nav")
    const navList = document.querySelector(".nav-list")
  
    if (mobileToggle && nav) {
      mobileToggle.addEventListener("click", () => {
        nav.classList.toggle("active")
        mobileToggle.classList.toggle("active")
        navList.classList.toggle("open")
      })
  
      // Close menu when clicking on nav links
      const navLinks = nav.querySelectorAll(".nav-link")
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("active")
          mobileToggle.classList.remove("active")
          navList.classList.remove("open")
        })
      })
  
      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
          nav.classList.remove("active")
          mobileToggle.classList.remove("active")
          navList.classList.remove("open")
        }
      })
    }
  }
  
  // Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0
          setTimeout(() => {
            entry.target.classList.add("animated")
          }, delay)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll(".animate-on-scroll")
    animateElements.forEach((el) => observer.observe(el))
  }
  
  // FAQ Functionality
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        // Tutup semua
        faqItems.forEach((faqItem) => faqItem.classList.remove("active"));
        // Buka jika sebelumnya tidak aktif
        if (!isActive) item.classList.add("active");
      });
    });
  }
  
  // Smooth Scrolling for Navigation Links
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]')
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetSection.offsetTop - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }
  
  // Header Scroll Effect
  function initHeaderScroll() {
    const header = document.getElementById("header")
    let lastScrollTop = 0
  
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
      if (scrollTop > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
  
      lastScrollTop = scrollTop
    })
  }
  
  // Parallax Effect for Hero Section
  function initParallaxEffect() {
    const heroBg = document.querySelector(".hero-bg")
    const floatingElements = document.querySelectorAll(".floating-element")
  
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
  
      if (heroBg) {
        heroBg.style.transform = `translateY(${rate}px)`
      }
  
      // Animate floating elements
      floatingElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })
    })
  }
  
  // Button Click Effects
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      // Create ripple effect
      const button = e.target
      const ripple = document.createElement("span")
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
  
      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")
  
      button.appendChild(ripple)
  
      setTimeout(() => {
        ripple.remove()
      }, 600)
    }
  })
  
  // Typing Animation for Hero Title
  function initTypingAnimation() {
    const titleElement = document.querySelector(".title-main")
    if (titleElement) {
      const text = titleElement.textContent
      titleElement.textContent = ""
      titleElement.style.borderRight = "2px solid #fbbf24"
  
      let i = 0
      const typeWriter = () => {
        if (i < text.length) {
          titleElement.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        } else {
          titleElement.style.borderRight = "none"
        }
      }
  
      setTimeout(typeWriter, 1000)
    }
  }
  
  // Counter Animation for Statistics (if needed)
  function animateCounters() {
    const counters = document.querySelectorAll(".counter")
  
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0
  
      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          setTimeout(updateCounter, 20)
        } else {
          counter.textContent = target
        }
      }
  
      updateCounter()
    })
  }
  
  // Lazy Loading for Images
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]")
  
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("loading")
          imageObserver.unobserve(img)
        }
      })
    })
  
    images.forEach((img) => imageObserver.observe(img))
  }
  
  // Performance Optimization
  function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout
    const originalScrollHandler = window.onscroll
  
    window.onscroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
  
      scrollTimeout = setTimeout(() => {
        if (originalScrollHandler) {
          originalScrollHandler()
        }
      }, 10)
    }
  }
  
  // Initialize performance optimizations
  optimizePerformance()
  
  // Add loading states
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  
    // Remove loading class from all elements
    const loadingElements = document.querySelectorAll(".loading")
    loadingElements.forEach((el) => el.classList.remove("loading"))
  })
  
  // Error handling for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.style.display = "none"
      console.warn("Failed to load image:", this.src)
    })
  })
  
  // Accessibility improvements
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape") {
      const nav = document.getElementById("nav")
      const mobileToggle = document.getElementById("mobile-toggle")
  
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active")
        mobileToggle.classList.remove("active")
      }
    }
  })
  
  // Focus management for mobile menu
  function manageFocus() {
    const nav = document.getElementById("nav")
    const firstFocusable = nav.querySelector("a, button")
    const lastFocusable = nav.querySelectorAll("a, button")
    const lastElement = lastFocusable[lastFocusable.length - 1]
  
    nav.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstFocusable.focus()
            e.preventDefault()
          }
        }
      }
    })
  }
  
  manageFocus()
  
  // Enhanced Section Transitions
  function initSectionTransitions() {
    const sections = document.querySelectorAll("section")
  
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-transition", "visible")
  
            // Trigger staggered animations for child elements
            const childElements = entry.target.querySelectorAll(".objective-card, .competition-card, .faq-item")
            childElements.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("fade-in-up", "animated")
              }, index * 100)
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )
  
    sections.forEach((section) => {
      section.classList.add("section-transition")
      sectionObserver.observe(section)
    })
  }
  
  // Mascot Interactive Animations
  function initMascotInteractions() {
    const mascot = document.querySelector(".mascot-img")
    const mascotContainer = document.querySelector(".hero-mascot-container")
  
    if (mascot && mascotContainer) {
      // Click interaction
      mascot.addEventListener("click", () => {
        // Reset animation
        mascot.style.animation = "none"
        setTimeout(() => {
          mascot.style.animation = "mascotFloat 4s ease-in-out infinite, entranceAnimation 1.5s ease-out"
        }, 100)
  
        // Create special click effect
        createMascotClickEffect(mascotContainer)
  
        // Add temporary glow boost
        const glow = mascotContainer.querySelector(".mascot-glow")
        if (glow) {
          glow.style.background =
            "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(245, 158, 11, 0.6) 50%, transparent 70%)"
          setTimeout(() => {
            glow.style.background =
              "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(245, 158, 11, 0.3) 50%, transparent 70%)"
          }, 1000)
        }
      })
  
      // Hover interactions
      mascot.addEventListener("mouseenter", () => {
        mascot.style.animationPlayState = "paused"
        mascot.style.transform = "scale(1.1) rotate(3deg)"
      })
  
      mascot.addEventListener("mouseleave", () => {
        mascot.style.animationPlayState = "running"
        mascot.style.transform = ""
      })
    }
  }
  
  // Create special mascot click effect
  function createMascotClickEffect(container) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const effect = document.createElement("div")
        effect.style.cssText = `
                  position: absolute;
                  top: ${20 + Math.random() * 60}%;
                  left: ${20 + Math.random() * 60}%;
                  width: 15px;
                  height: 15px;
                  background: linear-gradient(45deg, #fbbf24, #f59e0b);
                  border-radius: 50%;
                  transform: scale(0);
                  animation: mascotClickEffect 1s ease-out forwards;
                  pointer-events: none;
                  z-index: 10;
                  box-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
              `
        container.appendChild(effect)
  
        setTimeout(() => {
          effect.remove()
        }, 1000)
      }, i * 100)
    }
  }
  
  // Add mascot click effect CSS
  const mascotClickCSS = `
  @keyframes mascotClickEffect {
      0% {
          transform: scale(0) rotate(0deg);
          opacity: 1;
      }
      50% {
          transform: scale(1.5) rotate(180deg);
          opacity: 0.8;
      }
      100% {
          transform: scale(0) rotate(360deg);
          opacity: 0;
      }
  }
  `
  
  const mascotStyleElement = document.createElement("style")
  mascotStyleElement.textContent = mascotClickCSS
  document.head.appendChild(mascotStyleElement)
  
  // Enhanced Floating Elements Animation
  function initEnhancedFloatingElements() {
    const floatingElements = document.querySelectorAll(".tech-icon")
  
    floatingElements.forEach((element, index) => {
      element.addEventListener("mouseenter", () => {
        element.style.animationPlayState = "paused"
        element.style.transform = "scale(1.3) rotate(20deg)"
        element.style.zIndex = "1000"
      })
  
      element.addEventListener("mouseleave", () => {
        element.style.animationPlayState = "running"
        element.style.transform = ""
        element.style.zIndex = ""
      })
  
      // Random movement variation
      const randomDelay = Math.random() * 2
      const randomDuration = 4 + Math.random() * 2
      element.style.animationDelay = `${randomDelay}s`
      element.style.animationDuration = `${randomDuration}s`
    })
  }
  
  // Smooth Section Navigation with Animation
  function initSmoothSectionNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]')
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          // Add transition effect
          document.body.style.overflow = "hidden"
  
          const overlay = document.createElement("div")
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(245, 158, 11, 0.1));
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          `
  
          document.body.appendChild(overlay)
  
          setTimeout(() => {
            overlay.style.opacity = "1"
          }, 10)
  
          setTimeout(() => {
            const headerHeight = document.querySelector(".header").offsetHeight
            const targetPosition = targetSection.offsetTop - headerHeight
  
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
  
            setTimeout(() => {
              overlay.style.opacity = "0"
              setTimeout(() => {
                document.body.removeChild(overlay)
                document.body.style.overflow = ""
              }, 300)
            }, 500)
          }, 200)
        }
      })
    })
  }
  
  // Add click effect keyframe to CSS dynamically
  const clickEffectCSS = `
  @keyframes clickEffect {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
  `
  
  const styleElement = document.createElement("style")
  styleElement.textContent = clickEffectCSS
  document.head.appendChild(styleElement)
  
  // Add ripple CSS dynamically
  const rippleCSS = `
  .btn {
      position: relative;
      overflow: hidden;
  }
  
  .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
  }
  
  @keyframes ripple-animation {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
  `
  
  const rippleStyleElement = document.createElement("style")
  rippleStyleElement.textContent = rippleCSS
  document.head.appendChild(rippleStyleElement)
  
  // Initialize new functions
  initMascotInteractions()
  initEnhancedFloatingElements()
  
  // Initialize mascot interactions when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initMascotInteractions()
  })
  
  document.querySelectorAll('.objectives-circle-v2 .objective-part').forEach((part, idx, arr) => {
    part.addEventListener('mouseenter', () => setActivePart(idx));
    part.addEventListener('focus', () => setActivePart(idx));
    part.addEventListener('mouseleave', clearActivePart);
    part.addEventListener('blur', clearActivePart);
  });
  
  function setActivePart(activeIdx) {
    const positions = [
      {top: 10, left: 50, tx: -50, ty: 0},    // part-1 (atas)
      {top: 50, left: 90, tx: 0, ty: -50},    // part-2 (kanan)
      {top: 90, left: 50, tx: -50, ty: 0},    // part-3 (bawah)
      {top: 50, left: 10, tx: 0, ty: -50},    // part-4 (kiri)
    ];
    document.querySelectorAll('.objectives-circle-v2 .objective-part').forEach((part, i) => {
      part.classList.toggle('active', i === activeIdx);
      if (i === activeIdx) {
        part.style.top = '50%';
        part.style.left = '50%';
        part.style.transform = 'translate(-50%, -50%) scale(1.15)';
        part.style.zIndex = 3;
      } else {
        const p = positions[i];
        part.style.top = p.top + '%';
        part.style.left = p.left + '%';
        part.style.transform = `translate(${p.tx}%, ${p.ty}%) scale(0.92)`;
        part.style.zIndex = 2;
      }
    });
  }
  function clearActivePart() {
    const positions = [
      {top: 35, left: 50, tx: -50, ty: 0},    // part-1 (atas)
      {top: 50, left: 90, tx: 0, ty: -50},    // part-2 (kanan)
      {top: 90, left: 50, tx: -50, ty: 0},    // part-3 (bawah)
      {top: 50, left: 10, tx: 0, ty: -50},    // part-4 (kiri)
    ];
    document.querySelectorAll('.objectives-circle-v2 .objective-part').forEach((part, i) => {
      part.classList.remove('active');
      const p = positions[i];
      part.style.top = p.top + '%';
      part.style.left = p.left + '%';
      part.style.transform = `translate(${p.tx}%, ${p.ty}%) scale(1)`;
      part.style.zIndex = 2;
    });
  }
  // Inisialisasi posisi awal
  clearActivePart();

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector('.objectives-marquee');
  const cards = Array.from(carousel.querySelectorAll('.objective-card'));
  let current = 0;
  let interval;

  function setActive(idx) {
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  function nextCard() {
    current = (current + 1) % cards.length;
    setActive(current);
  }

  setActive(current);
  interval = setInterval(nextCard, 2500);

  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => interval = setInterval(nextCard, 2500));

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      current = idx;
      setActive(current);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer untuk animasi scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target); // Hanya animate sekali
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observe semua card
    document.querySelectorAll('.objective-card').forEach(card => {
        observer.observe(card);
    });

    // Smooth scroll yang lebih baik
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Prevent unwanted scroll jumps
let isScrolling;
window.addEventListener('scroll', (e) => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        // Optional: Add any scroll-end logic here
    }, 66);
}, false);

// Tambahkan efek parallax ringan saat scroll
document.addEventListener('scroll', function() {
    const ornaments = document.querySelectorAll('.floating-ornament');
    const scrolled = window.pageYOffset;
    
    ornaments.forEach((ornament, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        ornament.style.transform = `translateY(${yPos}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Mobile Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav');

    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', function() {
    const item = this.parentElement;
    document.querySelectorAll('.faq-item').forEach(i => {
      if(i !== item) i.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// Mobile Nav Toggle
document.getElementById('mobile-toggle').addEventListener('click', function() {
  document.querySelector('.nav-list').classList.toggle('active');
});