/**
 * د. هاني محمد عفيفي | استشاري جراحة العظام والمفاصل
 * Luxury Editorial Medical Brand - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const CLINIC_WHATSAPP = '20133273922'; // 0133273922

  // --- Sticky Header Scroll Effect ---
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Date Picker Min Date (Today) ---
  const dateInput = document.getElementById('pt_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // --- Booking Form Submission ---
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
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      bookingForm.reset();
    });
  }
});
