'use strict';

function toggleClass(el, className) {
  if (el) el.classList.toggle(className);
}

// Sidebar toggle (mobile)
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', function () {
    toggleClass(sidebar, 'active');
  });
}

// Page navigation
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navigationLinks.length && pages.length) {
  navigationLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const target = link.textContent.trim().toLowerCase();

      pages.forEach(function (page) {
        page.classList.toggle('active', page.dataset.page === target);
      });

      navigationLinks.forEach(function (nav) {
        nav.classList.toggle('active', nav === link);
      });

      window.scrollTo(0, 0);
    });
  });
}

// Accordion support (if present)
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(function (acc) {
  acc.addEventListener('click', function () {
    acc.classList.toggle('active');
    const panel = acc.nextElementSibling;
    if (!panel) return;
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });
});

// Show more / less for project descriptions
const showMoreTexts = document.querySelectorAll('.show-more-text');
const showLessTexts = document.querySelectorAll('.show-less-text');

showMoreTexts.forEach(function (span) {
  span.addEventListener('click', function () {
    const container = span.closest('.text-and-toggle');
    if (!container) return;

    const textP = container.querySelector('.service-item-text');
    const showMore = container.querySelector('.show-more-text');
    const showLess = container.querySelector('.show-less-text');
    if (!textP || !showMore || !showLess) return;

    textP.classList.remove('truncated');
    textP.classList.add('full');
    showMore.style.display = 'none';
    showLess.style.display = 'inline';
  });
});

showLessTexts.forEach(function (span) {
  span.addEventListener('click', function () {
    const container = span.closest('.text-and-toggle');
    if (!container) return;

    const textP = container.querySelector('.service-item-text');
    const showMore = container.querySelector('.show-more-text');
    const showLess = container.querySelector('.show-less-text');
    if (!textP || !showMore || !showLess) return;

    textP.classList.remove('full');
    textP.classList.add('truncated');
    showLess.style.display = 'none';
    showMore.style.display = 'inline';
  });
});

// Contact helper retained only if form exists
function sendEmail() {
  const name = document.getElementById('personName');
  const email = document.getElementById('personEmail');
  const msg = document.getElementById('personMessage');
  if (!name || !email || !msg || typeof Email === 'undefined') return;

  Email.send({
    Host: 'smtp.elasticemail.com',
    Username: 'theecstaticayush@gmail.com',
    Password: '70DAD96B042597FD9BEBD32CB16FE48B0547',
    To: 'theecstaticayush@gmail.com',
    From: 'theecstaticayush@gmail.com',
    Subject: 'Message from ' + name.value + ' at: ' + email.value,
    Body: msg.value
  }).then(function (message) {
    name.value = '';
    email.value = '';
    msg.value = '';
    alert('mail sent successfully ' + message);
  });
}
