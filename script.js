// CSS Cache Busting for Production
(function () {
    // Only apply cache busting in production (GitHub Pages)
    const isProduction = window.location.hostname.includes('github.io') ||
        window.location.hostname.includes('github.com') ||
        window.location.protocol === 'https:';

    if (isProduction) {
        // Version number - increment this when CSS is updated
        const CSS_VERSION = '1.0.0';

        // Find the CSS link element
        const cssLink = document.querySelector('link[href="styles.css"]');

        if (cssLink) {
            // Add version parameter to force cache refresh
            cssLink.href = `styles.css?v=${CSS_VERSION}&t=${Date.now()}`;
        }
    }
})();

// GitHub Stats Auto-Update
async function updateGitHubStats() {
    const username = 'FelixLusseau';

    try {
        // Remettre les compteurs à 0 avant l'animation
        const reposElement = document.getElementById('repositories-count');
        const followersElement = document.getElementById('followers-count');
        const contributionsElement = document.getElementById('contributions-count');

        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data'); const userData = await userResponse.json();

        // Pour les contributions, on utilise une estimation basée sur l'activité
        // L'API GitHub ne fournit pas directement les contributions des 365 derniers jours
        const estimatedContributions = await getContributionsEstimate(username);

        // Lancer l'animation immédiatement
        if (reposElement && userData.public_repos !== undefined) {
            animateCounter(reposElement, userData.public_repos);
        }

        if (followersElement && userData.followers !== undefined) {
            animateCounter(followersElement, userData.followers);
        }

        if (contributionsElement && estimatedContributions !== undefined) {
            animateCounter(contributionsElement, estimatedContributions);
        }

        console.log('GitHub stats updated:', {
            repositories: userData.public_repos,
            followers: userData.followers,
            contributions: estimatedContributions
        });

    } catch (error) {
        console.log('Erreur lors de la récupération des stats GitHub:', error);
    }
}

// Animation pour les chiffres qui changent
function animateCounter(element, finalValue) {
    if (!element || finalValue === undefined || finalValue === null) return;

    // Toujours partir de 0 pour un effet plus spectaculaire
    const startValue = 0;
    const duration = 800; // Animation plus rapide

    // Éviter l'animation si la valeur finale est 0
    if (finalValue === 0) {
        element.textContent = 0;
        return;
    }

    let startTime = null;

    function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function pour une montée rapide puis ralentissement
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(startValue + (finalValue - startValue) * easeOutQuart);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // S'assurer que la valeur finale est exacte
            element.textContent = finalValue;
        }
    }

    requestAnimationFrame(updateCounter);
}

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
        'hero-description': 'Ingénieur projets Ops à Citeos Solutions Digitales (Vinci Énergies), administrateur serveurs et ancien président de l\'association Informatique Télécom Strasbourg, webmaster de l\'association L\'Arantèle.',
        'btn-projects': 'Voir mes projets',
        'btn-contact': 'Me contacter',
        'btn-source-code': 'Code source',
        'btn-view-code': 'Voir le code',
        'btn-all-projects': 'Voir tous mes projets sur GitHub',
        'section-about': 'À propos de moi',
        'section-skills': 'Compétences techniques',
        'section-projects': 'Projets récents',
        'section-contact': 'Restons en contact',
        'contact-description': 'Vous avez un projet intéressant ou souhaitez discuter de technologies DevOps, administration système ou IRVE ? N\'hésitez pas à me contacter !',
        'contact-location': 'Localisation',
        'contact-company': 'Entreprise',
        'contact-association': 'Associations',
        'contact-sgvm': 'Saint-Gilles-Vieux-Marché.net',
        'footer-text': '&copy; 2025 Félix Lusseau. Réalisé avec GitHub Copilot et déployé sur GitHub Pages.',
        'stat-contributions': 'Contributions (365j)',
        'stat-repositories': 'Repositories',
        'stat-followers': 'Followers',
        // About section content
        'about-intro': 'Passionné par l\'infrastructure et les technologies DevOps, je travaille actuellement sur l\'IRVE (Infrastructure de Recharge pour Véhicules Électriques) à CSD et je garde un oeil sur l\'infrastructure serveurs d\'Informatique Télécom Strasbourg.',
        'about-experience-title': 'Expériences professionnelles',
        'about-experience-1': 'Stage Ingénieur Infrastructure à Arhs Developments (3 mois, été 2023)',
        'about-experience-2': 'Stage Ingénieur Projet Ops à Citeos Solutions Digitales (6 mois, 2024)',
        'about-experience-3': 'Co-administrateur des serveurs de l\'association Informatique Télécom Strasbourg',
        'about-education-title': 'Formation',
        'about-education-1': 'Diplôme d\'ingénieur en Informatique et Réseaux option Réseaux et Internet des Objets (RIO) à Télécom Physique Strasbourg',
        'about-education-2': 'Master en informatique option Science et Ingénierie des Réseaux, de l\'Internet et des Systèmes (SIRIS) à l\'UFR de Mathématique et d\'Informatique de Strasbourg',
        'about-projects-title': 'Projets actuels',
        'about-projects-1': 'Développement d\'un bot Discord en JavaScript pour gérer les clans Clash Royale de la One Punch Man Family (top 10 🇫🇷)',
        'about-projects-2': 'Configuration NixOS personnelle pour une gestion déclarative et reproductible de mes ordinateurs et serveurs.',
        // Skills categories
        'skills-programming': 'Langages de programmation',
        'skills-sysadmin': 'Administration système',
        'skills-devops': 'DevOps & Monitoring',
        'skills-frameworks': 'Frameworks & Outils',
        // Project descriptions
        'project-opm-description': 'Bot Discord pour gérer les clans et guerres de clans Clash Royale de la One Punch Man Family (top 10 🇫🇷).',
        'project-nix-description': 'Ma configuration NixOS personnelle avec Flakes pour une gestion déclarative et reproductible du système.',
        'project-rapace-description': 'Projet du cours de Réseaux Programmables implémentant des concepts avancés de networking sur des équipement programmables dans le langage P4.',
        'project-proxy-description': 'Proxy développé en Rust pour la conversion entre protocoles HTTP et CoAP.',
        'project-pacman-description': 'Implémentation du jeu Pacman en C++ avec interface graphique et gestion des collisions.',
        'project-ansible-description': 'Configuration Ansible pour déployer Traefik avec authentification LDAP automatisée.'
    },
    en: {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'hero-greeting': 'Hi 👋, I\'m <span class="highlight">Félix Lusseau</span>',
        'hero-title': 'Ops Engineer & System Administrator',
        'hero-description': 'Ops Project Engineer at Citeos Solutions Digitales (Vinci Énergies), server administrator and former president of the Informatique Télécom Strasbourg association, webmaster of L\'Arantèle association.',
        'btn-projects': 'View my projects',
        'btn-contact': 'Contact me',
        'btn-source-code': 'Source code',
        'btn-view-code': 'View code',
        'btn-all-projects': 'View all my projects on GitHub',
        'section-about': 'About me',
        'section-skills': 'Technical skills',
        'section-projects': 'Recent projects',
        'section-contact': 'Let\'s stay in touch',
        'contact-description': 'Do you have an interesting project or want to discuss DevOps technologies, system administration or IRVE? Feel free to contact me!',
        'contact-location': 'Location',
        'contact-company': 'Company',
        'contact-association': 'Associations',
        'contact-sgvm': 'Saint-Gilles-Vieux-Marché.net',
        'footer-text': '&copy; 2025 Félix Lusseau. Made with GitHub Copilot and deployed on GitHub Pages.',
        'stat-contributions': 'Contributions (365d)',
        'stat-repositories': 'Repositories',
        'stat-followers': 'Followers',
        // About section content
        'about-intro': 'Passionate about infrastructure and DevOps technologies, I currently work on IRVE (Electric Vehicle Charging Infrastructure) at CSD and keep an eye on the server infrastructure of Informatique Télécom Strasbourg.',
        'about-experience-title': 'Professional Experience',
        'about-experience-1': 'Infrastructure Engineer Internship at Arhs Developments (3 months, summer 2023)',
        'about-experience-2': 'Ops Project Engineer Internship at Citeos Solutions Digitales (6 months, 2024)',
        'about-experience-3': 'Co-administrator of Informatique Télécom Strasbourg association servers',
        'about-education-title': 'Education',
        'about-education-1': 'Engineering degree in Computer Science and Networks with Networks and Internet of Things (RIO) option at Télécom Physique Strasbourg',
        'about-education-2': 'Master\'s degree in computer science with Networks, Internet and Systems Science and Engineering (SIRIS) option at UFR of Mathematics and Computer Science of Strasbourg',
        'about-projects-title': 'Current Projects',
        'about-projects-1': 'Development of a JavaScript Discord bot to manage Clash Royale clans of the One Punch Man Family (top 10 🇫🇷)',
        'about-projects-2': 'Personal NixOS configuration for a declarative and reproducible management of my computers and servers.',
        // Skills categories
        'skills-programming': 'Programming Languages',
        'skills-sysadmin': 'System Administration',
        'skills-devops': 'DevOps & Monitoring',
        'skills-frameworks': 'Frameworks & Tools',
        // Project descriptions
        'project-opm-description': 'Discord bot to manage Clash Royale clans and clan wars for the One Punch Man Family (top 10 🇫🇷).',
        'project-nix-description': 'My personal NixOS configuration with Flakes for declarative and reproducible system management.',
        'project-rapace-description': 'Programmable Networks course project implementing advanced networking concepts on programmable equipment using P4 language.',
        'project-proxy-description': 'Proxy developed in Rust for conversion between HTTP and CoAP protocols.',
        'project-pacman-description': 'Pacman game implementation in C++ with graphical interface and collision management.',
        'project-ansible-description': 'Ansible configuration to deploy Traefik with automated LDAP authentication.'
    }
};

// Fonction pour estimer/récupérer les contributions GitHub
async function getContributionsEstimate(username) {
    try {
        // Méthode 1: Parsing de la page GitHub du profil
        const contributionsFromProfile = await getContributionsFromProfile(username);
        if (contributionsFromProfile !== null) {
            return contributionsFromProfile;
        }

        // Méthode 2: Estimation basée sur l'activité des repos (fallback)
        const estimatedContributions = await getContributionsFromRepos(username);
        return estimatedContributions;

    } catch (error) {
        console.log('Erreur lors de la récupération des contributions:', error);
        // Fallback: retourner une estimation conservative
        return 500;
    }
}

// Méthode 1: Parsing de la page GitHub du profil
async function getContributionsFromProfile(username) {
    try {
        // Utiliser un proxy CORS pour accéder à la page GitHub
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://github.com/${username}`)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Failed to fetch profile page');

        const html = await response.text();

        // Rechercher le pattern des contributions dans le HTML
        // GitHub affiche généralement "X contributions in the last year"
        const contributionMatch = html.match(/(\d+)\s+contributions?\s+in\s+the\s+last\s+year/i);
        if (contributionMatch) {
            return parseInt(contributionMatch[1], 10);
        }

        // Pattern alternatif
        const altMatch = html.match(/data-count="(\d+)"/);
        if (altMatch) {
            // Compter tous les data-count et faire une somme approximative
            const matches = html.match(/data-count="(\d+)"/g);
            if (matches) {
                const total = matches.reduce((sum, match) => {
                    const count = parseInt(match.match(/\d+/)[0], 10);
                    return sum + count;
                }, 0);
                return total;
            }
        }
    } catch (error) {
        console.log('Profile parsing method failed:', error);
    }
    return null;
}

// Méthode 2: Estimation basée sur l'activité des repos
async function getContributionsFromRepos(username) {
    try {
        // Récupérer les repos de l'utilisateur
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');

        const repos = await reposResponse.json();

        // Estimer les contributions basées sur l'activité des repos
        let estimatedContributions = 0;
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        for (const repo of repos.slice(0, 20)) { // Limiter pour éviter trop de requêtes
            if (new Date(repo.updated_at) > oneYearAgo) {
                // Estimer basé sur la taille et l'activité du repo
                const sizeEstimate = Math.min(repo.size / 100, 50); // Max 50 contributions par repo basé sur la taille
                const recentActivity = new Date(repo.updated_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? 20 : 5;
                estimatedContributions += Math.floor(sizeEstimate + recentActivity);
            }
        }

        // Ajouter une base pour l'activité générale
        estimatedContributions += repos.length * 10; // 10 contributions estimées par repo

        // S'assurer d'avoir un minimum raisonnable
        return Math.max(estimatedContributions, 200);

    } catch (error) {
        console.log('Repository estimation method failed:', error);
        return 500; // Valeur par défaut conservative
    }
}

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
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe elements for animation, but first check if they're already visible
const elementsToObserve = document.querySelectorAll('.skill-category, .project-card, .detail-item, .contact-card');
elementsToObserve.forEach(el => {
    // Check if element is already in viewport on page load
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
        // Element is already visible, animate immediately
        el.classList.add('fade-in-up');
    } else {
        // Element is not visible, observe it
        observer.observe(el);
    }
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
    setTimeout(updateGitHubStats, 2000); // Décaler un peu pour éviter la surcharge
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
