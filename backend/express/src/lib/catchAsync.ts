import type { NextFunction, Request, Response } from 'express'

export const catchAsync = (
	cb: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(cb(req, res, next)).catch((err) => next(err))
	}
}
