import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div className="toast">
      <CheckCircle size={15} className="toast-icon" />
      <span>{toast.message}</span>
      <button
        style={{ marginLeft: 'auto', color: 'var(--color-dark-gray)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={13} />
      </button>
    </div>
  );
}
