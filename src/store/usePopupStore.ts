import { create } from 'zustand';

interface PopupState {
  cookieDismissed: boolean;
  newsletterShown: boolean;
  exitIntentShown: boolean;
  toastCount: number;
  activeModal: string | null;
  dismissCookie: () => void;
  showNewsletter: () => void;
  showExitIntent: () => void;
  incrementToast: () => void;
  setActiveModal: (id: string | null) => void;
  canShowNewsletter: () => boolean;
  canShowExitIntent: () => boolean;
  canShowToast: () => boolean;
}

export const usePopupStore = create<PopupState>((set, get) => ({
  cookieDismissed: typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') !== null : false,
  newsletterShown: false,
  exitIntentShown: false,
  toastCount: 0,
  activeModal: null,

  dismissCookie: () => {
    localStorage.setItem('cookie-consent', 'true');
    set({ cookieDismissed: true });
  },

  showNewsletter: () => set({ newsletterShown: true, activeModal: 'newsletter' }),
  showExitIntent: () => set({ exitIntentShown: true, activeModal: 'exit-intent' }),
  incrementToast: () => set((s) => ({ toastCount: s.toastCount + 1 })),

  setActiveModal: (id) => set({ activeModal: id }),

  canShowNewsletter: () => {
    const s = get();
    return !s.newsletterShown && s.cookieDismissed && !s.activeModal;
  },

  canShowExitIntent: () => {
    const s = get();
    return !s.exitIntentShown && !s.activeModal;
  },

  canShowToast: () => {
    const s = get();
    return s.toastCount < 3 && !s.activeModal;
  },
}));
