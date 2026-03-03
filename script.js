document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    const icon = themeToggleBtn.querySelector('i');
    let isDarkMode = true;

    themeToggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            // Dark Mode Variables
            root.style.setProperty('--bg-color', '#0f172a');
            root.style.setProperty('--bg-secondary', '#1e293b');
            root.style.setProperty('--text-main', '#f8fafc');
            root.style.setProperty('--text-muted', '#94a3b8');
            root.style.setProperty('--glass-bg', 'rgba(30, 41, 59, 0.4)');
            root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
            icon.setAttribute('data-lucide', 'moon');
        } else {
            // Light Mode Variables (Cyber-Light)
            root.style.setProperty('--bg-color', '#f0f9ff'); // Very light blue-ish white
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--text-main', '#0f172a'); // Dark slate for text
            root.style.setProperty('--text-muted', '#475569');
            root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.6)');
            root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.05)');
            icon.setAttribute('data-lucide', 'sun');
        }
        lucide.createIcons(); // Re-render icon
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)'; // Darker background on scroll
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        }
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .about-card, .project-card').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});

// Add dynamic CSS for animations
const style = document.createElement('style');
style.innerHTML = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
