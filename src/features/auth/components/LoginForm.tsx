import { Field, Label } from "../../common/components/fieldset";
import { Input } from "../../common/components/input";


export const LoginForm = () => {
	return (
		<form action="" method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
			<Field>
				<Label>Email</Label>
				<Input type="email" name="email" />
			</Field>
			<Field>
				<Label>Password</Label>
				<Input type="password" name="password" />
			</Field>
		</form>
	)
}
