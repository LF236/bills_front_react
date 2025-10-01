import { Container } from "../features/common/components/Container";
import { AppLayout } from "../features/common/layouts/AppLayout";

export const LandingPage = () => {
    return (
        <AppLayout>
            <section className='bg-gray-900 py-20 sm:py-32'>
                <Container>
                    LUIGI
                </Container>
            </section>
        </AppLayout>
    );
}