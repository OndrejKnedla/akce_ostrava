const MONTHS_CS = [
  'ledna', 'února', 'března', 'dubna', 'května', 'června',
  'července', 'srpna', 'září', 'října', 'listopadu', 'prosince',
];

const MONTHS_SHORT_CS = [
  'led', 'úno', 'bře', 'dub', 'kvě', 'čvn',
  'čvc', 'srp', 'zář', 'říj', 'lis', 'pro',
];

export function formatCzechDate(isoDate: string, time?: string): string {
  const d = new Date(isoDate);
  const day = d.getDate();
  const month = MONTHS_CS[d.getMonth()];
  const year = d.getFullYear();
  const base = `${day}. ${month} ${year}`;
  return time ? `${base}, ${time}` : base;
}

export function formatCzechDateShort(isoDate: string): { day: string; month: string; year: string } {
  const d = new Date(isoDate);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: MONTHS_SHORT_CS[d.getMonth()].toUpperCase(),
    year: String(d.getFullYear()),
  };
}

export function getDaysUntil(isoDate: string): number {
  const target = new Date(isoDate).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}

export function getTimeUntil(isoDate: string, time: string): { days: number; hours: number; minutes: number; seconds: number } {
  const [h, m] = time.split(':').map(Number);
  const target = new Date(isoDate);
  target.setHours(h, m, 0, 0);
  const diff = Math.max(0, target.getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
