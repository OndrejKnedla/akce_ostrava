import type { EventData } from '@/types';

export function generateICS(event: EventData): string {
  const [h, m] = event.time.split(':').map(Number);
  const start = new Date(event.date);
  start.setHours(h, m, 0, 0);

  const end = new Date(start);
  if (event.endTime) {
    const [eh, em] = event.endTime.split(':').map(Number);
    end.setHours(eh, em, 0, 0);
  } else {
    end.setHours(end.getHours() + 3);
  }

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AKCE OSTRAVA//CZ',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.venue.name}, ${event.venue.address}`,
    `DESCRIPTION:${event.description.substring(0, 200).replace(/\n/g, '\\n')}`,
    `URL:https://akceostrava.cz/akce/${event.slug}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICS(event: EventData) {
  const ics = generateICS(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.slug}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
