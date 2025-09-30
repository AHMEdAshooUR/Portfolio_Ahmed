// =======================
// Smooth Scroll عند الضغط على navigation dots
// =======================
const dots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section');
const sidebarItems = document.querySelectorAll('#sidebar-list li');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        const section = document.getElementById(dot.dataset.section);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = document.getElementById(item.dataset.section);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// =======================
// Sidebar indicator
// =======================
const sidebarIndicator = document.createElement('div');
sidebarIndicator.id = 'sidebar-indicator';
sidebarIndicator.style.position = 'absolute';
sidebarIndicator.style.left = '0';
sidebarIndicator.style.width = '5px';
sidebarIndicator.style.height = '40px';
sidebarIndicator.style.background = 'linear-gradient(45deg, #d4af37, #c0c0c0)';
sidebarIndicator.style.borderRadius = '3px';
sidebarIndicator.style.transition = 'top 0.3s ease';
document.getElementById('sidebar').appendChild(sidebarIndicator);

window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 2;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === currentSection) {
            dot.classList.add('active');
            sidebarIndicator.style.top = `${dot.offsetTop}px`;
        }
    });
});

// =======================
// Fade-in animation
// =======================
const faders = document.querySelectorAll('.tagline, .about-text, .why-card, .skill-card, .project-card');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// =======================
// Floating elements background animation
// =======================
const floatingContainer = document.getElementById('floatingElements');
const numberOfElements = 20;

for (let i = 0; i < numberOfElements; i++) {
    const el = document.createElement('div');
    el.classList.add('floating');
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDelay = `${Math.random() * 5}s`;
    el.style.width = el.style.height = `${5 + Math.random() * 15}px`;
    floatingContainer.appendChild(el);
}

// =======================
// Tooltips لكل Nav Dot
// =======================
dots.forEach(dot => {
    const tooltip = document.createElement('span');
    tooltip.className = 'dot-tooltip';
    tooltip.textContent = dot.dataset.section.replace(/-/g, ' ');
    dot.appendChild(tooltip);

    dot.addEventListener('mouseenter', () => tooltip.classList.add('show'));
    dot.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
});

// =======================
// Tooltips لكل Sidebar Item
// =======================
sidebarItems.forEach(item => {
    const tooltip = document.createElement('span');
    tooltip.className = 'sidebar-tooltip';
    tooltip.textContent = item.dataset.section.replace(/-/g, ' ');
    item.appendChild(tooltip);

    item.addEventListener('mouseenter', () => tooltip.classList.add('show'));
    item.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
});


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // يمنع الفورم من إعادة تحميل الصفحة

    emailjs.sendForm('Ahmed102030', 'template_xx97iov', this)
        .then(() => {
            alert('Message sent successfully!');
            contactForm.reset(); // يمسح الحقول بعد الإرسال
        }, (error) => {
            console.error('FAILED...', error);
            alert('Failed to send message. Please try again.');
        });
});
