document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');
    
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mainNav.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Magic Text - Scroll Reveal
    const magicEl = document.getElementById('magic-text');
    if (magicEl) {
        const rawText = magicEl.textContent.trim();
        magicEl.textContent = '';
        rawText.split(/\s+/).forEach(w => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = w;
            magicEl.appendChild(span);
        });

        const wordSpans = magicEl.querySelectorAll('.word');
        const totalWords = wordSpans.length;

        function updateMagicText() {
            const rect = magicEl.getBoundingClientRect();
            const startY = window.innerHeight * 0.9;
            const endY = window.innerHeight * 0.25;
            const progress = Math.min(Math.max((startY - rect.top) / (startY - endY), 0), 1);

            wordSpans.forEach((span, i) => {
                const wordStart = i / totalWords;
                const wordEnd = wordStart + 1 / totalWords;
                const wordProgress = Math.min(Math.max((progress - wordStart) / (wordEnd - wordStart), 0), 1);
                span.style.opacity = 0.08 + wordProgress * 0.92;
            });
        }

        window.addEventListener('scroll', updateMagicText, { passive: true });
        updateMagicText();
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Trigger visible class for items already in viewport on load
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }, 100);

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        { text: "visual narratives.", color: "#3B82F6" }, // Blue
        { text: "print.", color: "#10B981" }, // Green
        { text: "package.", color: "#EF4444" }, // Red
        { text: "digital media.", color: "#F59E0B" } // Yellow
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function typeEffect() {
        const currentData = words[wordIndex];
        const currentWord = currentData.text;
        
        // Update color
        typewriterElement.style.color = currentData.color;
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; // delete speed
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 70; // type speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500; // wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // wait before next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typewriterElement) {
        setTimeout(typeEffect, 500); // Initial delay
    }
});
