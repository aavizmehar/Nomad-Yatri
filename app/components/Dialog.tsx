'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning' | 'confirm';
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel'
}: DialogProps) {
  
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheckCircle className="text-emerald-500 text-4xl" />;
      case 'error': return <FaExclamationCircle className="text-red-500 text-4xl" />;
      case 'warning': return <FaExclamationTriangle className="text-amber-500 text-4xl" />;
      case 'confirm': return <FaInfoCircle className="text-blue-500 text-4xl" />;
      default: return <FaInfoCircle className="text-blue-500 text-4xl" />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
        case 'success': return 'bg-emerald-600 hover:bg-emerald-700';
        case 'error': return 'bg-red-600 hover:bg-red-700';
        case 'warning': return 'bg-amber-600 hover:bg-amber-700';
        case 'confirm': return 'bg-blue-600 hover:bg-blue-700';
        default: return 'bg-blue-600 hover:bg-blue-700';
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
             <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">
                    {getIcon()}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-600 mb-6">{message}</p>
                
                <div className="flex gap-3 w-full justify-center">
                    {(type === 'confirm' || onConfirm) && (
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            onClose();
                        }}
                        className={`flex-1 px-4 py-2 rounded-xl text-white font-bold shadow-lg transition-all active:scale-95 ${getButtonColor()}`}
                    >
                        {confirmText}
                    </button>
                </div>
             </div>
             
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
             >
                <FaTimes />
             </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
