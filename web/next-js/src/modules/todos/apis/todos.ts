import { axiosInstance } from '@/lib/axios'
import {
	fakeDescriptionMaker,
	fakeTodoMaker,
	randomStatusPicker,
} from '@/lib/utils'
import { TodoType } from '@/type'

export async function getAllTodos() {
	const response = await axiosInstance.get('/todos/all')
	return response.data['todos'] as unknown as TodoType[]
}

export async function createNewTodo() {
	const response = await axiosInstance.post<TodoType>('/todos/new', {
		title: fakeTodoMaker(),
		completed: false,
		description: fakeDescriptionMaker(),
		status: randomStatusPicker(),
	})
	return response.data
}

// /status/:id/:status
export async function updateTodoStatus(id: string, status: string) {
	const response = await axiosInstance.put(`/todos/status/${id}/${status}`)
	return response.data.todo
}

//  {
//     id: string;
//     title: string;
//     userId: string;
//     description?: string | null | undefined;
//     status?: "todo" | "in_progress" | "done" | "due" | "archived" | undefined;
//     createdAt?: Date | undefined;
//     updatedAt?: Date | undefined;
//     imageUrl?: string | null | undefined;
// }
