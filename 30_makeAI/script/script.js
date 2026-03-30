// Navigation Scroll Effect
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Scroll Indicator
const scrollIndicator = document.getElementById('scroll-indicator');

scrollIndicator.addEventListener('click', () => {
  const brandStorySection = document.getElementById('brand-story');
  brandStorySection.scrollIntoView({ behavior: 'smooth' });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// Add staggered animation delays for grid items
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

const moodCards = document.querySelectorAll('.mood-card');
moodCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`;
});

const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

const instagramPosts = document.querySelectorAll('.instagram-post');
instagramPosts.forEach((post, index) => {
  post.style.transitionDelay = `${index * 0.1}s`;
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add hover effects to buttons
const buttons = document.querySelectorAll('button, a');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / 700);
  }
});

// Image lazy loading observer
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      imageObserver.unobserve(img);
    }
  });
});

// Observe all images
const lazyImages = document.querySelectorAll('img[data-src]');
lazyImages.forEach(img => imageObserver.observe(img));

console.log('LUMIERA website loaded successfully');
