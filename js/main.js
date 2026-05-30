/* ============================================================
   PORTFOLIO INTERACTIVE FEATURES
   ============================================================ */

// ============================================================
// 1. NAVIGATION MENU TOGGLE
// ============================================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');
const navItems = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close menu when a link is clicked
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================================
// 2. SMOOTH SCROLL AND ACTIVE NAV LINK
// ============================================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================================
// 3. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ============================================================
// 4. FORM SUBMISSION
// ============================================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#10b981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);

        console.log('Message:', data);
    });
}

// ============================================================
// 5. SCROLL PROGRESS BAR
// ============================================================
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // You can add a progress bar element if needed
    // document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// ============================================================
// 6. KEYBOARD NAVIGATION
// ============================================================
document.addEventListener('keydown', (e) => {
    // Close menu on Escape
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// ============================================================
// 7. PROJECT CARD CLICK HANDLERS
// ============================================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add interaction feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 100);
    });

    // Keyboard activation
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// ============================================================
// 8. SKILL CARD ANIMATION ON HOVER
// ============================================================
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = 'float 3s ease-in-out infinite';
        }, 10);
    });
});

// ============================================================
// 9. PARALLAX EFFECT FOR HERO SECTION
//    Disabled so the hero section scrolls normally.
// ============================================================
// window.addEventListener('scroll', () => {
//     const hero = document.querySelector('.hero');
//     const scrolled = window.scrollY;
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// ============================================================
// 10. STATS COUNTER ANIMATION
// ============================================================
const stats = document.querySelectorAll('.stat h3');
const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = stat.textContent;
            }
        };
        
        updateCounter();
    });
};

// Trigger stats animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ============================================================
// 11. SCROLL-TO-TOP BUTTON
// ============================================================
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 999;
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
            transition: all 0.3s ease;
        }

        .scroll-to-top.show {
            display: flex;
        }

        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(124, 58, 237, 0.4);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

createScrollToTop();

// ============================================================
// 12. TEXT ANIMATION ON LOAD
// ============================================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger reveal animations
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal, index) => {
        reveal.style.animationDelay = `${index * 0.1}s`;
    });
});

// ============================================================
// 13. MOBILE TOUCH OPTIMIZATIONS
// ============================================================
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, false);
    
    // Optimize button feedback on mobile
    document.querySelectorAll('.btn, button').forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.opacity = '0.8';
        });
        btn.addEventListener('touchend', () => {
            btn.style.opacity = '1';
        });
    });
}

// ============================================================
// 14. PERFORMANCE: LAZY LOADING FOR IMAGES
// ============================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================
// 15. CONSOLE MESSAGE
// ============================================================
console.log('%c🚀 Welcome to Marcus Thelma\'s Portfolio!', 'color: #7c3aed; font-size: 20px; font-weight: bold;');
console.log('%cCheck out the source code and feel free to get in touch!', 'color: #0ea5e9; font-size: 14px;');
