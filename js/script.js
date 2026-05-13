// Создаём прелоадер динамически
const preloader = document.createElement('div');
preloader.id = 'preloader';
preloader.innerHTML = `
  <div class="preloader-content">
    <div class="logo-container">
      <img src="images/mount.png" alt="Логотип сайта" class="preloader-logo">
    </div>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <div class="progress-text">0%</div>
    </div>
  </div>
`;
document.body.appendChild(preloader);

const progressFill = preloader.querySelector('.progress-fill');
const progressText = preloader.querySelector('.progress-text');

let isPreloaderHidden = false;
let progress = 0;
let interval;

// Функция обновления прогресса прелоадера
function updateProgress() {
  progress += Math.random() * 3 + 1;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    hidePreloader();
  }
  if (progressFill) progressFill.style.width = `${progress}%`;
  if (progressText) progressText.textContent = `${Math.floor(progress)}%`;
}

// Функция скрытия прелоадера
function hidePreloader() {
  if (isPreloaderHidden) return;
  isPreloaderHidden = true;
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.remove();
        }
      }, 500);
    }
  }, 500);
}

// Запускаем анимацию прогресса
interval = setInterval(updateProgress, 150);

// Принудительное скрытие через 15 секунд
setTimeout(() => {
  if (preloader && !preloader.classList.contains('loaded')) {
    clearInterval(interval);
    progress = 100;
    if (progressFill) progressFill.style.width = '100%';
    if (progressText) progressText.textContent = '100%';
    hidePreloader();
  }
}, 15000);

// Скрытие после полной загрузки
window.addEventListener('load', () => {
  setTimeout(() => {
    clearInterval(interval);
    hidePreloader();
  }, 500);
});

// ====================== ОСНОВНОЙ КОД САЙТА ======================
document.addEventListener('DOMContentLoaded', function() {

  // Анимация карточек
  const productCards = document.querySelectorAll('.product-card');
  let cardObserver;
  if (productCards.length > 0) {
    cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    productCards.forEach(card => cardObserver.observe(card));
  }

  // Плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // Пульсация кнопки
  const firstBuyButton = document.querySelector('.btn-buy');
  if (firstBuyButton) {
    setTimeout(() => firstBuyButton.style.animation = 'pulse 2s infinite', 2000);
  }

  // Кнопки "Купить"
  document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function() {
      const name = this.closest('.product-card')?.querySelector('h3')?.textContent;
      console.log('Купить:', name);
    });
  });

  // Прогресс-бар скролла
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    const bar = document.querySelector('.scroll-progress .progress-bar');
    if (bar) bar.style.width = `${Math.min(Math.max(scrollProgress, 0), 100)}%`;
  }

  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();
});
