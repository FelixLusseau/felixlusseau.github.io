// Navigation hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Global elements
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navbar = document.querySelector('.navbar');
const languageSelector = document.getElementById('language-selector');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Translation system
const translations = {
    fr: {
        'nav-home': 'Accueil',
        'nav-about': 'À propos',
        'nav-skills': 'Compétences',
        'nav-projects': 'Projets',
        'nav-contact': 'Contact',
        'hero-greeting': 'Salut 👋, je suis <span class="highlight">Félix Lusseau</span>',
        'hero-title': 'Ingénieur Ops & Administrateur Systèmes',
        'hero-description': 'Ingénieur projets Ops à Citeos Solutions Digitales (Vinci Énergies), administrateur serveurs et ancien président de l\'association Informatique Télécom Strasbourg.',
        'btn-projects': 'Voir mes projets',
        'btn-contact': 'Me contacter',
        'btn-view-code': 'Voir le code',
        'btn-all-projects': 'Voir tous mes projets sur GitHub',
        'section-about': 'À propos de moi',
        'section-skills': 'Compétences techniques',
        'section-projects': 'Projets récents',
        'section-contact': 'Restons en contact',
        'contact-description': 'Vous avez un projet intéressant ou souhaitez discuter de technologies DevOps, administration système ou IRVE ? N\'hésitez pas à me contacter !',
        'contact-location': 'Localisation',
        'contact-company': 'Entreprise',
        'contact-association': 'Association',
        'footer-text': '&copy; 2025 Félix Lusseau. Fait avec ❤️ et déployé sur GitHub Pages.',
        'stat-contributions': 'Contributions',
        'stat-repositories': 'Repositories',
        'stat-followers': 'Followers'
    },
    en: {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'hero-greeting': 'Hi 👋, I\'m <span class="highlight">Félix Lusseau</span>',
        'hero-title': 'Ops Engineer & System Administrator',
        'hero-description': 'Ops Project Engineer at Citeos Solutions Digitales (Vinci Énergies), server administrator and former president of the Informatique Télécom Strasbourg association.',
        'btn-projects': 'View my projects',
        'btn-contact': 'Contact me',
        'btn-view-code': 'View code',
        'btn-all-projects': 'View all my projects on GitHub',
        'section-about': 'About me',
        'section-skills': 'Technical skills',
        'section-projects': 'Recent projects',
        'section-contact': 'Let\'s stay in touch',
        'contact-description': 'Do you have an interesting project or want to discuss DevOps technologies, system administration or IRVE? Feel free to contact me!',
        'contact-location': 'Location',
        'contact-company': 'Company',
        'contact-association': 'Association',
        'footer-text': '&copy; 2025 Félix Lusseau. Made with ❤️ and deployed on GitHub Pages.',
        'stat-contributions': 'Contributions',
        'stat-repositories': 'Repositories',
        'stat-followers': 'Followers'
    }
};

// Language functionality

// Check for saved language preference or default to French
const currentLanguage = localStorage.getItem('language') || 'fr';
body.setAttribute('data-language', currentLanguage);
if (languageSelector) {
    languageSelector.value = currentLanguage;
}

// Function to translate page
function translatePage(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });

    // Update document language
    document.documentElement.lang = language;
}

// Language selector event listener
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;

        body.setAttribute('data-language', selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
        translatePage(selectedLanguage);

        // Update typing animation if needed
        if (selectedLanguage !== currentLanguage) {
            setTimeout(() => {
                startTypingAnimation();
            }, 100);
        }
    });
}

// Initialize page translation
translatePage(currentLanguage);

// Theme toggle functionality

// Function to update navbar background
function updateNavbarBackground() {
    if (!navbar) return;

    const currentTheme = document.body.getAttribute('data-theme');
    const isScrolled = window.scrollY > 100;

    if (isScrolled) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
}

// Function to update theme icon
function updateThemeIcon(theme) {
    if (!themeIcon) return;

    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeIcon.style.color = '#f59e0b';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeIcon.style.color = '';
    }
}

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

// Initialize icon and navbar
updateThemeIcon(currentTheme);
updateNavbarBackground();

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateNavbarBackground(); // Update navbar colors

        // Add animation class
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', updateNavbarBackground);

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', updateNavbarBackground);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .detail-item, .contact-card').forEach(el => {
    observer.observe(el);
});

// Typing animation for hero title
function startTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.innerHTML; // Use innerHTML to preserve highlight span
    heroTitle.innerHTML = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 30);
        }
    };

    typeWriter();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(startTypingAnimation, 1000);
});

// Parallax effect for hero section (optimized)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;

    // Only apply parallax when hero is visible
    if (scrolled < heroHeight && hero) {
        const parallaxSpeed = scrolled * 0.25;
        hero.style.transform = `translateY(${parallaxSpeed}px)`;
    } else if (hero) {
        // Reset transform when hero is out of view
        hero.style.transform = 'translateY(0px)';
    }
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Skills hover effect with random colors
const skillTags = document.querySelectorAll('.skill-tag');
const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        tag.style.backgroundColor = randomColor;
        tag.style.color = 'white';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.backgroundColor = '';
        tag.style.color = '';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading CSS
const loadingCSS = `
body {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

body.loaded {
    opacity: 1;
}
`;

const loadingStyle = document.createElement('style');
loadingStyle.textContent = loadingCSS;
document.head.appendChild(loadingStyle);

// Performance optimization: Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Console easter egg
console.log(`
🚀 Salut ! Tu inspectes mon code ?
   
   Voici quelques infos sur ce site :
   • Fait avec HTML5, CSS3 et JavaScript vanilla
   • Design responsive et moderne avec mode sombre
   • Système de traduction FR/EN 🌍
   • Optimisé pour les performances
   • Déployable sur GitHub Pages
   • Mode sombre par défaut 🌙
   
   Raccourcis claviers :
   • Alt + T : Basculer le thème
   • Alt + L : Changer de langue
   
   GitHub: https://github.com/FelixLusseau
   LinkedIn: https://www.linkedin.com/in/felix-lusseau
   
   Développé avec ❤️ par Félix Lusseau
`);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + H = Home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + A = About
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + S = Skills
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + P = Projects
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + C = Contact
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + T = Toggle theme
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        if (themeToggle) {
            themeToggle.click();
        }
    }

    // Alt + L = Toggle language
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        if (languageSelector) {
            const currentLang = languageSelector.value;
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            languageSelector.value = newLang;
            languageSelector.dispatchEvent(new Event('change'));
        }
    }
});
