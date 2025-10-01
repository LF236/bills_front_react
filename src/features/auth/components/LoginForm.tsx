import { TextField } from '../../common/components/Fields';

export const LoginForm = () => {
    return (
        <form>
            <div className="space-y-6">
                <TextField
                    label='Email address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='brackground-red'
                    
                />
            </div>
        </form>
    );
}