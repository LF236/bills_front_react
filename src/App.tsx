import { AppRouter } from './app/routes';
import { MainLoader } from './features/common/components/loaders/MainLoader';
import { AlertProvider } from './features/common/providers/AlertProvider';

function App() {
	return (
		<>
			<MainLoader />
			<AppRouter />
			<AlertProvider />
		</>
	)

}
export default App
