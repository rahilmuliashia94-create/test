// Everest Security - Main JavaScript File

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const icon = this.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (mobileMenuToggle) {
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Product Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
    
    const filter = this.getAttribute('data-filter');
    
    productCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Product Enquiry Modal
function showEnquiry(productName) {
  const modal = document.getElementById('enquiryModal');
  const productNameInput = document.getElementById('productName');
  
  if (modal && productNameInput) {
    productNameInput.value = productName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeEnquiry() {
  const modal = document.getElementById('enquiryModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  const modal = document.getElementById('enquiryModal');
  if (e.target === modal) {
    closeEnquiry();
  }
});

// Enquiry Form Submit
document.addEventListener('DOMContentLoaded', function() {
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your enquiry! We will contact you shortly.');
      closeEnquiry();
      this.reset();
    });
  }
});

// Contact Form Submit
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for contacting us! We will get back to you within 24 hours.');
      this.reset();
    });
  }
});

// Login Form Submit
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      // Demo login check
      if (username === 'demo' && password === 'demo123') {
        // Store login state
        localStorage.setItem('everestLoggedIn', 'true');
        localStorage.setItem('everestUser', 'Demo Client');
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid credentials. Please use demo / demo123 for demo access.');
      }
    });
  }
});

// Check login status on dashboard
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('everestLoggedIn');
  if (!isLoggedIn && window.location.pathname.includes('dashboard.html')) {
    window.location.href = 'login.html';
  }
}

// Logout function
function logout() {
  localStorage.removeItem('everestLoggedIn');
  localStorage.removeItem('everestUser');
  window.location.href = 'index.html';
}

// Dashboard Tab Navigation
function showTab(tabId, element) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // Show selected tab content
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Update active state in sidebar
  const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  if (element) {
    element.classList.add('active');
  }
}

// FAQ Toggle
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector('i');
  
  if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
    answer.style.maxHeight = '0px';
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  } else {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add animation on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.feature-card, .product-card, .service-card, .sector-card, .testimonial-card, .stat-box');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// Form validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
}

// Print functionality for dashboard
function printInvoice(invoiceId) {
  window.print();
}

// Search functionality (if needed)
function searchProducts(query) {
  const products = document.querySelectorAll('.product-card');
  const lowerQuery = query.toLowerCase();
  
  products.forEach(product => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    const description = product.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Cookie consent (basic implementation)
function showCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    // You can implement a cookie banner here
    localStorage.setItem('cookieConsent', 'true');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  checkLoginStatus();
  showCookieConsent();
  
  // Add current year to footer copyright
  const yearElements = document.querySelectorAll('.footer-bottom p');
  yearElements.forEach(el => {
    if (el.textContent.includes('2024')) {
      el.innerHTML = el.innerHTML.replace('2024', new Date().getFullYear());
    }
  });
});

// Handle window resize
window.addEventListener('resize', function() {
  const navMenu = document.querySelector('.nav-menu');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
    if (mobileMenuToggle) {
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
  });
}

// Newsletter subscription (if form exists)
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (validateEmail(email)) {
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
});

// Sticky navigation shadow on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.pageYOffset > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
  }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }
  
  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-box h3, .stat-item h3');
      counters.forEach(counter => {
        const text = counter.textContent;
        const num = parseInt(text);
        if (!isNaN(num)) {
          animateCounter(counter, num);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});
