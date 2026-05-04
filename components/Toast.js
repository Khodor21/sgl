"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  HiCheckCircle,
  HiXCircle,
  HiInformationCircle,
  HiExclamationTriangle,
  HiXMark,
} from "react-icons/hi2";
import { RiLoader4Line } from "react-icons/ri";

// ───    Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext(null);
let _ctx = null;

// ─── Provider ────────────────────────────────────────────────────────────────

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", options = {}) => {
    const id = Date.now() + Math.random();
    const duration = options.duration ?? (type === "loading" ? 99999 : 4000);

    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        description: options.description,
        type,
        visible: true,
        progress: 100,
        duration,
        isPaused: false,
      },
    ]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 420);
  }, []);

  const updateToast = useCallback((id, updates) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }, []);

  const ctx = { addToast, removeToast, updateToast };
  _ctx = ctx;

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <ToastList
        toasts={toasts}
        onRemove={removeToast}
        onUpdate={updateToast}
      />
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");

  return {
    toast: {
      success: (msg, opts) => ctx.addToast(msg, "success", opts),
      error: (msg, opts) => ctx.addToast(msg, "error", opts),
      info: (msg, opts) => ctx.addToast(msg, "info", opts),
      warning: (msg, opts) => ctx.addToast(msg, "warning", opts),
      loading: (msg, opts) => ctx.addToast(msg, "loading", opts),
      dismiss: (id) => ctx.removeToast(id),
      update: (id, updates) => ctx.updateToast(id, updates),
    },
  };
}

// ─── Static helper ────────────────────────────────────────────────────────────

export const toast = {
  success: (msg, opts) => _ctx?.addToast(msg, "success", opts),
  error: (msg, opts) => _ctx?.addToast(msg, "error", opts),
  info: (msg, opts) => _ctx?.addToast(msg, "info", opts),
  warning: (msg, opts) => _ctx?.addToast(msg, "warning", opts),
  loading: (msg, opts) => _ctx?.addToast(msg, "loading", opts),
  dismiss: (id) => _ctx?.removeToast(id),
  update: (id, updates) => _ctx?.updateToast(id, updates),
};

// ─── Config ───────────────────────────────────────────────────────────────────

const TOAST_CONFIG = {
  success: {
    icon: <HiCheckCircle size={22} />,
    gradient: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/25",
    border: "border-emerald-200/60",
    bg: "from-emerald-50/95 to-white/95",
    progressColor: "bg-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Success",
  },
  error: {
    icon: <HiXCircle size={22} />,
    gradient: "from-rose-500 to-red-400",
    glow: "shadow-rose-500/25",
    border: "border-rose-200/60",
    bg: "from-rose-50/95 to-white/95",
    progressColor: "bg-rose-400",
    badge: "bg-rose-100 text-rose-700",
    label: "Error",
  },
  info: {
    icon: <HiInformationCircle size={22} />,
    gradient: "from-blue-500 to-sky-400",
    glow: "shadow-blue-500/25",
    border: "border-blue-200/60",
    bg: "from-blue-50/95 to-white/95",
    progressColor: "bg-blue-400",
    badge: "bg-blue-100 text-blue-700",
    label: "Info",
  },
  warning: {
    icon: <HiExclamationTriangle size={22} />,
    gradient: "from-amber-500 to-yellow-400",
    glow: "shadow-amber-500/25",
    border: "border-amber-200/60",
    bg: "from-amber-50/95 to-white/95",
    progressColor: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700",
    label: "Warning",
  },
  loading: {
    icon: <RiLoader4Line size={22} className="animate-spin" />,
    gradient: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/25",
    border: "border-violet-200/60",
    bg: "from-violet-50/95 to-white/95",
    progressColor: "bg-violet-400",
    badge: "bg-violet-100 text-violet-700",
    label: "Loading",
  },
};

// ─── Toast List ───────────────────────────────────────────────────────────────

function ToastList({ toasts, onRemove, onUpdate }) {
  return (
    <>
      <style>{`
        @keyframes toast-in {
          0%   { transform: translateX(calc(100% + 24px)) scale(0.92); opacity: 0; }
          60%  { transform: translateX(-6px) scale(1.01); opacity: 1; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes toast-out {
          0%   { transform: translateX(0) scale(1); opacity: 1; max-height: 120px; margin-bottom: 10px; }
          40%  { transform: translateX(calc(100% + 24px)) scale(0.92); opacity: 0; max-height: 120px; }
          100% { transform: translateX(calc(100% + 24px)); opacity: 0; max-height: 0; margin-bottom: 0; padding: 0; }
        }
        @keyframes progress-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .toast-enter {
          animation: toast-in 0.48s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .toast-exit {
          animation: toast-out 0.42s cubic-bezier(0.4, 0, 1, 1) forwards;
          overflow: hidden;
          pointer-events: none;
        }
        .progress-pulse {
          animation: progress-pulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <div
        aria-live="polite"
        aria-label="Notifications"
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 w-[min(380px,calc(100vw-2rem))] pointer-events-none"
      >
        {toasts.map((t) => (
          <ToastCard
            key={t.id}
            toast={t}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </>
  );
}

// ─── Toast Card ───────────────────────────────────────────────────────────────

function ToastCard({ toast: t, onRemove, onUpdate }) {
  const cfg = TOAST_CONFIG[t.type] ?? TOAST_CONFIG.info;
  const progressRef = useRef(100);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const isPausedRef = useRef(false);
  const remainingRef = useRef(t.duration);

  useEffect(() => {
    if (t.type === "loading") return;

    const tick = (now) => {
      if (isPausedRef.current) {
        startTimeRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      startTimeRef.current = now;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      progressRef.current = (remainingRef.current / t.duration) * 100;

      onUpdate(t.id, { progress: progressRef.current });

      if (remainingRef.current <= 0) {
        onRemove(t.id);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    onUpdate(t.id, { isPaused: true });
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
    onUpdate(t.id, { isPaused: false });
  };

  return (
    <div
      role="alert"
      className={`pointer-events-auto ${t.visible ? "toast-enter" : "toast-exit"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glass card */}
      <div
        className={`
          relative overflow-hidden rounded-2xl border backdrop-blur-xl
          bg-gradient-to-br ${cfg.bg}
          ${cfg.border}
          shadow-xl ${cfg.glow}
          transition-all duration-200
          ${t.isPaused ? "scale-[1.02]" : "scale-100"}
        `}
      >
        {/* Accent left bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${cfg.gradient}`}
        />

        {/* Content */}
        <div className="flex items-start gap-3 px-4 py-3.5 pl-5">
          {/* Icon bubble */}
          <div
            className={`
              mt-0.5 flex-shrink-0 flex items-center justify-center
              w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.gradient}
              text-white shadow-md shadow-black/10
            `}
          >
            {cfg.icon}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-700 uppercase tracking-wider ${cfg.badge}`}
                style={{ fontWeight: 700, letterSpacing: "0.06em" }}
              >
                {cfg.label}
              </span>
            </div>
            <p
              className="text-slate-800 text-[13.5px] font-semibold leading-snug"
              style={{ fontWeight: 600 }}
            >
              {t.message}
            </p>
            {t.description && (
              <p className="text-slate-500 text-[12px] mt-0.5 leading-relaxed">
                {t.description}
              </p>
            )}
          </div>

          {/* Dismiss button */}
          <button
            aria-label="Dismiss notification"
            onClick={() => onRemove(t.id)}
            className="
              flex-shrink-0 mt-0.5 p-1.5 rounded-lg
              text-slate-400 hover:text-slate-600
              hover:bg-slate-100/80
              transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300
            "
          >
            <HiXMark size={15} strokeWidth={1} />
          </button>
        </div>

        {/* Progress bar */}
        {t.type !== "loading" && (
          <div className="mx-5 mb-3 h-[3px] rounded-full bg-black/5 overflow-hidden">
            <div
              className={`h-full rounded-full ${cfg.progressColor} transition-none`}
              style={{ width: `${t.progress}%` }}
            />
          </div>
        )}

        {/* Loading shimmer */}
        {t.type === "loading" && (
          <div className="mx-5 mb-3 h-[3px] rounded-full bg-black/5 overflow-hidden relative">
            <div
              className={`absolute h-full w-2/5 rounded-full ${cfg.progressColor}`}
              style={{ animation: "toast-shimmer 1.5s ease-in-out infinite" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
