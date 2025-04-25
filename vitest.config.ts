import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['**/test.ts', '**/*.test.ts'],
		exclude: ['**/node_modules/**', '.next/**'],
		slowTestThreshold: 10000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
