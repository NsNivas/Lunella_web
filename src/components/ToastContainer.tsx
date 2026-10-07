import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-white rounded-xl shadow-2xl p-4 border-l-4 animate-slide-up"
          style={{ borderLeftColor: toast.type === 'success' ? 'var(--color-burgundy)' : toast.type === 'error' ? '#dc2626' : 'var(--color-deep-mauve)' }}
        >
          {toast.type === 'success' && <CheckCircle size={20} className="text-green-600 flex-shrink-0" />}
          {toast.type === 'error' && <XCircle size={20} className="text-red-600 flex-shrink-0" />}
          {toast.type === 'info' && <Info size={20} className="text-deep-mauve flex-shrink-0" />}
          <p className="text-sm font-semibold text-charcoal flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-charcoal">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
