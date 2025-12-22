'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	if (!browserQueryClient) {
		// Confirms it is server: so create new query client
		browserQueryClient = makeQueryClient()
	} else {
		// confirms it is client so make a new client if it undefined otherwise return the existing client
		if (!browserQueryClient) {
			browserQueryClient = makeQueryClient()
		}
	}
	return browserQueryClient
}

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
	const queryClient = getQueryClient()
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
