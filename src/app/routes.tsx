import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/login-page"
import { SiginPage } from "../pages/signin-page"
import { LandingPage } from "../pages/lading-page"

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/auth/signin" element={<SiginPage />} />
				<Route path='home' element={ <LandingPage /> } />
			</Routes>
		</BrowserRouter>
	)
}