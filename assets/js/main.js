/**
 * Rajan Maharjan - Main Global Application Script
 * Theme Switcher, Mobile Navigation, Sticky Header, Live Bilingual Date Widget, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Mode with Persistence)
  // --------------------------------------------------------------------------
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('rm_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('rm_theme', 'dark');
      updateThemeIcons('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('rm_theme', 'light');
      updateThemeIcons('light');
    }
  }

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Switch to light mode">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        btn.setAttribute('title', 'Switch to Light Mode');
      } else {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Switch to dark mode">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        btn.setAttribute('title', 'Switch to Dark Mode');
      }
    });
  }

  // Initial Theme Load
  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (systemPrefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // --------------------------------------------------------------------------
  // 2. Sticky Header Elevation on Scroll
  // --------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (siteHeader) {
      if (scrollPos > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const mobileToggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');

  function openMobileNav() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileNav() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileNav);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileNav);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileNav);

  // Close drawer on link click
  document.querySelectorAll('.mobile-nav-item a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // --------------------------------------------------------------------------
  // 4. Live Bilingual Date Pill Widget (English AD & Nepali BS)
  // --------------------------------------------------------------------------
  const dateWidgetText = document.getElementById('liveDateTicker');
  if (dateWidgetText && window.NepaliCalendar) {
    try {
      const today = window.NepaliCalendar.getToday();
      const engStr = `${today.ad.date} ${today.ad.monthName} ${today.ad.year}`;
      const nepStr = today.bs ? `वि.सं ${today.bs.nepaliYearNum} ${today.bs.nmonth} ${today.bs.nepaliDateNum}` : '';
      dateWidgetText.textContent = `${engStr} • ${nepStr}`;
    } catch (e) {
      console.warn('Date calculation fallback', e);
    }
  }

  // --------------------------------------------------------------------------
  // 5. Active Link Highlighting
  // --------------------------------------------------------------------------
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const filename = href.split('/').pop().split('#')[0];
      const currentFile = currentPath.split('/').pop().split('#')[0] || 'index.html';

      if (filename === currentFile || (href === './' && currentFile === 'index.html') || (href === 'index.html' && currentFile === '')) {
        link.classList.add('active');
      }
    }
  });

  // --------------------------------------------------------------------------
  // 6. Interactive Contact Form Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('mainContactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const honeypot = document.getElementById('websiteHoneypot');

      // Honeypot spam check
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam submission suppressed.');
        return;
      }

      let isValid = true;

      // Validation
      if (!nameInput.value.trim()) {
        highlightError(nameInput, 'Please provide your name');
        isValid = false;
      } else {
        removeError(nameInput);
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        highlightError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        removeError(emailInput);
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        highlightError(messageInput, 'Please enter a message with at least 10 characters');
        isValid = false;
      } else {
        removeError(messageInput);
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending...';
        }

        // Simulate secure sending response (can easily wire to send-mail.php)
        setTimeout(() => {
          if (formSuccessAlert) {
            formSuccessAlert.style.display = 'block';
            formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
          }
        }, 800);
      }
    });

    function highlightError(field, message) {
      field.style.borderColor = '#ef4444';
      let errSpan = field.parentElement.querySelector('.form-error-msg');
      if (!errSpan) {
        errSpan = document.createElement('span');
        errSpan.className = 'form-error-msg';
        errSpan.style.color = '#ef4444';
        errSpan.style.fontSize = '0.8rem';
        errSpan.style.marginTop = '0.35rem';
        field.parentElement.appendChild(errSpan);
      }
      errSpan.textContent = message;
    }

    function removeError(field) {
      field.style.borderColor = '';
      const errSpan = field.parentElement.querySelector('.form-error-msg');
      if (errSpan) errSpan.remove();
    }
  }

  // --------------------------------------------------------------------------
  // 7. Code Snippet Copy Buttons
  // --------------------------------------------------------------------------
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        navigator.clipboard.writeText(targetElem.innerText).then(() => {
          const originalText = btn.innerText;
          btn.innerText = 'Copied!';
          setTimeout(() => { btn.innerText = originalText; }, 2000);
        });
      }
    });
  });
});
