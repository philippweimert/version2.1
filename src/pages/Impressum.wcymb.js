// Impressum Page - Enhanced with Visual Improvements (Content Unchanged)
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Subtle visual enhancements for legal page
    setupLegalPageAnimations();
    
    // Text readability improvements
    setupReadabilityEnhancements();
    
    // Navigation improvements
    setupLegalNavigation();
    
    // Print-friendly animations
    setupPrintOptimizations();
});

function setupLegalPageAnimations() {
    // Gentle fade-in for legal content
    const legalSections = $w('*').filter(element => 
        element.type === 'Container' || element.type === 'Section'
    );
    
    legalSections.forEach((section, index) => {
        section.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(section, {
                    opacity: 0,
                    duration: 0
                })
                .add(section, {
                    opacity: 1,
                    duration: 600,
                    easing: 'easeOutQuart'
                })
                .play()
                .then(() => section.show());
        }, index * 100 + 200);
    });
}

function setupReadabilityEnhancements() {
    // Subtle text animations for better readability
    const textElements = $w('*').filter(element => 
        element.type === 'Text' || element.type === 'RichText'
    );
    
    textElements.forEach((text, index) => {
        // Gentle entrance animation
        text.hide();
        setTimeout(() => {
            text.show('fadeIn', {
                duration: 400,
                delay: index * 50
            });
        }, 300);
        
        // Hover effect for better focus
        if (text.type === 'Text') {
            text.onMouseIn(() => {
                wixAnimations.timeline()
                    .add(text, {
                        backgroundColor: '#f8f9fa',
                        duration: 200
                    })
                    .play();
            });
            
            text.onMouseOut(() => {
                wixAnimations.timeline()
                    .add(text, {
                        backgroundColor: 'transparent',
                        duration: 200
                    })
                    .play();
            });
        }
    });
}

function setupLegalNavigation() {
    // Smooth scrolling for legal sections
    const sectionHeaders = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        (element.text.includes('§') || 
         element.text.includes('Artikel') ||
         element.text.includes('Absatz'))
    );
    
    sectionHeaders.forEach(header => {
        header.onClick(() => {
            wixAnimations.timeline()
                .add(header, {
                    backgroundColor: '#fff3cd',
                    duration: 200
                })
                .add(header, {
                    backgroundColor: 'transparent',
                    duration: 1000
                })
                .play();
        });
    });
    
    // Back to top functionality
    const backToTopButton = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('Top') || element.label.includes('Oben'))
    )[0];
    
    if (backToTopButton) {
        backToTopButton.onClick(() => {
            wixWindow.scrollTo(0, {
                duration: 800,
                easing: 'easeInOutCubic'
            });
        });
        
        // Show/hide based on scroll position
        wixWindow.onScroll(() => {
            const scrollTop = wixWindow.scrollY;
            if (scrollTop > 300) {
                backToTopButton.show('fadeIn', { duration: 300 });
            } else {
                backToTopButton.hide('fadeOut', { duration: 300 });
            }
        });
    }
}

function setupPrintOptimizations() {
    // Optimize layout for printing
    const printButton = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('Print') || element.label.includes('Drucken'))
    )[0];
    
    if (printButton) {
        printButton.onClick(() => {
            // Print preparation animation
            wixAnimations.timeline()
                .add(printButton, {
                    scale: 0.95,
                    duration: 100
                })
                .add(printButton, {
                    scale: 1,
                    backgroundColor: '#28a745',
                    duration: 200,
                    easing: 'easeOutBack'
                })
                .play();
            
            // Trigger browser print
            setTimeout(() => {
                window.print();
            }, 300);
        });
    }
    
    // Subtle line spacing improvements for legal text
    const legalTexts = $w('*').filter(element => 
        element.type === 'RichText'
    );
    
    legalTexts.forEach(text => {
        // Improve readability with subtle animations
        wixWindow.onScroll(() => {
            try {
                const scrollTop = wixWindow.scrollY;
                const windowHeight = wixWindow.viewportHeight;
                const textTop = text.y;
                
                if (scrollTop + windowHeight > textTop && 
                    scrollTop < textTop + text.height) {
                    // Highlight current reading section
                    wixAnimations.timeline()
                        .add(text, {
                            backgroundColor: '#fafafa',
                            duration: 300
                        })
                        .play();
                } else {
                    wixAnimations.timeline()
                        .add(text, {
                            backgroundColor: 'transparent',
                            duration: 300
                        })
                        .play();
                }
            } catch (e) {
                // Skip elements that don't support these properties
            }
        });
    });
}