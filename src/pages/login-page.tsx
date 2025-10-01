import { LoginForm } from "../features/auth/components/LoginForm"
import { AuthLayout } from "../features/auth/layouts/AuthLayout"
import { TextField } from "../features/common/components/Fields"

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
            <form>
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        
      </form>
        </AuthLayout>
    )
}