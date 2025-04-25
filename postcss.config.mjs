// Old version!
/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		tailwindcss: {},
	},
}

export default config

/*
UPDATED VERSION

/** @type {import('postcss-load-config').Config} */
/*
const config = {
	plugins: {
		"@tailwindcss/postcss": {},
	},
};

export default config;
*/
// This is the updated version - Friday 18 April 2025
/*
pnpm rm postcss-import autoprefixer postcss-nesting
pnpm update tailwindcss@latest
pnpm add @tailwindcss/postcss postcss

Add
@import "tailwindcss";
to styles.tailwind.css

Make sure you're not using @apply with custom classes - apply utility classes directly instead
*/
