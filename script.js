// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Service Modals Logic
const modal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

const serviceDetails = {
    'Financial Advisory & Strategy': {
        title: 'Financial Advisory & Strategy',
        description: 'Our strategy team provides the architectural blueprint for your financial future. We specialize in complex DCF modeling, strategic cost optimization, and multi-scenario forecasting.',
        highlights: ['Capital Allocation Strategy', 'Scenario Analysis & Stress Testing', 'Restructuring & Turnaround Advisory']
    },
    'Corporate Finance': {
        title: 'Corporate Finance Services',
        description: 'From series A to IPO, we manage the lifecycle of capital. Our M&A advisory focuses on value creation and seamless integration.',
        highlights: ['Debt & Equity Capital Raising', 'Buy-side & Sell-side M&A', 'Due Diligence Execution']
    },
    // Add more as needed
};

document.querySelectorAll('.service-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const details = serviceDetails[title] || { 
            title: title, 
            description: 'Bespoke advisory solutions tailored to institutional requirements.',
            highlights: ['Regulatory Alignment', 'Strategic Implementation', 'Performance Monitoring']
        };
        
        modalBody.innerHTML = `
            <h2 style="font-size: 3rem; margin-bottom: 1.5rem;">${details.title}</h2>
            <p style="font-size: 1.2rem; color: var(--text-dim); margin-bottom: 2rem;">${details.description}</p>
            <ul style="list-style: none;">
                ${details.highlights.map(h => `<li style="margin-bottom: 1rem; font-size: 1.1rem;"><i class="fa-solid fa-circle-check" style="color: var(--secondary); margin-right: 1rem;"></i> ${h}</li>`).join('')}
            </ul>
            <a href="#contact" class="btn-primary" style="display: inline-block; margin-top: 2rem;" onclick="closeServiceModal()">Inquire for Details</a>
        `;
        modal.style.display = 'block';
    });
});

function closeServiceModal() {
    modal.style.display = 'none';
}

closeModal.onclick = closeServiceModal;
window.onclick = (e) => { if (e.target == modal) closeServiceModal(); };

// Reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .stat-item, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});
