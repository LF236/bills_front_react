import { LoginForm } from "../features/auth/components/LoginForm"
import { AuthLayout } from "../features/auth/layouts/AuthLayout"

export const LoginPage = () => {
    return(
        <AuthLayout
            title="Sign in to account"
            subtitle={
                <>
                    Dont't have an account? { '' }
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign up
                    </a>{ ' ' }
                    for a free account
                </>
            }
        >
            <LoginForm />
        </AuthLayout>
    )
}