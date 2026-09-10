document.addEventListener('DOMContentLoaded', function () {

    // ==================== PRELOADER ====================

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


    const progressFill =
        preloader.querySelector('.progress-fill');

    const progressText =
        preloader.querySelector('.progress-text');


    let progress = 0;
    let isHidden = false;


    function hidePreloader() {

        if (isHidden) return;

        isHidden = true;

        preloader.classList.add('loaded');

        setTimeout(() => {

            if (preloader.parentNode) {
                preloader.remove();
            }

        }, 600);

    }


    function updateProgress() {

        if (isHidden) return;

        progress += Math.random() * 4 + 1;

        if (progress >= 100) {
            progress = 100;
        }

        if (progressFill) {
            progressFill.style.width = progress + '%';
        }

        if (progressText) {
            progressText.textContent =
                Math.floor(progress) + '%';
        }

        if (progress >= 100) {
            clearInterval(progressInterval);

            setTimeout(hidePreloader, 300);
        }

    }


    const progressInterval =
        setInterval(updateProgress, 150);


    // На случай ошибки загрузки
    setTimeout(() => {

        clearInterval(progressInterval);

        if (progressFill) {
            progressFill.style.width = '100%';
        }

        if (progressText) {
            progressText.textContent = '100%';
        }

        hidePreloader();

    }, 10000);


    // ==================== BURGER ====================

    const burgerBtn =
        document.querySelector('.burger-btn');

    const mobileMenu =
        document.querySelector('.mobile-menu');


    if (burgerBtn && mobileMenu) {

        burgerBtn.addEventListener('click', function (e) {

            e.preventDefault();
            e.stopPropagation();

            burgerBtn.classList.toggle('active');

            mobileMenu.classList.toggle('active');

        });


        const mobileLinks =
            mobileMenu.querySelectorAll('a');


        mobileLinks.forEach(link => {

            link.addEventListener('click', function () {

                burgerBtn.classList.remove('active');

                mobileMenu.classList.remove('active');

            });

        });

    }


    // ==================== СОСТАВ / ОПИСАНИЕ ====================

    const sectionHeaders =
        document.querySelectorAll('.section-header');


    sectionHeaders.forEach(header => {

        header.addEventListener('click', function (e) {

            e.preventDefault();

            e.stopPropagation();


            const content =
                this.nextElementSibling;

            const icon =
                this.querySelector('.icon');


            if (!content) return;


            const isOpen =
                content.classList.contains('active');


            if (isOpen) {

                content.classList.remove('active');

                if (icon) {
                    icon.classList.remove('rotated');
                    icon.textContent = '+';
                }

                setTimeout(() => {

                    if (
                        !content.classList.contains('active')
                    ) {
                        content.style.display = 'none';
                    }

                }, 500);

            }

            else {

                content.style.display = 'block';

                // Запускаем CSS-анимацию
                requestAnimationFrame(() => {
                    content.classList.add('active');
                });


                if (icon) {
                    icon.classList.add('rotated');
                    icon.textContent = '×';
                }

            }

        });

    });


    // ==================== КНОПКА КУПИТЬ ====================

    const buyButtons =
        document.querySelectorAll('.btn-buy');


    buyButtons.forEach(button => {

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

    const scrollBar =
        document.querySelector(
            '.scroll-progress .progress-bar'
        );


    function updateScrollProgress() {

        if (!scrollBar) return;


        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        let percentage = 0;


        if (documentHeight > 0) {

            percentage =
                (scrollTop / documentHeight) * 100;

        }


        percentage =
            Math.min(
                Math.max(percentage, 0),
                100
            );


        scrollBar.style.width =
            percentage + '%';

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


    // ==================== HEADER HIDE ON SCROLL ====================

    const header =
        document.querySelector('.header');


    let lastScrollY =
        window.scrollY;


    if (header) {

        window.addEventListener(
            'scroll',
            function () {

                const currentScrollY =
                    window.scrollY;


                // В самом верху показываем
                if (currentScrollY <= 10) {

                    header.classList.remove('hide');

                    lastScrollY =
                        currentScrollY;

                    return;

                }


                // Скроллим вниз
                if (
                    currentScrollY >
                    lastScrollY
                ) {

                    header.classList.add('hide');

                }

                // Скроллим вверх
                else {

                    header.classList.remove('hide');

                }


                lastScrollY =
                    currentScrollY;

            },
            { passive: true }
        );

    }


    // ==================== ПЛАВНЫЙ СКРОЛЛ ====================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                'click',
                function (e) {

                    const targetId =
                        this.getAttribute('href');


                    if (
                        !targetId ||
                        targetId === '#'
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(targetId);


                    if (!target) return;


                    e.preventDefault();


                    const header =
                        document.querySelector('.header');


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    window.scrollTo({

                        top:
                            target.offsetTop -
                            headerHeight -
                            20,

                        behavior: 'smooth'

                    });

                }
            );

        });


    // ==================== ПУЛЬС КНОПКИ ====================

    const firstBuyButton =
        document.querySelector('.btn-buy');


    if (firstBuyButton) {

        setTimeout(() => {

            firstBuyButton.style.animation =
                'pulse 2s infinite';

        }, 2000);

    }

});