import { useEffect } from 'react';
import { useGetMe } from '../../../auth/hooks/useGetMe'
import { AppLayout } from '../../layouts/AppLayout'
import { Container } from '../Container'

export function PrivateLayout({
	children,
	...props
}: React.PropsWithChildren) {
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