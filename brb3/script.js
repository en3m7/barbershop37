// Функция для отправки сообщения в Telegram
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot7640965702:AAEDq5X3IthGjXoF1REtOpzqV3RuNByrp70/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: -4741180688,
                text: message,
                parse_mode: 'HTML'
            })
        });
        if (!response.ok) throw new Error('Ошибка отправки в Telegram');
    } catch (error) {
        console.error('Ошибка Telegram:', error);
    }
}

// Функция для переключения между горизонтальной навигацией и бургер-меню
function handleNavigation() {
    const scale = window.devicePixelRatio || 1;
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelector('.nav-links');
    const mainContent = document.querySelector('.main-content');

    if (scale > 2) {
        burgerMenu.style.display = 'block';
        navLinks.style.display = 'none';
        navMenu.classList.remove('open');
        mainContent.style.paddingTop = '0';
    } else {
        burgerMenu.style.display = 'none';
        navLinks.style.display = 'flex';
        navMenu.classList.remove('open');
        mainContent.style.paddingTop = '0';
    }
}

// Функция для переключения бургер-меню с анимацией
function toggleBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const mainContent = document.querySelector('.main-content');
    const isOpen = navMenu.classList.contains('open');

    if (isOpen) {
        navMenu.classList.remove('open');
        burgerMenu.classList.remove('open');
        mainContent.style.paddingTop = '0';
        navMenu.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => {
            navMenu.style.display = 'none';
        }, 300);
    } else {
        navMenu.style.display = 'block';
        navMenu.style.animation = 'slideDown 0.3s ease forwards';
        navMenu.classList.add('open');
        burgerMenu.classList.add('open');
        mainContent.style.paddingTop = `${navMenu.offsetHeight}px`;
    }
}

// Функция для корректировки отступа контента
function adjustContentPadding() {
    const navMenu = document.querySelector('.nav-menu');
    const mainContent = document.querySelector('.main-content');
    if (navMenu && navMenu.classList.contains('open')) {
        mainContent.style.paddingTop = `${navMenu.offsetHeight}px`;
    }
}

// Инициализация карусели
function initCarousel() {
    const carousel = document.querySelector('#galleryCarousel');
    const modalCarousel = document.querySelector('#modalCarousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 3000,
            wrap: true
        });
    }
    if (modalCarousel) {
        new bootstrap.Carousel(modalCarousel, {
            interval: 3000,
            wrap: true
        });
    }
}

// Функция для показа дополнительных услуг
function showMoreServices() {
    const hiddenItems = document.querySelectorAll('.service-item.hidden');
    const showMoreBtn = document.querySelector('.show-more-btn');
    let itemsShown = 0;

    hiddenItems.forEach(item => {
        if (itemsShown < 2) { // Показываем по 2 услуги за раз
            item.classList.remove('hidden');
            itemsShown++;
        }
    });

    if (hiddenItems.length === itemsShown) {
        showMoreBtn.style.display = 'none'; // Скрываем кнопку, если все услуги показаны
    }
}

// Функция для обновления прогресс-бара на странице contact.html
function updateProgressBar() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    const progress = document.querySelector('.progress');
    let filled = 0;
    if (name) filled += 33;
    if (email) filled += 33;
    if (message) filled += 34;
    progress.style.width = `${filled}%`;
}



// Инициализация всех функций при загрузке
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
    initCarousel();
    handleContactForm();

    window.addEventListener('resize', handleNavigation);
    window.addEventListener('load', handleNavigation);
    document.querySelector('.burger-menu')?.addEventListener('click', toggleBurgerMenu);

    const observer = new MutationObserver(() => {
        adjustContentPadding();
    });
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        observer.observe(navMenu, { attributes: true, childList: true, subtree: true });
    }
});