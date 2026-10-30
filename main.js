/**
 * Dev Jeswani - Portfolio Interactive Engine
 * Pure Vanilla JavaScript (Modern, Lightweight, Fast)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typewriter Effect for Hero Subtitle
  initTypewriter();

  // 2. Dark / Light Mode Toggle with Persistence
  initThemeToggle();

  // 3. Mobile Navigation Menu Toggle
  initMobileNav();

  // 4. Scroll Active Navigation Link Highlight
  initScrollSpy();

  // 5. Projects Filter Engine
  initProjectFilters();

  // 6. Interactive Project Modal
  initProjectModals();

  // 7. Clipboard Copy for Contact Email
  initEmailCopy();

  // 8. Contact Form Validation & Submission
  initContactForm();

  // 9. Back To Top Smooth Scroll
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const dynamicElement = document.getElementById('typing-text');
  if (!dynamicElement) return;

  const roles = [
    'M.Tech Integrated (IT) Scholar @ IIPS DAVV',
    'Curious Learner & Problem Solver',
    'Python & C / C++ Developer',
    'Frontend Web Application Builder',
    'SIH Hackathon Participant'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      dynamicElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      dynamicElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Hold at end of string
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   2. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check persisted preference or system preference
  const savedTheme = localStorage.getItem('dev_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('dev_portfolio_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.innerHTML = '🌙'; // Click to go dark
        themeToggleBtn.setAttribute('title', 'Switch to dark theme');
      } else {
        themeIcon.innerHTML = '☀️'; // Click to go light
        themeToggleBtn.setAttribute('title', 'Switch to light theme');
      }
    }
  }
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. Scroll Spy (Active Navigation Highlight)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Projects Filter System
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Interactive Project Details Modal
   -------------------------------------------------------------------------- */
const projectDetailsData = {
  sih: {
    title: 'Farmer Crop Procurement Portal',
    badge: 'Smart India Hackathon (SIH)',
    overview: 'A full-scale collaborative agricultural web portal developed during the Smart India Hackathon to digitize and democratize crop procurement for Indian farmers.',
    challenge: 'Traditional agricultural markets suffer from heavy middleman commissions, delayed payments, and lack of real-time price discovery for rural growers.',
    solution: 'Engineered an accessible, transparent digital marketplace connecting farmers directly with authorized institutional buyers and mandis at verified Minimum Support Prices (MSP).',
    techStack: ['Frontend Web (HTML5/CSS3/JavaScript)', 'Responsive UI/UX', 'Team Collaboration', 'SIH Hackathon Pipeline'],
    features: [
      'Direct listing portal for farmers to post harvest quantities and expected rates',
      'Transparent bidding board eliminating unverified third-party brokers',
      'Regional language-friendly interface optimized for mobile and rural connectivity',
      'Verified MSP and live market rate tracking'
    ],
    github: 'https://github.com/devjeswani/sih-crop-procurement'
  },
  notes: {
    title: 'Academic Notes Upload & Sharing Hub',
    badge: 'IIPS DAVV Academic Group Project',
    overview: 'A student-centric academic knowledge repository built in collaboration with university peers to streamline semester note sharing, assignments, and reference materials.',
    challenge: 'Scattered WhatsApp groups and lost drive links made finding comprehensive lecture notes and past exams tedious during exam preparations.',
    solution: 'Designed an intuitive, searchable web portal structured strictly by Semester, Subject, and Department with fast preview and one-click downloads.',
    techStack: ['HTML5', 'CSS3', 'Modern JavaScript', 'UI/UX Architecture', 'Git Collaboration'],
    features: [
      'Categorized note upload portal with file format validation (PDF, DOCX, PPTX)',
      'Search and filter system by semester, subject code, and faculty name',
      'Clean responsive user interface engineered for both desktop and mobile',
      'Community peer ratings to surface top-quality study summaries'
    ],
    github: 'https://github.com/devjeswani/notes-sharing-platform'
  },
  calc: {
    title: 'Python Tkinter Desktop Calculator',
    badge: 'Personal Python Software',
    overview: 'A native desktop calculation utility built in Python utilizing the standard Tkinter graphical user interface library, focusing on responsive layout and mathematical expression handling.',
    challenge: 'Building a clean desktop GUI from scratch that safely validates algebraic expressions, handles floating point precision, and handles syntax errors without application crashes.',
    solution: 'Crafted an event-driven GUI with custom styled widget grids, memory registers, keyboard shortcut integration, and rigorous exception handling for division-by-zero.',
    techStack: ['Python 3', 'Tkinter GUI Toolkit', 'Event-Driven Architecture', 'Exception Handling'],
    features: [
      'Standard arithmetic engine with operator precedence and bracket support',
      'Instant syntax validation with clear user-friendly error alerts',
      'Responsive grid layout with interactive hover states on all number and operator keys',
      'Zero external dependencies - runs out of the box on standard Python installations'
    ],
    github: 'https://github.com/devjeswani/python-tkinter-calculator'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const closeBtn = document.getElementById('modal-close');
  const detailButtons = document.querySelectorAll('.btn-view-details');

  if (!modalBackdrop || !modalContent) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectDetailsData[projKey];
      if (!data) return;

      modalContent.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          <span style="font-size:0.75rem; font-weight:700; color:#38bdf8; background:rgba(56,189,248,0.12); padding:4px 12px; border-radius:99px; border:1px solid rgba(56,189,248,0.25);">
            ${data.badge}
          </span>
        </div>
        <h2 style="font-size:1.65rem; font-weight:800; color:var(--text-primary); margin-bottom:14px;">
          ${data.title}
        </h2>
        <p style="font-size:0.96rem; color:var(--text-secondary); line-height:1.65; margin-bottom:20px;">
          ${data.overview}
        </p>

        <div style="background:var(--bg-tertiary); padding:16px; border-radius:10px; margin-bottom:20px; border-left:3px solid var(--accent-primary);">
          <h4 style="font-size:0.9rem; font-weight:700; color:var(--text-primary); margin-bottom:4px;">🎯 The Problem & Goal</h4>
          <p style="font-size:0.88rem; color:var(--text-secondary);">${data.challenge}</p>
        </div>

        <div style="margin-bottom:20px;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-primary); margin-bottom:10px;">✨ Key Capabilities</h4>
          <ul style="display:flex; flex-direction:column; gap:8px;">
            ${data.features.map(f => `
              <li style="display:flex; align-items:flex-start; gap:8px; font-size:0.9rem; color:var(--text-secondary);">
                <span style="color:#10b981; font-weight:bold;">✓</span> ${f}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom:25px;">
          <h4 style="font-size:0.85rem; font-weight:700; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em; margin-bottom:8px;">Technologies Used</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display:flex; gap:12px; border-top:1px solid var(--border-subtle); padding-top:20px;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex:1;">
            Explore on GitHub ↗
          </a>
          <button class="btn btn-secondary" onclick="document.getElementById('project-modal').classList.remove('active')">
            Close
          </button>
        </div>
      `;

      modalBackdrop.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      modalBackdrop.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   7. Clipboard Copy for Contact Email
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'devjeswani1@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      }).catch(() => {
        // Fallback for older browsers
        showToast('Email: devjeswani1@gmail.com');
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Validation & Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('sender-name');
    const emailInput = document.getElementById('sender-email');
    const subjectInput = document.getElementById('sender-subject');
    const messageInput = document.getElementById('sender-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Contact from ' + name;
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all required fields.');
      return;
    }

    // Success feedback
    if (statusMsg) {
      statusMsg.className = 'form-status-msg success';
      statusMsg.innerHTML = `<strong>Thank you, ${name}!</strong> Opening your email client to send your message to <code>devjeswani1@gmail.com</code>...`;
    }

    showToast('🚀 Launching your email client with your message...');

    // Open mailto link with pre-filled content
    const mailtoUrl = `mailto:devjeswani1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Hi Dev,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 700);
  });
}

/* --------------------------------------------------------------------------
   9. Back to Top Smooth Scroll
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   Toast Notification Utility
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
