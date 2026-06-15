/**
 * Main Application Entry Point
 * Initializes the portfolio app: validates config, renders sections,
 * sets up navigation, scroll spy, theme toggle, and fade-in animations.
 *
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 15.1, 15.5, 15.6, 16.6, 16.8
 */

import { PortfolioConfig } from '../data/portfolio-config.js';
import { initTheme, toggleTheme } from './theme-provider.js';
import { validateConfig } from './data-validator.js';
import { renderSidebar, navItems, updateActiveNavItem } from './components/sidebar-nav.js';
import { setupScrollSpy, smoothScrollToSection, handleInitialHash } from './scroll-router.js';
import { initFadeInObserver } from './components/fade-in.js';
import { renderHeroSection } from './sections/hero-section.js';
import { renderAboutSection } from './sections/about-section.js';
import { renderExperienceSection } from './sections/experience-section.js';
import { renderSkillsSection } from './sections/skills-section.js';
import { renderToolsSection } from './sections/tools-section.js';
import { renderProjectsSection } from './sections/projects-section.js';
import { renderInternshipsSection } from './sections/internships-section.js';
import { renderEducationSection } from './sections/education-section.js';
import { renderCertificationsSection } from './sections/certifications-section.js';
import { renderContactSection } from './sections/contact-section.js';

/**
 * Renders a minimal fallback page when config validation fails.
 * Shows hardcoded name, email, phone, and LinkedIn, and hides all sections.
 */
function renderFallbackPage() {
  // Hide all sections
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = '';
  }

  // Hide sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.display = 'none';
  }

  // Create fallback content
  const fallback = document.createElement('div');
  fallback.className = 'fallback-page';
  fallback.setAttribute('role', 'main');
  fallback.innerHTML = `
    <div class="fallback-page__content">
      <h1 class="fallback-page__name">Biswa Prakash Acharya</h1>
      <p class="fallback-page__info">
        <a href="mailto:acharyabiswaprakash06@gmail.com">acharyabiswaprakash06@gmail.com</a>
      </p>
      <p class="fallback-page__info">
        <a href="tel:+91-8984291205">+91-8984291205</a>
      </p>
      <p class="fallback-page__info">
        <a href="https://www.linkedin.com/in/biswaprakash-acharya-5b8a5b183" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </div>
  `;

  document.body.appendChild(fallback);
}

/**
 * Attempts to render a single section safely.
 * If rendering throws an error, logs it and skips the section.
 * @param {string} sectionName - Name of the section for logging
 * @param {Function} renderFn - The render function to call
 * @param {*} data - Data to pass to the render function
 * @returns {boolean} True if rendered successfully, false if skipped
 */
function safeRenderSection(sectionName, renderFn, data) {
  try {
    // Skip if data is missing or empty
    if (data === undefined || data === null) {
      console.warn(`[Portfolio] Skipping ${sectionName}: no data provided`);
      return false;
    }
    // Skip if array data is empty (for list-based sections)
    if (Array.isArray(data) && data.length === 0) {
      console.warn(`[Portfolio] Skipping ${sectionName}: empty data array`);
      return false;
    }
    renderFn(data);
    return true;
  } catch (error) {
    console.error(`[Portfolio] Error rendering ${sectionName}:`, error);
    return false;
  }
}

/**
 * Creates and appends the theme toggle button to the sidebar.
 */
function addThemeToggleButton() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle theme');
  toggleBtn.setAttribute('title', 'Toggle dark/light theme');
  toggleBtn.type = 'button';

  // Set initial icon based on current theme
  const currentTheme = document.documentElement.dataset.theme;
  toggleBtn.innerHTML = currentTheme === 'dark'
    ? '<span class="theme-toggle__icon" aria-hidden="true">☀️</span>'
    : '<span class="theme-toggle__icon" aria-hidden="true">🌙</span>';

  toggleBtn.addEventListener('click', () => {
    const newTheme = toggleTheme();
    toggleBtn.innerHTML = newTheme === 'dark'
      ? '<span class="theme-toggle__icon" aria-hidden="true">☀️</span>'
      : '<span class="theme-toggle__icon" aria-hidden="true">🌙</span>';
  });

  sidebar.appendChild(toggleBtn);
}

/**
 * Main initialization function.
 * Called on DOMContentLoaded.
 */
function initializePortfolio() {
  // 1. Initialize theme (dark default or from localStorage)
  initTheme();

  // 2. Validate the portfolio config
  const validation = validateConfig(PortfolioConfig);

  // 3. If invalid, render fallback page
  if (!validation.valid) {
    renderFallbackPage();
    return;
  }

  // 4. Render sections in fixed order, skipping any that fail
  const renderedSections = [];

  if (safeRenderSection('Hero', renderHeroSection, PortfolioConfig.hero)) {
    renderedSections.push('hero');
  }
  if (safeRenderSection('About', renderAboutSection, PortfolioConfig.about)) {
    renderedSections.push('about');
  }
  if (safeRenderSection('Experience', renderExperienceSection, PortfolioConfig.experience)) {
    renderedSections.push('experience');
  }
  if (safeRenderSection('Skills', renderSkillsSection, PortfolioConfig.skills)) {
    renderedSections.push('skills');
  }
  if (safeRenderSection('Tools', renderToolsSection, PortfolioConfig.toolsBuilt)) {
    renderedSections.push('tools');
  }
  if (safeRenderSection('Projects', renderProjectsSection, PortfolioConfig.projects)) {
    renderedSections.push('projects');
  }
  if (safeRenderSection('Internships', renderInternshipsSection, PortfolioConfig.projectExperience)) {
    renderedSections.push('internships');
  }
  if (safeRenderSection('Education', renderEducationSection, PortfolioConfig.education)) {
    renderedSections.push('education');
  }
  if (safeRenderSection('Certifications', renderCertificationsSection, PortfolioConfig.certifications)) {
    renderedSections.push('certifications');
  }
  if (safeRenderSection('Contact', renderContactSection, PortfolioConfig.contact)) {
    renderedSections.push('contact');
  }

  // 5. Render sidebar navigation with 'hero' as initial active item
  const activeNavItems = navItems.filter(item => renderedSections.includes(item.id));
  renderSidebar(activeNavItems, 'hero');

  // 6. Set up scroll spy with rendered section IDs
  setupScrollSpy(renderedSections, updateActiveNavItem);

  // 7. Handle initial URL hash
  handleInitialHash();

  // 8. Initialize fade-in observer for scroll animations
  initFadeInObserver();

  // 9. Add theme toggle button to sidebar
  addThemeToggleButton();
}

// Wrap initialization in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', initializePortfolio);
