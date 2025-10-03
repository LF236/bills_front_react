import { Input } from "../features/common/components/input";

export function HomePage() {
    return(
        <div>
            <Input name="full_name" invalid={true}/>
        </div>
    );
}