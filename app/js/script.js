document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      
      // Animate menu toggle
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
      });
    });
  }
  
  // Image hover effect
  const heroContent = document.querySelector('.hero-content');
  const imageContainers = document.querySelectorAll('.image-container');
  
  if (heroContent && imageContainers.length > 0) {
    // Show images on hover
    heroContent.addEventListener('mouseenter', function() {
      imageContainers.forEach(container => {
        container.style.opacity = '1';
      });
    });
    
    // Hide images when mouse leaves
    heroContent.addEventListener('mouseleave', function() {
      imageContainers.forEach(container => {
        container.style.opacity = '0';
      });
    });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  // Elements to observe
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    observer.observe(card);
    // Add initial invisible class
    card.classList.add('fade-in');
  });
  
  // Animate scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    observer.observe(scrollIndicator);
    scrollIndicator.classList.add('fade-in');
  }
  
  // Smooth scroll to sections
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    if (scrollTop > lastScrollTop) {
      header.classList.add('hide-header');
    } else {
      header.classList.remove('hide-header');
    }
    
    lastScrollTop = scrollTop;
  });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .in-view {
    opacity: 1;
    transform: translateY(0);
  }
  
  .scrolled {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .hide-header {
    transform: translateY(-100%);
  }
  
  header {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .mobile-menu-toggle span.active:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .mobile-menu-toggle span.active:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-toggle span.active:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
`;
document.head.appendChild(style);