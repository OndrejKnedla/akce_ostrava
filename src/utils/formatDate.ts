import type { Lang } from '@/i18n/config';

const MONTHS: Record<Lang, string[]> = {
  cs: ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  uk: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
  sk: ['januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra'],
};

const MONTHS_SHORT: Record<Lang, string[]> = {
  cs: ['LED', 'ÚNO', 'BŘE', 'DUB', 'KVĚ', 'ČVN', 'ČVC', 'SRP', 'ZÁŘ', 'ŘÍJ', 'LIS', 'PRO'],
  en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  uk: ['СІЧ', 'ЛЮТ', 'БЕР', 'КВІ', 'ТРА', 'ЧЕР', 'ЛИП', 'СЕР', 'ВЕР', 'ЖОВ', 'ЛИС', 'ГРУ'],
  sk: ['JAN', 'FEB', 'MAR', 'APR', 'MÁJ', 'JÚN', 'JÚL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'],
};

export function formatDate(isoDate: string, lang: Lang = 'cs', time?: string): string {
  const d = new Date(isoDate);
  const day = d.getDate();
  const month = MONTHS[lang][d.getMonth()];
  const year = d.getFullYear();

  if (lang === 'en') {
    const base = `${month} ${day}, ${year}`;
    return time ? `${base}, ${time}` : base;
  }

  const base = `${day}. ${month} ${year}`;
  return time ? `${base}, ${time}` : base;
}

export function formatDateShort(isoDate: string, lang: Lang = 'cs'): { day: string; month: string; year: string } {
  const d = new Date(isoDate);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: MONTHS_SHORT[lang][d.getMonth()],
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

// Backward-compatible aliases
export const formatCzechDate = (isoDate: string, time?: string) => formatDate(isoDate, 'cs', time);
export const formatCzechDateShort = (isoDate: string) => formatDateShort(isoDate, 'cs');
