export function now(): Date {
  return new Date();
}

export function yesterday(): Date {
  return new Date(Date.now() - 1000 * 60 * 60 * 24 * 2);
}

export function hourAgo(): Date {
  return new Date(now().setHours(now().getHours() - 1));
}

export function weekAgo(): Date {
  return new Date(now().setDate(now().getDate() - 7));
}

export function monthAgo(): Date {
  return new Date(now().setMonth(now().getMonth() - 1));
}

export function yearAgo(): Date {
  return new Date(now().setFullYear(now().getFullYear() - 1));
}
