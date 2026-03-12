/* ==========================================================================
   Premium Portfolio — Script
   Modular, well-commented, production-quality vanilla JS
   ========================================================================== */

;(function () {
  'use strict'

  /* -----------------------------------------------------------------------
     0. LOADING SCREEN
     ----------------------------------------------------------------------- */
  const loader = document.getElementById('loader')
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden')
      document.body.style.overflow = ''
      initAll()
    }, 2200)
  })
  // Prevent scroll while loading
  document.body.style.overflow = 'hidden'

  /* -----------------------------------------------------------------------
     1. INITIALIZATION
     ----------------------------------------------------------------------- */
  function initAll() {
    initCustomCursor()
    initScrollProgress()
    initNavbar()
    initMobileMenu()
    initTypingAnimation()
    initParticles()
    initRevealAnimations()
    initCounters()
    initTimeline()
    initProjectCards()
    initTiltCards()
    initMagneticButtons()
    initMetricBars()
    initContactForm()
    initThemeToggle()
    initSoundToggle()
    initResumeDownload()
    initKonamiCode()
    initProjectGlow()
    initSparkleTrail()
  }

  /* -----------------------------------------------------------------------
     2. CUSTOM CURSOR
     ----------------------------------------------------------------------- */
  function initCustomCursor() {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    })

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animateRing)
    }
    animateRing()

    // Hover state for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-pill, .tilt-card')
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'))
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'))
    })
  }

  /* -----------------------------------------------------------------------
     3. SCROLL PROGRESS BAR
     ----------------------------------------------------------------------- */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      bar.style.width = progress + '%'
    }, { passive: true })
  }

  /* -----------------------------------------------------------------------
     4. NAVBAR — scroll detection & active link
     ----------------------------------------------------------------------- */
  function initNavbar() {
    const navbar = document.getElementById('navbar')
    const navLinks = document.querySelectorAll('.nav-link')
    const sections = document.querySelectorAll('section[id]')

    window.addEventListener('scroll', () => {
      // Scrolled state
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }

      // Active section
      let current = ''
      sections.forEach((section) => {
        const top = section.offsetTop - 200
        if (window.scrollY >= top) {
          current = section.getAttribute('id')
        }
      })
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('data-section') === current)
      })
    }, { passive: true })
  }

  /* -----------------------------------------------------------------------
     5. MOBILE MENU
     ----------------------------------------------------------------------- */
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger')
    const mobileMenu = document.getElementById('mobile-menu')
    const mobileLinks = document.querySelectorAll('.mobile-nav-link')

    if (!hamburger || !mobileMenu) return

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open')
      mobileMenu.classList.toggle('open')
      hamburger.setAttribute('aria-expanded', isOpen)
      document.body.style.overflow = isOpen ? 'hidden' : ''
    })

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open')
        mobileMenu.classList.remove('open')
        hamburger.setAttribute('aria-expanded', 'false')
        document.body.style.overflow = ''
      })
    })
  }

  /* -----------------------------------------------------------------------
     6. TYPING ANIMATION
     ----------------------------------------------------------------------- */
  function initTypingAnimation() {
    const el = document.getElementById('typed-text')
    if (!el) return

    const phrases = [
      'Frontend & React Native Engineer',
      'Building High-Performance',
      'Fintech Experiences'
    ]
    const fullText = 'Frontend & React Native Engineer Building High-Performance Fintech Experiences'
    let charIndex = 0

    function type() {
      if (charIndex <= fullText.length) {
        el.textContent = fullText.substring(0, charIndex)
        charIndex++
        setTimeout(type, 35 + Math.random() * 25)
      }
    }
    // Start after a small delay
    setTimeout(type, 500)
  }

  /* -----------------------------------------------------------------------
     7. PARTICLE CANVAS (Hero Background)
     ----------------------------------------------------------------------- */
  function initParticles() {
    const canvas = document.getElementById('hero-canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15))
    const particles = []

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.4 + 0.1
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 157, ${this.opacity})`
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw connections between nearby particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = `rgba(196, 77, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      drawConnections()
      requestAnimationFrame(animate)
    }
    animate()
  }

  /* -----------------------------------------------------------------------
     8. INTERSECTION OBSERVER — Reveal Animations
     ----------------------------------------------------------------------- */
  function initRevealAnimations() {
    const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
  }

  /* -----------------------------------------------------------------------
     9. ANIMATED COUNTERS
     ----------------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll('.counter-card__value')
    if (!counters.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    counters.forEach((el) => observer.observe(el))

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'), 10)
      const duration = 2000
      const startTime = performance.now()

      function step(currentTime) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.round(target * eased)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
  }

  /* -----------------------------------------------------------------------
     10. TIMELINE — animated line fill + card expand on mobile
     ----------------------------------------------------------------------- */
  function initTimeline() {
    const lineFill = document.querySelector('.timeline__line-fill')
    const cards = document.querySelectorAll('.timeline__card')
    if (!lineFill) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            lineFill.style.height = '100%'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(document.querySelector('.timeline'))

    // Toggle expand on mobile
    if (window.innerWidth <= 768) {
      cards.forEach((card) => {
        card.addEventListener('click', () => {
          card.classList.toggle('expanded')
        })
      })
    }
  }

  /* -----------------------------------------------------------------------
     11. PROJECT CARDS — expand on click
     ----------------------------------------------------------------------- */
  function initProjectCards() {
    const cards = document.querySelectorAll('.project-card')
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('expanded')
      })
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          card.classList.toggle('expanded')
        }
      })
    })
  }

  /* -----------------------------------------------------------------------
     12. 3D TILT CARDS
     ----------------------------------------------------------------------- */
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card')
    if (window.matchMedia('(pointer: coarse)').matches) return

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -5
        const rotateY = ((x - centerX) / centerX) * 5

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      })
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      })
    })
  }

  /* -----------------------------------------------------------------------
     13. MAGNETIC BUTTONS
     ----------------------------------------------------------------------- */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic')
    if (window.matchMedia('(pointer: coarse)').matches) return

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
      })
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)'
      })
    })
  }

  /* -----------------------------------------------------------------------
     14. METRIC BARS — animate SVG width on scroll
     ----------------------------------------------------------------------- */
  function initMetricBars() {
    const bars = document.querySelectorAll('.metric-card__bar-fill')
    if (!bars.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetWidth = entry.target.getAttribute('data-width')
            entry.target.setAttribute('width', targetWidth)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    bars.forEach((bar) => observer.observe(bar))
  }

  /* -----------------------------------------------------------------------
     15. CONTACT FORM
     ----------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form')
    const submitBtn = document.getElementById('contact-submit')
    if (!form || !submitBtn) return

    form.addEventListener('submit', (e) => {
      e.preventDefault()

      // Basic validation
      const name = form.querySelector('#contact-name').value.trim()
      const email = form.querySelector('#contact-email').value.trim()
      const message = form.querySelector('#contact-message').value.trim()

      if (!name || !email || !message) return

      // Simulate send
      submitBtn.classList.add('loading')
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.classList.remove('loading')
        submitBtn.classList.add('success')

        setTimeout(() => {
          submitBtn.classList.remove('success')
          submitBtn.disabled = false
          form.reset()
        }, 2500)
      }, 1800)
    })
  }

  /* -----------------------------------------------------------------------
     16. THEME TOGGLE (Dark / Light)
     ----------------------------------------------------------------------- */
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle')
    if (!toggle) return

    // Check saved preference
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    }

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme')
      const next = current === 'dark' ? '' : 'dark'
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
      localStorage.setItem('theme', next || 'light')
    })
  }

  /* -----------------------------------------------------------------------
     17. SOUND TOGGLE (Subtle click sound with Web Audio API)
     ----------------------------------------------------------------------- */
  function initSoundToggle() {
    const toggle = document.getElementById('sound-toggle')
    if (!toggle) return

    let soundEnabled = false
    toggle.classList.add('muted')

    toggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled
      toggle.classList.toggle('muted', !soundEnabled)
    })

    // Play a subtle click on interactive element interactions
    document.addEventListener('click', (e) => {
      if (!soundEnabled) return
      const interactive = e.target.closest('a, button, .project-card, .skill-pill')
      if (!interactive) return

      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        oscillator.connect(gain)
        gain.connect(audioCtx.destination)
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05)
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1)
        oscillator.start(audioCtx.currentTime)
        oscillator.stop(audioCtx.currentTime + 0.1)
      } catch (err) {
        // Silently fail
      }
    })
  }

  /* -----------------------------------------------------------------------
     18. RESUME DOWNLOAD — animated toast
     ----------------------------------------------------------------------- */
  function initResumeDownload() {
    const btn = document.getElementById('cta-resume')
    const toast = document.getElementById('download-toast')
    if (!btn || !toast) return

    btn.addEventListener('click', () => {
      setTimeout(() => {
        toast.classList.add('show')
        setTimeout(() => toast.classList.remove('show'), 3000)
      }, 300)
    })
  }

  /* -----------------------------------------------------------------------
     19. KONAMI CODE EASTER EGG
     ----------------------------------------------------------------------- */
  function initKonamiCode() {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ]
    let konamiIndex = 0

    document.addEventListener('keydown', (e) => {
      if (e.key === konamiSequence[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiSequence.length) {
          konamiIndex = 0
          triggerEasterEgg()
        }
      } else {
        konamiIndex = 0
      }
    })

    function triggerEasterEgg() {
      // Confetti-like particle burst
      const colors = ['#FF6B9D', '#C44DFF', '#FFB6D9', '#B983FF', '#F472B6']
      for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div')
        confetti.style.cssText = `
          position:fixed;
          top:50%;left:50%;
          width:${Math.random() * 10 + 4}px;
          height:${Math.random() * 10 + 4}px;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
          pointer-events:none;
          z-index:99999;
          animation:confetti-burst ${Math.random() * 2 + 1}s ease-out forwards;
          --tx:${(Math.random() - 0.5) * 800}px;
          --ty:${(Math.random() - 0.5) * 800}px;
          --r:${Math.random() * 720}deg;
        `
        document.body.appendChild(confetti)
        setTimeout(() => confetti.remove(), 3000)
      }

      // Add confetti keyframes if not exists
      if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style')
        style.id = 'confetti-style'
        style.textContent = `
          @keyframes confetti-burst {
            0% { opacity:1; transform:translate(0,0) rotate(0deg) scale(1); }
            100% { opacity:0; transform:translate(var(--tx),var(--ty)) rotate(var(--r)) scale(0); }
          }
        `
        document.head.appendChild(style)
      }
    }
  }

  /* -----------------------------------------------------------------------
     20. PROJECT CARD GLOW FOLLOW
     ----------------------------------------------------------------------- */
  function initProjectGlow() {
    const cards = document.querySelectorAll('.project-card')
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', x + 'px')
        card.style.setProperty('--mouse-y', y + 'px')
      })
    })
  }

  /* -----------------------------------------------------------------------
     21. SPARKLE TRAIL ON HERO MOUSEMOVE
     ----------------------------------------------------------------------- */
  function initSparkleTrail() {
    const hero = document.getElementById('hero')
    if (!hero || window.matchMedia('(pointer: coarse)').matches) return

    const symbols = ['\u2726', '\u2727', '\u22C6', '\u2661', '\u2605']
    const colors = ['#FF6B9D', '#C44DFF', '#FFB6D9', '#B983FF']

    hero.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.3) return
      const sparkle = document.createElement('span')
      sparkle.className = 'mouse-sparkle'
      sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)]
      sparkle.style.left = e.clientX + 'px'
      sparkle.style.top = e.clientY + 'px'
      sparkle.style.color = colors[Math.floor(Math.random() * colors.length)]
      sparkle.style.fontSize = (Math.random() * 0.8 + 0.6) + 'rem'
      document.body.appendChild(sparkle)
      setTimeout(() => sparkle.remove(), 1000)
    })
  }

})()
