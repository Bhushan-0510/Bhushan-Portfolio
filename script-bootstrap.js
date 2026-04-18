/* ===================================================
   BHUSHAN GALGUNDE — PORTFOLIO JS
   =================================================== */

// ===== PRELOADER =====
window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});

// ===== NAVBAR: SHADOW + SCROLLED CLASS =====
const navbar = document.getElementById('mainNavbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLL WITH OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;

            window.scrollTo({ top: offsetTop, behavior: 'smooth' });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = document.querySelectorAll(
        '.skill-card, .project-card, .review-card, .contact-card, .about-card'
    );

    revealTargets.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.07}s`;
        revealObserver.observe(el);
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== NAVBAR COLLAPSE ON OUTSIDE CLICK =====
document.addEventListener('click', function (event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');

    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(event.target) && !toggler.contains(event.target)) {
            new bootstrap.Collapse(navbarCollapse).hide();
        }
    }
});

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY: KEYBOARD SUPPORT =====
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') this.click();
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey recruiter / developer!', 'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log('%c📂 GitHub: https://github.com/Bhushan-0510', 'color: #0f172a; font-size: 13px;');
console.log('%c💼 Let\'s build something — bhushangalgunde05@gmail.com', 'color: #64748b; font-size: 13px;');
