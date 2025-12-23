// prefetch all Queres

import { QUERY_KEYS } from '@/lib/query-keys'
import { usePrefetchQuery } from '@tanstack/react-query'
import { getAllTodos } from '../apis/todos'

export const usePrefetchTodos = () => {
	const prefetchData = usePrefetchQuery({
		queryKey: [QUERY_KEYS.todos.todos],
		queryFn: getAllTodos,
	})
	return prefetchData
}
