import type { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'

export const loggerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const start = Date.now()
	const { method, path } = req
	const timestamp = new Date().toLocaleString()

	res.on('finish', () => {
		const duration = Date.now() - start
		const { statusCode } = res

		let statusColor = chalk.green
		if (statusCode >= 400 && statusCode < 500) statusColor = chalk.yellow
		if (statusCode >= 500) statusColor = chalk.red

		console.log(
			`${chalk.gray(`[${timestamp}]`)} ${chalk.bold.blue(method)} ${chalk.white(
				path
			)} ${statusColor(statusCode)} ${chalk.gray('-')} ${chalk.cyan(
				`${duration}ms`
			)}`
		)
	})

	next()
}
