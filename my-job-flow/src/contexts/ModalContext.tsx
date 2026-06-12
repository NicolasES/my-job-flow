import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    hideCancel?: boolean;
}

interface ModalContextData {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({
        title: '',
        message: '',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        variant: 'primary',
        hideCancel: false
    });

    const resolver = useRef<((value: boolean) => void) | null>(null);

    const confirm = useCallback((opts: ConfirmOptions) => {
        setOptions({
            title: opts.title,
            message: opts.message,
            confirmText: opts.confirmText || 'Confirmar',
            cancelText: opts.cancelText || 'Cancelar',
            variant: opts.variant || 'primary',
            hideCancel: opts.hideCancel || false
        });
        setIsOpen(true);

        return new Promise<boolean>((resolve) => {
            resolver.current = resolve;
        });
    }, []);

    const handleConfirm = useCallback(() => {
        setIsOpen(false);
        if (resolver.current) resolver.current(true);
    }, []);

    const handleCancel = useCallback(() => {
        setIsOpen(false);
        if (resolver.current) resolver.current(false);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleConfirm();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                handleCancel();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleConfirm, handleCancel]);

    return (
        <ModalContext.Provider value={{ confirm }}>
            {children}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200"
                        role="dialog"
                        aria-modal="true"
                    >
                        <h3 className="text-xl font-semibold text-white mb-2">{options.title}</h3>
                        <p className="text-slate-300 mb-8">{options.message}</p>
                        
                        <div className="flex justify-end gap-3">
                            {!options.hideCancel && (
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm font-medium text-slate-300 bg-transparent border border-slate-700 rounded-md hover:bg-slate-800 transition-colors"
                                >
                                    {options.cancelText}
                                </button>
                            )}
                            <button
                                onClick={handleConfirm}
                                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                                    options.variant === 'danger' 
                                        ? 'bg-red-600 hover:bg-red-700' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {options.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
