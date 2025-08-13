import { mergeClasses } from '@/library/utilities/mergeClasses'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="skeleton" //
			className={mergeClasses('bg-accent animate-pulse rounded-md', className)}
			{...props}
		/>
	)
}

export { Skeleton }
