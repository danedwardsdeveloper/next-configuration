type LogVerb = 'debug' | 'info' | 'success' | 'warn' | 'error'
type ConsoleMethod = Exclude<LogVerb, 'success'> | 'log'
type Levels = 1 | 2 | 3 | 4 | 5
type Config = {
	verb: LogVerb
	method: ConsoleMethod
	colourDescription: string
	serverColour: `\x1b[${number}m`
	browserColour: `color: #${string}`
}

const loggerConfig: Record<Levels, Config> = {
	1: {
		verb: 'error',
		method: 'error',
		colourDescription: 'red',
		serverColour: '\x1b[31m',
		browserColour: 'color: #FF3838',
	},
	2: {
		verb: 'warn',
		method: 'warn',
		colourDescription: 'orange',
		serverColour: '\x1b[33m',
		browserColour: 'color: #FFA500',
	},
	3: {
		verb: 'debug',
		method: 'debug',
		colourDescription: 'magenta',
		serverColour: '\x1b[35m',
		browserColour: 'color: #c084fc',
	},
	4: {
		verb: 'info',
		method: 'info',
		colourDescription: 'blue',
		serverColour: '\x1b[34m',
		browserColour: 'color: #3498DB',
	},
	5: {
		verb: 'success',
		method: 'log',
		colourDescription: 'green',
		serverColour: '\x1b[32m',
		browserColour: 'color: #16a34a',
	},
}

function safeStringify(data: unknown): string {
	if (typeof data === 'string') return data
	if (data instanceof Promise) return 'Unresolved promise. Did you forget to await?'

	try {
		return JSON.stringify(
			data,
			(_key, value) => {
				if (value instanceof Map || value instanceof Set) {
					return {
						__type: value instanceof Map ? 'Map' : 'Set',
						size: value.size,
						...(value instanceof Map ? { entries: Array.from(value.entries()) } : { values: Array.from(value.values()) }),
					}
				}
				return value
			},
			2,
		)
	} catch {
		return '[Unserializable data]'
	}
}

const stringifyArguments = (...args: unknown[]): string[] => args.map((arg) => (typeof arg === 'string' ? arg : safeStringify(arg)))

const addSkip = <T extends (...args: unknown[]) => void>(fn: T): T & { skip: (...args: unknown[]) => void } => {
	const fnWithSkip = fn as T & { skip: (...args: unknown[]) => void }
	fnWithSkip.skip = (..._args: unknown[]) => {}
	return fnWithSkip
}

const resetServerColour = '\x1b[0m'

const createServerLogger = (config: (typeof loggerConfig)[keyof typeof loggerConfig], label: string) => {
	return (...args: unknown[]) => {
		const message = stringifyArguments(...args).join(' ')
		// biome-ignore lint/suspicious/noConsole: logger
		console[config.method](`${config.serverColour}${label} ${message}${resetServerColour}`)
	}
}

const serverLogger = {
	error: addSkip(createServerLogger(loggerConfig[1], '\n[ERROR]')),
	warn: addSkip(createServerLogger(loggerConfig[2], '\n[WARN]')),
	debug: addSkip(createServerLogger(loggerConfig[3], '\n[DEBUG]')),
	info: addSkip(createServerLogger(loggerConfig[4], '\n[INFO]')),
	success: addSkip(createServerLogger(loggerConfig[5], '\n[SUCCESS]')),
}

const createBrowserLogger = (config: (typeof loggerConfig)[keyof typeof loggerConfig], label: string) => {
	return (...args: unknown[]): void => {
		const message = stringifyArguments(...args).join(' ')
		// biome-ignore lint/suspicious/noConsole: logger
		console[config.method](`%c${label} ${message}`, config.browserColour)
	}
}

const browserLogger = {
	error: addSkip(createBrowserLogger(loggerConfig[1], '\n[ERROR]')),
	warn: addSkip(createBrowserLogger(loggerConfig[2], '\n[WARN]')),
	debug: addSkip(createBrowserLogger(loggerConfig[3], '\n[DEBUG]')),
	info: addSkip(createBrowserLogger(loggerConfig[4], '\n[INFO]')),
	success: addSkip(createBrowserLogger(loggerConfig[5], '\n[SUCCESS]')),
}

const isServer = typeof window === 'undefined'
const logger = isServer ? serverLogger : browserLogger

export default logger
