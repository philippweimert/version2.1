// Portal Page - Enhanced with Visual Improvements
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Portal-specific animations
    setupPortalAnimations();
    
    // Interactive dashboard elements
    setupDashboardEffects();
    
    // Form field enhancements
    setupFormEnhancements();
    
    // Loading states for portal content
    setupPortalLoadingStates();
    
    // Navigation animations
    setupPortalNavigation();
});

function setupPortalAnimations() {
    // Portal entrance animation
    const portalElements = $w('*').filter(element => 
        element.type === 'Container' || element.type === 'Box'
    );
    
    portalElements.forEach((element, index) => {
        element.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(element, {
                    x: element.x - 50,
                    opacity: 0,
                    duration: 0
                })
                .add(element, {
                    x: element.x,
                    opacity: 1,
                    duration: 600,
                    easing: 'easeOutCubic'
                })
                .play()
                .then(() => element.show());
        }, index * 150);
    });
}

function setupDashboardEffects() {
    // Dashboard card hover effects
    const cards = $w('*').filter(element => 
        element.type === 'Container' || element.type === 'Box'
    );
    
    cards.forEach(card => {
        card.onMouseIn(() => {
            wixAnimations.timeline()
                .add(card, {
                    scale: 1.03,
                    y: card.y - 5,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        card.onMouseOut(() => {
            wixAnimations.timeline()
                .add(card, {
                    scale: 1,
                    y: card.y,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
    
    // Progress bar animations
    const progressElements = $w('*').filter(element => 
        element.id && element.id.includes('progress')
    );
    
    progressElements.forEach(element => {
        // Animated progress fill
        wixAnimations.timeline()
            .add(element, {
                width: 0,
                duration: 0
            })
            .add(element, {
                width: element.width,
                duration: 1500,
                easing: 'easeOutQuart'
            })
            .play();
    });
}

function setupFormEnhancements() {
    // Enhanced form field interactions
    const inputs = $w('*').filter(element => 
        element.type === 'TextInput' || 
        element.type === 'TextBox' ||
        element.type === 'PasswordInput'
    );
    
    inputs.forEach(input => {
        input.onFocus(() => {
            wixAnimations.timeline()
                .add(input, {
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        input.onBlur(() => {
            wixAnimations.timeline()
                .add(input, {
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Floating label effect
        input.onChange(() => {
            if (input.value && input.value.length > 0) {
                wixAnimations.timeline()
                    .add(input, {
                        borderColor: '#4CAF50',
                        duration: 200
                    })
                    .play();
            }
        });
    });
    
    // Form submission animation
    const submitButtons = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('Submit') || 
         element.label.includes('Senden') ||
         element.label.includes('Einloggen'))
    );
    
    submitButtons.forEach(button => {
        button.onClick(() => {
            // Loading spinner animation
            button.disable();
            wixAnimations.timeline()
                .add(button, {
                    rotate: 360,
                    duration: 1000,
                    easing: 'linear'
                })
                .play()
                .then(() => {
                    setTimeout(() => {
                        button.enable();
                    }, 500);
                });
        });
    });
}

function setupPortalLoadingStates() {
    // Skeleton loading animations
    const contentAreas = $w('*').filter(element => 
        element.type === 'Text' || element.type === 'RichText'
    );
    
    contentAreas.forEach((element, index) => {
        // Create shimmer effect
        const shimmerAnimation = () => {
            wixAnimations.timeline()
                .add(element, {
                    opacity: 0.3,
                    duration: 800,
                    easing: 'easeInOutSine'
                })
                .add(element, {
                    opacity: 1,
                    duration: 800,
                    easing: 'easeInOutSine'
                })
                .play();
        };
        
        // Start shimmer after delay
        setTimeout(() => {
            shimmerAnimation();
            setInterval(shimmerAnimation, 2000);
        }, index * 100);
    });
}

function setupPortalNavigation() {
    // Tab switching animations
    const navElements = $w('*').filter(element => 
        element.type === 'Button' && element.id && 
        (element.id.includes('nav') || element.id.includes('tab'))
    );
    
    navElements.forEach(navItem => {
        navItem.onClick(() => {
            // Active state animation
            wixAnimations.timeline()
                .add(navItem, {
                    scale: 0.95,
                    duration: 100,
                    easing: 'easeOutQuart'
                })
                .add(navItem, {
                    scale: 1,
                    y: navItem.y - 2,
                    duration: 200,
                    easing: 'easeOutBack'
                })
                .play();
        });
    });
    
    // Breadcrumb animations
    const breadcrumbs = $w('*').filter(element => 
        element.type === 'Text' && element.id && 
        element.id.includes('breadcrumb')
    );
    
    breadcrumbs.forEach((breadcrumb, index) => {
        breadcrumb.show('slideInLeft', {
            duration: 400,
            delay: index * 100
        });
    });
}