// WifePlzr Landing Page JavaScript

// Global variables
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX, windowHalfY;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Removed 3D background for better performance and simplicity
    initSimpleAnimations();
    initBasicInteractions();
    initScrollEffects();
    initCounters();
});

// Removed Three.js 3D background for simplicity

// Removed particle system

// Removed floating shapes

// Removed 3D animation loop

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.1;
    mouseY = (event.clientY - windowHalfY) * 0.1;
}

// Simple animations
function initSimpleAnimations() {
    // Simple fade-in for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Basic interactions
function initBasicInteractions() {
    // Simple button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Simple card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Simplified scroll effects
function initScrollEffects() {
    // Simple navbar background on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 50) {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            }
        }
    });
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const text = target.textContent;
                const isPercentage = text.includes('%');
                const isMultiplier = text.includes('x');
                const isTime = text.includes('K');
                
                let endValue;
                if (isPercentage) {
                    endValue = parseInt(text);
                } else if (isMultiplier) {
                    endValue = parseInt(text);
                } else if (isTime) {
                    endValue = parseFloat(text);
                } else {
                    endValue = parseInt(text);
                }
                
                animateValue(target, 0, endValue, 2000, text);
                target.classList.add('counted');
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Utility functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateValue(element, start, end, duration, originalText) {
    let startTime = null;
    const isPercentage = originalText && originalText.includes('%');
    const isMultiplier = originalText && originalText.includes('x');
    const isTime = originalText && originalText.includes('K');
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        
        if (isPercentage) {
            element.textContent = currentValue + '%';
        } else if (isMultiplier) {
            element.textContent = currentValue + 'x';
        } else if (isTime) {
            element.textContent = (currentValue / 1000).toFixed(1) + 'K+';
        } else {
            element.textContent = currentValue;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = originalText || end;
        }
    }
    
    requestAnimationFrame(animation);
}

// Waitlist functionality
function joinWaitlist() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showToast('Please enter your email address', 'error');
        emailInput.classList.add('input-error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        emailInput.classList.add('input-error');
        return;
    }
    
    // Remove error state
    emailInput.classList.remove('input-error');
    emailInput.classList.add('input-success');
    
    // Simulate API call
    const button = document.querySelector('#waitlist .btn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Joining...';
    button.disabled = true;
    
    setTimeout(() => {
        showToast('Successfully joined the waitlist! We\'ll be in touch soon.', 'success');
        emailInput.value = '';
        emailInput.classList.remove('input-success');
        button.innerHTML = '<i class="fas fa-check mr-2"></i>Joined!';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
        
        // Track event (if analytics is implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'signup', {
                method: 'waitlist',
                event_category: 'engagement'
            });
        }
    }, 1500);
}

// New function to redirect to Google Form with prefilled email
function joinWaitlistWithPrefill() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    
    // Base Google Form URL
    const baseFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf-EAfpfp0tX6iPLcig_2jmaHlETosV3f_nFzBO0Y4ivsMmlQ/viewform';
    
    let formUrl = baseFormUrl;
    
    // If email is provided and valid, prefill it
    if (email && isValidEmail(email)) {
        // Google Forms prefill parameter for the first field (usually entry.123456789)
        // We need to find the entry ID for your email field
        // For now, using a common pattern - you may need to inspect your form to get the exact entry ID
        const emailEntryId = 'entry.1045781291'; // This is typically the format, but you'll need to get the actual ID
        formUrl = `${baseFormUrl}?${emailEntryId}=${encodeURIComponent(email)}`;
        
        // Show success message
        showToast('Redirecting to signup form with your email...', 'success');
        
        // Track event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_click', {
                method: 'google_form',
                event_category: 'engagement',
                prefilled: true
            });
        }
    } else if (email && !isValidEmail(email)) {
        // Show error for invalid email but still redirect
        showToast('Invalid email format, but redirecting to form...', 'error');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_click', {
                method: 'google_form',
                event_category: 'engagement',
                prefilled: false,
                invalid_email: true
            });
        }
    } else {
        // No email provided, just redirect
        showToast('Redirecting to signup form...', 'success');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_click', {
                method: 'google_form',
                event_category: 'engagement',
                prefilled: false
            });
        }
    }
    
    // Small delay to show the toast, then redirect
    setTimeout(() => {
        window.open(formUrl, '_blank');
    }, 800);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation-triangle'} mr-2"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor loading performance
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Track if analytics is implemented
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: loadTime
            });
        }
    });
    
    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent >= 25 && !window.scrollTracked25) {
                window.scrollTracked25 = true;
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', { percent: 25 });
                }
            }
            
            if (scrollPercent >= 50 && !window.scrollTracked50) {
                window.scrollTracked50 = true;
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', { percent: 50 });
                }
            }
            
            if (scrollPercent >= 75 && !window.scrollTracked75) {
                window.scrollTracked75 = true;
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', { percent: 75 });
                }
            }
        }, 250);
    });
}

// Easter eggs
function initEasterEggs() {
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Fun animation when Konami code is entered
    document.body.style.animation = 'rainbow 2s linear infinite';
    showToast('🚀 AGI Mode Activated! Code 100x, Love 0x! 🚀', 'success');
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 10000);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initPerformanceMonitoring();
    initEasterEggs();
});

// Accessibility improvements
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    // Announce when animations complete
    window.announceToScreenReader = (message) => {
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    };
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Export functions for global access
window.joinWaitlist = joinWaitlist;
window.joinWaitlistWithPrefill = joinWaitlistWithPrefill;
window.showToast = showToast;
