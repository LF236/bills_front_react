import { AppLayout } from '../../layouts/AppLayout'
import { Container } from '../Container'

export function PrivateLayout({
    children,
    ...props
}: React.PropsWithChildren) {
    return (
        <AppLayout>
            <section className='bg-gray-900 py-20 sm:py-32'>
                <Container>
                    { children }
                </Container>
            </section>
        </AppLayout>
    )
}