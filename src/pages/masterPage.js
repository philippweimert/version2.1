// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// Enhanced Master Page with Visual Improvements

import wixWindow from 'wix-window';
import wixAnimations from 'wix-animations';

$w.onReady(function () {
    // Smooth scrolling for all internal links
    setupSmoothScrolling();
    
    // Add loading animations
    setupLoadingAnimations();
    
    // Setup global hover effects
    setupGlobalHoverEffects();
    
    // Add scroll-triggered animations
    setupScrollAnimations();
    
    // Setup responsive navigation effects
    setupNavigationEffects();
});

function setupSmoothScrolling() {
    // Find all anchor links and add smooth scrolling
    const links = $w('*').filter(element => 
        element.type === 'Link' || element.type === 'Button'
    );
    
    links.forEach(link => {
        if (link.link && link.link.includes('#')) {
            link.onClick(() => {
                const targetId = link.link.split('#')[1];
                const target = $w(`#${targetId}`);
                if (target.length > 0) {
                    target.scrollTo({
                        duration: 800,
                        easing: 'easeInOutCubic'
                    });
                }
            });
        }
    });
}

function setupLoadingAnimations() {
    // Fade in the page content
    const pageElements = $w('*').filter(element => 
        element.type === 'Container' || 
        element.type === 'Section' ||
        element.type === 'Box'
    );
    
    pageElements.forEach((element, index) => {
        element.hide();
        setTimeout(() => {
            element.show('fade', {
                duration: 600,
                delay: index * 100
            });
        }, 200);
    });
}

function setupGlobalHoverEffects() {
    // Enhanced button hover effects
    const buttons = $w('*').filter(element => element.type === 'Button');
    
    buttons.forEach(button => {
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
    
    // Image hover effects
    const images = $w('*').filter(element => element.type === 'Image');
    
    images.forEach(image => {
        image.onMouseIn(() => {
            wixAnimations.timeline()
                .add(image, {
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        image.onMouseOut(() => {
            wixAnimations.timeline()
                .add(image, {
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
}

function setupScrollAnimations() {
    // Get viewport scroll position
    wixWindow.scrollTo(0);
    
    // Add scroll-triggered fade-in animations
    const animatableElements = $w('*').filter(element => 
        element.type === 'Text' || 
        element.type === 'RichText' ||
        element.type === 'Image' ||
        element.type === 'Container'
    );
    
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        const windowHeight = wixWindow.viewportHeight;
        
        animatableElements.forEach(element => {
            try {
                const elementTop = element.y;
                const elementHeight = element.height;
                
                // Check if element is in viewport
                if (scrollTop + windowHeight > elementTop && 
                    scrollTop < elementTop + elementHeight) {
                    
                    // Fade in with slight slide up
                    if (!element.isVisible) {
                        wixAnimations.timeline()
                            .add(element, {
                                y: elementTop - 20,
                                opacity: 0,
                                duration: 0
                            })
                            .add(element, {
                                y: elementTop,
                                opacity: 1,
                                duration: 600,
                                easing: 'easeOutQuart'
                            })
                            .play();
                    }
                }
            } catch (e) {
                // Skip elements that don't support these properties
            }
        });
    });
}

function setupNavigationEffects() {
    // Add menu animation effects
    const menuItems = $w('*').filter(element => 
        element.type === 'MenuContainer' || 
        element.type === 'Menu'
    );
    
    menuItems.forEach(menu => {
        // Smooth reveal animation for menus
        menu.onMouseIn(() => {
            wixAnimations.timeline()
                .add(menu, {
                    opacity: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
    
    // Add stagger animation for text elements
    const textElements = $w('*').filter(element => 
        element.type === 'Text' && element.text && element.text.length > 0
    );
    
    textElements.forEach((textElement, index) => {
        setTimeout(() => {
            textElement.show('fadeIn', {
                duration: 400,
                delay: index * 50
            });
        }, 100);
    });
}