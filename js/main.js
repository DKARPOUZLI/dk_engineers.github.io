// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.header__mobile-menu');
const headerMenu = document.querySelector('.header__menu');
let isMenuOpen = false;

const toggleMenu = () => {
  isMenuOpen = !isMenuOpen;
  mobileMenuButton.classList.toggle('active');
  
  if (isMenuOpen) {
    headerMenu.style.display = 'flex';
    headerMenu.style.animation = 'slideDown 0.3s ease forwards';
  } else {
    headerMenu.style.animation = 'slideUp 0.3s ease forwards';
    setTimeout(() => {
      headerMenu.style.display = 'none';
    }, 300);
  }
};

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', toggleMenu);
}

// Smooth scrolling για τα anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Κλείσιμο του mobile menu αν είναι ανοιχτό
      if (isMenuOpen) {
        toggleMenu();
      }
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;
const scrollThreshold = 50;

const handleScroll = () => {
  const currentScroll = window.pageYOffset;
  
  // Προσθήκη background στο header όταν κάνουμε scroll
  if (currentScroll > 0) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  
  // Hide/show header με βάση την κατεύθυνση του scroll
  if (currentScroll <= scrollThreshold) {
    header.classList.remove('header--hidden');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('header--hidden')) {
    header.classList.add('header--hidden');
  } else if (currentScroll < lastScroll && header.classList.contains('header--hidden')) {
    header.classList.remove('header--hidden');
  }
  
  lastScroll = currentScroll;
};

window.addEventListener('scroll', handleScroll);

// Animations on scroll
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate--in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.service-card, .expertise__item, .about__content > *, .contact__item').forEach(element => {
    element.classList.add('animate');
    observer.observe(element);
  });
};

// Αρχικοποίηση animations
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  
  // Προσθήκη CSS animations
  const style = document.createElement('style');
  style.textContent = `
    .animate {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate--in {
      opacity: 1;
      transform: translateY(0);
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideUp {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);
}); 