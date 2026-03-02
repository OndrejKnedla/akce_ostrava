import { useCallback } from 'react';
import type { EventData } from '@/types';
import { downloadICS } from '@/utils/generateICS';

export function useICalendar() {
  const download = useCallback((event: EventData) => {
    downloadICS(event);
  }, []);

  return { download };
}
