'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/shadcn/sidebar'
import { appMenuItems } from './appMenuItems'

export function MenuSideBar() {
	const pathname = usePathname()

	return (
		<Sidebar>
			<SidebarHeader>
				<Link href="/" className="flex flex-row gap-x-2 items-center px-2 pb-2">
					<span className="font-medium">App Name</span>
				</Link>
			</SidebarHeader>

			<SidebarContent className="px-2 pb-2">
				<SidebarMenu>
					<SidebarGroup>
						<SidebarGroupContent className="flex flex-col gap-y-1">
							{appMenuItems.map((item) => {
								const isActive = pathname === item.path

								return (
									<SidebarMenuItem key={item.path}>
										<SidebarMenuButton asChild isActive={isActive}>
											<Link 
												href={item.path} 
												className={`flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${
													isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : ''
												}`}
											>
												<item.icon className="w-4 h-4" />
												<span>{item.display}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="px-2 pb-2">
				<span>Footer</span>
			</SidebarFooter>
		</Sidebar>
	)
}