import type { ErrorResponse } from '@/types/response'
import type { Request, Response, NextFunction } from 'express'

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const statusCode = err.statusCode || 500
	const message = err.message || 'Something went wrong'

	console.error(`[ERROR] ${req.method} ${req.url}:`, err)

	const error: ErrorResponse = {
		status: 'error',
		code: statusCode,
		message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
	}

	res.status(statusCode).json(error)
}
