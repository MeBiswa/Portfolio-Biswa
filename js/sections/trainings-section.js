/**
 * Technical Training Section Renderer
 * Renders training items as a badge/pill grid.
 */

import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Renders the Technical Training section.
 * @param {Array} data - Array of training objects {name, provider}
 */
export function renderTrainingsSection(data) {
  const section = document.getElementById('trainings');
  if (!section) return;
  if (!data || data.length === 0) return;

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerHTML = '🧠 Technical Training';
  section.appendChild(title);

  // Badge grid container
  const grid = document.createElement('div');
  grid.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px;';

  data.forEach((item, index) => {
    const badge = document.createElement('div');
    badge.className = 'training-badge';
    Object.assign(badge.style, {
      background: 'var(--card-bg)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--radius-badge)',
      padding: '12px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease'
    });

    const nameEl = document.createElement('span');
    nameEl.style.cssText = 'font-family: var(--font-heading); font-weight: 600; font-size: 0.95rem; color: var(--text);';
    nameEl.textContent = item.name;

    const providerEl = document.createElement('span');
    providerEl.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent);';
    providerEl.textContent = item.provider;

    badge.appendChild(nameEl);
    badge.appendChild(providerEl);

    // Hover glow
    badge.addEventListener('mouseenter', () => {
      badge.style.boxShadow = '0 0 15px var(--accent)';
      badge.style.borderColor = 'var(--accent)';
      badge.style.transform = 'translateY(-2px)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.boxShadow = 'none';
      badge.style.borderColor = 'var(--card-border)';
      badge.style.transform = 'translateY(0)';
    });

    grid.appendChild(badge);
  });

  // Wrap in fade-in
  const fadeWrapper = createFadeInWrapper({
    direction: 'up',
    delay: 0,
    children: grid
  });

  section.appendChild(fadeWrapper);
}
