// Start Page - Enhanced with Visual Improvements
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Hero section animations
    setupHeroAnimations();
    
    // Interactive elements
    setupInteractiveElements();
    
    // Parallax scrolling effects
    setupParallaxEffects();
    
    // Call-to-action animations
    setupCTAAnimations();
    
    // Section reveal animations
    setupSectionReveals();
});

function setupHeroAnimations() {
    // Animated hero title entrance
    const heroElements = $w('*').filter(element => 
        element.id && (
            element.id.includes('hero') || 
            element.id.includes('title') ||
            element.id.includes('heading')
        )
    );
    
    heroElements.forEach((element, index) => {
        element.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(element, {
                    y: element.y + 30,
                    opacity: 0,
                    duration: 0
                })
                .add(element, {
                    y: element.y,
                    opacity: 1,
                    duration: 800,
                    easing: 'easeOutBack'
                })
                .play()
                .then(() => element.show());
        }, index * 200 + 500);
    });
}

function setupInteractiveElements() {
    // Enhanced button interactions with ripple effect
    const buttons = $w('*').filter(element => element.type === 'Button');
    
    buttons.forEach(button => {
        button.onClick(() => {
            // Ripple animation on click
            wixAnimations.timeline()
                .add(button, {
                    scale: 0.95,
                    duration: 100,
                    easing: 'easeOutQuart'
                })
                .add(button, {
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutBack'
                })
                .add(button, {
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Glow effect on hover
        button.onMouseIn(() => {
            wixAnimations.timeline()
                .add(button, {
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        button.onMouseOut(() => {
            wixAnimations.timeline()
                .add(button, {
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
}

function setupParallaxEffects() {
    // Parallax scrolling for background elements
    const backgroundElements = $w('*').filter(element => 
        element.type === 'Image' || element.type === 'Container'
    );
    
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        
        backgroundElements.forEach(element => {
            try {
                // Subtle parallax movement
                const speed = 0.1;
                wixAnimations.timeline()
                    .add(element, {
                        y: element.y - (scrollTop * speed),
                        duration: 50,
                        easing: 'linear'
                    })
                    .play();
            } catch (e) {
                // Skip elements that don't support animation
            }
        });
    });
}

function setupCTAAnimations() {
    // Call-to-action pulse animation
    const ctaElements = $w('*').filter(element => 
        element.id && (
            element.id.includes('cta') || 
            element.id.includes('action') ||
            (element.type === 'Button' && element.label && 
             (element.label.includes('Start') || 
              element.label.includes('Mehr') ||
              element.label.includes('Jetzt')))
        )
    );
    
    ctaElements.forEach(element => {
        // Subtle breathing animation
        setInterval(() => {
            wixAnimations.timeline()
                .add(element, {
                    scale: 1.02,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .add(element, {
                    scale: 1,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .play();
        }, 3000);
    });
}

function setupSectionReveals() {
    // Staggered section reveals on scroll
    const sections = $w('*').filter(element => 
        element.type === 'Section' || element.type === 'Container'
    );
    
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        const windowHeight = wixWindow.viewportHeight;
        
        sections.forEach((section, index) => {
            try {
                const sectionTop = section.y;
                const sectionHeight = section.height;
                
                // Check if section is entering viewport
                if (scrollTop + windowHeight > sectionTop + 100 && 
                    scrollTop < sectionTop + sectionHeight - 100) {
                    
                    // Reveal animation with slide up
                    wixAnimations.timeline()
                        .add(section, {
                            y: sectionTop + 20,
                            opacity: 0.8,
                            duration: 0
                        })
                        .add(section, {
                            y: sectionTop,
                            opacity: 1,
                            duration: 600,
                            easing: 'easeOutQuart',
                            delay: index * 100
                        })
                        .play();
                }
            } catch (e) {
                // Skip elements that don't support these properties
            }
        });
    });
    
    // Text typing effect for headings
    const headings = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        element.text.length > 10 && element.text.length < 100
    );
    
    headings.forEach(heading => {
        const originalText = heading.text;
        heading.text = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = setInterval(() => {
                heading.text = originalText.substring(0, i + 1);
                i++;
                if (i >= originalText.length) {
                    clearInterval(typeWriter);
                }
            }, 50);
        }, 1000);
    });
}