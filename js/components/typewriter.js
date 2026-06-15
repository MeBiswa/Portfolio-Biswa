// TypewriterText Component
// Validates: Requirements 2.1, 2.2

/**
 * Creates a typewriter text element that reveals text character by character.
 * @param {Object} props
 * @param {string} props.text - The text to type out
 * @param {number} [props.speed=80] - Milliseconds per character
 * @param {number} [props.startDelay=0] - Delay in ms before typing begins
 * @param {boolean} [props.cursor=true] - Whether to show a blinking cursor
 * @param {Function} [props.onComplete] - Callback invoked when typing finishes
 * @returns {{ element: HTMLElement, start: Function }}
 */
export function createTypewriter(props) {
  const {
    text,
    speed = 80,
    startDelay = 0,
    cursor = true,
    onComplete
  } = props;

  // Container span
  const container = document.createElement('span');
  container.className = 'typewriter';

  // Text span — initially empty
  const textSpan = document.createElement('span');
  textSpan.className = 'typewriter__text';
  container.appendChild(textSpan);

  // Cursor span
  let cursorSpan = null;
  if (cursor) {
    cursorSpan = document.createElement('span');
    cursorSpan.className = 'typewriter__cursor';
    cursorSpan.textContent = '|';
    container.appendChild(cursorSpan);
  }

  let currentIndex = 0;
  let timerId = null;

  /**
   * Starts the typewriter animation.
   * After startDelay ms, begins typing one character at a time at the configured speed.
   */
  function start() {
    setTimeout(() => {
      timerId = setInterval(() => {
        if (currentIndex < text.length) {
          textSpan.textContent += text[currentIndex];
          currentIndex++;
        }

        if (currentIndex >= text.length) {
          clearInterval(timerId);
          timerId = null;
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }
      }, speed);
    }, startDelay);
  }

  return { element: container, start };
}
