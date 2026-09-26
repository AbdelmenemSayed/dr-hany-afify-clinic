/**
 * عيادة د. هاني محمد عفيفي | استشاري جراحة العظام والمفاصل والعمود الفقري
 * Dr. Hany Mohamed Afify | Orthopedic Surgery Consultant
 * Living Medical Universe — Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const CLINIC_WHATSAPP = '20133273922'; // Official Clinic Line: 0133273922

  // ===================================================================
  // 1. TOP SCROLL CYAN TRACER
  // ===================================================================
  const cyanTracer = document.getElementById('cyanTracer');

  function updateScrollProgress() {
    if (!cyanTracer) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    cyanTracer.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ===================================================================
  // 2. TECH HEADER ELEVATION & SCROLLSPY
  // ===================================================================
  const techHeader = document.getElementById('techHeader');
  const navLinks = document.querySelectorAll('.tech-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleHeaderAndScrollspy() {
    const scrollPos = window.scrollY;

    // Header elevation
    if (scrollPos > 30) {
      techHeader?.classList.add('scrolled');
    } else {
      techHeader?.classList.remove('scrolled');
    }

    // Active Section Tracking
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleHeaderAndScrollspy, { passive: true });
  handleHeaderAndScrollspy();

  // ===================================================================
  // 3. LIVING PARTICLE CONSTELLATION CANVAS
  // ===================================================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes configuration
    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.2;
        // Random cyan or subtle gold accent
        this.color = Math.random() > 0.8 ? '212, 175, 55' : '35, 231, 255';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      const maxDistance = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(35, 231, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationId;
    function renderLoop() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationId = requestAnimationFrame(renderLoop);
    }
    renderLoop();

    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    });
  }

  // ===================================================================
  // 4. SUBTLE 3D PARALLAX TILT ON DOCTOR CHASSIS (DESKTOP)
  // ===================================================================
  const stage = document.getElementById('heroHologramStage');
  const chassis = document.getElementById('doctorChassis');

  if (stage && chassis && window.matchMedia('(min-width: 1024px)').matches) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      chassis.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-4px)`;
    });

    stage.addEventListener('mouseleave', () => {
      chassis.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  }

  // ===================================================================
  // 5. SPECIALTY MODULE SELECTION TO CONCIERGE FORM
  // ===================================================================
  const moduleCards = document.querySelectorAll('.module-card');
  const serviceSelect = document.getElementById('pt_service');
  const conciergeCard = document.querySelector('.concierge-glass-card');

  // Mapping data-module to select option text
  const moduleToServiceMap = {
    joints: 'المفاصل الصناعية',
    arthroscopy: 'مناظير المفاصل والرباط الصليبي',
    cartilage: 'علاج الخشونة والطب التجديدي',
    spine: 'جراحات العمود الفقري',
    trauma: 'الكسور المعقدة والترميم',
    pediatric: 'عظام الأطفال'
  };

  moduleCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const modKey = card.getAttribute('data-module');
      if (modKey && moduleToServiceMap[modKey] && serviceSelect) {
        serviceSelect.value = moduleToServiceMap[modKey];
      }

      // Smooth scroll to booking suite
      const bookingSec = document.getElementById('concierge-booking');
      if (bookingSec) {
        bookingSec.scrollIntoView({ behavior: 'smooth' });

        // Highlight form card with cyan pulse
        if (conciergeCard) {
          conciergeCard.style.boxShadow = '0 0 45px rgba(35, 231, 255, 0.4)';
          conciergeCard.style.borderColor = 'rgba(35, 231, 255, 0.6)';
          setTimeout(() => {
            conciergeCard.style.boxShadow = '';
            conciergeCard.style.borderColor = '';
          }, 1800);
        }
      }
    });
  });

  // ===================================================================
  // 6. DATE RESTRICTION TO TODAY/FUTURE
  // ===================================================================
  const dateInput = document.getElementById('pt_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // ===================================================================
  // 7. VIP CONCIERGE BOOKING & WHATSAPP DISPATCH
  // ===================================================================
  const bookingForm = document.getElementById('cyberBookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('pt_name')?.value.trim();
      const phone = document.getElementById('pt_phone')?.value.trim();
      const service = document.getElementById('pt_service')?.value || 'استشارة عامة في جراحة العظام والمفاصل';
      const date = document.getElementById('pt_date')?.value || 'أقرب موعد متاح';
      const notes = document.getElementById('pt_notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      if (!name || !phone) {
        alert('يرجى كتابة الاسم ورقم الهاتف للتنسيق الطبي وحجز الموعد.');
        return;
      }

      // Format WhatsApp Message in Arabic
      const message = 
`*طلب استشارة طبية — عيادة د. هاني محمد عفيفي*
---------------------------------------
👤 *اسم المريض:* ${name}
📞 *رقم الهاتف:* ${phone}
🩺 *التخصص أو الشكوى:* ${service}
📅 *الموعد المقترح:* ${date}
📝 *ملاحظات الحالة:* ${notes}
---------------------------------------
تم إرسال الطلب عبر الموقع الرسمي المعتمد.`;

      const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      bookingForm.reset();
    });
  }

  // ===================================================================
  // 8. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ===================================================================
  const revealTargets = document.querySelectorAll(
    '.module-card, .lab-grid-layout, .stories-card-panel, .location-card-panel, .concierge-glass-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }
});
