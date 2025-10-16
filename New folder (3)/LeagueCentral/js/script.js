// LeagueCentral Global JavaScript
// This file contains shared functionality across all pages

// Mobile Navigation Toggle
function toggleMobileNav() {
  const nav = document.querySelector('.links');
  if (nav) {
    nav.classList.toggle('mobile-active');
  }
}

// Smooth Scroll to Section
function smoothScroll(targetId) {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add Animation on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(element => observer.observe(element));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.links a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active-page');
    }
  });

  // Initialize scroll animations if elements exist
  if (document.querySelectorAll('.animate-on-scroll').length > 0) {
    animateOnScroll();
  }

  // Add loading animation removal
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 300);
    }, 500);
  }
});

// Form Validation Helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }

    // Email validation
    if (input.type === 'email' && input.value && !validateEmail(input.value)) {
      isValid = false;
      input.classList.add('error');
    }
  });

  return isValid;
}

// Local Storage Helper Functions
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
}

function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return null;
  }
}

function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error removing from localStorage:', e);
    return false;
  }
}

// Toast Notification System
function showToast(message, type = 'info', duration = 3000) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
    `;
    document.body.appendChild(toastContainer);
  }

  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#ff4757' : '#667eea'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    animation: slideInRight 0.3s ease;
    max-width: 300px;
  `;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Remove toast after duration
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Add CSS animations for toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  .active-page {
    color: #667eea !important;
    font-weight: 600;
  }
  input.error, select.error, textarea.error {
    border-color: #ff4757 !important;
  }
`;
document.head.appendChild(toastStyles);

// Debounce Helper Function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format Currency
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Format Date
function formatDate(date, format = 'short') {
  const d = new Date(date);
  const options = format === 'short' 
    ? { year: 'numeric', month: 'short', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  
  return new Intl.DateTimeFormat('en-US', options).format(d);
}

// Search Filter Function
function filterItems(searchTerm, items, searchKey) {
  const term = searchTerm.toLowerCase().trim();
  return items.filter(item => {
    const value = typeof item === 'string' ? item : item[searchKey];
    return value.toLowerCase().includes(term);
  });
}

// Copy to Clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy', 'error');
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
    document.body.removeChild(textarea);
  }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateEmail,
    validateForm,
    showToast,
    formatCurrency,
    formatDate,
    filterItems,
    copyToClipboard,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    debounce
  };
}
