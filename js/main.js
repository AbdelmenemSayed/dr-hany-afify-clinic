/**
 * د. هاني محمد عفيفي | استشاري جراحة العظام والمفاصل
 * Luxury Editorial Medical Brand - Interactive Motion & Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const CLINIC_WHATSAPP = '20133273922'; // 0133273922

  // ===================================================================
  // 1. SCROLL PROGRESS BAR
  // ===================================================================
  const scrollProgressBar = document.getElementById('scrollProgress');
  
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    scrollProgressBar.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ===================================================================
  // 2. STICKY HEADER & SCROLLSPY
  // ===================================================================
  const siteHeader = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  function handleHeaderAndScrollspy() {
    const scrollY = window.scrollY;

    // Header elevation
    if (scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    // Scrollspy active state
    let currentActiveId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleHeaderAndScrollspy, { passive: true });

  // ===================================================================
  // 3. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
  // ===================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ===================================================================
  // 4. ANIMATED STATISTICS COUNTERS
  // ===================================================================
  const counterElements = document.querySelectorAll('.counter[data-target]');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2200; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out expo curve for smooth deceleration
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeOut * target);

        // Format with commas (e.g. 15,000)
        counter.textContent = currentVal.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString('en-US');
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counters when the metrics strip enters viewport
  const metricsSection = document.querySelector('.metrics-strip');
  if (metricsSection && 'IntersectionObserver' in window) {
    const metricsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    metricsObserver.observe(metricsSection);
  }

  // ===================================================================
  // 5. SUBTLE HERO MOUSE PARALLAX (DESKTOP)
  // ===================================================================
  const heroSection = document.getElementById('hero');
  const heroPortrait = document.getElementById('heroPortrait');

  if (heroSection && heroPortrait && window.matchMedia('(min-width: 1024px)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroPortrait.style.transform = `perspective(1000px) rotateY(${x * -6}deg) rotateX(${y * 6}deg) translateY(-6px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroPortrait.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  }

  // ===================================================================
  // 6. BOOKING FORM & WHATSAPP GENERATION
  // ===================================================================
  const dateInput = document.getElementById('pt_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('pt_name')?.value.trim();
      const phone = document.getElementById('pt_phone')?.value.trim();
      const service = document.getElementById('pt_service')?.value || 'استشارة عظام عامة';
      const date = document.getElementById('pt_date')?.value || 'أقرب موعد متاح';
      const notes = document.getElementById('pt_notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      if (!name || !phone) {
        alert('يرجى إدخال اسم المريض ورقم الهاتف لتأكيد الموعد.');
        return;
      }

      // Format WhatsApp Arabic message
      const message = 
`*طلب حجز موعد استشاري — عيادة د. هاني محمد عفيفي*
---------------------------------------
👤 *اسم المريض:* ${name}
📞 *رقم الهاتف:* ${phone}
🩺 *الخدمة المطلوبة:* ${service}
📅 *الموعد المقترح:* ${date}
📝 *ملاحظات الحالة:* ${notes}
---------------------------------------
تم إرسال الطلب عبر الموقع الرسمي.`;

      const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      bookingForm.reset();
    });
  }
});
