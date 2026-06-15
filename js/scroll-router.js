/**
 * Scroll Router Module
 * Manages scroll spy, smooth scrolling, and URL hash routing.
 * Requirements: 2.3, 2.4, 2.5, 2.6, 2.7, 14.2, 15.4
 */

/**
 * Sets up a scroll spy that monitors which section is currently in view
 * and calls the updateCallback with the active section id.
 *
 * Uses requestAnimationFrame for throttling (max once per ~16ms frame).
 *
 * @param {string[]} sectionIds - Array of section id strings e.g. ['hero', 'about', 'experience', ...]
 * @param {(activeId: string) => void} updateCallback - Called when the active section changes
 * @returns {() => void} Cleanup function to remove the scroll listener
 */
export function setupScrollSpy(sectionIds, updateCallback) {
  let ticking = false;
  let lastActiveId = null;

  function determineActiveSection() {
    const scrollY = window.scrollY || window.pageYOffset;
    let activeId = sectionIds[0] || null;

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;

      // If the section's top edge is at or above the current scroll position
      if (section.offsetTop <= scrollY + 1) {
        activeId = id;
      }
    }

    // Only call the callback if the active section has changed
    if (activeId !== lastActiveId) {
      lastActiveId = activeId;
      updateCallback(activeId);
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        determineActiveSection();
        ticking = false;
      });
    }
  }

  // Run once on setup to set initial active state
  determineActiveSection();

  window.addEventListener('scroll', onScroll, { passive: true });

  // Return cleanup function
  return function cleanup() {
    window.removeEventListener('scroll', onScroll);
  };
}

/**
 * Smoothly scrolls to a target section, positioning its top edge at the
 * top of the viewport (minus an optional offset).
 *
 * Falls back to instant scroll if smooth scroll is not supported.
 * Updates URL hash via history.pushState without page reload.
 *
 * @param {string} targetId - The id of the target section element
 * @param {number} [offset=0] - Pixel offset from the top (e.g. for fixed headers)
 */
export function smoothScrollToSection(targetId, offset = 0) {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    return;
  }

  const targetPosition = targetElement.offsetTop - offset;

  // Check if smooth scroll is supported
  const supportsSmooth = 'scrollBehavior' in document.documentElement.style;

  if (supportsSmooth) {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  } else {
    // Fallback to instant scroll
    window.scrollTo(0, targetPosition);
  }

  // Update URL hash without triggering page reload
  history.pushState(null, '', '#' + targetId);
}

/**
 * Handles the initial URL hash on page load.
 * If a hash exists that matches a section, scrolls to it.
 */
export function handleInitialHash() {
  const hash = window.location.hash;

  if (!hash || hash.length <= 1) {
    return;
  }

  // Extract section id from hash (remove the leading '#')
  const sectionId = hash.substring(1);
  const targetElement = document.getElementById(sectionId);

  if (targetElement) {
    // Use a small delay to ensure DOM is ready and layout is calculated
    requestAnimationFrame(() => {
      smoothScrollToSection(sectionId, 0);
    });
  }
}
