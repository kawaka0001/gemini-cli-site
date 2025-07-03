document.addEventListener('DOMContentLoaded', function() {

    // Scroll Fade-in Effect
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    // Only apply fade-in on larger screens
    if (window.innerWidth > 768) {
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    } else {
        // If on mobile, make all faders visible immediately
        faders.forEach(fader => {
            fader.classList.add('visible');
        });
    }

    // Terminal Typing Effect
    const typingElement = document.getElementById('typing-effect');
    const responseElement = document.querySelector('.response');
    const textToType = 'gemini "現在のフォルダにあるファイルを教えて"';
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            typingElement.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                responseElement.classList.remove('hidden');
            }, 1000);
        }
    }

    // Start typing effect when terminal is visible
    const terminalObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500); // Start after a short delay
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    const terminalWindow = document.querySelector('.terminal-window');
    if(terminalWindow) {
        terminalObserver.observe(terminalWindow);
    }
});
