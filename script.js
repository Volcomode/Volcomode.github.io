document.addEventListener('DOMContentLoaded', () => {
    // 1. Set the current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in to avoid re-triggering
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Mouse Follower for Glossy Glow Effect
    const glowPoint = document.querySelector('.glow-point');

    if (glowPoint) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        // Listen to mousemove
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smoothly animate the glow element towards the mouse
        function animateGlow() {
            // Easing formula for smooth chasing
            glowX += (mouseX - glowX) * 0.05;
            glowY += (mouseY - glowY) * 0.05;

            // Apply transform using a translate function mapped to viewport center
            const xOffset = glowX - window.innerWidth / 2;
            const yOffset = glowY - window.innerHeight / 2;

            glowPoint.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;

            requestAnimationFrame(animateGlow);
        }

        animateGlow();

        // 4. Expand / Collapse Journal Entries
        const journalEntries = document.querySelectorAll(".journal-entry");

        journalEntries.forEach(entry => {
            // Only add interaction if there's full content to show
            const content = entry.querySelector(".full-content");
            const toggleBtn = entry.querySelector(".entry-link");

            if (content && toggleBtn) {
                entry.style.cursor = "pointer"; // Ensure cursor is pointer

                entry.addEventListener("click", function (e) {
                    // Prevent default if it's the button being clicked directly
                    // but the card click will handle the logic

                    content.classList.toggle("open");

                    toggleBtn.textContent = content.classList.contains("open")
                        ? "Show less ↑"
                        : "Read full entry →";
                });
            }
        });
        // 5. Expand / Collapse Journal Cards
        const cards = document.querySelectorAll(".journal-card");
        cards.forEach(card => {
            card.addEventListener("click", () => {
                // Optional: Close other cards when one is opened
                // cards.forEach(c => { if(c !== card) c.classList.remove("active"); });

                card.classList.toggle("active");
            });
        });
    }
});
