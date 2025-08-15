// Debug version of dashboard.js with detailed logging
console.log('🔥 DASHBOARD DEBUG VERSION LOADED');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 DOM Content Loaded - Starting initialization...');
    
    // Test if basic DOM elements exist
    const actionItems = document.querySelectorAll('.action-item');
    console.log(`🎯 Found ${actionItems.length} action items:`, actionItems);
    
    const calendarWidget = document.getElementById('calendarWidget');
    console.log('📅 Calendar widget element:', calendarWidget);
    
    const budgetModal = document.getElementById('budgetModal');
    console.log('💰 Budget modal element:', budgetModal);
    
    if (actionItems.length === 0) {
        alert('❌ ERROR: No action items found! Check if dashboard loaded correctly.');
        return;
    }
    
    // Add click handlers with detailed debugging
    actionItems.forEach((item, index) => {
        console.log(`🔧 Setting up action item ${index}:`, item);
        
        item.addEventListener('click', function() {
            console.log(`🖱️ CLICKED action item ${index}`);
            
            // Add visual feedback
            this.style.border = '3px solid red';
            setTimeout(() => {
                this.style.border = '';
            }, 1000);
            
            switch(index) {
                case 1: // Calculator (2nd item)
                    console.log('💰 Opening budget modal...');
                    if (budgetModal) {
                        budgetModal.style.display = 'flex';
                        budgetModal.style.opacity = '1';
                        console.log('✅ Budget modal should be visible now');
                    } else {
                        alert('❌ Budget modal not found!');
                    }
                    break;
                    
                case 2: // Calendar (3rd item)
                    console.log('📅 Opening calendar widget...');
                    if (calendarWidget) {
                        calendarWidget.style.display = 'block';
                        calendarWidget.style.opacity = '1';
                        calendarWidget.style.transform = 'translateY(0)';
                        console.log('✅ Calendar widget should be visible now as dropdown overlay');
                    } else {
                        alert('❌ Calendar widget not found!');
                    }
                    break;
                    
                default:
                    console.log(`🎯 Action item ${index} clicked (demo only)`);
            }
        });
    });
    
    // Close handlers
    const calendarClose = document.getElementById('calendarClose');
    if (calendarClose) {
        calendarClose.addEventListener('click', function() {
            console.log('❌ Closing calendar...');
            if (calendarWidget) {
                calendarWidget.style.display = 'none';
            }
        });
    }
    
    // Budget modal close on outside click
    if (budgetModal) {
        budgetModal.addEventListener('click', function(e) {
            if (e.target === this) {
                console.log('❌ Closing budget modal (outside click)...');
                this.style.display = 'none';
            }
        });
    }
    
    // ESC key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('⌨️ ESC key pressed - closing modals...');
            if (budgetModal && budgetModal.style.display === 'flex') {
                budgetModal.style.display = 'none';
            }
            if (calendarWidget && calendarWidget.style.display === 'block') {
                calendarWidget.style.display = 'none';
            }
        }
    });
    
    console.log('✅ DEBUG: All handlers set up successfully!');
    
    // Test functions available globally
    window.debugTestCalendar = function() {
        console.log('🧪 Testing calendar...');
        if (calendarWidget) {
            calendarWidget.style.display = 'block';
            calendarWidget.style.opacity = '1';
            console.log('Calendar should be visible');
        }
    };
    
    window.debugTestBudget = function() {
        console.log('🧪 Testing budget modal...');
        if (budgetModal) {
            budgetModal.style.display = 'flex';
            budgetModal.style.opacity = '1';
            console.log('Budget modal should be visible');
        }
    };
    
    console.log('🎮 Debug functions available:');
    console.log('  - debugTestCalendar() - Force open calendar');
    console.log('  - debugTestBudget() - Force open budget modal');
});
