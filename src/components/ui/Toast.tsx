import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastItem {
  id: number;
  message: string;
  type?: 'success' | 'info';
}

interface ToastContextType {
  addToast: (message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[8000] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="glass pointer-events-auto flex items-center gap-3 px-5 py-3 min-w-[280px] max-w-sm"
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${toast.type === 'success' ? 'bg-success' : 'bg-ostrava-cyan'}`} />
              <span className="text-sm text-ostrava-blue flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-ostrava-blue/50 hover:text-ostrava-blue">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
