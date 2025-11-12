import { useNavigate } from "react-router-dom";
import { Button } from "../../common/components/button";
import { ErrorMessage, Field, Label } from "../../common/components/fieldset";
import { Input } from "../../common/components/input";
import { useAuth } from "../hooks/useAuth";
import { useAlertStore } from "../../common/store/useAlertStore";
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field as FormikField } from "formik";

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

	return(
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>

			{({ errors, touched }) => (
				<FormikForm>
					<Field>
						<Label htmlFor="email">Email</Label>
						<FormikField
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
							name="password"
							type="password"
							autoComplete="current-password"
							invalid={!!(errors.password && touched.password)}
							as={Input}
						/>

					  	<div className='min-h-[1.5rem]'>
							<ErrorMessage>{errors.password}</ErrorMessage>
						</div>
					</Field>

					<Button type='submit' className="w-full mt-4">
						Sign in
					</Button>
				</FormikForm>
			)}
		</Formik>
	)
}
