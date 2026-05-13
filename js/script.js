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

let isPreloaderHidden = false; // Флаг состояния прелоадера
let progress = 0;
let interval;

// Функция обновления прогресса
function updateProgress() {
  progress += Math.random() * 3 + 1; // Плавное увеличение: 1–4 % за шаг (было 2–10 %)

  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    hidePreloader();
  }

  // Обновляем оба элемента одновременно для идеальной синхронизации
  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
  if (progressText) {
    progressText.textContent = `${Math.floor(progress)}%`;
  }
}

// Функция скрытия прелоадера
function hidePreloader() {
  if (isPreloaderHidden) return; // Если уже скрыт — выходим
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
interval = setInterval(updateProgress, 150); // Каждые 150 мс вместо 100 мс — более плавная анимация

// Принудительное скрытие через 15 секунд (защита от зависаний)
setTimeout(() => {
  if (preloader && !preloader.classList.contains('loaded')) {
    clearInterval(interval); // Очищаем интервал
    progress = 100;
    if (progressFill) progressFill.style.width = '100%';
    if (progressText) progressText.textContent = '100%';
    hidePreloader();
  }
}, 15000); // Увеличили время с 10 до 15 секунд

// Дополнительная проверка на загрузку всех ресурсов
window.addEventListener('load', () => {
  setTimeout(() => {
    clearInterval(interval); // Очищаем интервал
    hidePreloader();
  }, 500);
});

// Скрипт для лендинга: анимации и интерактивность
document.addEventListener('DOMContentLoaded', function() {
  // 1. Анимация появления карточек товаров при скролле
  const productCards = document.querySelectorAll('.product-card');
  let cardObserver;

  if (productCards.length > 0) {
    cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    productCards.forEach(card => {
      cardObserver.observe(card);
    });
  }

  // 2. Плавный скролл для навигации
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Дополнительная анимация: пульсация первой кнопки «Купить»
  const firstBuyButton = document.querySelector('.btn-buy');
  if (firstBuyButton) {
    setTimeout(() => {
      firstBuyButton.style.animation = 'pulse 2s infinite';
    }, 2000);
  }

  // 4. Обработка нажатия кнопок «Купить»
  document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function() {
      console.log('Нажата кнопка "Купить" для товара:', this.closest('.product-card').querySelector('h3').textContent);
    });
  });

  // Функция обновления анимации при изменении размера окна
  window.addEventListener('resize', function() {
    if (!cardObserver) return;
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      if (!card.classList.contains('visible')) {
        cardObserver.unobserve(card);
        cardObserver.observe(card);
      }
    });
  });
});

// Прогресс‑бар при скролле (прогресс‑бар в верхней части экрана)
window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress); // При изменении размера окна

function updateScrollProgress() {
  // Получаем текущую позицию скролла
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Полная высота документа
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Рассчитываем процент прокрутки
  let progress = 0;
  if (docHeight > 0) {
    progress = (scrollTop / docHeight) * 100;
  }

  // Ограничиваем значение 0–100 %
  progress = Math.min(Math.max(progress, 0), 100);

  // Обновляем ширину прогресс‑бара
  const scrollProgressBar = document.querySelector('.scroll-progress .progress-bar');
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${progress}%`;
  }
}

// Инициализируем при загрузке страницы
document.addEventListener('DOMContentLoaded', updateScrollProgress);
const scrollProgressBar = document.querySelector('.scroll-progress .progress-bar');
    if (scrollProgressBar) {
      scrollProgressBar.style.width = ${progress}%;
    }
  }

  // Инициализация прогресс-бара
  updateScrollProgress();
});
