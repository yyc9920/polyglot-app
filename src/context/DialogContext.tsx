import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
}

interface DialogContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogState extends ConfirmOptions {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({
    isOpen: false,
    title: '',
    message: '',
    resolve: null,
  });

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        ...options,
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState(prev => ({ ...prev, isOpen: false, resolve: null }));
  }, [state.resolve]);

  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState(prev => ({ ...prev, isOpen: false, resolve: null }));
  }, [state.resolve]);

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        isOpen={state.isOpen}
        title={state.title}
        message={state.message}
        confirmText={state.confirmText}
        cancelText={state.cancelText}
        variant={state.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
