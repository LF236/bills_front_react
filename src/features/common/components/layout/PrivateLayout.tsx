import { useEffect } from 'react';
import { useGetMe } from '../../../auth/hooks/useGetMe'
import { AppLayout } from '../../layouts/AppLayout'
import { Container } from '../Container'

export function PrivateLayout({
	children,
	...props
}: React.PropsWithChildren) {
	const { me, loading } = useGetMe();

	useEffect(() => {
		if(loading) return;
		console.log(me);
	}, [me, loading]);

	return (
		<AppLayout>
			<section className='bg-gray-900 py-20 sm:py-32'>
				<Container>
					{children}
				</Container>
			</section>
		</AppLayout>
	)
}