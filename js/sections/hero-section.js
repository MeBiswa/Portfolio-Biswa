/**
 * Hero Section Renderer
 * Renders the full-screen hero landing section with typewriter animation,
 * skill tags, and call-to-action buttons.
 *
 * Validates: Requirements 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.8, 15.2
 */

import { createTypewriter } from '../components/typewriter.js';

/**
 * Renders the Hero section into the #hero DOM element.
 * @param {Object} heroData
 * @param {string} heroData.name - Engineer's name (displayed with typewriter)
 * @param {string} heroData.title - Professional title
 * @param {string[]} heroData.skillTags - Array of skill tag strings
 * @param {string} heroData.subtitle - Subtitle text
 * @param {string} heroData.backgroundImage - Path to background image
 * @param {string} heroData.resumeUrl - URL for the resume download
 */
export function renderHeroSection(heroData) {
  const section = document.getElementById('hero');
  if (!section) return;

  const { name, title, skillTags, subtitle, backgroundImage, resumeUrl } = heroData;

  // --- Background with image ---
  const bgDiv = document.createElement('div');
  bgDiv.className = 'hero__background';
  Object.assign(bgDiv.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '0',
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 20%',
    backgroundRepeat: 'no-repeat'
  });

  // Handle background image load failure: fallback to primary bg color
  const testImg = new Image();
  testImg.src = backgroundImage;
  testImg.onerror = () => {
    bgDiv.style.backgroundImage = 'none';
    bgDiv.style.backgroundColor = 'var(--primary-bg)';
  };

  // Dark overlay with gradient for text readability
  const overlay = document.createElement('div');
  overlay.className = 'hero__overlay';
  Object.assign(overlay.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '1',
    background: 'rgba(2, 12, 27, 0.72)'
  });

  // --- Animated gradient overlay (premium) ---
  const gradientOverlay = document.createElement('div');
  gradientOverlay.className = 'hero__gradient-overlay';

  // --- Content container ---
  const content = document.createElement('div');
  content.className = 'hero__content';
  Object.assign(content.style, {
    position: 'relative',
    zIndex: '2',
    textAlign: 'center',
    maxWidth: '1100px',
    padding: '0 40px'
  });

  // Name with neon glow
  const nameHeading = document.createElement('h1');
  nameHeading.className = 'hero__name neon-glow';
  nameHeading.style.marginBottom = '1rem';

  const typewriter = createTypewriter({ text: name, speed: 80 });
  nameHeading.appendChild(typewriter.element);

  // Title — cycling typewriter for multiple phrases
  const titleEl = document.createElement('h2');
  titleEl.className = 'hero__title';
  Object.assign(titleEl.style, {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: '1.5rem',
    minHeight: '2.2rem'
  });

  // Cycling typewriter for title phrases
  const phrases = ['Windchill Engineer', 'PLM Systems Developer', 'Enterprise Tool Builder'];
  const titleTextSpan = document.createElement('span');
  titleTextSpan.className = 'typewriter__text';
  const titleCursor = document.createElement('span');
  titleCursor.className = 'typewriter__cursor';
  titleCursor.textContent = '|';
  titleEl.appendChild(titleTextSpan);
  titleEl.appendChild(titleCursor);

  // Start cycling phrases after main typewriter finishes
  function startPhrasesCycle() {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 70;
    const deleteSpeed = 40;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 400;

    function tick() {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        titleTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex >= currentPhrase.length) {
          isDeleting = true;
          setTimeout(tick, pauseAfterType);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        titleTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, pauseAfterDelete);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }
    tick();
  }

  // Skill tags with floating animation
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'hero__tags';
  Object.assign(tagsContainer.style, {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '1.5rem'
  });

  if (Array.isArray(skillTags)) {
    skillTags.forEach((tag, i) => {
      const badge = document.createElement('span');
      badge.className = 'hero__tag hero__tag--float';
      badge.textContent = tag;
      Object.assign(badge.style, {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        padding: '6px 14px',
        borderRadius: '20px',
        background: 'rgba(0, 191, 255, 0.15)',
        color: '#64ffda',
        border: '1px solid rgba(100, 255, 218, 0.4)',
        boxShadow: '0 0 10px rgba(0, 191, 255, 0.2)',
        transition: 'box-shadow 0.3s ease',
        animationDelay: `${i * 0.4}s`
      });
      tagsContainer.appendChild(badge);
    });
  }

  // Subtitle
  const subtitleEl = document.createElement('p');
  subtitleEl.className = 'hero__subtitle';
  subtitleEl.textContent = subtitle;
  Object.assign(subtitleEl.style, {
    fontSize: '1.1rem',
    color: '#ccd6f6',
    marginBottom: '2rem',
    lineHeight: '1.6'
  });

  // Buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'hero__buttons';
  Object.assign(buttonsContainer.style, {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  });

  // Explore button - smooth scrolls to About section
  const exploreBtn = document.createElement('button');
  exploreBtn.className = 'hero__btn hero__btn--explore';
  exploreBtn.textContent = 'Explore';
  exploreBtn.setAttribute('aria-label', 'Explore portfolio - scroll to About section');
  Object.assign(exploreBtn.style, {
    padding: '12px 32px',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    fontWeight: '600',
    borderRadius: '8px',
    border: '1px solid var(--accent)',
    background: 'transparent',
    color: 'var(--accent)',
    cursor: 'pointer',
    transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease'
  });

  exploreBtn.addEventListener('mouseenter', () => {
    exploreBtn.style.background = 'var(--accent)';
    exploreBtn.style.color = 'var(--primary-bg)';
    exploreBtn.style.boxShadow = '0 0 15px rgba(0, 191, 255, 0.4)';
  });

  exploreBtn.addEventListener('mouseleave', () => {
    exploreBtn.style.background = 'transparent';
    exploreBtn.style.color = 'var(--accent)';
    exploreBtn.style.boxShadow = 'none';
  });

  exploreBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  buttonsContainer.appendChild(exploreBtn);

  // Download Resume button - opens resumeUrl in new tab
  if (resumeUrl) {
    const resumeBtn = document.createElement('a');
    resumeBtn.className = 'hero__btn hero__btn--resume';
    resumeBtn.textContent = 'Download Resume';
    resumeBtn.href = resumeUrl;
    resumeBtn.target = '_blank';
    resumeBtn.rel = 'noopener noreferrer';
    resumeBtn.setAttribute('aria-label', 'Download Resume (opens in new tab)');
    Object.assign(resumeBtn.style, {
      display: 'inline-block',
      padding: '12px 32px',
      fontSize: '1rem',
      fontFamily: 'var(--font-body)',
      fontWeight: '600',
      borderRadius: '8px',
      border: '1px solid var(--highlight)',
      background: 'transparent',
      color: 'var(--highlight)',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease'
    });

    resumeBtn.addEventListener('mouseenter', () => {
      resumeBtn.style.background = 'var(--highlight)';
      resumeBtn.style.color = 'var(--primary-bg)';
      resumeBtn.style.boxShadow = '0 0 15px rgba(100, 255, 218, 0.4)';
    });

    resumeBtn.addEventListener('mouseleave', () => {
      resumeBtn.style.background = 'transparent';
      resumeBtn.style.color = 'var(--highlight)';
      resumeBtn.style.boxShadow = 'none';
    });

    buttonsContainer.appendChild(resumeBtn);
  }

  // Signature tagline
  const tagline = document.createElement('p');
  tagline.className = 'hero__tagline';
  tagline.textContent = '"Engineering systems that scale. Debugging what others can\'t see."';
  Object.assign(tagline.style, {
    fontSize: '0.9rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--highlight)',
    marginBottom: '1.5rem',
    fontStyle: 'italic',
    opacity: '0.85'
  });

  // System status strip
  const statusStrip = document.createElement('div');
  statusStrip.className = 'hero__status-strip';
  Object.assign(statusStrip.style, {
    marginTop: '2.5rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'var(--highlight)',
    opacity: '0.7'
  });
  statusStrip.innerHTML = '<span>● PLM Systems Active</span><span>● Enterprise Tools Deployed</span><span>● Debug Mode Enabled</span>';

  // Assemble content
  content.appendChild(nameHeading);
  content.appendChild(titleEl);
  content.appendChild(tagsContainer);
  content.appendChild(subtitleEl);
  content.appendChild(tagline);
  content.appendChild(buttonsContainer);
  content.appendChild(statusStrip);

  // Don't use fade wrapper for hero - it's always visible on load
  // Just add a simple CSS animation class
  content.style.opacity = '1';
  content.style.animation = 'fadeInUp 0.8s ease 0.2s both';

  // Assemble section
  section.appendChild(bgDiv);
  section.appendChild(overlay);
  section.appendChild(gradientOverlay);
  section.appendChild(content);

  // Start typewriter animation, then start phrase cycling
  typewriter.start();
  // Start phrase cycling after the name finishes typing
  setTimeout(() => {
    startPhrasesCycle();
  }, name.length * 80 + 500);

  // --- Mouse parallax effect on hero content ---
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    content.style.transform = `translate(${x * 12}px, ${y * 8}px)`;
  });

  section.addEventListener('mouseleave', () => {
    content.style.transform = 'translate(0, 0)';
    content.style.transition = 'transform 0.4s ease';
    setTimeout(() => { content.style.transition = ''; }, 400);
  });
}
