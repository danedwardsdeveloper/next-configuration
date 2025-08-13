import type { ReactNode } from 'react'
import type { Role } from '@/library/database/schema'
import { checkPermission } from '@/library/utilities/checkPermission'
import { mergeClasses } from '@/library/utilities/mergeClasses'
import type { ValidPath } from '@/types'
import { ActionButton, type ActionButtonProps } from './Buttons'
import Header, { type HeaderProps } from './Header'
import Spinner from './Spinner'
import UnauthorisedLinks from './UnauthorisedLinks'

type Props = {
	title: string
	breadcrumbTitle?: string
	children?: ReactNode
	isLoading?: boolean
	error: string | false
	noData?: boolean // Might be redundant...
	noDataMessage?: string
	actionButtons?: ActionButtonProps[]
	permission?: {
		route: ValidPath
		role?: Role
	}
} & Pick<HeaderProps, 'trail'>

export function AppPageLayout(props: Props) {
	const { title, breadcrumbTitle, trail, children, isLoading, error, noData, noDataMessage, permission, actionButtons } = props

	let unauthorised = false
	if (permission) {
		unauthorised = !permission.role || !checkPermission({ role: permission.role, path: permission.route })
	}

	return (
		<main className="flex flex-col w-full">
			<Header
				currentPage={breadcrumbTitle || title} //
				trail={trail}
			/>
			<div className="flex flex-1 flex-col mx-4 mb-4 mt-2">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col flex-1">
						<div className="flex justify-between items-start mb-12">
							<h1 className="text-3xl font-semibold mb-8">{title}</h1>
							<div className="flex gap-x-2">
								{actionButtons?.map(
									({
										key, //
										content,
										isDisabled,
										isLoading,
										classes,
										onClick,
										disabledToolTip,
									}) => (
										<ActionButton
											key={key}
											content={content}
											onClick={onClick}
											isDisabled={isDisabled}
											isLoading={isLoading}
											disabledToolTip={disabledToolTip}
											classes={mergeClasses(
												'max-w-md', //
												classes,
											)}
										/>
									),
								)}
							</div>
						</div>
						{(() => {
							if (isLoading) {
								return (
									<div className="flex h-full justify-center items-center">
										<Spinner />
									</div>
								)
							}

							if (unauthorised) {
								return <UnauthorisedLinks />
							}

							if (error) {
								return (
									<div className="flex h-full justify-center items-center">
										<p className="text-red-600">Error: {error}</p>
									</div>
								)
							}

							if (noData) {
								return (
									<div className="flex h-full justify-center items-center">
										<p className="text-gray-500">{noDataMessage || 'No data found'}</p>
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
