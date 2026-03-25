import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- i18n System ---
    let currentLang = localStorage.getItem('preferredLang') || 'en';
    const langToggle = document.getElementById('lang-toggle');
    
    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
        
        langToggle.textContent = currentLang === 'vi' ? 'EN' : 'VI';
        document.documentElement.lang = currentLang;
    }
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'vi' ? 'en' : 'vi';
        localStorage.setItem('preferredLang', currentLang);
        updateContent();
    });
    
    updateContent();

    // --- Lucide Icons ---
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // --- Mouse Glow ---
    const glow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', (e) => {
        if (glow) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }
    });

    // --- Scroll Reveal ---
    const revealCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay for elements within the same view
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // --- Project Modals ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const closeModal = document.getElementById('close-project-modal');

    document.querySelectorAll('.project-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const projectData = {
                vincharge: { title: "VinCharge", tags: ["Java 17", "Spring Boot", "PostgreSQL", "VNPay"] },
                ai_english: { title: "AI English", tags: ["Flutter", "Dart", "BLoC", "AI"] },
                trello: { title: "StuTrello", tags: ["Node.js", "Express", "Socket.IO", "React"] },
                billiard: { title: "SST Billiard", tags: [".NET 9", "Vue 3", "TS", "IoT"] },
                ueh: { title: "UEH Job Portal", tags: [".NET 9", "Clean Architecture", "SQL Server"] }
            };

            const data = projectData[projectId];
            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = translations[currentLang][`project_${projectId}_detail`];
                modalTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // --- Lightbox ---
    window.openLightbox = (imgSrc) => {
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        if (lb && lbImg) {
            lbImg.src = imgSrc;
            lb.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLightbox = () => {
        const lb = document.getElementById('lightbox');
        if (lb) {
            lb.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // --- Hero Mouse Tilt ---
    const heroVisual = document.querySelector('.hero-visual');
    const codeWindow = document.querySelector('.code-window');
    
    if (heroVisual && codeWindow) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            codeWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            codeWindow.style.transform = `rotateX(5deg) rotateY(-15deg)`;
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
