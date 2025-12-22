import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
	const { isLoading, isError } = useAuth()
	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error loading session</div>
	return (
		<div className='flex justify-center items-center flex-col space-y-6 min-h-screen'>
			<div className='flex flex-col items-center gap-2'>
				<Badge variant='secondary'>The Boooring project</Badge>
				<h1 className='text-4xl font-bold'>Do-To</h1>
				<p className='text-muted-foreground text-center text-sm max-w-xs'>
					One to-do concept with multiple programs
				</p>
			</div>
			<ButtonGroup>
				<Link href='/todos'>
					<Button>Get Started</Button>
				</Link>
				<Button variant='ghost'>Github Repo</Button>
			</ButtonGroup>

			{/* TODO: ASCI art - animated */}
		</div>
	)
}

export default DashboardPage
