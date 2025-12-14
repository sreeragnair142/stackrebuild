// Animations JavaScript file
document.addEventListener('DOMContentLoaded', () => {
  // Initialize text animations
  initTextAnimations();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize logo animation
  initLogoAnimation();
});

function initTextAnimations() {
  // Split text into individual letters for animations
  const fadeTextElements = document.querySelectorAll('[data-animation="fade-letters"]');
  
  fadeTextElements.forEach(element => {
    const text = element.textContent.trim();
    const letters = text.split('');
    
    // Clear the element and add spans for each letter
    element.textContent = '';
    
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.animationDelay = `${index * 0.05}s`;
      span.classList.add('fade-letter');
      
      element.appendChild(span);
    });
  });
}

function initScrollAnimations() {
  // Add elements that should animate on scroll
  const tagline = document.querySelector('.tagline h2');
  const bottomNav = document.querySelector('.bottom-navigation');
  
  if (tagline) tagline.classList.add('fade-in');
  if (bottomNav) bottomNav.classList.add('fade-in');
  
  // Create staggered animation for images
  const images = document.querySelectorAll('.image');
  
  images.forEach((image, index) => {
    // Add parallax class
    image.classList.add('parallax');
  });
  
  // Handle page load animations
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 300);
  });
}

function initLogoAnimation() {
  const logoLarge = document.querySelector('.logo-large');
  const circleOverlay = document.querySelector('.circle-overlay');
  
  if (logoLarge && circleOverlay) {
    // Make circle interactive
    logoLarge.addEventListener('mouseenter', () => {
      circleOverlay.style.transform = 'scale(1.2)';
      circleOverlay.style.backgroundColor = 'var(--color-orange)';
    });
    
    logoLarge.addEventListener('mouseleave', () => {
      circleOverlay.style.transform = 'scale(1)';
      circleOverlay.style.backgroundColor = 'var(--color-orange)';
    });
    
    // Random movement for circle
    setInterval(() => {
      const randomX = Math.random() * 10 - 5;
      const randomY = Math.random() * 10 - 5;
      
      circleOverlay.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000);
  }
}

// Add animation to elements with scroll progress
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;
  
  // Calculate scroll progress (0 to 1)
  const scrollProgress = scrollPosition / (documentHeight - windowHeight);
  
  // Apply effects based on scroll progress
  const header = document.querySelector('.header');
  
  if (header) {
    // Gradually change header background as user scrolls
    if (scrollPosition > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});