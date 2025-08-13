import type { ReactNode } from 'react'
import Header, { type HeaderProps } from './Header'
import Spinner from './Spinner'

type Props = {
	title: string
	breadcrumbTitle?: string
	children?: ReactNode
	isLoading?: boolean
	error: string | false
	noData?: boolean // Might be redundant...
} & Pick<HeaderProps, 'trail'>

export function PageLayout(props: Props) {
	const { title, breadcrumbTitle, trail, children, isLoading, error, noData } = props

	return (
		<main className="flex flex-col w-full">
			<Header
				currentPage={breadcrumbTitle || title} //
				trail={trail}
			/>
			<div className="flex flex-1 flex-col mx-4 mb-4 mt-2">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col flex-1">
							<h1 className="text-3xl font-semibold mb-12">{title}</h1>
						{(() => {
							if (isLoading) {
								return (
									<div className="flex h-full justify-center items-center">
										<Spinner />
									</div>
								)
							}

							if (error) {
								return (
									<div className="flex h-full justify-center items-center">
										<p className="text-red-600">{error}</p>
									</div>
								)
							}

							if (noData) {
								return (
									<div className="flex h-full justify-center items-center">
										<p className="text-gray-500">No data</p>
									</div>
								)
							}
							return (
								<>
									{children}
									<div
										// Extra space at the bottom of the page so the content isn't right at the bottom of the screen
										className="h-96"
									/>
								</>
							)
						})()}
					</div>
				</div>
			</div>
		</main>
	)
}
