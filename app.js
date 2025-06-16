// TOLUIDINE Band Website JavaScript

// Social Media Links - Easy to modify
const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/toluidine_official',
    spotify: '#',
    youtube: '#',
    tiktok: '#'
};

// DOM Elements
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
// const impressumBtn = document.getElementById('impressumBtn');
const impressumModal = document.getElementById('impressumModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModal = document.getElementById('closeModal');
const socialLinks = document.querySelectorAll('.social-icons__link');

// Utility Functions
function formatTimeUnit(unit) {
    return unit.toString().padStart(2, '0');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Preloader
function hidePreloader() {
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Remove preloader from DOM after animation
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 400);
    }, 1000);
}

// Sticky Navigation
function handleScroll() {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    if (scrollY > heroHeight * 0.3) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
}

// Modal Functions
function openModal() {
    impressumModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunction() {
    impressumModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Social Media Links Setup
function setupSocialLinks() {
    socialLinks.forEach(link => {
        const platform = link.getAttribute('data-platform');
        if (SOCIAL_LINKS[platform]) {
            link.href = SOCIAL_LINKS[platform];
        }
        
        // Add click tracking
        link.addEventListener('click', (e) => {
            if (link.href === '#') {
                e.preventDefault();
                console.log(`${platform} link clicked - not yet configured`);
                
                // Show a temporary message
                const originalText = link.innerHTML;
                link.innerHTML = '<i class="fas fa-info-circle"></i>';
                link.style.backgroundColor = '#f59e0b';
                
                setTimeout(() => {
                    link.innerHTML = originalText;
                    link.style.backgroundColor = '';
                }, 1500);
            }
        });
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Keyboard Navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close modal with Escape key
        if (e.key === 'Escape' && impressumModal.classList.contains('active')) {
            closeModalFunction();
        }
        
        // Navigate sections with arrow keys
        if (e.altKey) {
            const sections = document.querySelectorAll('section');
            const currentSection = getCurrentSection();
            let targetIndex = -1;
            
            sections.forEach((section, index) => {
                if (section.id === currentSection) {
                    targetIndex = index;
                }
            });
            
            if (e.key === 'ArrowDown' && targetIndex < sections.length - 1) {
                e.preventDefault();
                sections[targetIndex + 1].scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' && targetIndex > 0) {
                e.preventDefault();
                sections[targetIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.scrollY + 100;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            return section.id;
        }
    }
    
    return 'home';
}

// Parallax Effect (subtle)
function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero__background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// Initialize Application
function init() {
    // Hide preloader
    hidePreloader();
       
    // Setup social media links
    setupSocialLinks();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Event Listeners
    const debouncedScroll = debounce(() => {
        handleScroll();
        handleParallax();
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    window.addEventListener('resize', debounce(handleScroll, 250));
    
    // Modal event listeners
    impressumBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunction);
    modalBackdrop.addEventListener('click', closeModalFunction);
    
    // Prevent modal content clicks from closing modal
    document.querySelector('.modal__content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Add loading class to body for initial animations
    document.body.classList.add('loaded');
    
    // Console welcome message
    console.log('%c🎵 TOLUIDINE - Official Website', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #10b981; font-size: 14px;');
    console.log(`%cCountdown Target: ${COUNTDOWN_TARGET_DATE}`, 'color: #6b7280; font-size: 12px;');
}

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Don't break the user experience, just log the error
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%cPage Load Time: ${loadTime}ms`, 'color: #8b5cf6; font-size: 12px;');
        }, 0);
    });
}

// Intersection Observer for section animations (future enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for future animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential future use
window.TOLUIDINE = {
    updateCountdownTarget: (newDate) => {
        COUNTDOWN_TARGET_DATE = newDate;
        console.log(`Countdown target updated to: ${newDate}`);
    },
    updateSocialLinks: (newLinks) => {
        Object.assign(SOCIAL_LINKS, newLinks);
        setupSocialLinks();
        console.log('Social links updated:', SOCIAL_LINKS);
    },
    openImpressum: openModal,
    closeImpressum: closeModalFunction
};

// Viele Flecken, langsam, dauerhaft verteilt
const container = document.querySelector('.dot-effect-container');

// Hilfsfunktion: Farbe interpolieren
function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `rgb(${r}, ${g}, ${b})`;
}

// Zufallswert zwischen a und b
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createDirtParticle() {
  const dot = document.createElement('div');
  dot.className = 'dot-effect-dot';

  // Position über die ganze Fläche
  const x = randomBetween(0, window.innerWidth);
  const y = randomBetween(0, window.innerHeight);
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  // Farbe zwischen Tuluidinblau und Dunkelviolett
  const color = interpolateColor('#3A66A3', '#8A2BE2', Math.random());

  // Typen von Partikeln
  const type = Math.random();

  if (type < 0.5) {
    // Feiner Punkt
    const size = randomBetween(1, 3);
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.background = color;
    dot.style.borderRadius = '50%';
    dot.style.filter = 'blur(0.5px)';
    dot.style.opacity = 0.1;
  } else {
    // Grober Fleck
    const size = randomBetween(10, 30);
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.background = `radial-gradient(circle, ${color} 30%, transparent 90%)`;
    dot.style.borderRadius = `
      ${randomBetween(30, 60)}% ${randomBetween(30, 60)}% ${randomBetween(30, 60)}% ${randomBetween(30, 60)}% /
      ${randomBetween(30, 60)}% ${randomBetween(30, 60)}% ${randomBetween(30, 60)}% ${randomBetween(30, 60)}%
    `;
    dot.style.filter = 'blur(2px)';
    dot.style.opacity = 0.05;
  }

  dot.style.animationDelay = `${randomBetween(0, 60)}s`;

  container.appendChild(dot);
  setTimeout(() => dot.remove(), 240000); // nach 240 s löschen
}

// Viele Punkte zu Beginn erzeugen
const initialDirtCount = 1000;
for (let i = 0; i < initialDirtCount; i++) {
  createDirtParticle();
}

// Optional: alle 5 Sek. neuen „Dreck“ dazufügen
setInterval(() => createDirtParticle(), 5000);

// Zielzeitpunkt als UNIX-Timestamp (in Sekunden)
const targetDate = Math.floor(new Date('2025-08-24T12:00:00').getTime() / 1000);
new FlipDown(targetDate).start();

// Audio-Button
const button = document.getElementById('audio-toggle');
const audio = document.getElementById('background-music');

const playSVG = `
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <polygon points="8,5 19,12 8,19"/>
  </svg>
`;

const pauseSVG = `
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="5" width="4" height="14"/>
    <rect x="14" y="5" width="4" height="14"/>
  </svg>
`;

// Standard-Icon setzen
button.innerHTML = playSVG;

// Audio-Play/Stop manuell per Button
button.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    button.innerHTML = pauseSVG;
  } else {
    audio.pause();
    button.innerHTML = playSVG;
  }
});

// 🟢 Automatisch starten beim ersten Klick irgendwo
let hasStarted = false;
window.addEventListener('click', function () {
  if (!hasStarted) {
    audio.muted = false; // Unmute
    audio.volume = 0.5;
    audio.play().then(() => {
      button.innerHTML = pauseSVG;
      hasStarted = true;
    }).catch(err => {
      console.log("Autoplay-Fehler:", err);
    });
  }
});
