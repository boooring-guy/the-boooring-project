import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query'
import { createNewTodo, getAllTodos, updateTodoStatus } from '../apis/todos'
import { TodoType } from '@/type'
import { QUERY_KEYS } from '@/lib/query-keys'

/** TODO!
 * const queryClient = new QueryClient()
// example
// Define the "addTodo" mutation
queryClient.setMutationDefaults(['addTodo'], {
  mutationFn: addTodo,
  onMutate: async (variables, context) => {
    // Cancel current queries for the todos list
    await context.client.cancelQueries({ queryKey: ['todos'] })

    // Create optimistic todo
    const optimisticTodo = { id: uuid(), title: variables.title }

    // Add optimistic todo to todos list
    context.client.setQueryData(['todos'], (old) => [...old, optimisticTodo])

    // Return a result with the optimistic todo
    return { optimisticTodo }
  },
  onSuccess: (result, variables, onMutateResult, context) => {
    // Replace optimistic todo in the todos list with the result
    context.client.setQueryData(['todos'], (old) =>
      old.map((todo) =>
        todo.id === onMutateResult.optimisticTodo.id ? result : todo,
      ),
    )
  },
  onError: (error, variables, onMutateResult, context) => {
    // Remove optimistic todo from the todos list
    context.client.setQueryData(['todos'], (old) =>
      old.filter((todo) => todo.id !== onMutateResult.optimisticTodo.id),
    )
  },
  retry: 3,
})

// Start mutation in some component:
const mutation = useMutation({ mutationKey: ['addTodo'] })
mutation.mutate({ title: 'title' })

// If the mutation has been paused because the device is for example offline,
// Then the paused mutation can be dehydrated when the application quits:
const state = dehydrate(queryClient)

// The mutation can then be hydrated again when the application is started:
hydrate(queryClient, state)

// Resume the paused mutations:
queryClient.resumePausedMutations()
 */

export const useCreateTodo = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: createNewTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.todos.todos],
			})
		},
	})

	return mutation
}

export const useGetAllTodos = () => {
	const data = useSuspenseQuery({
		queryKey: [QUERY_KEYS.todos.todos],
		queryFn: getAllTodos,
	})
	return data
}

export const useUpdateTodoStatus = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (data: { id: string; status: string }) =>
			updateTodoStatus(data.id, data.status),
		onMutate: async (newTodo) => {
			await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.todos.todos] })
			const previousTodos = queryClient.getQueryData([QUERY_KEYS.todos.todos])
			queryClient.setQueryData(
				[QUERY_KEYS.todos.todos],
				(old: TodoType[] | undefined) => {
					return old?.map((todo) =>
						todo.id === newTodo.id ? { ...todo, status: newTodo.status } : todo
					)
				}
			)
			return { previousTodos }
		},
		onError: (err, newTodo, context) => {
			queryClient.setQueryData([QUERY_KEYS.todos.todos], context?.previousTodos)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.todos.todos],
			})
		},
	})
	return mutation
}
