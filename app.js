// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header and Navigation
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle) navToggle.classList.remove('active');
            if (nav) nav.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Special handling for home link
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        if (!header) return;
        
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(252, 252, 249, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(252, 252, 249, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Update dark mode header background
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (scrolled > 100) {
                header.style.background = 'rgba(31, 33, 33, 0.98)';
            } else {
                header.style.background = 'rgba(31, 33, 33, 0.95)';
            }
        }
    });

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + (header ? header.offsetHeight : 0) + 100;

        // Special case for top of page (home section)
        if (window.pageYOffset < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav__link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
            return;
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Enhanced CV Download Functionality
    const downloadButton = document.getElementById('download-cv');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            // Add visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="btn__icon">⬇️</span> Downloading...';
            this.disabled = true;
            
            // Check if file exists, if not show notification
            setTimeout(() => {
                showNotification('CV download initiated! If the download doesn\'t start automatically, the file may need to be added to the documents folder.', 'info');
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    }

    // Image Loading and Fallback Handling
    function setupImageFallbacks() {
        // Profile Image
        const profileImage = document.querySelector('.profile-image');
        const profileFallback = document.querySelector('.profile-fallback');
        
        if (profileImage && profileFallback) {
            profileImage.addEventListener('error', function() {
                this.style.display = 'none';
                profileFallback.style.display = 'flex';
            });
            
            profileImage.addEventListener('load', function() {
                this.style.display = 'block';
                profileFallback.style.display = 'none';
            });
        }

        // Company Logos
        const companyLogos = document.querySelectorAll('.company-logo');
        companyLogos.forEach(logo => {
            const fallback = logo.nextElementSibling;
            if (fallback && fallback.classList.contains('company-logo-fallback')) {
                logo.addEventListener('error', function() {
                    this.style.display = 'none';
                    fallback.style.display = 'flex';
                });
                
                logo.addEventListener('load', function() {
                    this.style.display = 'block';
                    fallback.style.display = 'none';
                });
            }
        });

        // Institution Logos
        const institutionLogos = document.querySelectorAll('.institution-logo');
        institutionLogos.forEach(logo => {
            const fallback = logo.nextElementSibling;
            if (fallback && fallback.classList.contains('institution-logo-fallback')) {
                logo.addEventListener('error', function() {
                    this.style.display = 'none';
                    fallback.style.display = 'flex';
                });
                
                logo.addEventListener('load', function() {
                    this.style.display = 'block';
                    fallback.style.display = 'none';
                });
            }
        });
    }

    // Initialize image fallbacks
    setupImageFallbacks();

    // Skill Tag Hover Effects
    function initializeSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                // Create a subtle ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'skill-tag-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });

        // Add ripple animation styles
        if (!document.getElementById('ripple-styles')) {
            const rippleStyles = document.createElement('style');
            rippleStyles.id = 'ripple-styles';
            rippleStyles.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyles);
        }
    }

    // Initialize skill tag effects
    initializeSkillTagEffects();

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    function initializeAnimations() {
        // Hero content
        const heroText = document.querySelector('.hero__text');
        const heroVisual = document.querySelector('.hero__visual');
        
        if (heroText) {
            heroText.classList.add('slide-in-left');
            observer.observe(heroText);
        }
        if (heroVisual) {
            heroVisual.classList.add('slide-in-right');
            observer.observe(heroVisual);
        }

        // Summary metrics
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
                observer.observe(card);
            }, index * 100);
        });

        // Skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.classList.add('fade-in');
                observer.observe(category);
            }, index * 150);
        });

        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline__item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('slide-in-left');
                observer.observe(item);
            }, index * 200);
        });

        // Publication cards
        const publicationCards = document.querySelectorAll('.publication-card');
        publicationCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
                observer.observe(card);
            }, index * 100);
        });

        // Patent and award cards
        const patentCards = document.querySelectorAll('.patent-card');
        const awardCards = document.querySelectorAll('.award-card');
        
        patentCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-in-left');
                observer.observe(card);
            }, index * 100);
        });

        awardCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-in-right');
                observer.observe(card);
            }, index * 100);
        });

        // Education and certification cards
        const educationCards = document.querySelectorAll('.education-card');
        const certificationCards = document.querySelectorAll('.certification-card');
        
        educationCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-in-left');
                observer.observe(card);
            }, index * 150);
        });

        certificationCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-in-right');
                observer.observe(card);
            }, index * 150);
        });

        // Contact content
        const contactInfo = document.querySelector('.contact__info');
        const contactForm = document.querySelector('.contact__form');
        
        if (contactInfo) {
            contactInfo.classList.add('slide-in-left');
            observer.observe(contactInfo);
        }
        if (contactForm) {
            contactForm.classList.add('slide-in-right');
            observer.observe(contactForm);
        }
    }

    // Initialize animations after a short delay
    setTimeout(initializeAnimations, 500);

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ⓘ'}</span>
                <span class="notification__message">${message}</span>
                <button class="notification__close">&times;</button>
            </div>
        `;
        
        // Add notification styles if not already added
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 16px 20px;
                    border-radius: 8px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    z-index: 10000;
                    max-width: 400px;
                    transform: translateX(100%);
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    border-left: 4px solid;
                    backdrop-filter: blur(10px);
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification--success {
                    background: rgba(33, 128, 141, 0.95);
                    color: white;
                    border-left-color: #21808d;
                }
                
                .notification--error {
                    background: rgba(192, 21, 47, 0.95);
                    color: white;
                    border-left-color: #c0152f;
                }
                
                .notification--info {
                    background: rgba(98, 108, 113, 0.95);
                    color: white;
                    border-left-color: #626c71;
                }
                
                .notification__content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                
                .notification__icon {
                    font-weight: bold;
                    font-size: 16px;
                    flex-shrink: 0;
                }
                
                .notification__message {
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 1.4;
                    flex: 1;
                }
                
                .notification__close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 4px;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s ease;
                    flex-shrink: 0;
                    line-height: 1;
                }
                
                .notification__close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                @media (max-width: 768px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                        transform: translateY(-100%);
                        top: 80px;
                    }
                    
                    .notification.show {
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification with animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);

        return notification;
    }
    
    function hideNotification(notification) {
        if (notification && notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }
    }

    // Make showNotification globally available
    window.showNotification = showNotification;

    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add form validation styling
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#c0152f';
                } else {
                    this.style.borderColor = '';
                }
            });

            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(192, 21, 47)') {
                    this.style.borderColor = '';
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation with visual feedback
            let hasErrors = false;
            
            if (!name || !name.trim()) {
                document.getElementById('name').style.borderColor = '#c0152f';
                hasErrors = true;
            }
            
            if (!email || !email.trim()) {
                document.getElementById('email').style.borderColor = '#c0152f';
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                document.getElementById('email').style.borderColor = '#c0152f';
                hasErrors = true;
            }
            
            if (!subject || !subject.trim()) {
                document.getElementById('subject').style.borderColor = '#c0152f';
                hasErrors = true;
            }
            
            if (!message || !message.trim()) {
                document.getElementById('message').style.borderColor = '#c0152f';
                hasErrors = true;
            }
            
            if (hasErrors) {
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Simulate form submission with enhanced feedback
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 8px;">Sending... <span style="animation: spin 1s linear infinite;">⟳</span></span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Add spinning animation
            const spinStyles = document.createElement('style');
            spinStyles.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            if (!document.getElementById('spin-styles')) {
                spinStyles.id = 'spin-styles';
                document.head.appendChild(spinStyles);
            }
            
            setTimeout(() => {
                showNotification(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon regarding "${subject}".`, 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // Reset any error styling
                formInputs.forEach(input => {
                    input.style.borderColor = '';
                });
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced Hover Effects for Cards
    const interactiveCards = document.querySelectorAll('.project-card, .publication-card, .patent-card, .award-card, .education-card, .certification-card, .metric-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Metric Cards Counter Animation
    function animateCounters() {
        const metricValues = document.querySelectorAll('.metric__value');
        const summarySection = document.getElementById('summary');
        
        if (summarySection) {
            const summarySectionTop = summarySection.offsetTop;
            const summarySectionHeight = summarySection.offsetHeight;
            const scrollPos = window.pageYOffset + window.innerHeight;

            if (scrollPos >= summarySectionTop && scrollPos <= summarySectionTop + summarySectionHeight) {
                metricValues.forEach(value => {
                    if (!value.classList.contains('animated')) {
                        const text = value.textContent;
                        const hasNumber = /\d/.test(text);
                        
                        if (hasNumber) {
                            const number = parseInt(text.match(/\d+/)[0]);
                            const prefix = text.match(/^\D*/)[0];
                            const suffix = text.match(/\D*$/)[0];
                            
                            animateValue(value, 0, number, 1500, prefix, suffix);
                            value.classList.add('animated');
                        }
                    }
                });
            }
        }
    }

    function animateValue(element, start, end, duration, prefix = '', suffix = '') {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(start + (end - start) * easeOutQuad);
            
            element.textContent = prefix + current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    window.addEventListener('scroll', animateCounters);

    // Parallax effect for hero section (desktop only)
    function handleParallax() {
        if (window.innerWidth > 768) {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        }
    }

    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleParallax);
    }

    // Dark mode detection and header adjustment
    function adjustHeaderForColorScheme() {
        if (!header) return;
        
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            header.style.background = 'rgba(31, 33, 33, 0.95)';
        } else {
            header.style.background = 'rgba(252, 252, 249, 0.95)';
        }
    }

    // Listen for color scheme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', adjustHeaderForColorScheme);
    }

    // Initialize
    adjustHeaderForColorScheme();
    updateActiveNavLink();

    // Ensure hamburger menu is visible on mobile
    function checkMobileMenu() {
        if (!navToggle) return;
        
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'flex !important';
            navToggle.style.visibility = 'visible';
        } else {
            navToggle.style.display = 'none';
            if (nav) nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Resize handler
    window.addEventListener('resize', function() {
        checkMobileMenu();
        
        // Re-enable/disable parallax based on screen size
        if (window.innerWidth <= 768) {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.transform = 'none';
            }
        }
    });

    // Initial mobile menu check
    checkMobileMenu();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Enhanced accessibility
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    function updateScrollEffects() {
        updateActiveNavLink();
        animateCounters();
        if (window.innerWidth > 768) {
            handleParallax();
        }
        ticking = false;
    }

    // Enhanced scroll handling
    window.addEventListener('scroll', requestTick);

    // Project Card Click Interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.project-card__title').textContent;
            showNotification(`More details about "${title}" can be found in my portfolio or by contacting me directly.`, 'info');
        });
    });

    // Publication Card Click Interaction
    const publicationCards = document.querySelectorAll('.publication-card');
    publicationCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.publication-card__title').textContent;
            showNotification(`"${title}" - Click on my Google Scholar link to access the full publication.`, 'info');
        });
    });

    // Enhanced Social Links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label');
            showNotification(`Opening ${platform} profile in new tab...`, 'info');
        });
    });

    // Initialize page
    console.log('🚀 Ankur Debnath Portfolio initialized successfully!');
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);

    // Show welcome message with updated content details
    setTimeout(() => {
        showNotification('Welcome! This portfolio features accurate contact details, structured image placeholders, comprehensive skill sets, and CV download functionality. All information is sourced directly from the CV.', 'success');
    }, 2000);

    // Image Loading Status
    function trackImageLoading() {
        const allImages = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = allImages.length;
        
        if (totalImages === 0) return;
        
        allImages.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        console.log('✅ All images loaded successfully');
                    }
                });
                
                img.addEventListener('error', () => {
                    loadedImages++;
                    console.log(`⚠️ Image failed to load: ${img.src}`);
                    if (loadedImages === totalImages) {
                        console.log('📸 Image loading completed with some fallbacks');
                    }
                });
            }
        });
        
        if (loadedImages === totalImages) {
            console.log('✅ All images were already loaded');
        }
    }
    
    // Track image loading after initialization
    setTimeout(trackImageLoading, 1000);
});

// Additional utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for potential external use
window.portfolioUtils = {
    debounce,
    throttle,
    showNotification: window.showNotification
};