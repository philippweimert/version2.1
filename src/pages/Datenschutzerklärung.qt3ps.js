// Datenschutzerklärung Page - Enhanced with Visual Improvements (Content Unchanged)
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Privacy policy visual enhancements
    setupPrivacyPageAnimations();
    
    // Content organization improvements
    setupContentNavigation();
    
    // Reading progress tracking
    setupReadingProgress();
    
    // Accessibility improvements
    setupAccessibilityFeatures();
});

function setupPrivacyPageAnimations() {
    // Gentle entrance for privacy content
    const privacySections = $w('*').filter(element => 
        element.type === 'Container' || element.type === 'Section'
    );
    
    privacySections.forEach((section, index) => {
        section.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(section, {
                    y: section.y + 20,
                    opacity: 0,
                    duration: 0
                })
                .add(section, {
                    y: section.y,
                    opacity: 1,
                    duration: 500,
                    easing: 'easeOutQuart'
                })
                .play()
                .then(() => section.show());
        }, index * 150 + 200);
    });
    
    // Title animation
    const privacyTitle = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        element.text.includes('Datenschutz')
    )[0];
    
    if (privacyTitle) {
        privacyTitle.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(privacyTitle, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0
                })
                .add(privacyTitle, {
                    scale: 1,
                    opacity: 1,
                    duration: 600,
                    easing: 'easeOutBack'
                })
                .play()
                .then(() => privacyTitle.show());
        }, 100);
    }
}

function setupContentNavigation() {
    // Section headers for easy navigation
    const sectionHeaders = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        (element.text.includes('Artikel') || 
         element.text.includes('Abschnitt') ||
         element.text.includes('§') ||
         element.text.length < 100 && element.text.length > 10)
    );
    
    sectionHeaders.forEach(header => {
        // Hover effect for section headers
        header.onMouseIn(() => {
            wixAnimations.timeline()
                .add(header, {
                    backgroundColor: '#e3f2fd',
                    borderLeft: '4px solid #2196f3',
                    paddingLeft: '10px',
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        header.onMouseOut(() => {
            wixAnimations.timeline()
                .add(header, {
                    backgroundColor: 'transparent',
                    borderLeft: 'none',
                    paddingLeft: '0px',
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Click to highlight section
        header.onClick(() => {
            wixAnimations.timeline()
                .add(header, {
                    backgroundColor: '#fff3e0',
                    duration: 300
                })
                .add(header, {
                    backgroundColor: 'transparent',
                    duration: 1500
                })
                .play();
        });
    });
    
    // Table of contents animation
    const tocElements = $w('*').filter(element => 
        element.id && element.id.includes('toc')
    );
    
    tocElements.forEach((toc, index) => {
        toc.hide();
        setTimeout(() => {
            toc.show('slideInLeft', {
                duration: 400,
                delay: index * 100
            });
        }, 500);
    });
}

function setupReadingProgress() {
    // Reading progress indicator
    const progressIndicator = $w('*').filter(element => 
        element.id && element.id.includes('progress')
    )[0];
    
    if (progressIndicator) {
        wixWindow.onScroll(() => {
            const scrollTop = wixWindow.scrollY;
            const documentHeight = wixWindow.documentHeight;
            const windowHeight = wixWindow.viewportHeight;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            wixAnimations.timeline()
                .add(progressIndicator, {
                    width: `${Math.min(scrollPercent, 100)}%`,
                    duration: 50,
                    easing: 'linear'
                })
                .play();
        });
    }
    
    // Scroll-based content highlighting
    const contentParagraphs = $w('*').filter(element => 
        element.type === 'RichText' || 
        (element.type === 'Text' && element.text && element.text.length > 50)
    );
    
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        const windowHeight = wixWindow.viewportHeight;
        
        contentParagraphs.forEach(paragraph => {
            try {
                const paragraphTop = paragraph.y;
                const paragraphHeight = paragraph.height;
                
                // Highlight paragraph in viewport center
                if (scrollTop + (windowHeight / 2) > paragraphTop && 
                    scrollTop + (windowHeight / 2) < paragraphTop + paragraphHeight) {
                    
                    wixAnimations.timeline()
                        .add(paragraph, {
                            backgroundColor: '#f8f9fa',
                            borderLeft: '3px solid #007bff',
                            paddingLeft: '15px',
                            duration: 200
                        })
                        .play();
                } else {
                    wixAnimations.timeline()
                        .add(paragraph, {
                            backgroundColor: 'transparent',
                            borderLeft: 'none',
                            paddingLeft: '0px',
                            duration: 200
                        })
                        .play();
                }
            } catch (e) {
                // Skip elements that don't support these properties
            }
        });
    });
}

function setupAccessibilityFeatures() {
    // Font size adjustment buttons
    const fontSizeButtons = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('A+') || 
         element.label.includes('A-') ||
         element.label.includes('Font'))
    );
    
    fontSizeButtons.forEach(button => {
        button.onClick(() => {
            wixAnimations.timeline()
                .add(button, {
                    scale: 0.9,
                    duration: 100
                })
                .add(button, {
                    scale: 1.1,
                    backgroundColor: '#4caf50',
                    duration: 150,
                    easing: 'easeOutBack'
                })
                .add(button, {
                    scale: 1,
                    duration: 150
                })
                .play();
        });
    });
    
    // High contrast mode toggle
    const contrastButton = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        element.label.includes('Kontrast')
    )[0];
    
    if (contrastButton) {
        let highContrast = false;
        
        contrastButton.onClick(() => {
            highContrast = !highContrast;
            
            const allTexts = $w('*').filter(element => 
                element.type === 'Text' || element.type === 'RichText'
            );
            
            allTexts.forEach(text => {
                wixAnimations.timeline()
                    .add(text, {
                        color: highContrast ? '#000000' : '#333333',
                        backgroundColor: highContrast ? '#ffffff' : 'transparent',
                        duration: 300
                    })
                    .play();
            });
            
            // Button feedback
            wixAnimations.timeline()
                .add(contrastButton, {
                    backgroundColor: highContrast ? '#ff9800' : '#2196f3',
                    duration: 200
                })
                .play();
        });
    }
    
    // Keyboard navigation indicators
    const focusableElements = $w('*').filter(element => 
        element.type === 'Button' || element.type === 'Link'
    );
    
    focusableElements.forEach(element => {
        element.onFocus(() => {
            wixAnimations.timeline()
                .add(element, {
                    outline: '2px solid #2196f3',
                    outlineOffset: '2px',
                    duration: 100
                })
                .play();
        });
        
        element.onBlur(() => {
            wixAnimations.timeline()
                .add(element, {
                    outline: 'none',
                    outlineOffset: '0px',
                    duration: 100
                })
                .play();
        });
    });
    
    // Skip to content functionality
    const skipToContentButton = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        element.label.includes('Inhalt')
    )[0];
    
    if (skipToContentButton) {
        skipToContentButton.onClick(() => {
            const mainContent = $w('*').filter(element => 
                element.type === 'RichText'
            )[0];
            
            if (mainContent) {
                wixWindow.scrollTo(mainContent.y, {
                    duration: 500,
                    easing: 'easeInOutCubic'
                });
                
                // Highlight main content briefly
                wixAnimations.timeline()
                    .add(mainContent, {
                        backgroundColor: '#fff3e0',
                        duration: 300
                    })
                    .add(mainContent, {
                        backgroundColor: 'transparent',
                        duration: 1000
                    })
                    .play();
            }
        });
    }
}