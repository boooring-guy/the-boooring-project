import { db } from '@/db'
import type { Request, Response } from 'express'
import { UserTable } from '@/db/schema'
import {
	createSession,
	generateSessionToken,
	validateSessionToken,
} from '@/middleware/auth'
import { generateIdFromEntropySize } from 'lucia'
import { argon2d, argon2i, hash, verify } from 'argon2'
import { Keys } from '@/constants/keys'
import { eq } from 'drizzle-orm'
import { catchAsync } from '@/lib/catchAsync'
export const registerHandler = catchAsync(
	async (req: Request, res: Response) => {
		const { email, password } = req.body

		console.log('Email and Pass Check')
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Email and password are required' })
		}

		// genreate a randomeUSer id
		const userId = generateIdFromEntropySize(10)
		const passwordHash = await hash(password)

		// Add user to table
		await db.insert(UserTable).values({
			id: userId,
			email: email,
			passwordHash: passwordHash,
			createdAt: new Date(),
			updatedAt: new Date(),
			username: email.split('@')[0],
		})

		// Generate a token and create a session
		const token = generateSessionToken()
		const session = await createSession(token, userId)

		// Set cookie
		res.cookie(Keys.AUTH_SESSION, token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 1000 * 60 * 60 * 24 * 30,
			expires: session.expiresAt,
			path: '/',
		})
		return res.status(201).json({ message: 'User created successfully' })
	}
)

export const loginHandler = catchAsync(async (req: Request, res: Response) => {
	const { email, password } = req.body
	// check if the user email exists or not
	const user = await db.query.UserTable.findFirst({
		where: eq(UserTable.email, email),
	})

	if (!user) {
		return res.status(400).json({ message: 'Invalid Credentials!' })
	}

	// compare the hashes correctly
	const isValidPassword = await verify(user.passwordHash, password)
	if (!isValidPassword) {
		return res.status(400).json({ message: 'Invalid Credentials!' })
	}

	// check the auth session
	const token = generateSessionToken()
	const session = await createSession(token, user.id)

	// set the cookie
	res.cookie(Keys.AUTH_SESSION, token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 1000 * 60 * 60 * 24 * 30,
		expires: session.expiresAt,
		path: '/',
	})

	return res.json({
		message: 'Logged In Successfully',
	})
})

export const logoutHandler = catchAsync(async (req: Request, res: Response) => {
	res.clearCookie(Keys.AUTH_SESSION)
	return res.json({
		message: 'Logged Out',
	})
})

export const whoAmIHandler = catchAsync(async (req: Request, res: Response) => {
	// should return session and user from cookie
	const token = req.cookies['auth_session']
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	const { session, user } = await validateSessionToken(token)
	if (!session || !user) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	// trim passwordHash from user
	// @ts-ignore
	delete user.passwordHash
	return res.json({ session, user })
})
