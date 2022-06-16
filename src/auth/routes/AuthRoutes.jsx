import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={ <LoginPage /> } />
            <Route path="register" element={ <RegisterPage /> } />

            {/* Si no hace match con ninguna ruta, va al login */}
            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
