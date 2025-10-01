import { LoginForm } from "../features/auth/components/LoginForm";
import { AuthLayout } from "../features/auth/layouts/AuthLayout";

export const LoginPage = () => {
	return (
		<AuthLayout
			title="Sign in to account"
			subtitle={
				<>
					Dont't have an account? {''}
					<a href="/auth/signin" className='text-cyan-600'>
						Sign up
					</a>{' '}
					for a free trial.
				</>
			}
		>
			<LoginForm />
		</AuthLayout>
	)
}