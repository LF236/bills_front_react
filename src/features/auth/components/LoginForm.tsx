import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '../../common/components/Button';
import { TextField } from '../../common/components/Fields';
import * as Yup from 'yup';

export const LoginForm = () => {
	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email adress').required('Email is required'),
		password: Yup.string().required('Password is required'),
	});

	const handleSubmit = (values: { email: string; password: string }) => {
		console.log(values);
	}

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			<Form>
				<div className="space-y-6">
					<Field
						label="Email address"
						name="email"
						type="email"
						autoComplete="email"
						required
						component={TextField}

					/>
					<ErrorMessage
						name="email"
						render={(msg) => (
							<p className="mt-1 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-md">
								{msg}
							</p>
						)}
					/>

					<Field
						label="Password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						component={TextField}
					/>

					<ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

					<Button type="submit" color='cyan' className="w-full mt-8">
						Sign in to account
					</Button>
				</div>
			</Form>
		</Formik>
	);
}