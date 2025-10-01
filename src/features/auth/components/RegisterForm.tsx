import { Button } from "../../common/components/Button"
import { TextField } from "../../common/components/Fields"

export const RegisterForm = () => {
	return (
		<form>
			<div className='grid grid-cols-2 gap-6'>
				<TextField
					className='col-span-full'
					label='Email address'
					name='email'
					type='email'
					autoComplete='email'
					required
				/>

				<TextField
					className='col-span-full'
					label='Password'
					name='password'
					type='password'
					autoComplete='new-password'
					required
				/>

				<TextField
					className='col-span-full'
					label='Confirm Password'
					name='confirm-password'
					type='password'
					autoComplete='new-password'
					required
				/>
			</div>

			<Button type='submit' className="w-full mt-5" color='cyan'>
				Get Started Today
			</Button>
		</form>
	)
}