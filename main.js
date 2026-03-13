// Language management
let currentLang = localStorage.getItem('boofa-lang') || 'zh';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('boofa-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = i18n[lang][key];
    if (text == null) return;
    if (el.tagName === 'META') {
      el.content = text;
    } else if (el.tagName === 'TITLE') {
      el.textContent = text;
    } else {
      // Handle newlines as <br>
      el.innerHTML = text.replace(/\n/g, '<br>');
    }
  });

  // Update lang toggle button
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';

  // Update app screenshot based on language
  const screenshot = document.querySelector('.demo-boofa-img');
  if (screenshot) {
    screenshot.src = lang === 'zh'
      ? screenshot.dataset.screenshotZh
      : screenshot.dataset.screenshotEn;
  }

  // Update page title & meta
  document.title = i18n[lang].page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = i18n[lang].page_desc;
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'zh' ? 'en' : 'zh');
});

// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Nav scroll state
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Init
applyLang(currentLang);
