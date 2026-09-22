/**
 * عيادة د. هاني محمد عفيفي | استشاري أمراض وجراحة العظام والمفاصل
 * Dr. Hany Mohamed Afify | World-Class Orthopedic Consultant Experience
 * Bespoke Interaction & Motion Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const CLINIC_WHATSAPP = '20133273922'; // 0133273922

  // ===================================================================
  // 1. TOP SCROLL TRACER
  // ===================================================================
  const scrollTracer = document.getElementById('scrollTracer');

  function updateScrollProgress() {
    if (!scrollTracer) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    scrollTracer.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ===================================================================
  // 2. STICKY MASTER HEADER & SCROLLSPY
  // ===================================================================
  const masterHeader = document.getElementById('masterHeader');
  const navAnchors = document.querySelectorAll('.nav-anchor');
  const monitoredSections = document.querySelectorAll('section[id]');

  function handleHeaderAndScrollspy() {
    const scrollPos = window.scrollY;

    // Sticky elevation
    if (scrollPos > 35) {
      masterHeader?.classList.add('scrolled');
    } else {
      masterHeader?.classList.remove('scrolled');
    }

    // Scrollspy active highlight
    let activeSectionId = '';
    monitoredSections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeSectionId = section.getAttribute('id');
      }
    });

    if (activeSectionId) {
      navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === `#${activeSectionId}`) {
          anchor.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleHeaderAndScrollspy, { passive: true });

  // ===================================================================
  // 3. FLUID MOTION & REVEAL ENGINE
  // ===================================================================
  // Reveal initial hero elements with staggered cadence
  const initElements = document.querySelectorAll('.reveal-init');
  initElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('active-revealed');
    }, 120 * index);
  });

  // Reveal elements on scroll
  const scrollElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    scrollElements.forEach(el => revealObserver.observe(el));
  } else {
    scrollElements.forEach(el => el.classList.add('active-revealed'));
  }

  // ===================================================================
  // 4. SUBTLE 3D TILT ON HERO PORTRAIT (DESKTOP ONLY)
  // ===================================================================
  const heroSection = document.getElementById('hero');
  const portraitChassis = document.getElementById('portraitChassis');

  if (heroSection && portraitChassis && window.matchMedia('(min-width: 1024px)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      portraitChassis.style.transform = `perspective(1200px) rotateY(${x * -5}deg) rotateX(${y * 5}deg) translateY(-3px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      portraitChassis.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  }

  // ===================================================================
  // 5. PRIVATE CONSULTATION BOOKING & WHATSAPP GENERATION
  // ===================================================================
  const datePicker = document.getElementById('form_date');
  if (datePicker) {
    const today = new Date().toISOString().split('T')[0];
    datePicker.setAttribute('min', today);
  }

  const bookingForm = document.getElementById('bespokeBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form_name')?.value.trim();
      const phone = document.getElementById('form_phone')?.value.trim();
      const service = document.getElementById('form_service')?.value || 'استشارة عامة في جراحة العظام والمفاصل';
      const date = document.getElementById('form_date')?.value || 'أقرب موعد متاح';
      const notes = document.getElementById('form_notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      if (!name || !phone) {
        alert('يرجى ملء اسم المريض ورقم الهاتف لتأكيد الموعد.');
        return;
      }

      // Format WhatsApp Arabic Message
      const message = 
`*طلب حجز موعد كشف استشاري — عيادة د. هاني محمد عفيفي*
---------------------------------------
👤 *اسم المريض:* ${name}
📞 *رقم الهاتف:* ${phone}
🩺 *التخصص أو الشكوى:* ${service}
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
