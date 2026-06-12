import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextData {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const success = useCallback((message: string) => addToast(message, 'success'), [addToast]);
    const error = useCallback((message: string) => addToast(message, 'error'), [addToast]);
    const info = useCallback((message: string) => addToast(message, 'info'), [addToast]);

    const contextValue = useMemo(() => ({ success, error, info }), [success, error, info]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-center justify-between p-4 mb-2 w-80 max-w-full rounded-md shadow-lg text-white transition-opacity duration-300 ease-in-out
                            ${toast.type === 'success' ? 'bg-emerald-600' : ''}
                            ${toast.type === 'error' ? 'bg-red-600' : ''}
                            ${toast.type === 'info' ? 'bg-blue-600' : ''}
                        `}
                    >
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            className="ml-4 text-white opacity-70 hover:opacity-100"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
