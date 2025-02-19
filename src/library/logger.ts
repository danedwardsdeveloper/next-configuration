/* eslint-disable no-console */
import chalk from 'chalk'

import { isProduction } from './environment/publicVariables'

const voidCallback = (): void => {}

const logger = {
  debug: isProduction
    ? voidCallback
    : (...args: unknown[]): void => console.debug(chalk.magenta('[DEBUG]', ...args)),
  info: isProduction
    ? voidCallback
    : (...args: unknown[]): void => console.info(chalk.blue('[INFO]', ...args)),
  warn: isProduction
    ? voidCallback
    : (...args: unknown[]): void => console.warn(chalk.yellow('[WARN]', ...args)),
  error: (...args: unknown[]): void => console.error(chalk.red('[ERROR]'), ...args),
  errorUnknown: (label: string = 'Unknown error: ', error: unknown): void =>
    console.error(
      chalk.red('[ERROR]'),
      label,
      error instanceof Error ? error.message : JSON.stringify(error),
    ),
} as const

export default logger
