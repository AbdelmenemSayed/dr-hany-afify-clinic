/**
 * عيادة د. هاني محمد عفيفي | استشاري أمراض وجراحة العظام
 * Dr. Hany Mohamed Afify | World-Class Orthopedic Consultant Brand
 * Interactive Motion & Treatment Theater Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const CLINIC_WHATSAPP = '20133273922'; // 0133273922

  // ===================================================================
  // 1. TOP SCROLL PROGRESS INDICATOR
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
  // 2. STICKY HEADER & ACTIVE SCROLLSPY
  // ===================================================================
  const agencyHeader = document.getElementById('agencyHeader');
  const navLinks = document.querySelectorAll('.agency-nav-link');
  const trackedSections = document.querySelectorAll('section[id]');

  function handleHeaderAndNav() {
    const scrollY = window.scrollY;

    // Header elevation on scroll
    if (scrollY > 30) {
      agencyHeader?.classList.add('scrolled');
    } else {
      agencyHeader?.classList.remove('scrolled');
    }

    // Scrollspy active indicator
    let currentSectionId = '';
    trackedSections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleHeaderAndNav, { passive: true });

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
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ===================================================================
  // 4. ANIMATED TELEMETRY COUNTERS
  // ===================================================================
  const counterElements = document.querySelectorAll('.counter[data-target]');
  let countersFired = false;

  function runCounters() {
    if (countersFired) return;
    countersFired = true;

    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2400; // ms
      const startTime = performance.now();

      function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Exponential ease-out
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeOut * target);

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

  const telemetrySection = document.querySelector('.telemetry-strip-section');
  if (telemetrySection && 'IntersectionObserver' in window) {
    const telemetryObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    telemetryObserver.observe(telemetrySection);
  }

  // ===================================================================
  // 5. INTERACTIVE TREATMENT THEATER (MASTER-DETAIL SWITCHER)
  // ===================================================================
  const theaterTabs = document.querySelectorAll('.theater-tab-item');
  const theaterPanes = document.querySelectorAll('.theater-pane');

  if (theaterTabs.length > 0 && theaterPanes.length > 0) {
    theaterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPaneId = tab.getAttribute('data-pane');
        if (!targetPaneId) return;

        const targetPane = document.getElementById(targetPaneId);
        if (!targetPane) return;

        // Update active tab
        theaterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Transition pane
        theaterPanes.forEach(p => {
          p.classList.remove('active-pane');
        });
        targetPane.classList.add('active-pane');
      });
    });
  }

  // ===================================================================
  // 6. HERO CANVAS 3D HOVER TILT (DESKTOP)
  // ===================================================================
  const heroSection = document.getElementById('hero');
  const heroCanvas = document.getElementById('heroCanvas');

  if (heroSection && heroCanvas && window.matchMedia('(min-width: 1024px)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroCanvas.style.transform = `perspective(1000px) rotateY(${x * -6}deg) rotateX(${y * 6}deg) translateY(-4px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroCanvas.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  }

  // ===================================================================
  // 7. PRIVATE CONCIERGE BOOKING & WHATSAPP GENERATION
  // ===================================================================
  const dateInput = document.getElementById('c_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  const bookingForm = document.getElementById('conciergeBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('c_name')?.value.trim();
      const phone = document.getElementById('c_phone')?.value.trim();
      const service = document.getElementById('c_service')?.value || 'استشارة عامة في جراحة العظام والمفاصل';
      const date = document.getElementById('c_date')?.value || 'أقرب موعد متاح';
      const notes = document.getElementById('c_notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

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
