
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { ErrorMessage, Field, Label } from '../../common/components/fieldset';
import { Input } from '../../common/components/input';
import { Button } from '../../common/components/button';
import { AuthService } from '../api/auth.service';
import { useAlertStore } from '../../common/store/useAlertStore';
import { useState } from 'react';
import { RegistrationCompleted } from './RegistrationCompleted';

export const RegisterForm = () => {
	const addAlert = useAlertStore(state => state.addAlert);
	const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(true);

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email adress').required('Email is required'),
		password: Yup.string().required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Passwords must match')
			.required('Confirm Password is required'),
		name: Yup.string().required('Name is required'),
	});


	const handleSubmit = async (values: { email: string; password: string; confirmPassword: string; name: string }) => {
		try {
			const response = await AuthService.signUp({
				email: values.email,
				password: values.password,
				name: values.name,
				repeatPassword: values.confirmPassword
			});
			if(response) {
				console.log(response);
			}
		} catch (error: any) {
				if(error.response && error.response.data && error.response.data.message) {
				addAlert({
					title: 'Sign Up Error',
					subtitle: error.response.data.message,
					type: 'error',
					showButtonClose: true,
					isWithTimeToClose: true,
					timeToClose: 2000
				});
				return;
			}

			if(error.message) {
				addAlert({
					title: 'Sign Up Error',
					subtitle: error.message,
					type: 'error',
					showButtonClose: true,
					isWithTimeToClose: true,
					timeToClose: 2000
				});
				return;
			}
		}

	}

	return(
		<>
			<RegistrationCompleted isOpen={isRegistrationCompleted} onClose={() => {}} />
			<Formik
				initialValues={{ email: '', password: '', confirmPassword: '', name: '' }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}

			>

				{({ errors, touched }) => (
					<FormikForm>
						<Field>
							<Label htmlFor="name">Name</Label>
							<FormikField 
								id="name" 
								name="name" 
								placeholder="Your name" 
								as={Input}
							/>

							<div className='min-h-[1.5rem]'>
								<ErrorMessage>
									{errors.name && touched.name ? errors.name : ''}
								</ErrorMessage>
							</div>
						</Field>

						<Field>
							<Label htmlFor="email">Email</Label>
							<FormikField
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								invalid={!!(errors.email && touched.email)}
								as={Input}
							/>

							<div className='min-h-[1.5rem]'>
								<ErrorMessage>
									{errors.email && touched.email ? errors.email : ''}
								</ErrorMessage>
							</div>
						</Field>

						<Field>
							<Label htmlFor="password">Password</Label>
							<FormikField
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								invalid={!!(errors.password && touched.password)}
								as={Input}
							/>

							<div className='min-h-[1.5rem]'>
								<ErrorMessage>
									{errors.password && touched.password ? errors.password : ''}
								</ErrorMessage>
							</div>
						</Field>

						<Field>
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<FormikField
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								invalid={!!(errors.confirmPassword && touched.confirmPassword)}
								as={Input}
							/>

							<div className='min-h-[1.5rem]'>
								<ErrorMessage>
									{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
								</ErrorMessage>
							</div>
						</Field>

						<Button type='submit' className='w-full mt-4'>
							Register
						</Button>
					</FormikForm>
				)}
			</Formik>
		</>
	)
}