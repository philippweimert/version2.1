// Kontakt Page - Enhanced with Visual Improvements  
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Contact form animations
    setupContactFormAnimations();
    
    // Interactive contact elements
    setupContactInteractions();
    
    // Map and location animations
    setupLocationAnimations();
    
    // Contact info reveal animations
    setupContactInfoAnimations();
    
    // Form validation visual feedback
    setupFormValidationEffects();
});

function setupContactFormAnimations() {
    // Form container entrance
    const formContainer = $w('*').filter(element => 
        element.type === 'Container' && 
        (element.id && element.id.includes('form') || 
         element.children && element.children.some(child => 
            child.type === 'TextInput' || child.type === 'TextBox'
         ))
    );
    
    formContainer.forEach(container => {
        container.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(container, {
                    y: container.y + 30,
                    opacity: 0,
                    duration: 0
                })
                .add(container, {
                    y: container.y,
                    opacity: 1,
                    duration: 800,
                    easing: 'easeOutBack'
                })
                .play()
                .then(() => container.show());
        }, 300);
    });
    
    // Individual form field animations
    const formFields = $w('*').filter(element => 
        element.type === 'TextInput' || 
        element.type === 'TextBox' ||
        element.type === 'Dropdown'
    );
    
    formFields.forEach((field, index) => {
        field.hide();
        setTimeout(() => {
            field.show('slideInUp', {
                duration: 500,
                delay: index * 100
            });
        }, 500 + (index * 100));
    });
}

function setupContactInteractions() {
    // Enhanced input field interactions
    const inputs = $w('*').filter(element => 
        element.type === 'TextInput' || element.type === 'TextBox'
    );
    
    inputs.forEach(input => {
        // Focus animations
        input.onFocus(() => {
            wixAnimations.timeline()
                .add(input, {
                    scale: 1.02,
                    borderWidth: 2,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        input.onBlur(() => {
            wixAnimations.timeline()
                .add(input, {
                    scale: 1,
                    borderWidth: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Typing animation feedback
        input.onKeyPress(() => {
            wixAnimations.timeline()
                .add(input, {
                    backgroundColor: '#f8f9fa',
                    duration: 100
                })
                .add(input, {
                    backgroundColor: '#ffffff',
                    duration: 200
                })
                .play();
        });
    });
    
    // Contact buttons with enhanced feedback
    const contactButtons = $w('*').filter(element => 
        element.type === 'Button'
    );
    
    contactButtons.forEach(button => {
        button.onMouseIn(() => {
            wixAnimations.timeline()
                .add(button, {
                    scale: 1.05,
                    y: button.y - 2,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        button.onMouseOut(() => {
            wixAnimations.timeline()
                .add(button, {
                    scale: 1,
                    y: button.y,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        button.onClick(() => {
            // Success ripple animation
            wixAnimations.timeline()
                .add(button, {
                    scale: 0.98,
                    duration: 100
                })
                .add(button, {
                    scale: 1.02,
                    duration: 150,
                    easing: 'easeOutBack'
                })
                .add(button, {
                    scale: 1,
                    duration: 150,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
}

function setupLocationAnimations() {
    // Map container animations
    const mapElements = $w('*').filter(element => 
        element.type === 'GoogleMap' || 
        (element.type === 'Image' && element.id && element.id.includes('map'))
    );
    
    mapElements.forEach(mapElement => {
        mapElement.onMouseIn(() => {
            wixAnimations.timeline()
                .add(mapElement, {
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        mapElement.onMouseOut(() => {
            wixAnimations.timeline()
                .add(mapElement, {
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
    
    // Location pin animation
    const locationElements = $w('*').filter(element => 
        element.id && (
            element.id.includes('location') || 
            element.id.includes('address') ||
            element.id.includes('contact')
        )
    );
    
    locationElements.forEach(element => {
        // Pulse animation for location indicators
        const pulseAnimation = () => {
            wixAnimations.timeline()
                .add(element, {
                    scale: 1.05,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .add(element, {
                    scale: 1,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .play();
        };
        
        setInterval(pulseAnimation, 3000);
    });
}

function setupContactInfoAnimations() {
    // Contact information reveal
    const contactInfo = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        (element.text.includes('@') || 
         element.text.includes('+') || 
         element.text.includes('Tel') ||
         element.text.includes('Email'))
    );
    
    contactInfo.forEach((info, index) => {
        info.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(info, {
                    x: info.x - 30,
                    opacity: 0,
                    duration: 0
                })
                .add(info, {
                    x: info.x,
                    opacity: 1,
                    duration: 600,
                    easing: 'easeOutCubic'
                })
                .play()
                .then(() => info.show());
        }, 400 + (index * 200));
    });
    
    // Social media icons animation
    const socialIcons = $w('*').filter(element => 
        element.type === 'Image' && element.id && 
        (element.id.includes('social') || 
         element.id.includes('facebook') ||
         element.id.includes('twitter') ||
         element.id.includes('linkedin'))
    );
    
    socialIcons.forEach((icon, index) => {
        icon.onMouseIn(() => {
            wixAnimations.timeline()
                .add(icon, {
                    rotate: 15,
                    scale: 1.1,
                    duration: 200,
                    easing: 'easeOutBack'
                })
                .play();
        });
        
        icon.onMouseOut(() => {
            wixAnimations.timeline()
                .add(icon, {
                    rotate: 0,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Staggered entrance
        setTimeout(() => {
            icon.show('bounceIn', {
                duration: 600
            });
        }, index * 150);
    });
}

function setupFormValidationEffects() {
    // Real-time validation feedback
    const requiredFields = $w('*').filter(element => 
        element.type === 'TextInput' || element.type === 'TextBox'
    );
    
    requiredFields.forEach(field => {
        field.onChange(() => {
            if (field.value && field.value.length > 0) {
                // Valid input animation
                wixAnimations.timeline()
                    .add(field, {
                        borderColor: '#28a745',
                        backgroundColor: '#f8fff9',
                        duration: 200
                    })
                    .play();
            } else {
                // Reset to neutral state
                wixAnimations.timeline()
                    .add(field, {
                        borderColor: '#dee2e6',
                        backgroundColor: '#ffffff',
                        duration: 200
                    })
                    .play();
            }
        });
        
        // Email validation for email fields
        if (field.inputType === 'email' || 
            (field.id && field.id.includes('email'))) {
            field.onChange(() => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    // Invalid email animation
                    wixAnimations.timeline()
                        .add(field, {
                            borderColor: '#dc3545',
                            backgroundColor: '#fff5f5',
                            duration: 200
                        })
                        .play();
                }
            });
        }
    });
    
    // Submit button state management
    const submitButton = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('Send') || 
         element.label.includes('Submit') ||
         element.label.includes('Senden'))
    )[0];
    
    if (submitButton) {
        submitButton.onClick(() => {
            // Loading state animation
            const originalLabel = submitButton.label;
            submitButton.label = 'Wird gesendet...';
            submitButton.disable();
            
            wixAnimations.timeline()
                .add(submitButton, {
                    opacity: 0.7,
                    duration: 200
                })
                .play();
            
            // Simulate form processing
            setTimeout(() => {
                submitButton.label = 'Gesendet!';
                wixAnimations.timeline()
                    .add(submitButton, {
                        backgroundColor: '#28a745',
                        opacity: 1,
                        scale: 1.05,
                        duration: 300,
                        easing: 'easeOutBack'
                    })
                    .add(submitButton, {
                        scale: 1,
                        duration: 200
                    })
                    .play();
                
                // Reset after 3 seconds
                setTimeout(() => {
                    submitButton.label = originalLabel;
                    submitButton.enable();
                    wixAnimations.timeline()
                        .add(submitButton, {
                            backgroundColor: '#007bff',
                            duration: 200
                        })
                        .play();
                }, 3000);
            }, 2000);
        });
    }
}