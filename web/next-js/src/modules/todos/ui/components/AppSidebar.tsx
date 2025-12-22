'use client'
import React, { useEffect } from 'react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarSeparator,
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
	ChevronUp,
	Note02Icon,
	Task01FreeIcons,
	TouchpadOff,
} from '@hugeicons/core-free-icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import TodoSidebarItem from './TodoSidebarItem'

const AppSidebar = () => {
	const { state } = useSidebar()
	const [todosOpen, setTodosOpen] = React.useState<boolean>(false)

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
					<SidebarTrigger>
						<HugeiconsIcon icon={Note02Icon} />
					</SidebarTrigger>
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
								<TodoSidebarItem
									item={{
										id: '1',
										title: 'Todo 1',
										userId: '1',
										createdAt: new Date(),
										updatedAt: new Date(),
									}}
								/>
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
		</Sidebar>
	)
}

export default AppSidebar
