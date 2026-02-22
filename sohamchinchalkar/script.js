'use strict';

function toggleClass(el, className) {
  if (el) el.classList.toggle(className);
}

function collapseAllProjectCards() {
  const containers = document.querySelectorAll('.projects .text-and-toggle');
  containers.forEach(function (container) {
    const textP = container.querySelector('.service-item-text');
    const showMore = container.querySelector('.show-more-text');
    const showLess = container.querySelector('.show-less-text');
    if (!textP || !showMore || !showLess) return;

    textP.classList.remove('full');
    textP.classList.add('truncated');
    showMore.style.display = 'inline';
    showLess.style.display = 'none';
  });
}

let projectCollapseTimer = null;

function startProjectCollapseTimer() {
  if (projectCollapseTimer) clearTimeout(projectCollapseTimer);
  projectCollapseTimer = setTimeout(function () {
    collapseAllProjectCards();
    projectCollapseTimer = null;
  }, 7000);
}

function cancelProjectCollapseTimer() {
  if (!projectCollapseTimer) return;
  clearTimeout(projectCollapseTimer);
  projectCollapseTimer = null;
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
      const activePage = document.querySelector('[data-page].active');
      const wasOnProjects = !!(activePage && activePage.dataset.page === 'projects');
      const target = link.textContent.trim().toLowerCase();

      pages.forEach(function (page) {
        page.classList.toggle('active', page.dataset.page === target);
      });

      navigationLinks.forEach(function (nav) {
        nav.classList.toggle('active', nav === link);
      });

      if (wasOnProjects && target !== 'projects') {
        startProjectCollapseTimer();
      } else if (target === 'projects') {
        cancelProjectCollapseTimer();
      }
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

function setExpandedState(container, expanded) {
  const textP = container.querySelector('.service-item-text');
  const showMore = container.querySelector('.show-more-text');
  const showLess = container.querySelector('.show-less-text');
  if (!textP || !showMore || !showLess) return;

  textP.classList.toggle('full', expanded);
  textP.classList.toggle('truncated', !expanded);
  showMore.style.display = expanded ? 'none' : 'inline';
  showLess.style.display = expanded ? 'inline' : 'none';
}

function collapseOtherProjectCards(activeContainer) {
  const allContainers = document.querySelectorAll('.projects .text-and-toggle');
  allContainers.forEach(function (container) {
    if (container !== activeContainer) setExpandedState(container, false);
  });
}

showMoreTexts.forEach(function (span) {
  span.addEventListener('click', function () {
    const container = span.closest('.text-and-toggle');
    if (!container) return;

    collapseOtherProjectCards(container);
    setExpandedState(container, true);
  });
});

showLessTexts.forEach(function (span) {
  span.addEventListener('click', function () {
    const container = span.closest('.text-and-toggle');
    if (!container) return;

    setExpandedState(container, false);
  });
});

// Keep project cards in fixed desktop columns so expansion does not reorder cards.
const projectList = document.querySelector('.projects .project-list');
const originalProjectItems = projectList
  ? Array.from(projectList.children).filter(function (child) {
      return child.classList && child.classList.contains('service-item');
    })
  : [];
let desktopColumnsMounted = false;
let leftColumnHolder = null;
let rightColumnHolder = null;

function mountDesktopProjectColumns() {
  if (!projectList || desktopColumnsMounted || !originalProjectItems.length) return;

  leftColumnHolder = document.createElement('li');
  leftColumnHolder.className = 'project-column-holder';
  const leftColumn = document.createElement('ul');
  leftColumn.className = 'project-column';
  leftColumnHolder.appendChild(leftColumn);

  rightColumnHolder = document.createElement('li');
  rightColumnHolder.className = 'project-column-holder';
  const rightColumn = document.createElement('ul');
  rightColumn.className = 'project-column';
  rightColumnHolder.appendChild(rightColumn);

  projectList.appendChild(leftColumnHolder);
  projectList.appendChild(rightColumnHolder);

  originalProjectItems.forEach(function (item, index) {
    if (index % 2 === 0) {
      leftColumn.appendChild(item);
    } else {
      rightColumn.appendChild(item);
    }
  });

  desktopColumnsMounted = true;
}

function mountMobileProjectList() {
  if (!projectList || !desktopColumnsMounted) return;

  if (leftColumnHolder) leftColumnHolder.remove();
  if (rightColumnHolder) rightColumnHolder.remove();

  originalProjectItems.forEach(function (item) {
    projectList.appendChild(item);
  });

  desktopColumnsMounted = false;
}

function syncProjectLayout() {
  if (window.innerWidth >= 1024) {
    mountDesktopProjectColumns();
  } else {
    mountMobileProjectList();
  }
}

syncProjectLayout();
window.addEventListener('resize', syncProjectLayout);

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
