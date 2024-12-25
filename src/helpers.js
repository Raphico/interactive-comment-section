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
