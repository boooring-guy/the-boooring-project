'use client'
import React from 'react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarRail,
	SidebarTrigger,
	useSidebar,
} from '@/components/ui/sidebar'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { HugeiconsIcon } from '@hugeicons/react'
import {
	ChevronDown,
	ChevronLeft,
	Note02Icon,
	Plus,
	Task01FreeIcons,
} from '@hugeicons/core-free-icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import TodoSidebarItem from './TodoSidebarItem'
import { useCreateTodo, useGetAllTodos } from '../../hooks/use-todos'
import { toast } from 'sonner'

const AppSidebar = () => {
	const { data, isLoading, isError, error } = useGetAllTodos()
	const { state } = useSidebar()
	const [todosOpen, setTodosOpen] = React.useState<boolean>(true)
	const createTodoMutaiton = useCreateTodo()
	const createTodo = () => {
		toast.promise(createTodoMutaiton.mutateAsync(), {
			loading: 'Creating todo...',
			success: 'Todo created successfully',
			error: 'Failed to create todo',
		})
	}
	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error: {error.message}</div>

	return (
		<Sidebar
			collapsible='offExamples'
			variant='sidebar'
		>
			<SidebarContent>
				<SidebarHeader className='flex flex-row  items-center justify-between gap-2 w-full border-b h-16'>
					<div className='flex items-center gap-2'>
						<HugeiconsIcon icon={Note02Icon} />
						{state === 'expanded' && (
							<h2 className='font-bold text-xl'>Do-To</h2>
						)}
					</div>
					<Button
						variant={'ghost'}
						onClick={createTodo}
					>
						<HugeiconsIcon icon={Plus} />
					</Button>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<Collapsible
							open={todosOpen}
							onOpenChange={setTodosOpen}
							className='group/collapsible'
						>
							<CollapsibleTrigger
								className={cn(
									buttonVariants({ variant: 'ghost' }),
									'flex justify-between items-center gap-2 w-full'
								)}
							>
								<div className='flex items-center gap-2'>
									<HugeiconsIcon
										icon={Task01FreeIcons}
										size={20}
									/>
									<p>TODO</p>
								</div>
								<HugeiconsIcon icon={todosOpen ? ChevronDown : ChevronLeft} />
							</CollapsibleTrigger>
							<CollapsibleContent>
								{data?.map((todo) => (
									<TodoSidebarItem
										key={todo.id}
										item={todo}
									/>
								))}
								{/* {JSON.stringify(data, null, 2)} */}
							</CollapsibleContent>
						</Collapsible>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<p>Footer</p>
				</SidebarFooter>
			</SidebarContent>

			<SidebarFooter className='border-t'>
				{' '}
				Account Details with Dropdown
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

export default AppSidebar
