// Blog Page - Enhanced with Visual Improvements
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Blog layout animations
    setupBlogLayoutAnimations();
    
    // Article card interactions
    setupArticleCardEffects();
    
    // Reading progress indicator
    setupReadingProgress();
    
    // Search and filter animations
    setupSearchAnimations();
    
    // Infinite scroll effects
    setupScrollEffects();
});

function setupBlogLayoutAnimations() {
    // Blog header animation
    const blogHeader = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        (element.text.includes('Blog') || element.text.length < 50)
    )[0];
    
    if (blogHeader) {
        blogHeader.hide();
        setTimeout(() => {
            wixAnimations.timeline()
                .add(blogHeader, {
                    y: blogHeader.y - 30,
                    opacity: 0,
                    duration: 0
                })
                .add(blogHeader, {
                    y: blogHeader.y,
                    opacity: 1,
                    duration: 800,
                    easing: 'easeOutBack'
                })
                .play()
                .then(() => blogHeader.show());
        }, 200);
    }
    
    // Blog grid entrance animation
    const blogGrid = $w('*').filter(element => 
        element.type === 'Repeater' || 
        (element.type === 'Container' && element.id && 
         element.id.includes('blog'))
    );
    
    blogGrid.forEach((grid, index) => {
        grid.hide();
        setTimeout(() => {
            grid.show('fadeIn', {
                duration: 600,
                delay: index * 200
            });
        }, 400);
    });
}

function setupArticleCardEffects() {
    // Article card hover animations
    const articleCards = $w('*').filter(element => 
        element.type === 'Container' || element.type === 'Box'
    );
    
    articleCards.forEach(card => {
        card.onMouseIn(() => {
            wixAnimations.timeline()
                .add(card, {
                    scale: 1.03,
                    y: card.y - 8,
                    duration: 300,
                    easing: 'easeOutQuart'
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
        
        // Click animation
        card.onClick(() => {
            wixAnimations.timeline()
                .add(card, {
                    scale: 0.98,
                    duration: 100
                })
                .add(card, {
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutBack'
                })
                .add(card, {
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
    
    // Article image effects
    const articleImages = $w('*').filter(element => 
        element.type === 'Image'
    );
    
    articleImages.forEach(image => {
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
    });
    
    // Article title animations
    const articleTitles = $w('*').filter(element => 
        element.type === 'Text' && element.text && 
        element.text.length > 10 && element.text.length < 100
    );
    
    articleTitles.forEach(title => {
        title.onMouseIn(() => {
            wixAnimations.timeline()
                .add(title, {
                    x: title.x + 5,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        title.onMouseOut(() => {
            wixAnimations.timeline()
                .add(title, {
                    x: title.x,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
    });
}

function setupReadingProgress() {
    // Create reading progress indicator
    const progressElements = $w('*').filter(element => 
        element.id && element.id.includes('progress')
    );
    
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        const documentHeight = wixWindow.documentHeight;
        const windowHeight = wixWindow.viewportHeight;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressElements.forEach(progress => {
            wixAnimations.timeline()
                .add(progress, {
                    width: `${Math.min(scrollPercent, 100)}%`,
                    duration: 50,
                    easing: 'linear'
                })
                .play();
        });
    });
}

function setupSearchAnimations() {
    // Search input animations
    const searchInputs = $w('*').filter(element => 
        element.type === 'TextInput' && 
        (element.placeholder && element.placeholder.includes('Search') ||
         element.id && element.id.includes('search'))
    );
    
    searchInputs.forEach(search => {
        search.onFocus(() => {
            wixAnimations.timeline()
                .add(search, {
                    scale: 1.05,
                    borderWidth: 2,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        search.onBlur(() => {
            wixAnimations.timeline()
                .add(search, {
                    scale: 1,
                    borderWidth: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                })
                .play();
        });
        
        // Search typing animation
        search.onKeyPress(() => {
            wixAnimations.timeline()
                .add(search, {
                    backgroundColor: '#f8f9fa',
                    duration: 100
                })
                .add(search, {
                    backgroundColor: '#ffffff',
                    duration: 200
                })
                .play();
        });
    });
    
    // Filter buttons animation
    const filterButtons = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('Filter') || 
         element.label.includes('Kategorie') ||
         element.label.includes('Tag'))
    );
    
    filterButtons.forEach(button => {
        button.onClick(() => {
            // Active filter animation
            wixAnimations.timeline()
                .add(button, {
                    scale: 0.95,
                    duration: 100
                })
                .add(button, {
                    scale: 1,
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    duration: 200,
                    easing: 'easeOutBack'
                })
                .play();
        });
    });
}

function setupScrollEffects() {
    // Parallax effect for blog content
    const contentElements = $w('*').filter(element => 
        element.type === 'RichText' || 
        (element.type === 'Text' && element.text && element.text.length > 100)
    );
    
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        const windowHeight = wixWindow.viewportHeight;
        
        contentElements.forEach(element => {
            try {
                const elementTop = element.y;
                const elementHeight = element.height;
                
                // Check if element is in viewport
                if (scrollTop + windowHeight > elementTop && 
                    scrollTop < elementTop + elementHeight) {
                    
                    // Fade in with parallax
                    const parallaxSpeed = 0.05;
                    wixAnimations.timeline()
                        .add(element, {
                            y: elementTop - (scrollTop * parallaxSpeed),
                            opacity: 1,
                            duration: 100,
                            easing: 'linear'
                        })
                        .play();
                }
            } catch (e) {
                // Skip elements that don't support these properties
            }
        });
    });
    
    // Infinite scroll loading animation
    const loadMoreElements = $w('*').filter(element => 
        element.type === 'Button' && element.label && 
        (element.label.includes('More') || 
         element.label.includes('Mehr') ||
         element.label.includes('Laden'))
    );
    
    loadMoreElements.forEach(button => {
        button.onClick(() => {
            // Loading animation
            const originalLabel = button.label;
            button.label = 'Lädt...';
            button.disable();
            
            wixAnimations.timeline()
                .add(button, {
                    rotate: 360,
                    duration: 1000,
                    easing: 'linear'
                })
                .play();
            
            // Simulate loading
            setTimeout(() => {
                button.label = originalLabel;
                button.enable();
                wixAnimations.timeline()
                    .add(button, {
                        rotate: 0,
                        scale: 1.05,
                        duration: 200,
                        easing: 'easeOutBack'
                    })
                    .add(button, {
                        scale: 1,
                        duration: 200
                    })
                    .play();
            }, 2000);
        });
    });
    
    // Article entrance animations on scroll
    const articles = $w('*').filter(element => 
        element.type === 'Container' && element.id && 
        (element.id.includes('article') || element.id.includes('post'))
    );
    
    wixWindow.onScroll(() => {
        const scrollTop = wixWindow.scrollY;
        const windowHeight = wixWindow.viewportHeight;
        
        articles.forEach((article, index) => {
            try {
                const articleTop = article.y;
                
                if (scrollTop + windowHeight > articleTop + 100) {
                    wixAnimations.timeline()
                        .add(article, {
                            x: article.x - 30,
                            opacity: 0.5,
                            duration: 0
                        })
                        .add(article, {
                            x: article.x,
                            opacity: 1,
                            duration: 600,
                            easing: 'easeOutCubic',
                            delay: index * 100
                        })
                        .play();
                }
            } catch (e) {
                // Skip elements that don't support these properties
            }
        });
    });
}