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
	queue: Alert[];
	addAlert: (alert: Alert) => void;
	removeAlert: (id: string) => void;
}

const MAX_ALERTS = 5;

export const useAlertStore = create<AlertState>((set, get) => ({
	alerts: [],
	queue: [],
	addAlert: (alert) => {
		const { alerts, queue } = get();

		if (alerts.length < MAX_ALERTS) {
			set({ alerts: [...alerts, alert] })
		} else {
			set({ queue: [...queue, alert] });
		}
	},
	removeAlert: (id) => {
		const { alerts, queue } = get();
		const newAlerts = alerts.filter(alert => alert.id !== id);
		if (queue.length > 0) {
			const [next, ...rest] = queue;
			set({
				alerts: [...newAlerts, next],
				queue: rest
			});
		} else {
			set({ alerts: newAlerts });
		}
	}
}));