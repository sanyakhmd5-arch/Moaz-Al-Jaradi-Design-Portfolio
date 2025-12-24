// ========================================
// Initialize AOS
// ========================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========================================
// Hide loading screen
// ========================================
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingScreen').classList.add('hide');
    }, 1500);
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
}

mobileMenuToggleBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);

// Close menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar on desktop and mobile CTA on mobile
                const offset = window.innerWidth > 991 ? 80 : 100;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// Language Toggle
// ========================================
const langToggle = document.getElementById('langToggle');
const body = document.body;

// Check if language preference is saved
if (localStorage.getItem('language') === 'en') {
    body.classList.add('en');
    body.setAttribute('dir', 'ltr');
    langToggle.checked = true;
    updateLanguage('en');
}

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

// Update language function
function updateLanguage(lang) {
    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-ar');
        }
    });
    
    // Update placeholders
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

// Check if theme preference is saved, otherwise default to dark
if (localStorage.getItem('theme') === 'light') {
    body.setAttribute('data-theme', 'light');
    themeToggle.checked = true;
    mobileThemeToggle.checked = true;
} else {
    // Ensure dark mode is set if no preference is found
    body.setAttribute('data-theme', 'dark');
    themeToggle.checked = false;
    mobileThemeToggle.checked = false;
    localStorage.setItem('theme', 'dark'); // Save default preference
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

themeToggle.addEventListener('change', function() {
    toggleTheme(this.checked);
    mobileThemeToggle.checked = this.checked;
});

mobileThemeToggle.addEventListener('change', function() {
    toggleTheme(this.checked);
    themeToggle.checked = this.checked;
});

// ========================================
// Banner Slider
// ========================================
const bannerSlides = document.querySelectorAll('.banner-slide');
let currentSlide = 0;

function showSlide(index) {
    bannerSlides.forEach(slide => slide.classList.remove('active'));
    bannerSlides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % bannerSlides.length;
    showSlide(currentSlide);
}

// Change banner every 5 seconds
setInterval(nextSlide, 5000);

// ========================================
// Sketch Carousel
// ========================================
const sketchItems = document.querySelectorAll('.sketch-item');
const sketchPrev = document.querySelector('.sketch-prev');
const sketchNext = document.querySelector('.sketch-next');
let currentSketch = 0;

function showSketch(index) {
    sketchItems.forEach(item => item.classList.remove('active'));
    sketchItems[index].classList.add('active');
}

sketchPrev.addEventListener('click', function() {
    currentSketch = (currentSketch - 1 + sketchItems.length) % sketchItems.length;
    showSketch(currentSketch);
});

sketchNext.addEventListener('click', function() {
    currentSketch = (currentSketch + 1) % sketchItems.length;
    showSketch(currentSketch);
});

// Auto-rotate sketch carousel
setInterval(function() {
    currentSketch = (currentSketch + 1) % sketchItems.length;
    showSketch(currentSketch);
}, 8000);

// ========================================
// Navbar scroll effect
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('show');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ========================================
// Scroll to top
// ========================================
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
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

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                // Add animation
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

// ========================================
// Portfolio modal
// ========================================
const portfolioModal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-img');
        modalImage.setAttribute('src', imgSrc);
    });
});

// ========================================
// Counter animation
// ========================================
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
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

// Trigger counter animation when about section is in view
const aboutSection = document.getElementById('about');
let counterAnimated = false;

window.addEventListener('scroll', () => {
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.5;
    
    if (sectionPos < screenPos && !counterAnimated) {
        animateCounters();
        counterAnimated = true;
    }
});

// ========================================
// Contact form submission
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const whatsappMessage = `الاسم: ${name}%0aالهاتف: ${phone}%0aالبريد الإلكتروني: ${email}%0aالرسالة: ${message}`;
    
    // Open WhatsApp with message
    window.open(`https://wa.me/966537401744?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    showNotification('تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.');
});

// ========================================
// Update active navigation link based on scroll position
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    
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
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
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
    // Simple search implementation - in real app, this would be more sophisticated
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, .service-card, .portfolio-item');
    let found = false;
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(term)) {
            element.style.backgroundColor = 'rgba(255, 138, 0, 0.2)';
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
            
            // Remove highlight after 3 seconds
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
    profileImages.forEach(img => img.classList.remove('active'));
    currentProfileImage = (currentProfileImage + 1) % profileImages.length;
    profileImages[currentProfileImage].classList.add('active');
}

// Switch profile image every 4 seconds
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
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    }
    
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput?.focus();
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
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ========================================
// Visitor counter
// ========================================
window.addEventListener("load", () => {
    fetch("http://localhost:3000/visit")
    .then(res => res.json())
    .then(data => {
        const target = data.count;
        let current = 0;
        const counter = document.getElementById("visitorCount");
        const interval = setInterval(() => {
            current++;
            counter.textContent = current;
            if (current >= target) clearInterval(interval);
        }, 30);
    })
    .catch(error => {
        console.error("Error fetching visitor count:", error);
        // Fallback to local storage if server is unavailable
        let visits = localStorage.getItem('visits') || 0;
        visits++;
        localStorage.setItem('visits', visits);
        document.getElementById('visitorCount').innerText = visits;
    });
});