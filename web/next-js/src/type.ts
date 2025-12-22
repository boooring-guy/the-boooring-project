export type UserSelectType = {
	id: string
	email: string
	username: string
	passwordHash: string
	createdAt: Date
	updatedAt: Date
}

export type TodoType = {
	id: string
	title: string
	userId: string
	description?: string | null | undefined
	status?: 'todo' | 'in_progress' | 'done' | 'due' | 'archived' | undefined
	createdAt?: Date | undefined
	updatedAt?: Date | undefined
	imageUrl?: string | null | undefined
}

export type SessionSelectType = {
	id: string
	createdAt: Date
	updatedAt: Date
	userId: string
	expiresAt: Date
}

export type SessionReturnType = {
	user: UserSelectType
	session: SessionSelectType
} | null
