// AnimatedProgressBar Component
// Validates: Requirements 5.1, 5.2, 5.3, 5.4

/**
 * Creates an animated progress bar element.
 * @param {Object} props
 * @param {string} props.label - The skill name to display
 * @param {number} props.percentage - Proficiency level (clamped 0-100)
 * @param {string} [props.color='var(--accent)'] - Bar fill color
 * @param {number} [props.animationDelay=0] - Staggered animation delay in ms
 * @returns {HTMLElement} The progress bar container element
 */
export function createProgressBar(props) {
  const {
    label,
    percentage,
    color = 'var(--accent)',
    animationDelay = 0
  } = props;

  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Container
  const container = document.createElement('div');
  container.className = 'progress-bar';

  // Label row (skill name + percentage)
  const labelEl = document.createElement('span');
  labelEl.className = 'progress-bar__label';
  labelEl.innerHTML = `<span>${label}</span><span>${clampedPercentage}%</span>`;

  // Track — premium rounded style
  const track = document.createElement('div');
  track.className = 'progress-bar__track progress-bar__track--premium';

  // Fill — premium gradient with glow for high proficiency
  const fill = document.createElement('div');
  fill.className = 'progress-bar__fill progress-bar__fill--premium';
  fill.setAttribute('data-percentage', String(clampedPercentage));

  // Add high-proficiency class for glow effect at >= 80%
  if (clampedPercentage >= 80) {
    fill.classList.add('high-proficiency');
  }

  Object.assign(fill.style, {
    width: '0%',
    transitionDelay: `${animationDelay}ms`
  });

  track.appendChild(fill);
  container.appendChild(labelEl);
  container.appendChild(track);

  return container;
}

/**
 * Creates an IntersectionObserver that animates progress bar fills on viewport entry.
 * Each bar animates only once.
 */
export function initProgressBarObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const percentage = fill.getAttribute('data-percentage');
          fill.style.width = `${percentage}%`;
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.2 }
  );

  const fills = document.querySelectorAll('.progress-bar__fill');
  fills.forEach((fill) => observer.observe(fill));
}
