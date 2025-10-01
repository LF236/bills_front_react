import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import clsx from 'clsx';
createRoot(document.getElementById('root')!).render(
	<div className={clsx('bg-gray-50 antialiased')}>
		<App />
	</div>
)
