// Login Portal Page - Enhanced with Visual Improvements
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Login form animations
    setupLoginAnimations();
    
    // Form validation effects
    setupFormValidation();
    
    // Security-focused visual feedback
    setupSecurityFeatures();
    
    // Loading states and transitions
    setupLoadingStates();
    
    // Error handling animations
    setupErrorHandling();
});

function setupLoginAnimations() {
    // Login container entrance
    const loginContainer = $w('*').filter(element => 
        element.type === 'Container' && 
        (element.id && element.id.includes('login') ||
         element.children && element.children.some(child => 
            child.type === 'PasswordInput' || 
            (child.type === 'TextInput' && child.inputType === 'email')
         ))
    )[0];
    
    if (loginContainer) {
        loginContainer.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(loginContainer, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0
                })
                .add(loginContainer, {
                    scale: 1,
                    opacity: 1,
                    duration: 600,
                    easing: 'easeOutBack'
                })
                .play()
                .then(() => loginContainer.show());
        }, 200);
    }
    
    // Login form fields animation
    const formFields = $w('*').filter(element => 
        element.type === 'TextInput' || 
        element.type === 'PasswordInput' ||
        element.type === 'Button'
    );
    
    formFields.forEach((field, index) => {
        field.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(field, {
                    y: field.y + 20,
                    opacity: 0,
                    duration: 0
                })
                .add(field, {
                    y: field.y,
                    opacity: 1,
                    duration: 400,
                    easing: 'easeOutQuart'
                })
                .play()
                .then(() => field.show());
        }, 400 + (index * 100));
    });
}

function setupFormValidation() {
    // Email/Username field validation  
    const usernameField = $w('*').filter(element => 
        element.type === 'TextInput' && 
        (element.inputType === 'email' || 
         element.placeholder && element.placeholder.includes('Email') ||
         element.id && element.id.includes('username'))
    )[0];
    
    if (usernameField) {
        usernameField.onFocus(() => {
            wixAnimations.timeline()
                .add(usernameField, {
                    borderColor: '#007bff',
                    borderWidth: 2,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        usernameField.onBlur(() => {
            wixAnimations.timeline()
                .add(usernameField, {
                    borderColor: '#dee2e6',
                    borderWidth: 1,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        usernameField.onChange(() => {
            if (usernameField.value && usernameField.value.length > 0) {
                // Valid input feedback
                wixAnimations.timeline()
                    .add(usernameField, {
                        borderColor: '#28a745',
                        backgroundColor: '#f8fff9',
                        duration: 200
                    })
                    .play();
            }
        });
    }
    
    // Password field validation
    const passwordField = $w('*').filter(element => 
        element.type === 'PasswordInput'
    )[0];
    
    if (passwordField) {
        passwordField.onFocus(() => {
            wixAnimations.timeline()
                .add(passwordField, {
                    borderColor: '#007bff',
                    borderWidth: 2,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        passwordField.onBlur(() => {
            wixAnimations.timeline()
                .add(passwordField, {
                    borderColor: '#dee2e6',
                    borderWidth: 1,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Password strength indicator
        passwordField.onChange(() => {
            const password = passwordField.value;
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            let borderColor = '#dc3545'; // weak
            let backgroundColor = '#fff5f5';
            
            if (strength >= 2) {
                borderColor = '#ffc107'; // medium
                backgroundColor = '#fffbf0';
            }
            if (strength >= 3) {
                borderColor = '#28a745'; // strong
                backgroundColor = '#f8fff9';
            }
            
            wixAnimations.timeline()
                .add(passwordField, {
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    duration: 300
                })
                .play();
        });
    }
}

function setupSecurityFeatures() {
    // Security indicators
    const securityIcons = $w('*').filter(element => 
        element.type === 'Image' && element.id && 
        (element.id.includes('security') || 
         element.id.includes('lock') ||
         element.id.includes('shield'))
    );
    
    securityIcons.forEach(icon => {
        // Pulsing security indicator
        const pulseAnimation = () => {
            wixAnimations.timeline()
                .add(icon, {
                    opacity: 0.7,
                    scale: 1.1,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .add(icon, {
                    opacity: 1,
                    scale: 1,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .play();
        };
        
        setInterval(pulseAnimation, 3000);
    });
    
    // Two-factor authentication elements
    const twoFactorElements = $w('*').filter(element => 
        element.id && element.id.includes('2fa')
    );
    
    twoFactorElements.forEach(element => {
        element.onMouseIn(() => {
            wixAnimations.timeline()
                .add(element, {
                    backgroundColor: '#e3f2fd',
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        element.onMouseOut(() => {
            wixAnimations.timeline()
                .add(element, {
                    backgroundColor: 'transparent',
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
}

function setupLoadingStates() {
    // Login button loading animation
    const loginButton = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('Login') || 
         element.label.includes('Anmelden') ||
         element.label.includes('Einloggen'))
    )[0];
    
    if (loginButton) {
        loginButton.onClick(() => {
            // Loading state
            const originalLabel = loginButton.label;
            loginButton.label = 'Wird angemeldet...';
            loginButton.disable();
            
            wixAnimations.timeline()
                .add(loginButton, {
                    opacity: 0.7,
                    duration: 200
                })
                .play();
            
            // Simulate login process
            setTimeout(() => {
                // Success animation
                loginButton.label = 'Erfolgreich!';
                wixAnimations.timeline()
                    .add(loginButton, {
                        backgroundColor: '#28a745',
                        opacity: 1,
                        scale: 1.05,
                        duration: 300,
                        easing: 'easeOutBack'
                    })
                    .add(loginButton, {
                        scale: 1,
                        duration: 200
                    })
                    .play();
                
                // Reset after redirect
                setTimeout(() => {
                    loginButton.label = originalLabel;
                    loginButton.enable();
                }, 1500);
            }, 2000);
        });
        
        // Button hover effects
        loginButton.onMouseIn(() => {
            wixAnimations.timeline()
                .add(loginButton, {
                    scale: 1.05,
                    y: loginButton.y - 2,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        loginButton.onMouseOut(() => {
            wixAnimations.timeline()
                .add(loginButton, {
                    scale: 1,
                    y: loginButton.y,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    }
    
    // Loading spinner for authentication
    const loadingSpinner = $w('*').filter(element => 
        element.id && element.id.includes('spinner')
    )[0];
    
    if (loadingSpinner) {
        loadingSpinner.hide();
        
        // Show spinner during login
        setTimeout(() => {
            loadingSpinner.show();
            const spinAnimation = () => {
                wixAnimations.timeline()
                    .add(loadingSpinner, {
                        rotate: 360,
                        duration: 1000,
                        easing: 'linear'
                    })
                    .play()
                    .then(() => {
                        loadingSpinner.rotate = 0;
                        if (loadingSpinner.isVisible) {
                            spinAnimation();
                        }
                    });
            };
            spinAnimation();
        }, 1000);
    }
}

function setupErrorHandling() {
    // Error message animations
    const errorMessages = $w('*').filter(element => 
        element.id && element.id.includes('error')
    );
    
    errorMessages.forEach(error => {
        error.hide();
        
        // Show error with shake animation
        const showError = () => {
            error.show();
            wixAnimations.timeline()
                .add(error, {
                    x: error.x - 5,
                    backgroundColor: '#f8d7da',
                    borderColor: '#dc3545',
                    duration: 100
                })
                .add(error, {
                    x: error.x + 5,
                    duration: 100
                })
                .add(error, {
                    x: error.x - 5,
                    duration: 100
                })
                .add(error, {
                    x: error.x,
                    duration: 100
                })
                .play();
        };
        
        // Hide error after delay
        const hideError = () => {
            setTimeout(() => {
                error.hide('fadeOut', { duration: 300 });
            }, 5000);
        };
    });
    
    // Forgot password link animation
    const forgotPasswordLink = $w('*').filter(element => 
        element.type === 'Link' && element.text && 
        element.text.includes('Passwort')
    )[0];
    
    if (forgotPasswordLink) {
        forgotPasswordLink.onMouseIn(() => {
            wixAnimations.timeline()
                .add(forgotPasswordLink, {
                    color: '#007bff',
                    textDecoration: 'underline',
                    x: forgotPasswordLink.x + 3,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        forgotPasswordLink.onMouseOut(() => {
            wixAnimations.timeline()
                .add(forgotPasswordLink, {
                    color: '#6c757d',
                    textDecoration: 'none',
                    x: forgotPasswordLink.x,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    }
}