/**
 * Experience Section Renderer
 * Renders work experience in a timeline layout with GlassCard components.
 *
 * Validates: Requirements 10.1, 10.2, 10.3, 10.4
 */

import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Returns an icon for a responsibility based on keyword matching.
 * @param {string} text - Responsibility text
 * @returns {string} Emoji icon
 */
function getResponsibilityIcon(text) {
  const lower = text.toLowerCase();
  if (lower.includes('acl') || lower.includes('access control')) return '🔐';
  if (lower.includes('workflow')) return '⚙️';
  if (lower.includes('lifecycle')) return '🔄';
  if (lower.includes('sql') || lower.includes('query') || lower.includes('database')) return '📊';
  if (lower.includes('xml') || lower.includes('xsl')) return '🧩';
  if (lower.includes('full-stack') || lower.includes('fullstack') || lower.includes('full stack') || lower.includes('application')) return '💻';
  return '';
}

/**
 * Renders the Experience section with a timeline layout.
 * @param {Array<{company: string, role: string, period: string, responsibilities: string[], achievements: string[]}>} experienceData
 */
export function renderExperienceSection(experienceData) {
  const section = document.getElementById('experience');
  if (!section) return;

  // If experience data is empty or undefined, don't render the timeline
  if (!experienceData || experienceData.length === 0) return;

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Experience';
  section.appendChild(title);

  // Timeline container
  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  // Items are already in reverse chronological order from the config (most recent first)
  experienceData.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline__item';

    // Timeline dot
    const dot = document.createElement('div');
    dot.className = 'timeline__dot';
    timelineItem.appendChild(dot);

    // Card content
    const cardContent = document.createElement('div');
    cardContent.className = 'timeline__card-content';

    // System-style labels
    const sysLabels = document.createElement('div');
    sysLabels.className = 'timeline__sys-labels';
    Object.assign(sysLabels.style, {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: '0.75rem',
      opacity: '0.8',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    });
    sysLabels.innerHTML = '<span>ENV: ZF PLM CORE</span><span>STATUS: ACTIVE</span><span>ROLE: ENGINEERING TRAINEE</span>';
    cardContent.appendChild(sysLabels);

    // Company name
    const company = document.createElement('h3');
    company.className = 'timeline__company';
    company.textContent = item.company;
    cardContent.appendChild(company);

    // Role and period row
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

    // Responsibilities list with category icons
    if (item.responsibilities && item.responsibilities.length > 0) {
      const respList = document.createElement('ul');
      respList.className = 'timeline__responsibilities';
      item.responsibilities.forEach(resp => {
        const li = document.createElement('li');
        const icon = getResponsibilityIcon(resp);
        if (icon) {
          const iconSpan = document.createElement('span');
          iconSpan.className = 'timeline__resp-icon';
          iconSpan.textContent = icon;
          iconSpan.setAttribute('aria-hidden', 'true');
          li.appendChild(iconSpan);
          li.appendChild(document.createTextNode(resp));
        } else {
          li.textContent = resp;
        }
        respList.appendChild(li);
      });
      cardContent.appendChild(respList);
    }

    // Achievements section
    if (item.achievements && item.achievements.length > 0) {
      const achieveHeading = document.createElement('h5');
      achieveHeading.className = 'timeline__achievements-heading';
      achieveHeading.textContent = 'Key Achievements';
      cardContent.appendChild(achieveHeading);

      const achieveList = document.createElement('ul');
      achieveList.className = 'timeline__achievements';
      item.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achieveList.appendChild(li);
      });
      cardContent.appendChild(achieveList);
    }

    // Wrap content in GlassCard with premium hover class
    const card = createGlassCard({
      children: cardContent
    });
    card.classList.add('timeline__card--premium');

    timelineItem.appendChild(card);

    // Wrap in FadeInWrapper with staggered delay
    const fadeWrapper = createFadeInWrapper({
      direction: 'up',
      delay: index * 200,
      children: timelineItem
    });

    timeline.appendChild(fadeWrapper);
  });

  section.appendChild(timeline);
}
