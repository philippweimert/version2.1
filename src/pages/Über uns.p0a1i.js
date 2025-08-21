// Über uns Page - Enhanced with Visual Improvements
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // About page specific animations
    setupAboutPageAnimations();
    
    // Team member animations
    setupTeamMemberEffects();
    
    // Timeline and milestone animations
    setupTimelineAnimations();
    
    // Company values animations
    setupValuesAnimations();
    
    // Image gallery effects
    setupImageGalleryEffects();
});

function setupAboutPageAnimations() {
    // Main about section entrance
    const aboutSections = $w('*').filter(element => 
        element.type === 'Section' || element.type === 'Container'
    );
    
    aboutSections.forEach((section, index) => {
        section.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(section, {
                    y: section.y + 40,
                    opacity: 0,
                    duration: 0
                })
                .add(section, {
                    y: section.y,
                    opacity: 1,
                    duration: 800,
                    easing: 'easeOutCubic'
                })
                .play()
                .then(() => section.show());
        }, index * 200 + 300);
    });
    
    // About text reveal animation
    const aboutTexts = $w('*').filter(element => 
        element.type === 'RichText' || 
        (element.type === 'Text' && element.text && element.text.length > 50)
    );
    
    aboutTexts.forEach((text, index) => {
        text.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(text, {
                    x: text.x - 50,
                    opacity: 0,
                    duration: 0
                })
                .add(text, {
                    x: text.x,
                    opacity: 1,
                    duration: 600,
                    easing: 'easeOutQuart'
                })
                .play()
                .then(() => text.show());
        }, 600 + (index * 300));
    });
}

function setupTeamMemberEffects() {
    // Team member cards
    const teamCards = $w('*').filter(element => 
        element.type === 'Container' || element.type === 'Box'
    );
    
    teamCards.forEach((card, index) => {
        // Entrance animation
        card.hide();
        setTimeout(() => {
            card.show('bounceIn', {
                duration: 600,
                delay: index * 150
            });
        }, 800);
        
        // Hover effects
        card.onMouseIn(() => {
            wixAnimations.timeline()
                .add(card, {
                    scale: 1.05,
                    y: card.y - 10,
                    duration: 300,
                    easing: 'easeOutBack'
                })
                .play();
        });
        
        card.onMouseOut(() => {
            wixAnimations.timeline()
                .add(card, {
                    scale: 1,
                    y: card.y,
                    duration: 300,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
    
    // Team member photos
    const teamPhotos = $w('*').filter(element => 
        element.type === 'Image' && element.id && 
        (element.id.includes('team') || element.id.includes('member'))
    );
    
    teamPhotos.forEach(photo => {
        photo.onMouseIn(() => {
            wixAnimations.timeline()
                .add(photo, {
                    rotate: 5,
                    scale: 1.1,
                    duration: 300,
                    easing: 'easeOutBack'
                })
                .play();
        });
        
        photo.onMouseOut(() => {
            wixAnimations.timeline()
                .add(photo, {
                    rotate: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
}

function setupTimelineAnimations() {
    // Timeline elements
    const timelineItems = $w('*').filter(element => 
        element.id && (
            element.id.includes('timeline') || 
            element.id.includes('milestone') ||
            element.id.includes('year')
        )
    );
    
    // Scroll-triggered timeline reveal
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        const windowHeight = wixWindow.viewportHeight;
        
        timelineItems.forEach((item, index) => {
            try {
                const itemTop = item.y;
                
                if (scrollTop + windowHeight > itemTop + 50) {
                    wixAnimations.timeline()
                        .add(item, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0
                        })
                        .add(item, {
                            scale: 1,
                            opacity: 1,
                            duration: 500,
                            easing: 'easeOutBack',
                            delay: index * 100
                        })
                        .play();
                }
            } catch (e) {
                // Skip elements that don't support these properties
            }
        });
    });
    
    // Connecting line animation
    const timelineLines = $w('*').filter(element => 
        element.id && element.id.includes('line')
    );
    
    timelineLines.forEach(line => {
        wixAnimations.timeline()
            .add(line, {
                height: 0,
                duration: 0
            })
            .add(line, {
                height: line.height,
                duration: 2000,
                easing: 'easeOutQuart'
            })
            .play();
    });
}

function setupValuesAnimations() {
    // Company values cards
    const valueCards = $w('*').filter(element => 
        element.type === 'Container' && element.id && 
        (element.id.includes('value') || element.id.includes('principle'))
    );
    
    valueCards.forEach((card, index) => {
        // Staggered entrance
        card.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(card, {
                    rotate: -10,
                    scale: 0.8,
                    opacity: 0,
                    duration: 0
                })
                .add(card, {
                    rotate: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 500,
                    easing: 'easeOutBack'
                })
                .play()
                .then(() => card.show());
        }, index * 200 + 1000);
        
        // Interactive hover
        card.onMouseIn(() => {
            wixAnimations.timeline()
                .add(card, {
                    y: card.y - 5,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        card.onMouseOut(() => {
            wixAnimations.timeline()
                .add(card, {
                    y: card.y,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
    
    // Values icons animation
    const valueIcons = $w('*').filter(element => 
        element.type === 'Image' && element.id && 
        element.id.includes('icon')
    );
    
    valueIcons.forEach(icon => {
        // Pulsing animation
        const pulseAnimation = () => {
            wixAnimations.timeline()
                .add(icon, {
                    scale: 1.1,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .add(icon, {
                    scale: 1,
                    duration: 1000,
                    easing: 'easeInOutSine'
                })
                .play();
        };
        
        setInterval(pulseAnimation, 3000);
    });
}

function setupImageGalleryEffects() {
    // Company images/gallery
    const galleryImages = $w('*').filter(element => 
        element.type === 'Image'
    );
    
    galleryImages.forEach((image, index) => {
        // Staggered entrance
        image.hide();
        setTimeout(() => {
            image.show('slideInUp', {
                duration: 500,
                delay: index * 100
            });
        }, 1200);
        
        // Hover zoom effect
        image.onMouseIn(() => {
            wixAnimations.timeline()
                .add(image, {
                    scale: 1.05,
                    duration: 400,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        image.onMouseOut(() => {
            wixAnimations.timeline()
                .add(image, {
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Click animation
        image.onClick(() => {
            wixAnimations.timeline()
                .add(image, {
                    scale: 0.95,
                    duration: 100
                })
                .add(image, {
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutBack'
                })
                .add(image, {
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
    
    // Parallax scrolling for background images
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        
        galleryImages.forEach(image => {
            try {
                // Subtle parallax effect
                const speed = 0.1;
                wixAnimations.timeline()
                    .add(image, {
                        y: image.y - (scrollTop * speed),
                        duration: 50,
                        easing: 'linear'
                    })
                    .play();
            } catch (e) {
                // Skip elements that don't support animation
            }
        });
    });
    
    // Statistics counter animation
    const statsNumbers = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        /^\d+/.test(element.text)
    );
    
    statsNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.text);
        if (finalNumber && finalNumber > 0) {
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(counter);
                }
                stat.text = Math.floor(currentNumber).toString();
            }, 50);
        }
    });
}