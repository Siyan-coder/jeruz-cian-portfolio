
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
  const submitBtn = document.getElementById('submitBtn');
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
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span>';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending Message...</span>';
      }

      const formData = new FormData(form);

      fetch('https://formspree.io/f/xyeknjjg', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(async (response) => {
        if (response.ok) {
          formStatus.className = 'form-status show-success';
          formStatus.innerHTML = `<strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been sent successfully to Cian. I will get back to you shortly.`;

          form.reset();

          setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
          }, 8000);
        } else {
          const data = await response.json().catch(() => ({}));
          formStatus.className = 'form-status show-error';
          if (data && data.errors && data.errors.length > 0) {
            formStatus.textContent = data.errors.map(err => err.message).join(', ');
          } else {
            formStatus.textContent = 'Oops! There was an issue sending your message. Please try again or email me directly at ciandelacruz10@gmail.com.';
          }
        }
      })
      .catch((error) => {
        console.error('Submission network error:', error);
        formStatus.className = 'form-status show-error';
        formStatus.textContent = 'Network error: Could not reach the email server. Please check your connection or email me directly at ciandelacruz10@gmail.com.';
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      });
    } else {
      formStatus.className = 'form-status show-error';
      formStatus.textContent = 'Please fill out all required fields with valid information before submitting.';
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
