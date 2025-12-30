'use client';
import { useState, useCallback, ReactNode } from 'react';
import Dialog from '@/components/Dialog';

type DialogType = 'success' | 'error' | 'info' | 'warning' | 'confirm';

interface DialogState {
  isOpen: boolean;
  title: string;
  message: string;
  type: DialogType;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const useDialog = () => {
  const [state, setState] = useState<DialogState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showDialog = useCallback((
    title: string, 
    message: string, 
    type: DialogType = 'info', 
    onConfirm?: () => void,
    options?: { confirmText?: string; cancelText?: string }
  ) => {
    setState({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText
    });
  }, []);

  const closeDialog = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const DialogComponent = () => (
    <Dialog
      isOpen={state.isOpen}
      onClose={closeDialog}
      title={state.title}
      message={state.message}
      type={state.type}
      onConfirm={state.onConfirm}
      confirmText={state.confirmText || (state.type === 'confirm' ? 'Confirm' : 'OK')}
      cancelText={state.cancelText || 'Cancel'}
    />
  );

  return {
    showDialog,
    closeDialog,
    DialogComponent
  };
};
