/**
 * GlassCard Component
 * Reusable card with glassmorphism styling and hover glow effect.
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5
 */

/**
 * Creates a glass-morphism styled card element.
 * @param {Object} props
 * @param {string} [props.title] - Optional card title
 * @param {string} [props.glowColor="#00BFFF"] - Glow color on hover
 * @param {number} [props.borderRadius=12] - Border radius in pixels
 * @param {HTMLElement|string} [props.children] - Card content (HTML element or string)
 * @returns {HTMLElement} The glass card DOM element
 */
export function createGlassCard(props = {}) {
  const {
    title,
    glowColor = '#00BFFF',
    borderRadius = 12,
    children
  } = props;

  const card = document.createElement('div');
  card.className = 'glass-card glass-card--premium';

  // Apply inline styles for glassmorphism effect (increased blur to 20px)
  Object.assign(card.style, {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid var(--card-border)',
    borderRadius: `${borderRadius}px`,
    padding: 'var(--card-padding)',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease'
  });

  // Add title if provided
  if (title) {
    const titleEl = document.createElement('h3');
    titleEl.className = 'glass-card__title';
    titleEl.textContent = title;
    card.appendChild(titleEl);
  }

  // Add children content
  if (children) {
    if (typeof children === 'string') {
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'glass-card__content';
      contentWrapper.innerHTML = children;
      card.appendChild(contentWrapper);
    } else if (children instanceof HTMLElement) {
      card.appendChild(children);
    }
  }

  // Premium hover glow effect with scale + translateY + animated border + inner glow
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `0 0 20px ${glowColor}, inset 0 0 20px rgba(0, 191, 255, 0.04)`;
    card.style.borderColor = glowColor;
    card.style.transform = 'scale(1.03) translateY(-4px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'none';
    card.style.borderColor = 'var(--card-border)';
    card.style.transform = 'scale(1) translateY(0)';
  });

  return card;
}
