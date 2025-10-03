import { create } from 'zustand';

interface Alert {
    id: string;
    title: string;
    subtitle: string;
    type: 'success' | 'error' | 'warning';
    timeToClose?: number;
    isWithTimeToClose?: boolean;
    showButtonClose?: boolean;
}

interface AlertState {
    alerts: Alert[];
    addAlert: (alert: Omit<Alert, 'id'>) => void;
    removeAlert: (id: string) => void;
}

export const useAlertStore = create<AlertState>(( set ) => ({
    alerts: [],
    addAlert: (alert) => set((state) => ({
        alerts: [...state.alerts, { id: crypto.randomUUID(), ...alert }]
    })),
    removeAlert: (id) => set((state) => ({
        alerts: state.alerts.filter(alert => alert.id !== id)
    }))
}));