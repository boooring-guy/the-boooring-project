import { db } from '@/db'
import {
	TodoStatus,
	TodoTable,
	type SessionSelectType,
	type TodoEnums,
	type TodoInsertType,
	type UserSelectType,
} from '@/db/schema'
import { uploadImageToCloudinary } from '@/lib/cloudinary'
import { generateNewTodoId } from '@/lib/generateId'
import { and, desc, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { catchAsync } from '@/lib/catchAsync'
export const getAllTodosHandler = catchAsync(
	async (req: Request, res: Response) => {
		const { user } = res.locals
		const todos = await db.query.TodoTable.findMany({
			where: eq(TodoTable.userId, user.id),
			orderBy: [desc(TodoTable.createdAt)],
		})
		return res.json({
			todos,
		})
	}
)

export const createTodoHandler = catchAsync(
	async (req: Request, res: Response) => {
		const { user, session } = res.locals as {
			user: UserSelectType | null | undefined
			session: SessionSelectType | null | undefined
		}
		let imageUrl = null
		if (!user || !user.id || !session)
			return res.status(401).json({ error: 'Unauthorized' })
		const { title, description, status } = req.body as Partial<
			Omit<TodoInsertType, 'id'>
		>
		if (!title) return res.status(400).json({ error: 'Title is required' })
		const todoId = generateNewTodoId('todo')
		if (req.file) {
			// Stream to cloudinary
			imageUrl = await uploadImageToCloudinary(
				req.file.buffer, // req.fill is filled by the middleware upload
				`${user.id}/todos/${todoId}`
			)
		}

		const todo: TodoInsertType = {
			id: todoId,
			title,
			description: description || title,
			status,
			userId: user.id,
			imageUrl: imageUrl as unknown as string,
		}

		await db.insert(TodoTable).values(todo)
		return res.status(201).json({
			message: 'Todo created successfully',
			todo,
		})
	}
)
export const statusUpdateHandler = catchAsync(
	async (req: Request, res: Response) => {
		const { user, session } = res.locals as {
			user: UserSelectType | null | undefined
			session: SessionSelectType | null | undefined
		}
		if (!user || !user.id || !session)
			return res.status(401).json({ error: 'Unauthorized' })
		// get id of thentodo from the req.params
		const { id, status } = req.params as {
			id: string
			status: TodoEnums
		}
		if (!id) {
			return res.status(400).json({
				message: 'Todo id is required',
			})
		}
		if (!status || !TodoStatus.enumValues.includes(status)) {
			return res.status(400).json({
				error: 'Invalid or missing status',
			})
		}

		// check for validity and ownership of the todo
		const todoRow = await db.query.TodoTable.findFirst({
			where: and(eq(TodoTable.id, id), eq(TodoTable.userId, user.id)),
		})

		if (!todoRow) {
			return res.status(404).json({
				error: 'Todo not found or unauthorized',
			})
		}

		await db
			.update(TodoTable)
			.set({
				status,
				updatedAt: new Date(),
			})
			.where(and(eq(TodoTable.id, id), eq(TodoTable.userId, user.id)))

		return res.status(200).json({
			message: 'Todo status updated successfully',
		})
	}
)
export const updateTodoHandler = catchAsync(
	async (req: Request, res: Response) => {
		const { user, session } = res.locals as {
			user: UserSelectType | null | undefined
			session: SessionSelectType | null | undefined
		}
		if (!user || !user.id || !session)
			return res.status(401).json({ error: 'Unauthorized' })
		// get id of thentodo from the req.params
		type Type = Omit<TodoInsertType, 'id'>
		const { id } = req.params
		const { status, title, description, imageUrl } = req.body as unknown as Type
		if (!id) {
			return res.status(400).json({
				message: 'Todo id is required',
			})
		}
		const statusToSet =
			status && TodoStatus.enumValues.includes(status) ? status : undefined

		// check for validity and ownership
		const todoRow = await db.query.TodoTable.findFirst({
			where: and(eq(TodoTable.id, id), eq(TodoTable.userId, user.id)),
		})

		if (!todoRow) {
			return res.status(404).json({
				error: 'Todo not found or unauthorized',
			})
		}

		await db
			.update(TodoTable)
			.set({
				title,
				description,
				status: statusToSet,
				imageUrl,
				updatedAt: new Date(),
			})
			.where(and(eq(TodoTable.id, id), eq(TodoTable.userId, user.id)))

		return res.json({
			message: 'Todo updated successfully',
			todo: {
				id,
				status: statusToSet || todoRow.status,
				title: title || todoRow.title,
				description: description || todoRow.description,
				imageUrl: imageUrl || todoRow.imageUrl,
			},
		})
	}
)

export const deleteTodoHandler = catchAsync(
	async (req: Request, res: Response) => {
		const { user, session } = res.locals as {
			user: UserSelectType | null | undefined
			session: SessionSelectType | null | undefined
		}
		if (!user || !user.id || !session)
			return res.status(401).json({ error: 'Unauthorized' })
		// get id of thentodo from the req.params
		const { id } = req.params
		if (!id) {
			return res.status(400).json({
				message: 'Todo id is required',
			})
		}

		// check for validity and ownership
		const todoRow = await db.query.TodoTable.findFirst({
			where: and(eq(TodoTable.id, id), eq(TodoTable.userId, user.id)),
		})

		if (!todoRow) {
			return res.status(404).json({
				error: 'Todo not found or unauthorized',
			})
		}

		// delete the todo
		await db
			.delete(TodoTable)
			.where(and(eq(TodoTable.id, id), eq(TodoTable.userId, user.id)))

		return res.json({
			message: 'Todo deleted successfully',
		})
	}
)
