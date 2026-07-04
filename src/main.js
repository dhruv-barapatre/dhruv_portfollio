// Modern Premium Portfolio JS
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navigation & Scroll Spy ---
  const header = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Sticky header class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy logic
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 100; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    const updateActiveLink = (links) => {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    };

    updateActiveLink(navLinks);
    updateActiveLink(mobileNavLinks);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once initially

  // --- Mobile Menu Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const allMobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  const closeMenu = () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  if (navToggle) navToggle.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  allMobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Scroll Animations (Intersection Observer) ---
  const animateElements = document.querySelectorAll('.fade-in-section');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  animateElements.forEach(element => {
    observer.observe(element);
  });

  // --- Contact Form Submission Handler ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Feedback to user
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      // Simulate API send request
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #00f2fe, #4facfe)';
        submitBtn.style.color = '#000';
        
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 3000);
      }, 1500);
    });
  }
});
