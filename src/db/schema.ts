import {
	boolean,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core'

// simple todo schema

// enums for status of todo
export type TodoEnums = 'todo' | 'in_progress' | 'done' | 'due' | 'archived'
export const TodoStatus = pgEnum('todo_status', [
	'todo',
	'in_progress',
	'done',
	'due',
	'archived',
])

export const TodoTable = pgTable('todo', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	status: TodoStatus('status').notNull().default('todo'),
	userId: text('user_id')
		.notNull()
		.references(() => UserTable.id),
	imageUrl: text('image_url'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const UserTable = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').unique().notNull(),
	username: text('username').notNull(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const SessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => UserTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type SessionInsertType = typeof SessionTable.$inferInsert
export type SessionSelectType = typeof SessionTable.$inferSelect

export type UserSelectType = typeof UserTable.$inferSelect
export type UserInsertType = typeof UserTable.$inferInsert

export type TodoInsertType = typeof TodoTable.$inferInsert
export type TodoSelectType = typeof TodoTable.$inferSelect
