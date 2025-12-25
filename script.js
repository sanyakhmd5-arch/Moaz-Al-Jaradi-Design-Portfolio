// ========================================
// Global Variables
// ========================================
let isMobileMenuOpen = false;
let isPageLoaded = false;
let currentSlide = 0;
let currentSketch = 0;
let counterAnimated = false;

// ========================================
// DOM Elements
// ========================================
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const loadingScreen = document.getElementById('loadingScreen');
const bannerSlides = document.querySelectorAll('.banner-slide');
const sketchItems = document.querySelectorAll('.sketch-item');
const sketchPrev = document.querySelector('.sketch-prev');
const sketchNext = document.querySelector('.sketch-next');
const counters = document.querySelectorAll('.counter');
const aboutSection = document.getElementById('about');
const scrollTopBtn = document.getElementById('scrollTop');
const navbar = document.getElementById('mainNav');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioModal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const contactForm = document.getElementById('contactForm');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const visitorCountElement = document.getElementById('visitorCount');

// ========================================
// Initialize on DOM Content Loaded
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Force close mobile menu immediately
    resetMobileMenu();
    
    // Reset body overflow immediately
    document.body.style.overflow = '';
    document.body.style.position = '';
    
    // Initialize theme and language
    initializeTheme();
    initializeLanguage();
    
    // Initialize AOS
    initializeAOS();
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle loading screen properly
    handleLoadingScreen();
    
    // Additional safety check after page load
    setTimeout(() => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            resetMobileMenu();
        }
    }, 2000);
});

// ========================================
// Reset Mobile Menu
// ========================================
function resetMobileMenu() {
    if (!mobileMenu) return;
    
    mobileMenu.classList.remove('active');
    // CRITICAL: Force all hiding properties
    mobileMenu.style.transform = 'translateX(100%)';
    mobileMenu.style.visibility = 'hidden';
    mobileMenu.style.opacity = '0';
    mobileMenu.style.pointerEvents = 'none';
    mobileMenu.style.touchAction = 'none';
    
    // Reset body scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    
    isMobileMenuOpen = false;
}

// ========================================
// Mobile Menu Functions
// ========================================
function openMobileMenu() {
    if (!mobileMenu || isMobileMenuOpen) return;
    
    mobileMenu.classList.add('active');
    // Ensure proper styles
    mobileMenu.style.transform = 'translateX(0)';
    mobileMenu.style.visibility = 'visible';
    mobileMenu.style.opacity = '1';
    mobileMenu.style.pointerEvents = 'auto';
    mobileMenu.style.touchAction = 'auto';
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    isMobileMenuOpen = true;
}

function closeMobileMenu() {
    if (!mobileMenu || !isMobileMenuOpen) return;
    
    mobileMenu.classList.remove('active');
    // Reset styles
    mobileMenu.style.transform = 'translateX(100%)';
    mobileMenu.style.visibility = 'hidden';
    mobileMenu.style.opacity = '0';
    mobileMenu.style.pointerEvents = 'none';
    mobileMenu.style.touchAction = 'none';
    
    // Unlock body scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    
    isMobileMenuOpen = false;
}

// ========================================
// Setup Event Listeners
// ========================================
function setupEventListeners() {
    // Mobile menu toggle
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
    
    // Window resize safety reset
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeMobileMenu();
        }
    });
    
    // Page visibility change safety reset
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Page became visible again
            setTimeout(() => {
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }, 100);
        }
    });
    
    // Touch move safety for mobile
    document.addEventListener('touchmove', function(e) {
        if (!isMobileMenuOpen) {
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
    
    // Orientation change safety reset
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            closeMobileMenu();
        }, 100);
    });
    
    // Window scroll event
    window.addEventListener('scroll', handleScroll);
    
    // Portfolio filtering
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', handlePortfolioFilter);
        });
    }
    
    // Portfolio modal
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
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Search functionality
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('change', handleLanguageToggle);
    }
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', handleThemeToggle);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('change', handleMobileThemeToggle);
    }
    
    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Sketch carousel controls
    if (sketchPrev) {
        sketchPrev.addEventListener('click', handleSketchPrev);
    }
    
    if (sketchNext) {
        sketchNext.addEventListener('click', handleSketchNext);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Initialize lazy loading for images
    initializeLazyLoading();
}

// ========================================
// Handle Loading Screen
// ========================================
function handleLoadingScreen() {
    if (!loadingScreen) return;
    
    // Add failsafe timer
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        // CRITICAL: Remove from DOM completely after transition
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 300);
    }, 1000);
}

// ========================================
// Window Load Event
// ========================================
window.addEventListener('load', function() {
    isPageLoaded = true;
    
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            // CRITICAL: Remove from DOM completely
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 300);
        }
    }, 1500);
});

// ========================================
// Handle Scroll Event
// ========================================
function handleScroll() {
    // Navbar scroll effect
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Scroll to top button
    if (scrollTopBtn) {
        if (window.scrollY > 100) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Counter animation
    handleCounterAnimation();
    
    // Parallax effect for hero section
    handleParallaxEffect();
}

// ========================================
// Handle Portfolio Filter
// ========================================
function handlePortfolioFilter(e) {
    const btn = e.target;
    filterBtns.forEach(btn => btn.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
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
}

// ========================================
// Handle Contact Form
// ========================================
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const whatsappMessage = `الاسم: ${name}%0aالهاتف: ${phone}%0aالبريد الإلكتروني: ${email}%0aالرسالة: ${message}`;
    
    window.open(`https://wa.me/966537401744?text=${whatsappMessage}`, '_blank');
    
    contactForm.reset();
    
    showNotification('تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.');
}

// ========================================
// Handle Search
// ========================================
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        performSearch(searchTerm);
    }
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
// Handle Language Toggle
// ========================================
function handleLanguageToggle(e) {
    const body = document.body;
    
    if (e.target.checked) {
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
}

// ========================================
// Handle Theme Toggle
// ========================================
function handleThemeToggle(e) {
    toggleTheme(e.target.checked);
    
    if (mobileThemeToggle) {
        mobileThemeToggle.checked = e.target.checked;
    }
}

function handleMobileThemeToggle(e) {
    toggleTheme(e.target.checked);
    
    if (themeToggle) {
        themeToggle.checked = e.target.checked;
    }
}

function toggleTheme(isLight) {
    const body = document.body;
    
    if (isLight) {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// ========================================
// Handle Sketch Carousel
// ========================================
function handleSketchPrev() {
    if (sketchItems.length === 0) return;
    
    currentSketch = (currentSketch - 1 + sketchItems.length) % sketchItems.length;
    showSketch(currentSketch);
}

function handleSketchNext() {
    if (sketchItems.length === 0) return;
    
    currentSketch = (currentSketch + 1) % sketchItems.length;
    showSketch(currentSketch);
}

function showSketch(index) {
    if (sketchItems.length === 0) return;
    
    sketchItems.forEach(item => item.classList.remove('active'));
    sketchItems[index].classList.add('active');
}

// ========================================
// Handle Keyboard Navigation
// ========================================
function handleKeyboardNavigation(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
        
        // Also close mobile menu if open
        if (isMobileMenuOpen) {
            closeMobileMenu();
        }
    }
    
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        if (searchInput) searchInput.focus();
    }
}

// ========================================
// Initialize Functions
// ========================================
function initializeTheme() {
    const body = document.body;
    
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
}

function initializeLanguage() {
    const body = document.body;
    
    if (localStorage.getItem('language') === 'en') {
        body.classList.add('en');
        body.setAttribute('dir', 'ltr');
        if (langToggle) langToggle.checked = true;
        updateLanguage('en');
    } else {
        updateLanguage('ar');
    }
}

function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// ========================================
// Utility Functions
// ========================================
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

function handleCounterAnimation() {
    if (counters.length === 0 || !aboutSection) return;
    
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.5;
    
    if (sectionPos < screenPos && !counterAnimated) {
        animateCounters();
        counterAnimated = true;
    }
}

function animateCounters() {
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 10);
        } else {
            counter.innerText = target;
        }
    });
}

function handleParallaxEffect() {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-animation');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

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
// Banner Slider
// ========================================
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

// Initialize banner slider
setInterval(nextSlide, 5000);

// Initialize sketch carousel
if (sketchItems.length > 0) {
    setInterval(function() {
        currentSketch = (currentSketch + 1) % sketchItems.length;
        showSketch(currentSketch);
    }, 8000);
}

// ========================================
// Visitor Counter
// ========================================
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
// Add CSS for notification
// ========================================
const style = document.createElement('style');
style.textContent = `
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