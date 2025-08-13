import { Settings, LayoutDashboard, type LucideIcon } from 'lucide-react'

type MenuItem = {
	display: string
	path: string
	icon: LucideIcon
}

export const appMenuItems: MenuItem[] = [
	{
		display: 'Dashboard',
		path: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		display: 'Settings',
		path: '/settings',
		icon: Settings,
	},
]