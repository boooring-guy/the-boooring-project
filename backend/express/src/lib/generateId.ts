import { nanoid } from 'nanoid'

type Prefix = 'todo'
export const generateNewTodoId = (prefix: Prefix) => {
	const randomId = nanoid(8)
	return `${prefix}-${randomId}`
}
