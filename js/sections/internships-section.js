/**
 * Project Experience & Internships Section Renderer
 * Renders project experience in a timeline layout with GlassCard components.
 */

import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Renders the Project Experience & Internships section.
 * @param {Array} data - Array of project experience objects
 */
export function renderInternshipsSection(data) {
  const section = document.getElementById('internships');
  if (!section) return;
  if (!data || data.length === 0) return;

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Project Experience & Internships';
  section.appendChild(title);

  // Timeline container
  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  data.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline__item';

    // Timeline dot
    const dot = document.createElement('div');
    dot.className = 'timeline__dot';
    timelineItem.appendChild(dot);

    // Card content
    const cardContent = document.createElement('div');
    cardContent.className = 'timeline__card-content';

    // Organization name
    const org = document.createElement('h3');
    org.className = 'timeline__company';
    org.textContent = item.organization;
    cardContent.appendChild(org);

    // Role and period
    const roleRow = document.createElement('div');
    roleRow.className = 'timeline__role-row';

    const role = document.createElement('h4');
    role.className = 'timeline__role';
    role.textContent = item.role;
    roleRow.appendChild(role);

    const period = document.createElement('span');
    period.className = 'timeline__period';
    period.textContent = item.period;
    roleRow.appendChild(period);

    cardContent.appendChild(roleRow);

    // Details list
    if (item.details && item.details.length > 0) {
      const detailsList = document.createElement('ul');
      detailsList.className = 'timeline__responsibilities';
      item.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
      });
      cardContent.appendChild(detailsList);
    }

    // Tags
    if (item.tags && item.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px;';
      item.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tool-card__tag';
        tagEl.textContent = tag;
        tagsContainer.appendChild(tagEl);
      });
      cardContent.appendChild(tagsContainer);
    }

    // Wrap in GlassCard
    const card = createGlassCard({ children: cardContent });
    card.classList.add('timeline__card--premium');
    timelineItem.appendChild(card);

    // Wrap in FadeInWrapper
    const fadeWrapper = createFadeInWrapper({
      direction: 'up',
      delay: index * 200,
      children: timelineItem
    });

    timeline.appendChild(fadeWrapper);
  });

  section.appendChild(timeline);
}
