// Budget Card JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get button element
    const createBudgetBtn = document.getElementById('createBudgetBtn');
    const cards = document.querySelectorAll('.card');
    const calculatorIcon = document.querySelector('.calculator-icon');

    // Button click functionality
    createBudgetBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        // Show alert or perform action
        alert('Create Budget functionality would be implemented here!');
        
        // In a real application, this would:
        // - Navigate to budget creation form
        // - Open modal
        // - Make API call
        console.log('Create Budget button clicked');
    });

    // Add hover effects to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Calculator icon pulse effect on hover
    if (calculatorIcon) {
        calculatorIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });

        calculatorIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Add subtle animations to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initially hide feature items for animation
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add click ripple effect to button
    createBudgetBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Card click interactions (for demo purposes)
    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log(`Card ${index + 1} clicked`);
            
            // Add temporary highlight effect
            this.style.background = '#0A2336';
            setTimeout(() => {
                this.style.background = '#031B2E';
            }, 200);
        });
    });

    // Keyboard accessibility
    createBudgetBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Add accessibility attributes
    createBudgetBtn.setAttribute('aria-label', 'Create a new budget');
    createBudgetBtn.setAttribute('role', 'button');
    
    // Feature items accessibility
    featureItems.forEach((item, index) => {
        item.setAttribute('role', 'listitem');
        item.setAttribute('aria-label', `Feature ${index + 1}`);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .create-budget-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .feature-item:hover .feature-icon {
        transform: scale(1.05);
        transition: transform 0.2s ease;
    }
    
    .card {
        cursor: pointer;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .calculator-icon {
            animation: none;
        }
        
        .feature-item {
            transition: none !important;
        }
        
        .card {
            transition: none !important;
        }
    }
`;
document.head.appendChild(style);
