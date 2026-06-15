/**
 * Contact Section Renderer
 * Displays contact information with appropriate link types.
 *
 * Validates: Requirements 13.1, 13.2, 13.3
 */

import { createGlassCard } from '../components/glass-card.js';
import { createFadeInWrapper } from '../components/fade-in.js';

/**
 * Renders the Contact section with location, email, phone, and LinkedIn.
 * Only renders fields that have non-empty values.
 * @param {Object} contactData
 * @param {string} [contactData.location] - Location text
 * @param {string} [contactData.email] - Email address
 * @param {string} [contactData.phone] - Phone number
 * @param {string} [contactData.linkedin] - LinkedIn profile URL
 */
export function renderContactSection(contactData) {
  const section = document.getElementById('contact');
  if (!section) return;

  // Section title
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Let\'s Build Something Meaningful';

  // Contact list container
  const contactList = document.createElement('div');
  contactList.className = 'contact__list';
  Object.assign(contactList.style, {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    maxWidth: '500px',
    margin: '0 auto'
  });

  // Location (plain text)
  if (contactData.location) {
    const locationItem = createContactItem('📍', contactData.location);
    contactList.appendChild(locationItem);
  }

  // Email (mailto link)
  if (contactData.email) {
    const emailLink = document.createElement('a');
    emailLink.href = `mailto:${contactData.email}`;
    emailLink.textContent = contactData.email;
    emailLink.className = 'contact__link';
    Object.assign(emailLink.style, {
      color: 'var(--accent)',
      textDecoration: 'none'
    });
    const emailItem = createContactItem('📧', emailLink);
    contactList.appendChild(emailItem);
  }

  // Phone (tel link)
  if (contactData.phone) {
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${contactData.phone}`;
    phoneLink.textContent = contactData.phone;
    phoneLink.className = 'contact__link';
    Object.assign(phoneLink.style, {
      color: 'var(--accent)',
      textDecoration: 'none'
    });
    const phoneItem = createContactItem('📱', phoneLink);
    contactList.appendChild(phoneItem);
  }

  // LinkedIn (external link)
  if (contactData.linkedin) {
    const linkedinLink = document.createElement('a');
    linkedinLink.href = contactData.linkedin;
    linkedinLink.textContent = contactData.linkedin;
    linkedinLink.className = 'contact__link';
    linkedinLink.rel = 'noopener noreferrer';
    linkedinLink.target = '_blank';
    Object.assign(linkedinLink.style, {
      color: 'var(--accent)',
      textDecoration: 'none'
    });
    const linkedinItem = createContactItem('🔗', linkedinLink);
    contactList.appendChild(linkedinItem);
  }

  // Wrap contact list in a centered GlassCard
  const card = createGlassCard({
    children: contactList
  });
  card.style.maxWidth = '600px';
  card.style.margin = '0 auto';

  // Assemble container
  const container = document.createElement('div');
  container.className = 'container';
  container.appendChild(title);

  const contactSubtitle = document.createElement('p');
  contactSubtitle.style.cssText = 'color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.95rem; text-align: center;';
  contactSubtitle.textContent = 'Open to opportunities in PLM Systems, Software Engineering, and Enterprise Solutions.';
  container.appendChild(contactSubtitle);

  container.appendChild(card);

  // Wrap in FadeInWrapper for scroll animation
  const fadeWrapper = createFadeInWrapper({
    direction: 'up',
    delay: 0,
    duration: 600,
    children: container
  });

  section.appendChild(fadeWrapper);
}

/**
 * Creates a single contact item row with an icon and content.
 * @param {string} icon - Emoji icon
 * @param {string|HTMLElement} content - Text string or anchor element
 * @returns {HTMLElement}
 */
function createContactItem(icon, content) {
  const item = document.createElement('div');
  item.className = 'contact__item';
  Object.assign(item.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 0',
    fontSize: '1.05rem'
  });

  const iconSpan = document.createElement('span');
  iconSpan.className = 'contact__icon';
  iconSpan.textContent = icon;
  iconSpan.setAttribute('aria-hidden', 'true');
  Object.assign(iconSpan.style, {
    fontSize: '1.4rem',
    flexShrink: '0'
  });

  item.appendChild(iconSpan);

  if (typeof content === 'string') {
    const text = document.createElement('span');
    text.className = 'contact__text';
    text.textContent = content;
    Object.assign(text.style, {
      color: 'var(--text)'
    });
    item.appendChild(text);
  } else if (content instanceof HTMLElement) {
    item.appendChild(content);
  }

  return item;
}
