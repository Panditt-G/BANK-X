import { IconCheck } from './Icons';

interface ToastProps {
  toast: { msg: string; type: 'success' | 'error' } | null;
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border backdrop-blur-xl text-[13px] font-semibold shadow-2xl ${
      toast.type === 'success'
        ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400'
        : 'bg-red-950/90 border-red-500/30 text-red-400'
    }`} style={{ animation: 'toastIn 0.3s ease' }}>
      <IconCheck />
      <span>{toast.msg}</span>
    </div>
  );
}
