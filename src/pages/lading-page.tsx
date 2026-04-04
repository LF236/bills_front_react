import { useNavigate } from "react-router-dom";
import { Container } from "../features/common/components/Container";
import { AppLayout } from "../features/common/layouts/AppLayout";

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            LANDIGPAGE
            <button onClick={() => navigate('/auth/login')}>Go to Login</button>
        </div>
    );
}