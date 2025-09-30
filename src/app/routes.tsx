import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/login-page"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}