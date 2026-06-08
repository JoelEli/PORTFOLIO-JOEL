// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Nav: add box-shadow after scrolling past hero
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }
}, { passive: true });

// Fade-in sections on scroll (each animates once)
const io = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
            target.style.opacity = '1';
            target.style.transform = 'none';
            io.unobserve(target);
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.section').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    io.observe(el);
});

// Scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.setAttribute('aria-label', 'Back to top');
scrollTopBtn.textContent = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    scrollTopBtn.style.opacity = show ? '1' : '0';
    scrollTopBtn.style.visibility = show ? 'visible' : 'hidden';
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Copy bio
const copyBtn = document.getElementById('copyBio');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const text = document.getElementById('bio-text')?.innerText;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy Bio'; }, 1500);
        });
    });
}

// Stagger the stack tags on section entry
const stackSection = document.querySelector('#stack');
if (stackSection) {
    const stackIo = new IntersectionObserver(entries => {
        entries.forEach(({ isIntersecting }) => {
            if (!isIntersecting) return;
            document.querySelectorAll('.tags span').forEach((tag, i) => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(8px)';
                tag.style.transition = `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`;
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'none';
                }, 10);
            });
            stackIo.disconnect();
        });
    }, { threshold: 0.2 });
    stackIo.observe(stackSection);
}
