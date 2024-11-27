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
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Enhanced Form validation and submission handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add floating labels effect
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Simple validation
        let isValid = true;
        if (!name.value.trim()) {
            showError(name, 'الرجاء إدخال الاسم');
            isValid = false;
        } else {
            removeError(name);
        }
        
        if (!email.value.trim() || !email.value.includes('@')) {
            showError(email, 'الرجاء إدخال بريد إلكتروني صحيح');
            isValid = false;
        } else {
            removeError(email);
        }
        
        if (!message.value.trim()) {
            showError(message, 'الرجاء إدخال رسالتك');
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // Show loading spinner
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showSuccess('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// Error and Success message handlers
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-1';
    errorDiv.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    input.classList.add('is-invalid');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        formGroup.removeChild(errorDiv);
    }
    input.classList.remove('is-invalid');
}

function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    contactForm.insertBefore(alertDiv, contactForm.firstChild);
    setTimeout(() => alertDiv.remove(), 5000);
}

// Enhanced Navbar active state with intersection observer
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            updateNavigation(currentId);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

function updateNavigation(currentId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced animations on scroll with Intersection Observer
const animateElements = document.querySelectorAll('.card, .about-image');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    animationObserver.observe(element);
});

// Interactive Service Cards
const serviceCards = document.querySelectorAll('#services .card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
