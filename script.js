// NAV SCROLL
const nav = document.getElementById('nav');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
});

// MOBILE NAV
function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('open');
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 60);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// COUNTER ANIMATION
function animateCount(el, target, duration = 2000) {
    let start = 0;
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    };
    requestAnimationFrame(step);
}
const counters = document.querySelectorAll('.count');
const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCount(e.target, parseInt(e.target.dataset.target));
            countObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => countObs.observe(c));

// SERVICE MODALS
const modal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

const serviceDetails = {
    '1': {
        title: 'Financial Advisory & Strategy',
        description: 'Our strategy team provides the architectural blueprint for your financial future. We specialize in complex DCF modeling, strategic cost optimization, and multi-scenario forecasting.',
        highlights: ['Capital Allocation Strategy', 'Scenario Analysis & Stress Testing', 'Restructuring & Turnaround Advisory']
    },
    '2': {
        title: 'Corporate Finance Services',
        description: 'From series A to IPO, we manage the lifecycle of capital. Our M&A advisory focuses on value creation and seamless integration.',
        highlights: ['Debt & Equity Capital Raising', 'Buy-side & Sell-side M&A', 'Due Diligence Execution']
    }
    // Add more indices as needed (03-12)
};

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-service');
        const details = serviceDetails[id] || { 
            title: card.querySelector('h3').innerText, 
            description: 'Bespoke advisory solutions tailored to institutional requirements.',
            highlights: ['Regulatory Alignment', 'Strategic Implementation', 'Performance Monitoring']
        };
        
        modalBody.innerHTML = `
            <h2 style="font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--gold);">${details.title}</h2>
            <p style="font-size: 1.25rem; color: var(--white-dim); margin-bottom: 2.5rem; line-height: 1.8;">${details.description}</p>
            <ul style="list-style: none;">
                ${details.highlights.map(h => `<li style="margin-bottom: 1.2rem; font-size: 1.1rem; display: flex; align-items: center; gap: 1rem;"><i class="fa-solid fa-circle-check" style="color: var(--gold);"></i> ${h}</li>`).join('')}
            </ul>
            <a href="#contact" class="btn-primary" style="display: inline-block; margin-top: 3rem;" onclick="closeServiceModal()">Initialize Consultation</a>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

function closeServiceModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (closeModal) closeModal.onclick = closeServiceModal;
window.onclick = (e) => { if (e.target == modal) closeServiceModal(); };

// FORM SUBMIT
function handleSubmit(btn) {
    const span = btn.querySelector('span');
    const originalText = span.textContent;
    span.textContent = 'Processing...';
    btn.disabled = true;
    setTimeout(() => {
        span.textContent = '✓ Inquiry Transmitted';
        btn.style.background = '#2a6e3f';
        setTimeout(() => {
            span.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
}
