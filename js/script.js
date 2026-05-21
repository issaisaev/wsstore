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
// ==================== КАРУСЕЛЬ ТОВАРОВ + СВАЙП ====================
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.carousel').forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prev = carousel.querySelector('.prev');
        const next = carousel.querySelector('.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        if (!inner || items.length === 0) return;

        let currentIndex = 0;
        const totalSlides = items.length;
        let startX = 0;
        let isDragging = false;

        // Создаём точки
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            }
        }
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        // Кнопки
        next?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prev?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        // === СВАЙП ПАЛЬЦЕМ ===
        inner.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        inner.addEventListener('touchmove', e => {
            if (!isDragging) return;
        });

        inner.addEventListener('touchend', e => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (diff > 50) { // свайп влево
                currentIndex = (currentIndex + 1) % totalSlides;
            } else if (diff < -50) { // свайп вправо
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            }
            
            updateCarousel();
            isDragging = false;
        });

        // Автолистание
        let autoInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);

        carousel.addEventListener('mouseenter', () => clearInterval(autoInterval));
        carousel.addEventListener('mouseleave', () => {
            autoInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }, 5000);
        });

        // Инициализация
        updateCarousel();
    });
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section-header').forEach(header => {
    const content = header.nextElementSibling; // Блок с контентом (текст под заголовком)
    const icon = header.querySelector('.icon'); // Иконка «+»/«×»

    header.addEventListener('click', () => {
      // Проверяем, открыт ли уже блок
      if (content.style.display === 'block') {
        // Закрываем блок: убираем класс active для плавного затухания
        content.classList.remove('active');
        icon.classList.remove('rotated');
        icon.textContent = '+';

        // Ждём завершения анимации (0.5 с) перед скрытием элемента
        setTimeout(() => {
          content.style.display = 'none';
        }, 500); // 500 мс = длительность transition в CSS
      } else {
        // Открываем блок: показываем контент и запускаем анимацию
        content.style.display = 'block';
        content.classList.add('active');
        icon.classList.add('rotated');
        icon.textContent = '×';
      }
    });
  });
});
// ==================== HERO VIDEO ====================

document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.querySelector('.hero-video');

  if (heroVideo) {

    // Форсируем autoplay на мобильных
    heroVideo.play().catch(() => {});

    // Если видео зависло — перезапуск
    heroVideo.addEventListener('ended', () => {
      heroVideo.play();
    });

  }
});
// ==================== HERO PARALLAX ====================

window.addEventListener('scroll', () => {

  const hero = document.querySelector('.hero-section');
  const video = document.querySelector('.hero-video');
  const content = document.querySelector('.hero-content');

  if (!hero || !video || !content) return;

  const scrollY = window.scrollY;

  video.style.transform =
    `scale(1.08) translateY(${scrollY * 0.15}px)`;

  content.style.transform =
    `translateY(${scrollY * 0.25}px)`;

});