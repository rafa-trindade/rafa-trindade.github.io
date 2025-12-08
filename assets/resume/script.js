// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Initialize theme from localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
}

function applyTheme(theme) {
    if (theme === 'light') {
        bodyElement.classList.add('light-theme');
        htmlElement.setAttribute('data-theme', 'light');
    } else {
        bodyElement.classList.remove('light-theme');
        htmlElement.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = bodyElement.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in sections
document.querySelectorAll('.fade-in-section').forEach((section) => {
    observer.observe(section);
});

// Add staggered animation delay for items within sections
document.querySelectorAll('.projects-list, .experience-list, .education-list, .certifications-list').forEach((list) => {
    const items = list.querySelectorAll('> div');
    items.forEach((item, index) => {
        item.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
