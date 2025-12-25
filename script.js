   // ==========================
        // 1. Mobile Menu Logic
        // ==========================
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }

        // ==========================
        // 2. Sticky Navbar & Scroll
        // ==========================
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ==========================
        // 3. Hero Slider
        // ==========================
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 5000);


    // ==============================
    // ✅ TESTIMONIAL SLIDER
    // ==============================
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(n) {
        if (!testimonialsContainer) return;
        const testimonials = document.querySelectorAll('.testimonial');
        testimonialsContainer.style.transform = `translateX(-${(n % testimonials.length) * 100}%)`;
        testimonialDots.forEach(d => d.classList.remove('active'));
        testimonialDots[n % testimonials.length]?.classList.add('active');
        currentTestimonial = n % testimonials.length;
    }

    if (testimonialsContainer) {
        testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 4000);
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(testimonialInterval);
                showTestimonial(index);
                testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 4000);
            });
        });
    }

    // ==============================
    // ✅ FAQ ACCORDION
    // ==============================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const active = this.classList.contains('active');
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling?.classList.remove('active');
            });
            if (!active) {
                this.classList.add('active');
                answer?.classList.add('active');
            }
        });
    });

    // ==============================
    // ✅ GALLERY LIGHTBOX
    // ==============================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
    const lightboxNext = lightbox?.querySelector('.lightbox-next');
    let currentImageIndex = 0;

    function openLightbox() {
        if (!lightbox || !lightboxImg) return;
        const imgSrc = galleryItems[currentImageIndex]?.querySelector('img')?.src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox?.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        openLightbox();
    }

    if (galleryItems.length && lightbox) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageIndex = index;
                openLightbox();
            });
        });
        lightboxClose?.addEventListener('click', closeLightbox);
        lightboxPrev?.addEventListener('click', showPrevImage);
        lightboxNext?.addEventListener('click', showNextImage);
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', e => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'ArrowRight') showNextImage();
            }
        });
    }

    // ==============================
    // ✅ CONTACT FORM VALIDATION
    // ==============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            if (![...formData.values()].every(v => v.trim() !== '')) {
                alert('Please fill in all fields');
                return;
            }
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // ==============================
    // ✅ ACTIVE PAGE HIGHLIGHTING
    // ==============================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            if (!['index.html', 'about.html', 'gallery.html', 'contact.html'].includes(href)) {
                document.querySelector('.dropdown > a')?.classList.add('active');
            }
        }
    });

    // ==============================
    // ✅ SCROLL ANIMATIONS
    // ==============================
    function animateOnScroll() {
        document.querySelectorAll('.service-card, .advantage-card, .step').forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) el.classList.add('animated');
        });
    }
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

// Add CSS for body no-scroll
const style = document.createElement('style');
style.textContent = `body.no-scroll { overflow: hidden; }`;
document.head.appendChild(style);
