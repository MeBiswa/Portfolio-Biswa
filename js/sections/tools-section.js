/**
 * Tools Built Section Renderer
 * Renders each tool in a GlassCard with name, description, and tech stack tags.
 * Uses FadeInWrapper with staggered delay for card animations.
 *
 * Validates: Requirements 11.1, 11.5, 11.6
 */

import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Maps icon string identifiers to emoji characters.
 * @param {string} icon - Icon identifier from PortfolioConfig
 * @returns {string} Corresponding emoji
 */
function getIconEmoji(icon) {
  const iconMap = {
    lock: '🔒',
    chart: '📊',
    code: '💻',
    database: '🗄️',
    gear: '⚙️',
    tools: '🛠️',
    network: '🏢'
  };
  return iconMap[icon] || '🔧';
}

/**
 * Creates a fake UI preview block with colored bars representing a dashboard.
 * @returns {HTMLElement} UI preview container
 */
function createUIPreview() {
  const preview = document.createElement('div');
  preview.className = 'tool-card__ui-preview';

  const colors = ['var(--accent)', 'var(--highlight)', '#7B68EE', 'var(--accent)', 'var(--highlight)'];
  const heights = [18, 26, 14, 22, 10];

  colors.forEach((color, i) => {
    const bar = document.createElement('div');
    bar.className = 'tool-card__ui-bar';
    Object.assign(bar.style, {
      width: '12px',
      height: `${heights[i]}px`,
      background: color,
      borderRadius: '3px'
    });
    preview.appendChild(bar);
  });

  return preview;
}

/**
 * Creates the inner content for a tool card.
 * @param {Object} tool - Tool data object
 * @param {string} tool.name - Tool name
 * @param {string} tool.description - Tool description
 * @param {string[]} tool.techStack - List of technologies used
 * @param {string} [tool.icon] - Icon identifier
 * @returns {HTMLElement} Content element for the card
 */
function createToolCardContent(tool) {
  const content = document.createElement('div');
  content.className = 'tool-card__content';

  // Icon element
  const iconEl = document.createElement('div');
  iconEl.className = 'tool-card__icon';
  iconEl.textContent = getIconEmoji(tool.icon);
  iconEl.setAttribute('aria-hidden', 'true');
  content.appendChild(iconEl);

  // Tool name
  const nameEl = document.createElement('h3');
  nameEl.className = 'tool-card__name';
  nameEl.textContent = tool.name;
  content.appendChild(nameEl);

  // Badge (if available)
  if (tool.badge) {
    const badgeEl = document.createElement('span');
    badgeEl.style.cssText = 'display: inline-block; margin-top: 4px; margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; background: rgba(100, 255, 218, 0.1); color: var(--highlight); border: 1px solid rgba(100, 255, 218, 0.3);';
    badgeEl.textContent = tool.badge;
    content.appendChild(badgeEl);
  }

  // Description
  const descEl = document.createElement('p');
  descEl.className = 'tool-card__description';
  descEl.textContent = tool.description;
  content.appendChild(descEl);

  // Highlights (if available)
  if (tool.highlights && tool.highlights.length > 0) {
    const highlightsDiv = document.createElement('div');
    highlightsDiv.style.cssText = 'margin-top: 8px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.8;';
    tool.highlights.forEach(h => {
      const line = document.createElement('div');
      line.textContent = h;
      highlightsDiv.appendChild(line);
    });
    content.appendChild(highlightsDiv);
  }

  // Workflow (if available)
  if (tool.workflow) {
    const workflowEl = document.createElement('div');
    workflowEl.style.cssText = 'margin-top: 10px; padding: 6px 12px; background: rgba(0, 191, 255, 0.06); border-radius: 6px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); letter-spacing: 0.5px; text-align: center;';
    workflowEl.textContent = tool.workflow;
    content.appendChild(workflowEl);
  }

  // Stack line
  if (tool.techStack && tool.techStack.length > 0) {
    const stackLine = document.createElement('div');
    stackLine.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); margin-top: 8px; letter-spacing: 0.5px;';
    stackLine.textContent = 'STACK: ' + tool.techStack.join(' | ');
    content.appendChild(stackLine);
  }

  // Features list (if available) — hidden behind Read More
  if ((tool.features && tool.features.length > 0) || tool.aiHighlight) {
    const expandContent = document.createElement('div');
    expandContent.className = 'tool-card__expand-content';
    expandContent.style.cssText = 'display: none; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--card-border);';

    if (tool.features && tool.features.length > 0) {
      const featuresHeading = document.createElement('div');
      featuresHeading.style.cssText = 'font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;';
      featuresHeading.textContent = 'FEATURES:';
      expandContent.appendChild(featuresHeading);

      const featuresList = document.createElement('ul');
      featuresList.style.cssText = 'list-style: none; padding: 0; margin: 0;';
      tool.features.forEach(feature => {
        const li = document.createElement('li');
        li.style.cssText = 'font-size: 0.8rem; color: var(--text-secondary); padding: 2px 0; padding-left: 14px; position: relative;';
        li.textContent = feature;
        const bullet = document.createElement('span');
        bullet.style.cssText = 'position: absolute; left: 0; color: var(--highlight);';
        bullet.textContent = '•';
        li.prepend(bullet);
        featuresList.appendChild(li);
      });
      expandContent.appendChild(featuresList);
    }

    if (tool.aiHighlight) {
      const aiBlock = document.createElement('div');
      aiBlock.style.cssText = 'margin-top: 10px; padding: 8px 12px; background: rgba(100, 255, 218, 0.06); border-left: 2px solid var(--highlight); border-radius: 4px; font-size: 0.75rem; color: var(--highlight); font-family: var(--font-mono); line-height: 1.5;';
      aiBlock.textContent = tool.aiHighlight;
      expandContent.appendChild(aiBlock);
    }

    content.appendChild(expandContent);

    // Read More button
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'project-card__read-more';
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.style.cssText = 'margin-top: 10px; padding: 6px 14px; font-size: 0.8rem; font-family: var(--font-mono); background: rgba(0, 191, 255, 0.1); color: var(--accent); border: 1px solid rgba(0, 191, 255, 0.3); border-radius: 8px; cursor: pointer; transition: background 0.3s ease, box-shadow 0.3s ease;';
    readMoreBtn.addEventListener('click', () => {
      const isVisible = expandContent.style.display === 'block';
      expandContent.style.display = isVisible ? 'none' : 'block';
      readMoreBtn.textContent = isVisible ? 'Read More' : 'Close';
    });
    content.appendChild(readMoreBtn);
  }

  // Tech stack tags
  if (tool.techStack && tool.techStack.length > 0) {
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tool-card__tags';

    tool.techStack.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tool-card__tag';
      tag.textContent = tech;
      tagsContainer.appendChild(tag);
    });

    content.appendChild(tagsContainer);
  }

  // Fake UI preview blocks
  content.appendChild(createUIPreview());

  return content;
}

/**
 * Renders the Tools Built section with tool cards in a grid layout.
 * @param {Array<{name: string, description: string, techStack: string[], icon?: string}>} toolsData - Array of tool objects from PortfolioConfig
 */
export function renderToolsSection(toolsData) {
  const section = document.getElementById('tools');
  if (!section) return;

  // If toolsData is empty or undefined, render nothing (no error)
  if (!toolsData || !Array.isArray(toolsData) || toolsData.length === 0) {
    return;
  }

  // Section title with glow
  const title = document.createElement('h2');
  title.className = 'section-title section-title--glow';
  title.textContent = '⚡ Featured Engineering Systems';
  section.appendChild(title);

  // Grid container for tool cards (2 columns)
  const grid = document.createElement('div');
  grid.className = 'tools-grid';
  section.appendChild(grid);

  // Render each tool as a GlassCard wrapped in FadeInWrapper
  toolsData.forEach((tool, index) => {
    const cardContent = createToolCardContent(tool);

    const card = createGlassCard({
      glowColor: '#64FFDA',
      children: cardContent
    });
    card.classList.add('tool-card', 'tool-card--featured');

    const wrapper = createFadeInWrapper({
      direction: 'up',
      delay: index * 200,
      children: card
    });

    grid.appendChild(wrapper);
  });
}
