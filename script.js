
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFormValidation();
  initScrollSpy();
});

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMenu() {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInsideNavbar = event.target.closest('#navbar');
    if (!isClickInsideNavbar) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

function initFormValidation() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    formStatus.className = 'form-status';
    formStatus.textContent = '';

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      formStatus.classList.add('show-success');
      formStatus.innerHTML = `<strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been received. I will get back to you shortly.`;

      console.log('Form submission successful:', {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        submittedAt: new Date().toISOString()
      });

      form.reset();

      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }, 7000);
    } else {
      formStatus.classList.add('show-error');
      formStatus.textContent = 'Please correct the errors in the form before submitting.';
    }
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  function handleScroll() {
    const scrollPosition = window.scrollY + 120; 

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

  handleScroll();
}
