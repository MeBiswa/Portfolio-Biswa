/**
 * Certifications Section Renderer
 * Renders each certification as a badge-style element with name and issuer.
 * Uses FadeInWrapper with staggered delay for animation.
 *
 * Validates: Requirements 12.2, 12.5, 12.6
 */

import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Creates a single certification badge element.
 * @param {Object} cert - Certification data object
 * @param {string} cert.name - Certification name
 * @param {string} cert.issuer - Issuer organization
 * @returns {HTMLElement} Badge element
 */
function createCertBadge(cert) {
  const badge = document.createElement('div');
  badge.className = 'cert-badge';

  // Apply glassmorphism badge styling
  Object.assign(badge.style, {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid var(--card-border)',
    borderRadius: 'var(--radius-badge)',
    padding: '12px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
  });

  // Certification name (prominent)
  const nameEl = document.createElement('span');
  nameEl.className = 'cert-badge__name';
  nameEl.textContent = cert.name;
  Object.assign(nameEl.style, {
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    fontSize: '0.95rem',
    color: 'var(--text)'
  });

  // Issuer (smaller, secondary color)
  const issuerEl = document.createElement('span');
  issuerEl.className = 'cert-badge__issuer';
  issuerEl.textContent = cert.issuer;
  Object.assign(issuerEl.style, {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  });

  badge.appendChild(nameEl);
  badge.appendChild(issuerEl);

  // Hover glow effect
  badge.addEventListener('mouseenter', () => {
    badge.style.boxShadow = '0 0 15px var(--accent)';
    badge.style.borderColor = 'var(--accent)';
  });

  badge.addEventListener('mouseleave', () => {
    badge.style.boxShadow = 'none';
    badge.style.borderColor = 'var(--card-border)';
  });

  return badge;
}

/**
 * Renders the Certifications section with badge-style elements in a flex wrap container.
 * @param {Array<{name: string, issuer: string}>} certData - Array of certification objects from PortfolioConfig
 */
export function renderCertificationsSection(certData) {
  const section = document.getElementById('certifications');
  if (!section) return;

  // If certData is empty or undefined, do not render the section
  if (!certData || !Array.isArray(certData) || certData.length === 0) {
    return;
  }

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Technical Certifications & Learning';
  section.appendChild(title);

  // Flex wrap container for badges
  const container = document.createElement('div');
  container.className = 'cert-badges-container';
  Object.assign(container.style, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem'
  });

  // Render each certification as a badge with staggered delay
  certData.forEach((cert, index) => {
    const badge = createCertBadge(cert);

    const wrapper = createFadeInWrapper({
      direction: 'up',
      delay: index * 150,
      children: badge
    });

    container.appendChild(wrapper);
  });

  // Wrap the entire container in a FadeInWrapper
  const sectionWrapper = createFadeInWrapper({
    direction: 'up',
    delay: 0,
    children: container
  });

  section.appendChild(sectionWrapper);
}
