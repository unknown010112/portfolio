/**
 * Main Scripts for Data Analyst Portfolio
 * Contains: Navbar logic, Custom Cursor, Canvas Data Grid, GSAP Animations, Certificate Modal
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Custom Cursor Glow ---
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // --- 2. Navbar Scroll & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            let icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('nav-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            if (mobileToggle) {
                let icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 3. Background Data Canvas ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        let numParticles = Math.min(Math.floor(width * height / 9000), 200);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 180) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.25 - distance / 720})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // --- 4. Certificates Folder System ---
    const tabs = document.querySelectorAll('.folder-tab');
    const certs = document.querySelectorAll('.cert-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-folder');

            certs.forEach(cert => {
                if (filter === 'all' || cert.getAttribute('data-category') === filter) {
                    cert.style.display = 'block';
                    gsap.fromTo(cert, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 });
                } else {
                    cert.style.display = 'none';
                }
            });
        });
    });

    // --- 4.5 Projects & Courses Filtering System ---
    function setupFilters(containerId, itemSelector) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const buttons = container.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll(itemSelector);

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hide');
                        gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    setupFilters('project-filters', '.project-card');
    setupFilters('course-filters', '.course-card');

    // --- 5. Modal Logic for Certificates ---
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    certs.forEach(cert => {
        cert.addEventListener('click', () => {
            modal.style.display = 'flex'; // Changed to flex for centering
            modalImg.src = cert.getAttribute('data-src');
            modalCaption.innerText = cert.querySelector('h4').innerText;
            gsap.fromTo(modalImg, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImg.src = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
        }
    });



    // --- 7. GSAP ScrollTrigger Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero content initial fade in
    gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.4 });
    gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 1, delay: 0.6 });

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 85%"
            },
            opacity: 0,
            y: 40,
            duration: 0.8
        });
    });







    // Contact card
    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: "top 85%"
        },
        opacity: 0,
        y: 40,
        duration: 0.8
    });

    // Refresh ScrollTrigger after images load to fix visibility bug
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Fallback refresh for slow GIFs
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1500);

});