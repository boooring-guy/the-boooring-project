import { db } from '@/db'
import { SessionTable, UserTable, type SessionInsertType } from '@/db/schema'
import { sha256 } from '@oslojs/crypto/sha2'
import {
	encodeBase32LowerCaseNoPadding,
	encodeHexLowerCase,
} from '@oslojs/encoding'
import { eq } from 'drizzle-orm'

export function generateSessionToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(20))
	return encodeBase32LowerCaseNoPadding(bytes)
}

// 🎫 Create Session

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
	const session: SessionInsertType = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
	}
	await db.insert(SessionTable).values(session)
	return session
}
/**
 * Validate session token
 * @param token
 * @description This function takes in token and validates it with database
 */
export async function validateSessionToken(token: string | null) {
	if (!token) {
		return {
			session: null,
			user: null,
		}
	}
	// generate sessionId with sha256
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
	const [result] = await db
		.select({
			user: UserTable,
			session: SessionTable,
		})
		.from(SessionTable)
		.innerJoin(UserTable, eq(SessionTable.userId, UserTable.id))
		.where(eq(SessionTable.id, sessionId))
		.limit(1)

	if (!result) {
		return {
			session: null,
			user: null,
		}
	}
	const { user, session } = result

	//  If expired -> delete it
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(SessionTable).where(eq(SessionTable.id, sessionId))
		return {
			session: null,
			user: null,
		}
	}

	// extend session if half expired (e.g., if less than 15 days left)
	// Original logic was very short (1 hour). Let's make it more robust.
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		await db
			.update(SessionTable)
			.set({
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
				updatedAt: new Date(),
			})
			.where(eq(SessionTable.id, sessionId))
	}

	// Final return when everything is fine
	return {
		session,
		user,
	}
}
