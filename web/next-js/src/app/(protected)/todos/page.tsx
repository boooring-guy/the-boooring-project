'use client'
import { useAuth } from '@/hooks/use-session'
import React from 'react'

const DashboardPage = () => {
	const { data, isLoading, isError } = useAuth()
	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error loading session</div>
	return (
		<div className='flex justify-center items-center flex-col space-y-6 min-h-screen w-full'>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}

export default DashboardPage
