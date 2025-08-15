// Dashboard JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeNavigation();
    initializeChart();
    initializeSearch();
    initializeMetricItems();
    initializeTimeFilters();
    initializeFooter();
    
    // Initialize integrated components
    initializeCalendarWidget();
    initializeBudgetModal();
    
    // Add smooth scrolling and animations
    addScrollAnimations();
    addHoverEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navGroups = document.querySelectorAll('.nav-group');
    const navItems = document.querySelectorAll('.nav-item');
    
    navGroups.forEach(group => {
        group.addEventListener('click', function() {
            // Remove active class from all nav groups and items
            navGroups.forEach(g => g.classList.remove('active'));
            navItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked group and its nav item
            this.classList.add('active');
            this.querySelector('.nav-item').classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate navigation (in real app, would navigate to different pages)
            const navText = this.querySelector('span').textContent;
            console.log(`Navigating to: ${navText}`);
        });
        
        // Add hover effects
        group.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(245, 245, 245, 0.5)';
            }
        });
        
        group.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = '';
            }
        });
    });
}

// Chart functionality with realistic data visualization
function initializeChart() {
    const canvas = document.getElementById('salesChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size for high DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Sample data matching the Figma design
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                label: 'Total Inflow',
                data: [35, 45, 25, 55, 40, 70, 50, 65, 45],
                color: '#4545FE'
            },
            {
                label: 'MRR', 
                data: [20, 35, 18, 45, 30, 55, 40, 50, 35],
                color: '#12B76A'
            },
            {
                label: 'GMV',
                data: [15, 25, 12, 35, 22, 45, 28, 40, 25],
                color: '#F04438'
            }
        ]
    };
    
    drawChart(ctx, chartData, rect.width, rect.height);
    
    // Add animation on load
    setTimeout(() => {
        animateChart(ctx, chartData, rect.width, rect.height);
    }, 500);
}

function drawChart(ctx, data, width, height) {
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#F0F0F0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 8; i++) {
        const x = padding + (chartWidth / 8) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw data lines
    data.datasets.forEach((dataset, datasetIndex) => {
        ctx.strokeStyle = dataset.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        dataset.data.forEach((value, index) => {
            const x = padding + (chartWidth / 8) * index;
            const y = height - padding - (value / 100) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = dataset.color;
        dataset.data.forEach((value, index) => {
            const x = padding + (chartWidth / 8) * index;
            const y = height - padding - (value / 100) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    });
}

function animateChart(ctx, data, width, height) {
    let progress = 0;
    const animate = () => {
        progress += 0.02;
        if (progress <= 1) {
            // Animate chart drawing
            const animatedData = {
                ...data,
                datasets: data.datasets.map(dataset => ({
                    ...dataset,
                    data: dataset.data.map(value => value * progress)
                }))
            };
            
            drawChart(ctx, animatedData, width, height);
            requestAnimationFrame(animate);
        }
    };
    animate();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        // Simulate search functionality
        if (query.length > 2) {
            console.log(`Searching for: ${query}`);
            // In real app, would filter dashboard content or show search results
        }
    });
    
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.borderColor = '#4545FE';
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(69, 69, 254, 0.1)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.borderColor = '#E4E4E4';
        this.parentElement.style.boxShadow = 'none';
    });
}

// Metric items interactions
function initializeMetricItems() {
    const metricItems = document.querySelectorAll('.metric-item');
    
    metricItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px)';
            }, 150);
            
            // Simulate navigation to detailed view
            const metricType = this.querySelector('.metric-type').textContent;
            console.log(`Opening detailed view for: ${metricType}`);
        });
        
        // Animate progression dots on hover
        item.addEventListener('mouseenter', function() {
            const dots = this.querySelectorAll('.dot.active');
            dots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.transform = 'scale(1.2)';
                    dot.style.background = 'rgba(255, 255, 255, 0.4)';
                }, index * 100);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            const dots = this.querySelectorAll('.dot.active');
            dots.forEach(dot => {
                dot.style.transform = '';
                dot.style.background = 'rgba(255, 255, 255, 0.2)';
            });
        });
    });
}

// Time filter functionality
function initializeTimeFilters() {
    const timeFilters = document.querySelectorAll('.time-filter');
    
    timeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            timeFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Simulate data reload
            const period = this.textContent;
            console.log(`Loading data for: ${period}`);
            
            // Animate chart update
            const canvas = document.getElementById('salesChart');
            const ctx = canvas.getContext('2d');
            
            // Fade out effect
            let opacity = 1;
            const fadeOut = () => {
                opacity -= 0.05;
                ctx.globalAlpha = opacity;
                if (opacity > 0) {
                    requestAnimationFrame(fadeOut);
                } else {
                    // Redraw with new data
                    setTimeout(() => {
                        ctx.globalAlpha = 1;
                        initializeChart();
                    }, 200);
                }
            };
            fadeOut();
        });
    });
    
    // View transactions button
    const viewTransactionsBtn = document.querySelector('.view-transactions');
    if (viewTransactionsBtn) {
        viewTransactionsBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Opening transactions view');
        });
    }
}

// Footer interactions
function initializeFooter() {
    const chatButton = document.querySelector('.chat-button');
    const footerInfo = document.querySelector('.footer-info');
    
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Opening chat');
        });
        
        // Show footer info on hover
        chatButton.parentElement.addEventListener('mouseenter', function() {
            if (footerInfo) {
                footerInfo.style.opacity = '1';
            }
        });
        
        chatButton.parentElement.addEventListener('mouseleave', function() {
            if (footerInfo) {
                footerInfo.style.opacity = '0';
            }
        });
    }
}

// Scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.overview-card, .metric-item, .sales-chart');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Additional hover effects
function addHoverEffects() {
    // Header action items
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Overview card actions
    const cardActions = document.querySelectorAll('.card-action');
    cardActions.forEach(action => {
        action.addEventListener('click', function() {
            console.log('View all clicked');
            
            // Animate arrow
            const arrow = this.querySelector('span:last-child');
            if (arrow) {
                arrow.style.transform = 'translateX(4px)';
                setTimeout(() => {
                    arrow.style.transform = '';
                }, 200);
            }
        });
    });
    
    // Metric cards hover effects
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Real-time data updates (simulated)
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time metric updates
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach(value => {
            if (Math.random() > 0.95) { // 5% chance to update
                const currentText = value.textContent;
                value.style.color = '#12B76A';
                value.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    value.style.color = '';
                    value.style.transform = '';
                }, 1000);
            }
        });
        
        // Update footer counter occasionally
        const footerText = document.querySelector('.footer-text span');
        if (footerText && Math.random() > 0.98) {
            let currentValue = parseInt(footerText.textContent);
            footerText.textContent = currentValue + 1;
            
            footerText.style.color = '#12B76A';
            setTimeout(() => {
                footerText.style.color = '#191919';
            }, 500);
        }
    }, 5000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press '/' to focus search
    if (e.key === '/' && !e.target.matches('input')) {
        e.preventDefault();
        document.querySelector('.search-bar input').focus();
    }
    
    // Press 'Escape' to blur active element
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// Responsive behavior
function handleResize() {
    // Redraw chart on resize
    const canvas = document.getElementById('salesChart');
    if (canvas) {
        setTimeout(() => {
            initializeChart();
        }, 100);
    }
}

window.addEventListener('resize', handleResize);

// Performance monitoring
function trackPerformance() {
    // Measure page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Dashboard loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Track user interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.nav-item, .metric-item, .action-item')) {
            const elementType = e.target.closest('[class*="item"]').className;
            console.log(`User clicked: ${elementType}`);
        }
    });
}

// Initialize performance tracking
trackPerformance();

// Start real-time updates after initial load
setTimeout(startRealTimeUpdates, 2000);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
});

// Smooth page transitions
function addPageTransitions() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
}

addPageTransitions();

// ===== INTEGRATED CALENDAR WIDGET ===== 
function initializeCalendarWidget() {
    const actionItems = document.querySelectorAll('.action-item');
    const calendarIcon = actionItems[2]; // Calendar icon (3rd item: 0,1,2)
    const calendarWidget = document.getElementById('calendarWidget');
    const calendarClose = document.getElementById('calendarClose');
    
    console.log('Calendar icon found:', calendarIcon);
    console.log('Calendar widget found:', calendarWidget);
    
    if (!calendarIcon) {
        alert('Calendar icon not found!');
        return;
    }
    
    if (!calendarWidget) {
        alert('Calendar widget not found!');
        return;
    }
    
    // Show calendar when calendar icon is clicked
    if (calendarIcon) {
        calendarIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle calendar visibility
            if (calendarWidget.style.display === 'none' || calendarWidget.style.display === '') {
                showCalendar();
            } else {
                hideCalendar();
            }
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Close calendar when X button is clicked
    if (calendarClose) {
        calendarClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideCalendar();
        });
    }
    
    // Calendar navigation functionality
    const leftArrow = calendarWidget.querySelector('.left-arrow');
    const rightArrow = calendarWidget.querySelector('.right-arrow');
    const monthTitle = calendarWidget.querySelector('.month-title');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            // Previous month logic would go here
            console.log('Previous month clicked');
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            // Next month logic would go here
            console.log('Next month clicked');
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Day cell interactions
    const dayCells = calendarWidget.querySelectorAll('.day-cell');
    dayCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // Remove selected class from all cells
            dayCells.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked cell (only for current month)
            if (this.classList.contains('current-month')) {
                this.classList.add('selected');
                
                // Update the day highlight
                const dayText = this.textContent.trim();
                this.innerHTML = `<div class="day-highlight">${dayText}</div>`;
                
                console.log(`Selected date: ${dayText}`);
            }
        });
    });
    
    function showCalendar() {
        calendarWidget.style.display = 'block';
        calendarWidget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add animation class
        setTimeout(() => {
            calendarWidget.style.opacity = '1';
            calendarWidget.style.transform = 'translateY(0)';
        }, 10);
    }
    
    function hideCalendar() {
        calendarWidget.style.opacity = '0';
        calendarWidget.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            calendarWidget.style.display = 'none';
        }, 300);
    }
}

// ===== INTEGRATED BUDGET MODAL =====
function initializeBudgetModal() {
    const actionItems = document.querySelectorAll('.action-item');
    const calculatorIcon = actionItems[1]; // Calculator icon (2nd item: 0,1)
    const budgetModal = document.getElementById('budgetModal');
    const createBudgetBtn = document.getElementById('createBudgetBtn');
    
    console.log('Calculator icon found:', calculatorIcon);
    console.log('Budget modal found:', budgetModal);
    
    if (!calculatorIcon) {
        alert('Calculator icon not found!');
        return;
    }
    
    if (!budgetModal) {
        alert('Budget modal not found!');
        return;
    }
    
    // Show budget modal when calculator icon is clicked
    if (calculatorIcon) {
        calculatorIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showBudgetModal();
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Close modal when clicking outside the budget card
    if (budgetModal) {
        budgetModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideBudgetModal();
            }
        });
        
        // Prevent modal from closing when clicking inside the card
        const budgetCard = budgetModal.querySelector('.budget-card');
        if (budgetCard) {
            budgetCard.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Create Budget button functionality
    if (createBudgetBtn) {
        createBudgetBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate budget creation
            console.log('Creating budget...');
            
            // Show success feedback
            const originalText = this.textContent;
            this.textContent = 'Creating...';
            this.style.background = '#12B76A';
            
            setTimeout(() => {
                this.textContent = 'Budget Created ✓';
                
                setTimeout(() => {
                    hideBudgetModal();
                    
                    // Reset button after modal closes
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '#4545FE';
                    }, 300);
                }, 1500);
            }, 1000);
        });
        
        // Add ripple effect
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
    }
    
    // Card hover effects in budget modal
    const budgetCards = budgetModal.querySelectorAll('.card');
    budgetCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            console.log('Budget card clicked');
            
            // Add temporary highlight effect
            this.style.background = '#0A2336';
            setTimeout(() => {
                this.style.background = '#031B2E';
            }, 200);
        });
    });
    
    function showBudgetModal() {
        budgetModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add animation
        setTimeout(() => {
            budgetModal.style.opacity = '1';
            const budgetCard = budgetModal.querySelector('.budget-card');
            if (budgetCard) {
                budgetCard.style.transform = 'scale(1)';
            }
        }, 10);
    }
    
    function hideBudgetModal() {
        budgetModal.style.opacity = '0';
        const budgetCard = budgetModal.querySelector('.budget-card');
        if (budgetCard) {
            budgetCard.style.transform = 'scale(0.9)';
        }
        
        setTimeout(() => {
            budgetModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }, 300);
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && budgetModal.style.display === 'flex') {
            hideBudgetModal();
        }
    });
}

// Enhanced action item interactions
function enhanceHeaderActions() {
    const actionItems = document.querySelectorAll('.action-item');
    
    actionItems.forEach((item, index) => {
        // Add tooltip-like behavior
        const tooltips = ['Notifications', 'Budget Calculator', 'Calendar', 'Messages'];
        
        item.addEventListener('mouseenter', function() {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.textContent = tooltips[index];
            tooltip.style.cssText = `
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #191919;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 10px;
                white-space: nowrap;
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.2s;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('div');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize enhanced interactions
setTimeout(enhanceHeaderActions, 500);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeChart,
        initializeSearch,
        initializeMetricItems,
        initializeCalendarWidget,
        initializeBudgetModal
    };
}
