// ─── Smooth scroll ───────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ─── Header shadow on scroll ─────────────────────────────────────
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Active nav link tracking ────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const allSections = [...document.querySelectorAll('section[id]')];

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${target.id}`);
        });
    });
}, { threshold: 0.3, rootMargin: '-60px 0px -45% 0px' });

allSections.forEach(s => navObserver.observe(s));

// ─── Section reveal — label line animation ───────────────────────
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.add('revealed');
        sectionObserver.unobserve(target);
    });
}, { threshold: 0.06 });

document.querySelectorAll('.section').forEach(el => sectionObserver.observe(el));

// ─── Career roles — stagger in one by one ───────────────────────
const roleObserver = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.style.opacity = '1';
        target.style.transform = 'none';
        roleObserver.unobserve(target);
    });
}, { threshold: 0.08 });

document.querySelectorAll('.role').forEach((role, i) => {
    role.style.opacity = '0';
    role.style.transform = 'translateY(14px)';
    role.style.transition = `opacity 0.52s ease ${i * 0.1}s, transform 0.52s ease ${i * 0.1}s`;
    roleObserver.observe(role);
});

// ─── Project items — stagger in ─────────────────────────────────
const projectObserver = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.style.opacity = '1';
        target.style.transform = 'none';
        projectObserver.unobserve(target);
    });
}, { threshold: 0.08 });

document.querySelectorAll('.project-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    item.style.transition = `opacity 0.45s ease ${i * 0.08}s, transform 0.45s ease ${i * 0.08}s`;
    projectObserver.observe(item);
});

// ─── Mouse parallax on hero glow ────────────────────────────────
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
    let raf = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', e => {
        targetX = (e.clientX / window.innerWidth  - 0.5) * 48;
        targetY = (e.clientY / window.innerHeight - 0.5) * 32;
    }, { passive: true });

    function animateGlow() {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        heroGlow.style.transform = `translate(${currentX}px, ${currentY}px)`;
        raf = requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ─── Scroll-to-top button ────────────────────────────────────────
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.setAttribute('aria-label', 'Back to top');
scrollTopBtn.textContent = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    scrollTopBtn.style.opacity  = show ? '1' : '0';
    scrollTopBtn.style.visibility = show ? 'visible' : 'hidden';
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Copy bio ────────────────────────────────────────────────────
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

// ─── Stack tags — stagger in with spring ─────────────────────────
const stackSection = document.querySelector('#stack');
if (stackSection) {
    const tags = [...stackSection.querySelectorAll('.tags span')];
    tags.forEach(t => {
        t.style.opacity = '0';
        t.style.transform = 'translateY(8px) scale(0.94)';
    });

    const stackObserver = new IntersectionObserver(entries => {
        entries.forEach(({ isIntersecting }) => {
            if (!isIntersecting) return;
            tags.forEach((t, i) => {
                t.style.transition =
                    `opacity 0.35s ease ${i * 0.032}s,` +
                    `transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.032}s`;
                t.style.opacity   = '1';
                t.style.transform = 'none';
            });
            stackObserver.disconnect();
        });
    }, { threshold: 0.15 });

    stackObserver.observe(stackSection);
}
