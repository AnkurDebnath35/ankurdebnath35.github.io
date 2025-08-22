// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header and Navigation
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile nav when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
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
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
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
        const scrollPos = window.pageYOffset + header.offsetHeight + 50;

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

    // Skills Animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill__progress');
        const skillsSection = document.getElementById('about');
        
        if (skillsSection) {
            const skillsSectionTop = skillsSection.offsetTop;
            const skillsSectionHeight = skillsSection.offsetHeight;
            const scrollPos = window.pageYOffset + window.innerHeight;

            if (scrollPos >= skillsSectionTop && scrollPos <= skillsSectionTop + skillsSectionHeight) {
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    if (level && !bar.classList.contains('animated')) {
                        setTimeout(() => {
                            bar.style.width = level + '%';
                            bar.classList.add('animated');
                        }, 200);
                    }
                });
            }
        }
    }

    window.addEventListener('scroll', animateSkills);

    // Scroll Animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimations);

    // Initialize scroll animations
    handleScrollAnimations();

    // Add animation classes to elements
    function initializeAnimations() {
        // Hero content
        const heroText = document.querySelector('.hero__text');
        const heroVisual = document.querySelector('.hero__visual');
        
        if (heroText) heroText.classList.add('slide-in-left');
        if (heroVisual) heroVisual.classList.add('slide-in-right');

        // About content
        const aboutInfo = document.querySelector('.about__info');
        const aboutSkills = document.querySelector('.about__skills');
        
        if (aboutInfo) aboutInfo.classList.add('slide-in-left');
        if (aboutSkills) aboutSkills.classList.add('slide-in-right');

        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });

        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });

        // Contact content
        const contactInfo = document.querySelector('.contact__info');
        const contactForm = document.querySelector('.contact__form');
        
        if (contactInfo) contactInfo.classList.add('slide-in-left');
        if (contactForm) contactForm.classList.add('slide-in-right');
    }

    // Initialize animations after a short delay
    setTimeout(initializeAnimations, 500);

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
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
                    top: 20px;
                    right: 20px;
                    padding: 16px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    max-width: 400px;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification--success {
                    background: rgba(var(--color-success-rgb), 0.9);
                    color: white;
                    border-left: 4px solid var(--color-success);
                }
                
                .notification--error {
                    background: rgba(var(--color-error-rgb), 0.9);
                    color: white;
                    border-left: 4px solid var(--color-error);
                }
                
                .notification--info {
                    background: rgba(var(--color-info-rgb), 0.9);
                    color: white;
                    border-left: 4px solid var(--color-info);
                }
                
                .notification__content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                
                .notification__message {
                    font-weight: 500;
                }
                
                .notification__close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s ease;
                }
                
                .notification__close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });

    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });

    // Parallax effect for hero section
    function handleParallax() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }

    // Only enable parallax on larger screens
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleParallax);
    }

    // Dark mode detection and header adjustment
    function adjustHeaderForColorScheme() {
        const header = document.getElementById('header');
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
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'flex';
        } else {
            navToggle.style.display = 'none';
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Resize handler
    window.addEventListener('resize', function() {
        checkMobileMenu();
        
        // Re-enable/disable parallax based on screen size
        if (window.innerWidth <= 768) {
            document.querySelector('.hero').style.transform = 'none';
        }
    });

    // Initial mobile menu check
    checkMobileMenu();

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
        animateSkills();
        handleScrollAnimations();
        if (window.innerWidth > 768) {
            handleParallax();
        }
        ticking = false;
    }

    // Replace scroll listeners with throttled version
    window.removeEventListener('scroll', updateActiveNavLink);
    window.removeEventListener('scroll', animateSkills);
    window.removeEventListener('scroll', handleScrollAnimations);
    if (window.innerWidth > 768) {
        window.removeEventListener('scroll', handleParallax);
    }
    
    window.addEventListener('scroll', requestTick);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
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

// Smooth reveal animations for elements coming into view
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in:not(.visible), .slide-in-left:not(.visible), .slide-in-right:not(.visible)');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', function() {
    const debouncedReveal = debounce(revealOnScroll, 10);
    window.addEventListener('scroll', debouncedReveal);
});