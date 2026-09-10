// ==================== PRELOADER ====================

// Создаём прелоадер динамически
const preloader = document.createElement('div');

preloader.id = 'preloader';

preloader.innerHTML = `
  <div class="preloader-content">

    <div class="logo-container">
      <img
        src="images/mount.png"
        alt="Логотип сайта"
        class="preloader-logo"
      >
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


// Элементы прелоадера
const progressFill = preloader.querySelector('.progress-fill');
const progressText = preloader.querySelector('.progress-text');


// Переменные
let isPreloaderHidden = false;
let progress = 0;
let interval;


// ==================== ПРОГРЕСС ПРЕЛОАДЕРА ====================

function updateProgress() {

  progress += Math.random() * 3 + 1;

  if (progress >= 100) {

    progress = 100;

    clearInterval(interval);

    hidePreloader();

  }

  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }

  if (progressText) {
    progressText.textContent = `${Math.floor(progress)}%`;
  }

}


// ==================== СКРЫТИЕ ПРЕЛОАДЕРА ====================

function hidePreloader() {

  if (isPreloaderHidden) return;

  isPreloaderHidden = true;

  setTimeout(() => {

    if (!preloader) return;

    preloader.classList.add('loaded');

    setTimeout(() => {

      if (preloader && preloader.parentNode) {
        preloader.remove();
      }

    }, 500);

  }, 500);

}


// Запускаем прогресс
interval = setInterval(updateProgress, 150);


// Принудительное скрытие через 15 секунд
setTimeout(() => {

  if (
    preloader &&
    !preloader.classList.contains('loaded')
  ) {

    clearInterval(interval);

    progress = 100;

    if (progressFill) {
      progressFill.style.width = '100%';
    }

    if (progressText) {
      progressText.textContent = '100%';
    }

    hidePreloader();

  }

}, 15000);


// Скрытие после полной загрузки страницы
window.addEventListener('load', () => {

  setTimeout(() => {

    clearInterval(interval);

    if (progressFill) {
      progressFill.style.width = '100%';
    }

    if (progressText) {
      progressText.textContent = '100%';
    }

    hidePreloader();

  }, 500);

});


// ==================== ОСНОВНОЙ КОД САЙТА ====================

document.addEventListener('DOMContentLoaded', function () {


  // ==================== АНИМАЦИЯ КАРТОЧЕК ====================

  const productCards =
    document.querySelectorAll('.product-card');

  let cardObserver;

  if (productCards.length > 0) {

    cardObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('visible');

          }

        });

      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );


    productCards.forEach(card => {

      cardObserver.observe(card);

    });

  }


  // ==================== ПЛАВНЫЙ СКРОЛЛ ====================

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener('click', function (e) {

        const targetId =
          this.getAttribute('href');

        // Если это просто "#"
        if (
          targetId === '#' ||
          !targetId.startsWith('#')
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (target) {

          e.preventDefault();

          const header =
            document.querySelector('.header');

          const headerHeight =
            header ? header.offsetHeight : 0;

          window.scrollTo({

            top:
              target.offsetTop -
              headerHeight -
              20,

            behavior: 'smooth'

          });

        }

      });

    });


  // ==================== ПУЛЬСАЦИЯ КНОПКИ ====================

  const firstBuyButton =
    document.querySelector('.btn-buy');

  if (firstBuyButton) {

    setTimeout(() => {

      firstBuyButton.style.animation =
        'pulse 2s infinite';

    }, 2000);

  }


  // ==================== КНОПКИ "КУПИТЬ" ====================

  document
    .querySelectorAll('.btn-buy')
    .forEach(button => {

      button.addEventListener('click', function () {

        const productCard =
          this.closest('.product-card');

        const productName =
          productCard
            ?.querySelector('h3')
            ?.textContent
            ?.trim();

        console.log(
          'Купить:',
          productName || 'Товар'
        );

      });

    });


  // ==================== ПРОГРЕСС СКРОЛЛА ====================

  function updateScrollProgress() {

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    let scrollProgress = 0;

    if (docHeight > 0) {

      scrollProgress =
        (scrollTop / docHeight) * 100;

    }

    const bar =
      document.querySelector(
        '.scroll-progress .progress-bar'
      );

    if (bar) {

      bar.style.width =
        `${Math.min(
          Math.max(scrollProgress, 0),
          100
        )}%`;

    }

  }


  window.addEventListener(
    'scroll',
    updateScrollProgress,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    updateScrollProgress
  );

  updateScrollProgress();


});


// ==================== СОСТАВ / ОПИСАНИЕ ====================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    document
      .querySelectorAll('.section-header')
      .forEach(header => {

        const content =
          header.nextElementSibling;

        const icon =
          header.querySelector('.icon');


        // Проверяем наличие элементов
        if (!content || !icon) {
          return;
        }


        header.addEventListener(
          'click',
          () => {


            // ==================== ЗАКРЫТИЕ ====================

            if (content.style.display === 'block') {

              content.classList.remove('active');

              icon.classList.remove('rotated');

              icon.textContent = '+';


              setTimeout(() => {

                content.style.display = 'none';

              }, 500);


            }

            // ==================== ОТКРЫТИЕ ====================

            else {

              content.style.display = 'block';

              // Небольшая задержка нужна,
              // чтобы CSS-анимация успела запуститься
              requestAnimationFrame(() => {

                content.classList.add('active');

              });

              icon.classList.add('rotated');

              icon.textContent = '×';

            }

          }
        );

      });

  }
);


// ==================== MOBILE MENU ====================

const burgerBtn =
  document.querySelector('.burger-btn');

const mobileMenu =
  document.querySelector('.mobile-menu');


if (burgerBtn && mobileMenu) {


  // Открытие / закрытие меню
  burgerBtn.addEventListener(
    'click',
    () => {

      burgerBtn.classList.toggle('active');

      mobileMenu.classList.toggle('active');

    }
  );


  // Закрытие меню при нажатии
  // на ссылку внутри меню
  mobileMenu
    .querySelectorAll('a')
    .forEach(link => {

      link.addEventListener(
        'click',
        () => {

          burgerBtn.classList.remove('active');

          mobileMenu.classList.remove('active');

        }
      );

    });

}


// ==================== HEADER HIDE ON SCROLL ====================

let lastScrollY = window.scrollY;

const header =
  document.querySelector('.header');


window.addEventListener(
  'scroll',
  () => {

    if (!header) return;

    const currentScrollY =
      window.scrollY;


    // В самом верху всегда показываем header
    if (currentScrollY <= 10) {

      header.classList.remove('hide');

      lastScrollY = currentScrollY;

      return;

    }


    // Скролл вниз — скрываем
    if (currentScrollY > lastScrollY) {

      header.classList.add('hide');

    }

    // Скролл вверх — показываем
    else {

      header.classList.remove('hide');

    }


    lastScrollY = currentScrollY;

  },
  { passive: true }
);