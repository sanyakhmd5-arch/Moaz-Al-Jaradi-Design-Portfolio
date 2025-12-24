// ========================================
// Mobile Safety Reset - FORCE CLOSE ON LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Force close mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        // Ensure it's visually hidden
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.pointerEvents = 'none';
    }
    
    // Reset body overflow immediately
    document.body.style.overflow = '';
    document.body.style.position = '';
    
    // Handle loading screen properly
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Add failsafe timer
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            // Completely remove after transition
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, 1000);
    }
    
    // Additional safety check after page load
    setTimeout(() => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 2000);
});

// ========================================
// Mobile Menu Toggle - ENHANCED VERSION
// ========================================
const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    if (!mobileMenu) return;
    
    mobileMenu.classList.add('active');
    // Ensure proper styles
    mobileMenu.style.transform = 'translateX(0)';
    mobileMenu.style.visibility = 'visible';
    mobileMenu.style.pointerEvents = 'auto';
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    
    mobileMenu.classList.remove('active');
    // Reset styles
    mobileMenu.style.transform = 'translateX(100%)';
    mobileMenu.style.visibility = 'hidden';
    mobileMenu.style.pointerEvents = 'none';
    
    // Unlock body scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

if (mobileMenuToggleBtn) {
    mobileMenuToggleBtn.addEventListener('click', openMobileMenu);
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// Close menu when a link is clicked
if (mobileNavLinks) {
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = window.innerWidth > 991 ? 80 : 100;
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - offset,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        });
    });
}

// ========================================
// Window Resize Safety Reset
// ========================================
window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
        closeMobileMenu();
    }
});

// ========================================
// Hide loading screen - ENHANCED VERSION
// ========================================
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            // Remove from DOM completely
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }
    }, 1500);
});

// ========================================
// Page Visibility Change Safety Reset
// ========================================
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again
        setTimeout(() => {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 100);
    }
});

// ========================================
// Touch Move Safety for Mobile
// ========================================
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && !mobileMenu.classList.contains('active')) {
        // Allow normal scrolling when menu is closed
        return;
    }
    
    // Prevent scrolling when menu is open (except for menu content)
    const touchY = e.touches[0].clientY;
    const menuContent = document.querySelector('.mobile-menu-content');
    
    if (menuContent) {
        const rect = menuContent.getBoundingClientRect();
        if (touchY < rect.top || touchY > rect.bottom) {
            e.preventDefault();
        }
    }
}, { passive: false });

// ========================================
// Orientation Change Safety Reset
// ========================================
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        closeMobileMenu();
    }, 100);
});

// ========================================
// Initialize AOS
// ========================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========================================
// Language Toggle
// ========================================
const langToggle = document.getElementById('langToggle');
const body = document.body;

if (localStorage.getItem('language') === 'en') {
    body.classList.add('en');
    body.setAttribute('dir', 'ltr');
    if (langToggle) langToggle.checked = true;
    updateLanguage('en');
}

if (langToggle) {
    langToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('en');
            body.setAttribute('dir', 'ltr');
            localStorage.setItem('language', 'en');
            updateLanguage('en');
        } else {
            body.classList.remove('en');
            body.setAttribute('dir', 'rtl');
            localStorage.setItem('language', 'ar');
            updateLanguage('ar');
        }
    });
}

function updateLanguage(lang) {
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-ar');
        }
    });
    
    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]').forEach(element => {
        if (lang === 'en') {
            element.placeholder = element.getAttribute('data-en-placeholder');
        } else {
            element.placeholder = element.getAttribute('data-ar-placeholder');
        }
    });
}

// ========================================
// Theme Toggle (Dark is default)
// ========================================
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

if (localStorage.getItem('theme') === 'light') {
    body.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.checked = true;
    if (mobileThemeToggle) mobileThemeToggle.checked = true;
} else {
    body.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.checked = false;
    if (mobileThemeToggle) mobileThemeToggle.checked = false;
    localStorage.setItem('theme', 'dark');
}

function toggleTheme(isLight) {
    if (isLight) {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('change', function() {
        toggleTheme(this.checked);
        if (mobileThemeToggle) mobileThemeToggle.checked = this.checked;
    });
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('change', function() {
        toggleTheme(this.checked);
        if (themeToggle) themeToggle.checked = this.checked;
    });
}

// ========================================
// Banner Slider
// ========================================
const bannerSlides = document.querySelectorAll('.banner-slide');
let currentSlide = 0;

function showSlide(index) {
    if (bannerSlides.length === 0) return;
    
    bannerSlides.forEach(slide => slide.classList.remove('active'));
    bannerSlides[index].classList.add('active');
}

function nextSlide() {
    if (bannerSlides.length === 0) return;
    
    currentSlide = (currentSlide + 1) % bannerSlides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// ========================================
// Sketch Carousel
// ========================================
const sketchItems = document.querySelectorAll('.sketch-item');
const sketchPrev = document.querySelector('.sketch-prev');
const sketchNext = document.querySelector('.sketch-next');
let currentSketch = 0;

function showSketch(index) {
    if (sketchItems.length === 0) return;
    
    sketchItems.forEach(item => item.classList.remove('active'));
    sketchItems[index].classList.add('active');
}

if (sketchPrev) {
    sketchPrev.addEventListener('click', function() {
        if (sketchItems.length === 0) return;
        
        currentSketch = (currentSketch - 1 + sketchItems.length) % sketchItems.length;
        showSketch(currentSketch);
    });
}

if (sketchNext) {
    sketchNext.addEventListener('click', function() {
        if (sketchItems.length === 0) return;
        
        currentSketch = (currentSketch + 1) % sketchItems.length;
        showSketch(currentSketch);
    });
}

if (sketchItems.length > 0) {
    setInterval(function() {
        currentSketch = (currentSketch + 1) % sketchItems.length;
        showSketch(currentSketch);
    }, 8000);
}

// ========================================
// Navbar scroll effect
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        if (navbar) navbar.classList.add('scrolled');
        if (scrollTop) scrollTop.classList.add('show');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
        if (scrollTop) scrollTop.classList.remove('show');
    }
    
    updateActiveNavLink();
});

// ========================================
// Scroll to top
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Smooth scrolling for navigation links (Desktop)
// ========================================
document.querySelectorAll('#navbarNav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Portfolio filtering
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// Portfolio modal
// ========================================
const portfolioModal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');

if (portfolioModal && modalImage) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            if (imgSrc) {
                modalImage.setAttribute('src', imgSrc);
            }
        });
    });
}

// ========================================
// Counter animation
// ========================================
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 10);
        } else {
            counter.innerText = target;
        }
    });
};

const aboutSection = document.getElementById('about');
let counterAnimated = false;

if (aboutSection) {
    window.addEventListener('scroll', () => {
        const sectionPos = aboutSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.5;
        
        if (sectionPos < screenPos && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    });
}

// ========================================
// Contact form submission
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const whatsappMessage = `الاسم: ${name}%0aالهاتف: ${phone}%0aالبريد الإلكتروني: ${email}%0aالرسالة: ${message}`;
        
        window.open(`https://wa.me/966537401744?text=${whatsappMessage}`, '_blank');
        
        contactForm.reset();
        
        showNotification('تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.');
    });
}

// ========================================
// Update active navigation link based on scroll position
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Show notification (helper function)
// ========================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========================================
// Search functionality
// ========================================
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            performSearch(searchTerm);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });
}

function performSearch(term) {
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, .service-card, .portfolio-item');
    let found = false;
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(term)) {
            element.style.backgroundColor = 'rgba(255, 138, 0, 0.2)';
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
            
            setTimeout(() => {
                element.style.backgroundColor = '';
            }, 3000);
        }
    });
    
    if (!found) {
        showNotification('لم يتم العثور على نتائج للبحث');
    }
}

// ========================================
// Profile image animation
// ========================================
const profileImages = document.querySelectorAll('.profile-image');
let currentProfileImage = 0;

function switchProfileImage() {
    if (profileImages.length <= 1) return;
    
    profileImages.forEach(img => img.classList.remove('active'));
    currentProfileImage = (currentProfileImage + 1) % profileImages.length;
    profileImages[currentProfileImage].classList.add('active');
}

if (profileImages.length > 1) {
    setInterval(switchProfileImage, 4000);
}

// ========================================
// Parallax effect for hero section
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-animation');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// Add keyboard navigation
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
        
        // Also close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        if (searchInput) searchInput.focus();
    }
});

// ========================================
// Initialize tooltips if needed
// ========================================
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// ========================================
// Add smooth reveal animation for elements
// ========================================
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    if (revealElements.length === 0) return;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ========================================
// Visitor counter - Fixed version for GitHub Pages
// ========================================
const visitorCountElement = document.getElementById('visitorCount');

if (visitorCountElement) {
    let visits = localStorage.getItem('visits') || 0;
    visits++;
    localStorage.setItem('visits', visits);
    
    let current = 0;
    const target = parseInt(visits);
    const increment = Math.max(1, Math.floor(target / 20));
    
    const updateCounter = () => {
        current += increment;
        if (current > target) current = target;
        
        visitorCountElement.textContent = current;
        
        if (current < target) {
            setTimeout(updateCounter, 50);
        }
    };
    
    setTimeout(updateCounter, 500);
}

// ========================================
// Add CSS animation for mobile menu
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gold-gradient);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        font-weight: 600;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);