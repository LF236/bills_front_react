import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '../../common/components/Button';
import { Field as FieldSet, Label, ErrorMessage as ErrorMessageStyled } from '../../common/components/fieldset';
import * as Yup from 'yup';
import { Input } from '../../common/components/input';
import { useAuth } from '../hooks/useAuth';
import { useAlertStore } from '../../common/store/useAlertStore';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
	const login = useAuth();
	const navigate = useNavigate();
	const addAlert = useAlertStore(state => state.addAlert);

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email adress').required('Email is required'),
		password: Yup.string().required('Password is required'),
	});

	const handleSubmit = async (values: { email: string; password: string }) => {
		try {
			const response = await login.login(values);
			if(response) {
				addAlert({
					title: 'Login Successful',
					subtitle: 'You have successfully logged in',
					type: 'success',
					showButtonClose: true,
					isWithTimeToClose: true,
					timeToClose: 1000
				});
				setTimeout(() => {
					return navigate('/home');
				}, 1000);
			}
		} catch (error : any) {
			console.log(error);

			if(error.response && error.response.data && error.response.data.message) {
				addAlert({
					title: 'Login Error',
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
					title: 'Login Error',
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

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (

				<Form>
					<div className="space-y-6">
						<FieldSet>
							<Label>Email Address</Label>
							<Field
								name="email"
								type="email"
								autoComplete="email"
								invalid={!!(errors.email && touched.email)}
								as={Input}
							/>

							<ErrorMessage
								name='email'
								component={ErrorMessageStyled}
							/>
						</FieldSet>
		
						<FieldSet>
							<Label>Password</Label>
							<Field
								name="password"
								type="password"
								autoComplete="current-password"
								invalid={!!(errors.password && touched.password)}
								as={Input}
							/>
							<ErrorMessage
								name='password'
								component={ErrorMessageStyled}
							/>
						</FieldSet>

						<Button type="submit" color='cyan' className="w-full mt-8">
							Sign in to account
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}