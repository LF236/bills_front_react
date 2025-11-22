import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/login-page'
import { SiginPage } from '../pages/signin-page'
import { LandingPage } from '../pages/lading-page'
import { PublicRoute } from './routes/PublicRoute'
import { PrivateRoute } from './routes/PrivateRoute'
import { HomePage } from '../pages/home-page'
import { RootRedirect } from './routes/RootRedirect'
import { ValidateTokenPage } from '../pages/auth/validate-token-page'

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <RootRedirect /> } />

				<Route element={ <PublicRoute /> }>
					<Route path='/auth/login' element={<LoginPage />} />
					<Route path='/auth/signin' element={<SiginPage />} />
					<Route path='/auth/validate-token/:token'element={<ValidateTokenPage />} />
					<Route path='/landing' element={ <LandingPage /> } />

				</Route>

				<Route element={ <PrivateRoute /> }>
					<Route path='/home' element={ <HomePage /> } />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}