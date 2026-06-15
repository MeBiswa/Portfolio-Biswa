/**
 * Skills Section Renderer
 * Renders skill categories with animated progress bars in a responsive grid.
 *
 * Validates: Requirements 6.1, 6.2, 6.3, 6.5, 6.6
 */

import { createProgressBar, initProgressBarObserver } from '../components/progress-bar.js';
import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Renders the Skills section with categorized animated progress bars.
 * @param {Array<{category: string, skills: Array<{name: string, proficiency: number}>}>} skillsData
 * @param {Object} [options]
 * @param {number} [options.staggerDelay=100] - Delay in ms between each progress bar animation
 * @param {number} [options.categoryStaggerDelay=200] - Delay in ms between each category card fade-in
 */
export function renderSkillsSection(skillsData, options = {}) {
  const { staggerDelay = 100, categoryStaggerDelay = 200 } = options;

  const section = document.getElementById('skills');
  if (!section) return;

  // Add section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Technical Capabilities';
  section.appendChild(title);

  // Create grid container for skill categories (2 columns on desktop)
  const grid = document.createElement('div');
  grid.className = 'skills-grid';
  section.appendChild(grid);

  // Render each skill category
  skillsData.forEach((categoryData, categoryIndex) => {
    // Create content container for progress bars
    const content = document.createElement('div');
    content.className = 'skills-category__bars';

    categoryData.skills.forEach((skill, skillIndex) => {
      const progressBar = createProgressBar({
        label: skill.name,
        percentage: skill.proficiency,
        animationDelay: skillIndex * staggerDelay
      });
      content.appendChild(progressBar);
    });

    // Wrap content in a GlassCard
    const card = createGlassCard({
      title: categoryData.category,
      children: content
    });

    // Wrap card in FadeInWrapper with staggered delay
    const fadeWrapper = createFadeInWrapper({
      direction: 'up',
      delay: categoryIndex * categoryStaggerDelay,
      children: card
    });

    grid.appendChild(fadeWrapper);
  });

  // Initialize progress bar observer to trigger animations on viewport entry
  initProgressBarObserver();
}
