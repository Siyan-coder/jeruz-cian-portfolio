/**
 * ==============================================================================
 * PORTFOLIO JAVASCRIPT - INTERACTIVE FEATURES
 * Author: Cian Marco Jeruz
 * Course: CC107 - Application Development (Web Platforms)
 * Activity: Activity 4 - Personal Web Portfolio
 * ==============================================================================
 * 
 * Included Interactive Features:
 * 1. Mobile Hamburger Menu Toggle (Shows & hides mobile navigation)
 * 2. Contact Form Validation (Validates required fields, email format, and user feedback)
 * 3. Smooth Scrolling & Active Navigation Link Highlighter (ScrollSpy)
 * ==============================================================================
 */

// Wait until the DOM content is completely loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFormValidation();
  initScrollSpy();
});

/**
 * ==============================================================================
 * Feature 1: Mobile Hamburger Navigation Menu
 * ==============================================================================
 * Controls the visibility of the mobile navigation drawer when clicking the
 * hamburger toggle button. Ensures accessibility by toggling the aria-expanded
 * attribute and auto-closes the drawer when a link is clicked.
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Verify that the required navigation elements exist in the DOM
  if (!menuToggle || !navMenu) return;

  /**
   * Toggles the mobile navigation drawer open and closed
   */
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }

  /**
   * Closes the mobile navigation drawer
   */
  function closeMenu() {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Toggle drawer when the hamburger icon is clicked
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  // Automatically close menu when any navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close the menu if the user clicks anywhere outside of the navbar
  document.addEventListener('click', (event) => {
    const isClickInsideNavbar = event.target.closest('#navbar');
    if (!isClickInsideNavbar) {
      closeMenu();
    }
  });

  // Close the menu if the viewport is resized beyond tablet breakpoint (768px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

/**
 * ==============================================================================
 * Feature 2: Interactive Form Validation
 * ==============================================================================
 * Validates the contact form fields:
 * - Name: Required, minimum 2 characters
 * - Email: Required, conforms to valid email pattern
 * - Message: Required, minimum 10 characters
 * 
 * Provides inline feedback messages, highlights invalid inputs, and displays
 * a success confirmation alert banner upon successful submission.
 */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');

  // Exit if the contact form is not found on the page
  if (!form) return;

  // Regular expression pattern for validating standard email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Displays an error message for a given input field
   * @param {HTMLElement} input - The input or textarea element
   * @param {string} errorElementId - ID of the element to receive error text
   * @param {string} message - The error message string to display
   */
  function showError(input, errorElementId, message) {
    const formGroup = input.closest('.form-group');
    const errorEl = document.getElementById(errorElementId);

    if (formGroup) {
      formGroup.classList.add('has-error');
    }
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  /**
   * Clears the error message and styling for a given input field
   * @param {HTMLElement} input - The input or textarea element
   * @param {string} errorElementId - ID of the element whose text should be cleared
   */
  function clearError(input, errorElementId) {
    const formGroup = input.closest('.form-group');
    const errorEl = document.getElementById(errorElementId);

    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  /**
   * Validates the Name field
   * @returns {boolean} - True if valid, false otherwise
   */
  function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
      showError(nameInput, 'nameError', 'Please enter your name.');
      return false;
    }
    if (value.length < 2) {
      showError(nameInput, 'nameError', 'Name must be at least 2 characters.');
      return false;
    }
    clearError(nameInput, 'nameError');
    return true;
  }

  /**
   * Validates the Email field
   * @returns {boolean} - True if valid, false otherwise
   */
  function validateEmail() {
    const value = emailInput.value.trim();
    if (value === '') {
      showError(emailInput, 'emailError', 'Please enter your email address.');
      return false;
    }
    if (!emailRegex.test(value)) {
      showError(emailInput, 'emailError', 'Please enter a valid email address (e.g., name@example.com).');
      return false;
    }
    clearError(emailInput, 'emailError');
    return true;
  }

  /**
   * Validates the Message field
   * @returns {boolean} - True if valid, false otherwise
   */
  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === '') {
      showError(messageInput, 'messageError', 'Please enter a message.');
      return false;
    }
    if (value.length < 10) {
      showError(messageInput, 'messageError', 'Message should be at least 10 characters long.');
      return false;
    }
    clearError(messageInput, 'messageError');
    return true;
  }

  // Real-time validation listeners on input blur & change
  nameInput.addEventListener('blur', validateName);
  nameInput.addEventListener('input', () => {
    if (nameInput.closest('.form-group').classList.contains('has-error')) {
      validateName();
    }
  });

  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-group').classList.contains('has-error')) {
      validateEmail();
    }
  });

  messageInput.addEventListener('blur', validateMessage);
  messageInput.addEventListener('input', () => {
    if (messageInput.closest('.form-group').classList.contains('has-error')) {
      validateMessage();
    }
  });

  /**
   * Handles form submission and overall validation check
   */
  form.addEventListener('submit', (event) => {
    // Prevent the default browser form submission refresh
    event.preventDefault();

    // Reset status message
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    // Run all field validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // Check if all fields passed validation
    if (isNameValid && isEmailValid && isMessageValid) {
      // Show success feedback banner
      formStatus.classList.add('show-success');
      formStatus.innerHTML = `<strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been received. I will get back to you shortly.`;

      // Log form submission data for testing / demo purposes
      console.log('Form submission successful:', {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        submittedAt: new Date().toISOString()
      });

      // Clear the form fields after successful submission
      form.reset();

      // Automatically hide the success message after 7 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }, 7000);
    } else {
      // Show warning feedback banner
      formStatus.classList.add('show-error');
      formStatus.textContent = 'Please correct the errors in the form before submitting.';
    }
  });
}

/**
 * ==============================================================================
 * Feature 3: Smooth Scrolling & ScrollSpy Active Link Highlighter
 * ==============================================================================
 * Highlights the corresponding navigation link in the header as the user scrolls
 * through the different sections of the page.
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  /**
   * Determines which section is currently in view and updates nav active state
   */
  function handleScroll() {
    const scrollPosition = window.scrollY + 120; // Offset for sticky navbar height

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // Throttle scroll events using requestAnimationFrame for optimal performance
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  });

  // Run on initial load to set active state
  handleScroll();
}
