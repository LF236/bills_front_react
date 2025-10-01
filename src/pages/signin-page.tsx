import { RegisterForm } from '../features/auth/components/RegisterForm';
import { AuthLayout } from '../features/auth/layouts/AuthLayout';

export const SiginPage = () => {
    return (
        <AuthLayout
            title='Sign up for an account'
            subtitle={
                <>
                    Alredy registered? { ' ' }
                    <a href='/auth/login' className='text-cyan-600'>
                        Sing In
                    </a> { ' ' }
                    to access your account.
                </>
            }
        >
            <RegisterForm />
        </AuthLayout>
    );
}