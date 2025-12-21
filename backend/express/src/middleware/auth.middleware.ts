import type { Request, Response, NextFunction } from 'express'
import { validateSessionToken } from './auth'
import { Keys } from '@/constants/keys'

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Attach token to every request
	const token = req.cookies?.[Keys.AUTH_SESSION] ?? null

	if (!token) {
		res.clearCookie(Keys.AUTH_SESSION)
	}

	const { session, user } = await validateSessionToken(token)

	if (!session) {
		res.clearCookie(Keys.AUTH_SESSION)
		return res.status(401).json({
			message: 'Invalid session',
		})
	}

	// attack user and session to `express` train
	res.locals.user = user
	res.locals.session = session
	// pass the middleware
	return next()
}
