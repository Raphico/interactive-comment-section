/**
 * Parses a relative time string (e.g., "2 months ago") and returns the corresponding Date object.
 *
 * @param {string} relativeTime - A string representing the relative time (e.g., "2 months ago").
 * @returns {Date|null} - A Date object representing the calculated date, or null if the input is invalid.
 */
export function parseRelativeTime(relativeTime) {
  const now = new Date();

  const regex = /(\d+)\s*(month|week|day)s?\s*ago/;
  const match = relativeTime.match(regex);

  if (!match) {
    return null;
  }

  const [_, number, unit] = match;
  const numberOfUnits = parseInt(number, 10);

  if (unit === "month") {
    now.setMonth(now.getMonth() - numberOfUnits);
  } else if (unit === "week") {
    now.setDate(now.getDate() - numberOfUnits * 7);
  } else if (unit === "day") {
    now.setDate(now.getDate() - numberOfUnits);
  }

  return now;
}

/**
 * Attaches a click listener that triggers a callback if a click occurs outside a specified element.
 *
 * @param {HTMLElement} element - The DOM element to monitor for outside clicks.
 * @param {Function} callback - A function to execute when a click outside the element occurs.
 */
export function onClickOutside(element, callback) {
  document.addEventListener("click", (event) => {
    const isClickedInside = element.contains(event.target);

    if (!isClickedInside) {
      callback();
    }
  });
}
