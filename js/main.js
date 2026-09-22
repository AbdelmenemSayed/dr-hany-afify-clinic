/**
 * عيادة د. هاني محمد عفيفي - استشاري أمراض وجراحة العظام
 * Dr. Hany Mohamed Afify Orthopedic Clinic
 * Main Interactive JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants & Clinic Data ---
  const CLINIC_WHATSAPP = '20133273922'; // 0133273922
  const CLINIC_PHONE = '0133273922';

  // --- Sticky Header on Scroll ---
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Mobile Navigation Menu ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Modal Booking System ---
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const modalServiceSelect = document.getElementById('modalService');

  window.openBookingModal = function(serviceName = '') {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (serviceName && modalServiceSelect) {
        for (let i = 0; i < modalServiceSelect.options.length; i++) {
          if (modalServiceSelect.options[i].text.includes(serviceName) || modalServiceSelect.options[i].value === serviceName) {
            modalServiceSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  };

  window.closeBookingModal = function() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
    }
  });

  // Attach modal trigger to buttons with data-service or .open-booking-modal
  document.querySelectorAll('.trigger-booking-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  // --- Form Handling & WhatsApp Integration ---
  function handleBookingSubmit(form, isModal = false) {
    const name = form.querySelector('[name="patient_name"]')?.value.trim();
    const phone = form.querySelector('[name="patient_phone"]')?.value.trim();
    const service = form.querySelector('[name="service_type"]')?.value || 'استشارة عامة في العظام والمفاصل';
    const appointmentDate = form.querySelector('[name="preferred_date"]')?.value || 'أقرب موعد متاح';
    const notes = form.querySelector('[name="patient_notes"]')?.value.trim() || 'لا توجد ملاحظات إضافية';

    // Validation
    if (!name || !phone) {
      showToast('يرجى كتابة الاسم ورقم الهاتف لإتمام الحجز', 'error');
      return;
    }

    if (phone.length < 8) {
      showToast('يرجى إدخال رقم هاتف صحيح', 'error');
      return;
    }

    // Format Arabic message for WhatsApp
    const message = 
`*طلب حجز موعد كشف - عيادة د. هاني محمد عفيفي*
---------------------------------------
👤 *اسم المريض:* ${name}
📞 *رقم الهاتف:* ${phone}
🩺 *الخدمة المطلوبة:* ${service}
📅 *الموعد المقترح:* ${appointmentDate}
📝 *تفاصيل الشكوى:* ${notes}
---------------------------------------
تم الإرسال عبر الموقع الإلكتروني للعيادة.`;

    const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;

    // Show success feedback
    showToast('جارٍ تحويلك إلى واتساب العيادة لتأكيد الموعد...', 'success');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
      if (isModal) {
        closeBookingModal();
      }
    }, 900);
  }

  // Bind Section Booking Form
  const mainBookingForm = document.getElementById('mainBookingForm');
  if (mainBookingForm) {
    mainBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleBookingSubmit(mainBookingForm, false);
    });
  }

  // Bind Modal Booking Form
  const modalBookingForm = document.getElementById('modalBookingForm');
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleBookingSubmit(modalBookingForm, true);
    });
  }

  // --- Toast Notification Helper ---
  function showToast(message, type = 'success') {
    let toast = document.getElementById('clinicToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'clinicToast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    const iconSvg = type === 'success' 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Set today's date as min for date pickers
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(picker => {
    picker.setAttribute('min', today);
  });
});
