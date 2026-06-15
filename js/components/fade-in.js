/**
 * FadeInWrapper Component
 * Wrapper that triggers fade-in animation when element enters the viewport.
 * Uses IntersectionObserver for efficient scroll-based animation triggering.
 *
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4
 */

/** @type {string[]} CSS classes used for fade-in directions */
const FADE_CLASSES = ['fade-in-up', 'fade-in-down', 'fade-in-left', 'fade-in-right'];

/**
 * Maps direction prop to the corresponding CSS class name.
 * @param {string} direction
 * @returns {string}
 */
function getDirectionClass(direction) {
  switch (direction) {
    case 'down': return 'fade-in-down';
    case 'left': return 'fade-in-left';
    case 'right': return 'fade-in-right';
    case 'up':
    default:
      return 'fade-in-up';
  }
}

/**
 * Creates a fade-in wrapper element around the provided children.
 * @param {Object} props
 * @param {'up'|'down'|'left'|'right'} [props.direction='up'] - Animation direction
 * @param {number} [props.delay=0] - Transition delay in milliseconds
 * @param {number} [props.duration=600] - Transition duration in milliseconds
 * @param {HTMLElement} props.children - Element to wrap with fade-in animation
 * @returns {HTMLElement} The wrapper div element
 */
export function createFadeInWrapper(props = {}) {
  const {
    direction = 'up',
    delay = 0,
    duration = 600,
    children
  } = props;

  const wrapper = document.createElement('div');
  wrapper.classList.add(getDirectionClass(direction));

  // Apply custom delay if specified
  if (delay > 0) {
    wrapper.style.transitionDelay = `${delay}ms`;
  }

  // Apply custom duration if not the default 600ms
  if (duration !== 600) {
    wrapper.style.transitionDuration = `${duration}ms`;
  }

  // Append children to the wrapper
  if (children instanceof HTMLElement) {
    wrapper.appendChild(children);
  }

  return wrapper;
}

/**
 * Initializes a single IntersectionObserver to watch all fade-in elements.
 * Adds 'animate-in' class once when an element enters the viewport.
 * Falls back to immediately showing all elements if IntersectionObserver is unsupported.
 */
export function initFadeInObserver() {
  // Select all elements with fade-in direction classes
  const selector = FADE_CLASSES.map(cls => `.${cls}`).join(', ');
  const fadeElements = document.querySelectorAll(selector);

  // Fallback: if IntersectionObserver is not supported, show everything immediately
  if (!('IntersectionObserver' in window)) {
    fadeElements.forEach(el => el.classList.add('animate-in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => observer.observe(el));
}
