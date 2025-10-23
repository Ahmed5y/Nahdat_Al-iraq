// أنيميشن ظهور العناصر
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}










// تفعيل التمرير السلس للروابط الداخلية
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // يغيّر الرابط بالأعلى بدون إعادة تحميل الصفحة
      history.pushState(null, '', `#${targetId}`);
    }
  });
});



// Loader control
(function(){
  const loader = document.getElementById('app-loader');
  if(!loader) return;

  // خيار: إظهار اللودر فقط بأول زيارة خلال الجلسة
  const FIRST_ONLY = false; // خلّيه true إذا تريد مرّة وحدة
  if (FIRST_ONLY && sessionStorage.getItem('seen_loader')) {
    loader.remove();
    return;
  }

  const hide = () => {
    if (!loader) return;
    loader.classList.add('hidden');
    // بعد الفيد آوت نشيل العنصر نهائيًا
    setTimeout(() => loader.remove(), 400);
    sessionStorage.setItem('seen_loader', '1');
  };

  // يختفي بعد تحميل كل الموارد (صور وغيره)
  window.addEventListener('load', hide);

  // فشل آمن: حتى لو صار شي، اختفِ بعد 4 ثواني
  setTimeout(hide, 4000);
})();

