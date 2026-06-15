/**
 * Projects Section Renderer
 * Renders each project in a GlassCard with title, description, type indicator,
 * optional link, and tags. Uses FadeInWrapper with staggered delay.
 *
 * Validates: Requirements 11.2, 11.3, 11.4, 11.5, 11.6
 */

import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Returns the type badge text with emoji for a project type.
 * @param {string} type - Project type ("PUBLICATION" or "PROJECT")
 * @returns {string} Formatted badge text
 */
function getTypeBadge(type) {
  if (type === 'PUBLICATION') {
    return '📝 Publication';
  }
  return '🚀 Project';
}

/**
 * Creates the inner content for a project card.
 * @param {Object} project - Project data object
 * @param {string} project.title - Project title
 * @param {string} project.description - Project description
 * @param {string} [project.detailedDescription] - Expandable detailed description
 * @param {string} project.type - "PUBLICATION" or "PROJECT"
 * @param {string} [project.link] - Optional external link URL
 * @param {string[]} project.tags - List of technology/topic tags
 * @returns {HTMLElement} Content element for the card
 */
function createProjectCardContent(project) {
  const content = document.createElement('div');
  content.className = 'project-card__content';

  // Type badge with color coding
  const badgeEl = document.createElement('span');
  badgeEl.className = 'project-card__type-badge';
  if (project.type === 'PUBLICATION') {
    badgeEl.classList.add('project-card__type-badge--publication');
  } else {
    badgeEl.classList.add('project-card__type-badge--project');
  }
  badgeEl.textContent = getTypeBadge(project.type);
  content.appendChild(badgeEl);

  // Title (h3) — optionally wrapped in a link
  const titleEl = document.createElement('h3');
  titleEl.className = 'project-card__title';

  if (project.link) {
    const linkEl = document.createElement('a');
    linkEl.href = project.link;
    linkEl.rel = 'noopener noreferrer';
    linkEl.target = '_blank';
    linkEl.textContent = project.title;
    titleEl.appendChild(linkEl);
  } else {
    titleEl.textContent = project.title;
  }
  content.appendChild(titleEl);

  // Description
  const descEl = document.createElement('p');
  descEl.className = 'project-card__description';
  descEl.textContent = project.description;
  content.appendChild(descEl);

  // Detailed description (hidden by default, toggled by Read More)
  if (project.detailedDescription) {
    const detailEl = document.createElement('p');
    detailEl.className = 'project-card__detail';
    detailEl.textContent = project.detailedDescription;
    content.appendChild(detailEl);

    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'project-card__read-more';
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.setAttribute('aria-expanded', 'false');
    readMoreBtn.addEventListener('click', () => {
      const isExpanded = detailEl.classList.toggle('project-card__detail--visible');
      readMoreBtn.textContent = isExpanded ? 'Close' : 'Read More';
      readMoreBtn.setAttribute('aria-expanded', String(isExpanded));
      // Toggle glow border on the parent card
      const card = content.closest('.project-card');
      if (card) {
        card.classList.toggle('project-card--expanded', isExpanded);
      }
    });
    content.appendChild(readMoreBtn);
  }

  // Tags
  if (project.tags && project.tags.length > 0) {
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'project-card__tags';

    project.tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'project-card__tag';
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });

    content.appendChild(tagsContainer);
  }

  return content;
}

/**
 * Attaches a 3D tilt effect to a card element using mousemove.
 * @param {HTMLElement} card - The card element
 */
function attach3DTilt(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow = '';
  });

  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 191, 255, 0.15)';
  });
}

/**
 * Renders the Projects section with project cards in a 3-column grid layout.
 * @param {Array<{title: string, description: string, type: string, link?: string, tags: string[]}>} projectsData - Array of project objects from PortfolioConfig
 */
export function renderProjectsSection(projectsData) {
  const section = document.getElementById('projects');
  if (!section) return;

  // If projectsData is empty or undefined, render nothing (no error)
  if (!projectsData || !Array.isArray(projectsData) || projectsData.length === 0) {
    return;
  }

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Engineering Work';
  section.appendChild(title);

  // Grid container for project cards (3 columns on desktop)
  const grid = document.createElement('div');
  grid.className = 'projects-grid';
  section.appendChild(grid);

  // Render each project as a GlassCard wrapped in FadeInWrapper
  projectsData.forEach((project, index) => {
    const cardContent = createProjectCardContent(project);

    const card = createGlassCard({
      glowColor: '#00BFFF',
      children: cardContent
    });
    card.classList.add('project-card', 'project-card--3d');

    // Attach 3D tilt on hover
    attach3DTilt(card);

    const wrapper = createFadeInWrapper({
      direction: 'up',
      delay: index * 150,
      children: card
    });

    grid.appendChild(wrapper);
  });
}
