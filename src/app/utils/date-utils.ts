export function today(): Date {
  return new Date();
}

export function yesterday(): Date {
  return new Date(Date.now() - 1000 * 60 * 60 * 24 * 2);
}

export function weekAgo(): Date {
  return new Date(today().setDate(today().getDate() - 7));
}

export function monthAgo(): Date {
  return new Date(today().setMonth(today().getMonth() - 1));
}

export function yearAgo(): Date {
  return new Date(today().setFullYear(today().getFullYear() - 1));
}
