import { axiosInstance } from '@/lib/axios'
import { QUERY_KEYS } from '@/lib/query-keys'
import { SessionReturnType } from '@/type'
import { useQuery } from '@tanstack/react-query'

async function getSession(): Promise<SessionReturnType> {
	const session = await axiosInstance.get('/auth/whoami')
	return session.data
}

export const useAuth = () => {
	const data = useQuery({
		queryKey: [QUERY_KEYS.session],
		queryFn: getSession,
		staleTime: 5 * 60 * 1000,
		retry: false,
	})
	return {
		user: data.data?.user ?? null,
		session: data.data?.session ?? null,
		isAuthenticated: !!data.data?.user,
		isLoading: data.isLoading,
		isError: data.isError,
		data: data.data ?? null,
	}
}
