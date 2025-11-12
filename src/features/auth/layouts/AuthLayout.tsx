import { Heading, Subheading } from "../../common/components/heading"
import { ImageLogo } from "../../common/components/Logo"

export const AuthLayout = ({
	title,
	subtitle,
	children,
}: {
	title: string,
	children: React.ReactNode,
	subtitle: React.ReactNode
}) => {
	return (
		<main className="flex min-h-dvh flex-col p-2">
			<div className="flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
				<div className="grid w-full max-w-sm grid-cols-1 gap-8">
					<a href="#" className="mx-auto w-auto">
						<ImageLogo
							text="LF236"
							src="https://file.garden/aNa8POjYu0nxNoUR/tigre.png"
							width={40}
							height={40}
						/>
					</a>

					<Heading>
						{title}
					</Heading>

					<Subheading>
						{subtitle}
					</Subheading>

					{children}
				</div>
			</div>
		</main>
	)
}