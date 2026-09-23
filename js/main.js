/**
 * عيادة د. هاني محمد عفيفي | استشاري أمراض وجراحة العظام والمفاصل
 * Dr. Hany Mohamed Afify | Ultra-Luxury VIP Concierge Orthopedic Brand
 * Clean-Slate Luxury Motion & Showcase Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const CLINIC_WHATSAPP = '20133273922'; // 0133273922

  // ===================================================================
  // 1. TOP SCROLL GOLD TRACER
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
  // 2. STICKY ROYAL HEADER & SCROLLSPY
  // ===================================================================
  const royalHeader = document.getElementById('royalHeader');
  const royalNavLinks = document.querySelectorAll('.royal-nav-link');
  const monitoredSections = document.querySelectorAll('section[id]');

  function handleHeaderAndScrollspy() {
    const scrollPos = window.scrollY;

    // Header elevation on scroll
    if (scrollPos > 35) {
      royalHeader?.classList.add('scrolled');
    } else {
      royalHeader?.classList.remove('scrolled');
    }

    // Scrollspy active anchor
    let activeSectionId = '';
    monitoredSections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeSectionId = section.getAttribute('id');
      }
    });

    if (activeSectionId) {
      royalNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleHeaderAndScrollspy, { passive: true });

  // ===================================================================
  // 3. CURATED LUXURY SPECIALTY SHOWCASE (TABS SWITCHER)
  // ===================================================================
  const tabButtons = document.querySelectorAll('.showcase-tab-btn');
  const showcasePanes = document.querySelectorAll('.showcase-pane');

  if (tabButtons.length > 0 && showcasePanes.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;

        const targetPane = document.getElementById(targetId);
        if (!targetPane) return;

        // Update active tab button
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Switch active pane smoothly
        showcasePanes.forEach(pane => {
          pane.classList.remove('active-pane');
        });
        targetPane.classList.add('active-pane');
      });
    });
  }

  // ===================================================================
  // 4. MOTION & REVEAL CADENCE
  // ===================================================================
  // Staggered entrance for hero elements
  const initElements = document.querySelectorAll('.reveal-elem');
  initElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 130 * index);
  });

  // IntersectionObserver for scroll-triggered elements
  const scrollElements = document.querySelectorAll('.reveal-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    scrollElements.forEach(el => observer.observe(el));
  } else {
    scrollElements.forEach(el => el.classList.add('revealed'));
  }

  // ===================================================================
  // 5. SUBTLE 3D TILT ON PORTRAIT CHASSIS (DESKTOP)
  // ===================================================================
  const heroSection = document.getElementById('hero');
  const portraitFrame = document.getElementById('portraitFrame');

  if (heroSection && portraitFrame && window.matchMedia('(min-width: 1024px)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      portraitFrame.style.transform = `perspective(1200px) rotateY(${x * -5}deg) rotateX(${y * 5}deg) translateY(-3px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      portraitFrame.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  }

  // ===================================================================
  // 6. VIP CONCIERGE APPOINTMENT & WHATSAPP GENERATION
  // ===================================================================
  const dateInput = document.getElementById('f_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  const appointmentForm = document.getElementById('vipAppointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('f_name')?.value.trim();
      const phone = document.getElementById('f_phone')?.value.trim();
      const service = document.getElementById('f_service')?.value || 'استشارة عامة في جراحة العظام والمفاصل';
      const date = document.getElementById('f_date')?.value || 'أقرب موعد متاح';
      const notes = document.getElementById('f_notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      if (!name || !phone) {
        alert('يرجى ملء اسم المريض ورقم الهاتف لتأكيد الموعد.');
        return;
      }

      // Format WhatsApp Arabic Message
      const message = 
`*طلب حجز موعد استشاري خاص — عيادة د. هاني محمد عفيفي*
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
      appointmentForm.reset();
    });
  }
});
