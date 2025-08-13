'use client'
import { createContext, useContext, useState, type ReactNode, type ComponentProps } from 'react'

type SidebarContextProps = {
	open: boolean
	setOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

function useSidebar() {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider.')
	}
	return context
}

function SidebarProvider({
	defaultOpen = true,
	children,
	className,
	...props
}: ComponentProps<'div'> & {
	defaultOpen?: boolean
}) {
	const [open, setOpen] = useState(defaultOpen)

	return (
		<SidebarContext.Provider value={{ open, setOpen }}>
			<div className={`flex min-h-screen ${className || ''}`} {...props}>
				{children}
			</div>
		</SidebarContext.Provider>
	)
}

function Sidebar({ className, children, ...props }: ComponentProps<'div'>) {
	return (
		<div className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border w-64 flex flex-col ${className || ''}`} {...props}>
			{children}
		</div>
	)
}

function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
	return <div className={`flex flex-col gap-2 p-2 ${className || ''}`} {...props} />
}

function SidebarContent({ className, ...props }: ComponentProps<'div'>) {
	return <div className={`flex min-h-0 flex-1 flex-col gap-2 overflow-auto ${className || ''}`} {...props} />
}

function SidebarFooter({ className, ...props }: ComponentProps<'div'>) {
	return <div className={`flex flex-col gap-2 p-2 ${className || ''}`} {...props} />
}

function SidebarGroup({ className, ...props }: ComponentProps<'div'>) {
	return <div className={`relative flex w-full min-w-0 flex-col p-2 ${className || ''}`} {...props} />
}

function SidebarGroupContent({ className, ...props }: ComponentProps<'div'>) {
	return <div className={`w-full ${className || ''}`} {...props} />
}

function SidebarMenu({ className, ...props }: ComponentProps<'ul'>) {
	return <ul className={`flex w-full min-w-0 flex-col gap-1 ${className || ''}`} {...props} />
}

function SidebarMenuItem({ className, ...props }: ComponentProps<'li'>) {
	return <li className={`group/menu-item relative ${className || ''}`} {...props} />
}

function SidebarMenuButton({
	asChild = false,
	isActive = false,
	className,
	children,
	...props
}: ComponentProps<'button'> & {
	asChild?: boolean
	isActive?: boolean
}) {
	if (asChild) {
		return <>{children}</>
	}

	const baseClasses = `flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100 transition-colors ${
		isActive ? 'bg-gray-100 font-medium' : ''
	} ${className || ''}`

	return (
		<button className={baseClasses} {...props}>
			{children}
		</button>
	)
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	useSidebar,
}