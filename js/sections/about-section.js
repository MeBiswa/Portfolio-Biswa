/**
 * About Section Renderer
 * Displays profile image, description, and stats items.
 *
 * Validates: Requirements 1.5, 15.3, 14.1
 */

import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Extracts initials from a name string for the image fallback.
 * @param {string} name
 * @returns {string}
 */
function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Creates a placeholder element to display when the profile image fails to load.
 * @returns {HTMLElement}
 */
function createImagePlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'about__image-placeholder';
  placeholder.setAttribute('aria-label', 'Profile placeholder');

  const initials = getInitials('Biswa Prakash Acharya');
  placeholder.textContent = initials;

  Object.assign(placeholder.style, {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent), var(--highlight))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    color: 'var(--primary-bg)'
  });

  return placeholder;
}

/**
 * Renders the About section with profile image, description, and stats.
 * @param {Object} aboutData
 * @param {string} aboutData.profileImage - URL to the profile image
 * @param {string} aboutData.description - Description paragraph text
 * @param {Array<{label: string, value: string}>} aboutData.stats - Stats items
 */
export function renderAboutSection(aboutData) {
  const section = document.getElementById('about');
  if (!section) return;

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Profile Overview';

  // Two-column layout container
  const grid = document.createElement('div');
  grid.className = 'about__grid';
  Object.assign(grid.style, {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '3rem',
    alignItems: 'start'
  });

  // Left column: profile image
  const imageColumn = document.createElement('div');
  imageColumn.className = 'about__image-col';
  Object.assign(imageColumn.style, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  });

  const img = document.createElement('img');
  img.src = aboutData.profileImage;
  img.alt = 'Profile photo';
  img.loading = 'lazy';
  img.className = 'about__profile-image';
  Object.assign(img.style, {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid var(--accent)'
  });

  // Fallback: on error, replace with placeholder initials
  img.onerror = () => {
    const placeholder = createImagePlaceholder();
    imageColumn.replaceChild(placeholder, img);
  };

  imageColumn.appendChild(img);

  // Right column: description + stats
  const contentColumn = document.createElement('div');
  contentColumn.className = 'about__content-col';

  // Description paragraph
  const description = document.createElement('p');
  description.className = 'about__description';
  description.textContent = aboutData.description;
  Object.assign(description.style, {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '2rem',
    color: 'var(--text-secondary)'
  });

  contentColumn.appendChild(description);

  // Stats row
  const statsRow = document.createElement('div');
  statsRow.className = 'about__stats';
  Object.assign(statsRow.style, {
    display: 'grid',
    gridTemplateColumns: `repeat(${aboutData.stats.length}, 1fr)`,
    gap: '1rem'
  });

  aboutData.stats.forEach(stat => {
    const statContent = document.createElement('div');
    statContent.className = 'about__stat-inner';
    Object.assign(statContent.style, {
      textAlign: 'center'
    });

    const value = document.createElement('div');
    value.className = 'about__stat-value';
    value.textContent = stat.value;
    Object.assign(value.style, {
      fontSize: '1.4rem',
      fontWeight: '700',
      fontFamily: 'var(--font-heading)',
      color: 'var(--accent)',
      marginBottom: '0.25rem',
      wordBreak: 'break-word',
      lineHeight: '1.3'
    });

    const label = document.createElement('div');
    label.className = 'about__stat-label';
    label.textContent = stat.label;
    Object.assign(label.style, {
      fontSize: '0.85rem',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)'
    });

    statContent.appendChild(value);
    statContent.appendChild(label);

    const statCard = createGlassCard({
      children: statContent
    });

    statsRow.appendChild(statCard);
  });

  contentColumn.appendChild(statsRow);

  // Assemble the grid
  grid.appendChild(imageColumn);
  grid.appendChild(contentColumn);

  // Wrap content in a container
  const container = document.createElement('div');
  container.className = 'container';
  container.appendChild(title);
  container.appendChild(grid);

  // Wrap in FadeInWrapper for scroll animation
  const fadeWrapper = createFadeInWrapper({
    direction: 'up',
    delay: 0,
    duration: 600,
    children: container
  });

  section.appendChild(fadeWrapper);
}
