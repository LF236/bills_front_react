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
	}, [me, loading]);

	return (
		<AppLayout>
			<section>
				<Container>
					{children}
				</Container>
			</section>
		</AppLayout>
	)
}