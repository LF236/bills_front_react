import AlertDefault from '../components/alerts/AlertDefault';
import { useAlertStore } from '../store/useAlertStore';

export const AlertProvider = () => {
	const { alerts, removeAlert } = useAlertStore();

	return (
		<div className='fixed inset-0 flex flex-col items-end p-4 space-y-4 pointer-events-none'>
			{alerts.map((alert, i) => (
				<AlertDefault
					key={alert.id}
					timeToClose={alert.timeToClose}
					isWithTimeToClose={alert.isWithTimeToClose}
					title={alert.title}
					subtitle={alert.subtitle}
					type={alert.type}
					showButtonClose={alert.showButtonClose}
					onClose={() => removeAlert(alert.id)}
					style={{
						transform: `translateY(-${i * 80}px)`,
					}}
				/>
			))}
		</div>
	)
}