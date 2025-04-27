import { mergeClasses } from '@/library/utilities/public'

interface Props {
	colour?: 'text-blue-600 dark:text-blue-400' | 'text-white dark:text-blue-300'
	size?: 'size-5' | 'size-7'
}

export default function Spinner({ colour = 'text-blue-600 dark:text-blue-400', size = 'size-7' }: Props) {
	return (
		<svg className={mergeClasses('animate-spin', size, colour)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<title>Loading spinner</title>
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	)
}
