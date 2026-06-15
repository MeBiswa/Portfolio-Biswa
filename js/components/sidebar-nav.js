/**
 * Sidebar Navigation Component
 * Renders icon-based navigation links for all portfolio sections.
 * Supports active state highlighting and smooth scroll navigation.
 */

/**
 * Default navigation items for all portfolio sections.
 */
export const navItems = [
  { id: 'hero', icon: '🏠', label: 'Home' },
  { id: 'about', icon: '👤', label: 'About' },
  { id: 'experience', icon: '💼', label: 'Experience' },
  { id: 'skills', icon: '⚙️', label: 'Skills' },
  { id: 'tools', icon: '🧠', label: 'Tools' },
  { id: 'projects', icon: '🚀', label: 'Projects' },
  { id: 'internships', icon: '⚙️', label: 'Internships' },
  { id: 'education', icon: '🎓', label: 'Education' },
  { id: 'certifications', icon: '📜', label: 'Certifications' },
  { id: 'contact', icon: '📧', label: 'Contact' }
];

/**
 * Renders the sidebar navigation inside #sidebar .sidebar__nav-list.
 * @param {Array<{id: string, icon: string, label: string}>} items - Navigation items to render.
 * @param {string} activeId - The ID of the currently active section.
 * @param {Function} [onNavigate] - Optional callback invoked with the target section ID on click.
 */
export function renderSidebar(items, activeId, onNavigate) {
  const navList = document.querySelector('#sidebar .sidebar__nav-list');
  if (!navList) return;

  // Add premium backdrop blur to sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.add('sidebar--premium');
  }

  // Clear existing items
  navList.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('sidebar__nav-item');
    li.style.position = 'relative';

    if (item.id === activeId) {
      li.classList.add('sidebar__nav-item--active');

      // Glowing active indicator bar
      const indicator = document.createElement('span');
      indicator.className = 'sidebar__active-indicator';
      Object.assign(indicator.style, {
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '3px',
        height: '28px',
        background: 'var(--accent)',
        borderRadius: '0 4px 4px 0'
      });
      li.appendChild(indicator);
    }

    const anchor = document.createElement('a');
    anchor.href = `#${item.id}`;
    anchor.classList.add('sidebar__nav-link');
    anchor.setAttribute('aria-label', item.label);
    anchor.setAttribute('title', item.label);

    // Icon span with premium scale effect
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('sidebar__nav-icon', 'sidebar__nav-icon--premium');
    iconSpan.textContent = item.icon;
    iconSpan.setAttribute('aria-hidden', 'true');

    anchor.appendChild(iconSpan);
    li.appendChild(anchor);

    // Click handler for smooth scroll
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = document.getElementById(item.id);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      updateActiveNavItem(item.id);
      if (typeof onNavigate === 'function') {
        onNavigate(item.id);
      }
    });

    navList.appendChild(li);
  });
}

/**
 * Updates which navigation item is marked as active.
 * Removes active class from all items and applies it to the one matching sectionId.
 * @param {string} sectionId - The section ID to mark as active.
 */
export function updateActiveNavItem(sectionId) {
  const navList = document.querySelector('#sidebar .sidebar__nav-list');
  if (!navList) return;

  const items = navList.querySelectorAll('.sidebar__nav-item');
  items.forEach((item) => {
    const link = item.querySelector('.sidebar__nav-link');
    const existingIndicator = item.querySelector('.sidebar__active-indicator');

    if (link && link.getAttribute('href') === `#${sectionId}`) {
      item.classList.add('sidebar__nav-item--active');
      // Add indicator if not present
      if (!existingIndicator) {
        const indicator = document.createElement('span');
        indicator.className = 'sidebar__active-indicator';
        Object.assign(indicator.style, {
          position: 'absolute',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
          height: '28px',
          background: 'var(--accent)',
          borderRadius: '0 4px 4px 0'
        });
        item.appendChild(indicator);
      }
    } else {
      item.classList.remove('sidebar__nav-item--active');
      if (existingIndicator) {
        existingIndicator.remove();
      }
    }
  });
}
