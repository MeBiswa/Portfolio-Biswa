/**
 * Education Section Renderer
 * Renders education items in GlassCard components with institution, degree, period, and score.
 * Uses FadeInWrapper with staggered delay for card animations.
 *
 * Validates: Requirements 12.1, 12.5, 12.6
 */

import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Creates the inner content for an education card.
 * @param {Object} item - Education data object
 * @param {string} item.institution - Institution name
 * @param {string} item.degree - Degree or qualification
 * @param {string} item.period - Time period (e.g., "2020–2024")
 * @param {string} item.score - Score or grade (e.g., "CGPA: 8.8")
 * @returns {HTMLElement} Content element for the card
 */
function createEducationCardContent(item) {
  const content = document.createElement('div');
  content.className = 'education-card__content';

  // Institution name
  const institution = document.createElement('h3');
  institution.className = 'education-card__institution';
  institution.textContent = item.institution;
  content.appendChild(institution);

  // Degree
  const degree = document.createElement('h4');
  degree.className = 'education-card__degree';
  degree.textContent = item.degree;
  content.appendChild(degree);

  // Period (accent color, mono font)
  const period = document.createElement('span');
  period.className = 'education-card__period';
  period.textContent = item.period;
  Object.assign(period.style, {
    color: 'var(--accent)',
    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
    fontSize: '0.875rem'
  });
  content.appendChild(period);

  // Score with highlight
  const score = document.createElement('span');
  score.className = 'education-card__score';
  score.textContent = item.score;
  Object.assign(score.style, {
    color: 'var(--highlight)',
    fontWeight: '600',
    marginTop: '8px',
    display: 'block'
  });
  content.appendChild(score);

  return content;
}

/**
 * Renders the Education section with education cards in a grid/stack layout.
 * @param {Array<{institution: string, degree: string, period: string, score: string}>} educationData - Array of education objects from PortfolioConfig
 */
export function renderEducationSection(educationData) {
  const section = document.getElementById('education');
  if (!section) return;

  // If educationData is empty or undefined, do not render the section
  if (!educationData || !Array.isArray(educationData) || educationData.length === 0) {
    return;
  }

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Education';
  section.appendChild(title);

  // Grid container for education cards
  const grid = document.createElement('div');
  grid.className = 'education-grid';
  section.appendChild(grid);

  // Render each education item as a GlassCard wrapped in FadeInWrapper
  educationData.forEach((item, index) => {
    const cardContent = createEducationCardContent(item);

    const card = createGlassCard({
      glowColor: '#64FFDA',
      children: cardContent
    });
    card.classList.add('education-card');

    const wrapper = createFadeInWrapper({
      direction: 'up',
      delay: index * 150,
      children: card
    });

    grid.appendChild(wrapper);
  });
}
