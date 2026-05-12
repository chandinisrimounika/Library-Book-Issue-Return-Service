import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = type === 'success' 
        ? <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--success)" strokeWidth="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
        : <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--danger)" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;

    return (
        <div className={`toast ${type}`}>
            {icon}
            <span>{message}</span>
        </div>
    );
};

export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div id="toast-container">
            {toasts.map(t => (
                <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
            ))}
        </div>
    );
};
