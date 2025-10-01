import { Button } from '../../common/components/Button';
import { TextField } from '../../common/components/Fields';

export const LoginForm = () => {
    return (
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

                <Button type="submit" color='cyan' className="w-full mt-8">
                    Sign in to account
                </Button>
            </div>
        </form>
    );
}