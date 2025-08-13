// Main JavaScript for portfolio functionality
class Portfolio {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupAnimations();
    }

    init() {
        // Hide loading screen after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loading = document.getElementById('loading');
                if (loading) {
                    loading.style.opacity = '0';
                    setTimeout(() => {
                        loading.style.display = 'none';
                    }, 500);
                }
            }, 1000);
        });

        // Setup mobile menu
        this.setupMobileMenu();
        
        // Setup scroll effects
        this.setupScrollEffects();
        
        // Setup intersection observer for animations
        this.setupIntersectionObserver();
        
        // Setup skill bars animation
        this.setupSkillBars();
    }

    bindEvents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            this.handleHeaderScroll();
        });

        // Project card hover effects
        this.setupProjectHoverEffects();
    }

    setupAnimations() {
        // Hero animations with GSAP
        if (typeof gsap !== 'undefined') {
            gsap.timeline({ delay: 1.5 })
                .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
                .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
                .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6')
                .to('.hero-stats', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
                .to('.hero-cta', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6');

            // Floating elements animation
            gsap.to('.floating-element', {
                y: 'random(-30, 30)',
                x: 'random(-30, 30)',
                duration: 'random(3, 6)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 'random(0, 3)'
            });
        }
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                
                // Animate hamburger to X
                const icon = mobileToggle.querySelector('i');
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close mobile menu when clicking on links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
    }

    setupScrollEffects() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (!header) return;

            // Change header background based on scroll
            if (currentScroll > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }

            // Hide/show header on scroll direction (optional)
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (!header) return;

        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger skill bars animation when skills section is visible
                    if (entry.target.closest('.skills-section')) {
                        this.animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe elements for fade-in animation
        document.querySelectorAll('.fade-in, .section-title, .project-card, .skill-category, .experience-item, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupSkillBars() {
        // Initialize skill bars but don't animate yet
        document.querySelectorAll('.skill-bar').forEach(bar => {
            bar.style.width = '0%';
        });
    }

    animateSkillBars() {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (level && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, Math.random() * 500);
            }
        });
    }

    setupProjectHoverEffects() {
        document.addEventListener('click', (e) => {
            // Handle project card clicks
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const projectId = projectCard.getAttribute('data-project-id');
                if (projectId && typeof openProject === 'function') {
                    openProject(projectId);
                }
            }
        });

        // Add hover effects with GSAP if available
        if (typeof gsap !== 'undefined') {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card.querySelector('.project-icon'), {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card.querySelector('.project-icon'), {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        }
    }

    // Utility functions
    debounce(func, wait) {
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

    // Analytics and tracking (placeholder for Google Analytics)
    trackEvent(action, category, label) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        // Console log for development
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log(`Page load time: ${loadTime}ms`);
                }, 0);
            });
        }
    }
}

// Additional utility functions
const utils = {
    // Smooth scroll to element
    scrollTo: (element, offset = 80) => {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (target) {
            const offsetTop = target.offsetTop - offset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Format number with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Copy text to clipboard
    copyToClipboard: (text) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
};

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    
    // Make utils available globally
    window.portfolioUtils = utils;
    
    // Log initialization
    console.log('Portfolio initialized successfully');
});

// Handle contact form submission (if implemented)
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('contact-form')) {
        e.preventDefault();
        
        // Handle form submission here
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log('Contact form submitted:', data);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        e.target.appendChild(successMessage);
        
        // Reset form
        e.target.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});

// Export for external use
window.Portfolio = Portfolio;
