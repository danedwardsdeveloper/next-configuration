
import { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/shadcn/breadcrumb'
import { Separator } from '@/components/shadcn/separator'
import { SidebarTrigger } from '@/components/shadcn/sidebar'

export type HeaderProps = {
	currentPage: string
	trail?: Array<{ display: string; href: string }>
}

export default function Header({ currentPage, trail }: HeaderProps) {
	return (
		<header className="flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							{(() => {
								if (currentPage === 'Dashboard') {
									// Not sure wtf is going on here...
									return <BreadcrumbItem className="hidden md:block">Dashboard</BreadcrumbItem>
								}
								return (
									<>
										{/* ToDo: Handle demo links!! */}

										{trail &&
											trail.length > 0 &&
											trail.map(({ display, href }, index) => (
												// biome-ignore lint/suspicious/noArrayIndexKey: static content
												<Fragment key={index}>
													<BreadcrumbItem className="hidden md:block">
														<BreadcrumbLink href={href}>{display}</BreadcrumbLink>
													</BreadcrumbItem>
													<BreadcrumbSeparator className="hidden md:block" />
												</Fragment>
											))}

										<BreadcrumbItem>
											<BreadcrumbPage>{currentPage}</BreadcrumbPage>
										</BreadcrumbItem>
									</>
								)
							})()}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>
		</header>
	)
}
