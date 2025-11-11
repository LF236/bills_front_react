import { AppRouter } from './app/routes';
import { AlertProvider } from './features/common/providers/AlertProvider';

function App() {
	return (
		<>
			<AppRouter />
			<AlertProvider />
		</>
	)

}
export default App
