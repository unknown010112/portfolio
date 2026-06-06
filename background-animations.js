document.addEventListener('DOMContentLoaded', () => {
    const animationContainer = document.getElementById('background-animation-container');
    if (!animationContainer) return;

    const elements = [
        { type: 'icon', content: 'fas fa-chart-line' },
        { type: 'icon', content: 'fas fa-chart-bar' },
        { type: 'icon', content: 'fas fa-chart-pie' },
        { type: 'icon', content: 'fas fa-database' },
        { type: 'icon', content: 'fas fa-cogs' },
        { type: 'icon', content: 'fas fa-search-dollar' },
        { type: 'icon', content: 'fas fa-brain' },
        { type: 'icon', content: 'fas fa-lightbulb' },
        { type: 'icon', content: 'fas fa-infinity' },
        { type: 'symbol', content: 'Σ' },
        { type: 'symbol', content: 'μ' },
        { type: 'symbol', content: 'ρ' },
        { type: 'number', content: () => (Math.random() * 100).toFixed(2) },
        { type: 'number', content: () => Math.floor(Math.random() * 1000) },
        { type: 'binary', content: () => Math.random() > 0.5 ? '1' : '0' },
        { type: 'shape', content: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 22 2 22 12 2"></polygon></svg>' },
        { type: 'shape', content: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>' }
    ];

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const numElements = isReducedMotion ? 25 : 100;

    for (let i = 0; i < numElements; i++) {
        const elSpec = elements[Math.floor(Math.random() * elements.length)];
        const element = document.createElement('div');
        element.classList.add('animated-bg-element', elSpec.type);

        if (elSpec.type === 'icon') {
            const icon = document.createElement('i');
            icon.className = elSpec.content;
            element.appendChild(icon);
        } else if (elSpec.type === 'shape') {
            element.innerHTML = elSpec.content;
        } else if (typeof elSpec.content === 'function') {
            element.textContent = elSpec.content();
        } else {
            element.textContent = elSpec.content;
        }

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 22 + 12;
        const duration = Math.random() * 25 + 20;
        const delay = Math.random() * -20;

        element.style.left = `${x}vw`;
        element.style.top = `${y}vh`;
        element.style.fontSize = `${size}px`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        animationContainer.appendChild(element);
    }
});
