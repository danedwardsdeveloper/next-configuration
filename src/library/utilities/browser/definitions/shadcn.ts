import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Required by ShadCN components - don't change the name
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
