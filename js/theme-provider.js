/**
 * Theme Provider Module
 * Manages dark/light theme state, persistence via localStorage,
 * and applies the theme via the data-theme attribute on <html>.
 */

const STORAGE_KEY = 'theme-preference';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

/**
 * Initializes the theme on page load.
 * Reads the stored preference from localStorage.
 * If a valid preference exists, applies it; otherwise defaults to dark.
 * @returns {string} The current theme ('dark' or 'light')
 */
export function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const theme = stored === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
  document.documentElement.dataset.theme = theme;
  return theme;
}

/**
 * Toggles the current theme between dark and light.
 * Updates the data-theme attribute on <html> and persists the new
 * preference to localStorage.
 * @returns {string} The new theme after toggling
 */
export function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const newTheme = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem(STORAGE_KEY, newTheme);
  return newTheme;
}

/**
 * Returns the current theme value from the document element.
 * @returns {string} The current theme ('dark' or 'light')
 */
export function getTheme() {
  return document.documentElement.dataset.theme;
}
