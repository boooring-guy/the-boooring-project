import { buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuSub, SidebarMenuSubItem } from '@/components/ui/sidebar'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TodoType } from '@/type'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Dropdown } from 'react-day-picker'
import { useUpdateTodoStatus } from '../../hooks/use-todos'

function mapStatusToShape(status: TodoType['status']) {
	switch (status) {
		case 'todo':
			return <div className='bg-chart-5 size-2 rounded-none'></div>
		case 'in_progress':
			return <div className='bg-chart-3 size-2 rounded-none'></div>
		case 'done':
			return <div className='bg-chart-4 size-2 rounded-none'></div>
		case 'archived':
			return <div className='bg-muted-foreground size-2 rounded-none'></div>
		case 'due':
			return <div className='bg-chart-1 size-2 rounded-none'></div>
		default:
			return <div className='bg-sidebar-accent size-2 rounded-none'></div>
	}
}

const TodoSidebarItem = ({ item }: { item: TodoType }) => {
	const pathaname = usePathname()
	const isActive = pathaname === `/todos/${item.id}`
	return (
		<SidebarMenuSub>
			<SidebarMenuSubItem>
				<Link
					href={`/todos/${item.id}`}
					className={cn(
						buttonVariants({
							variant: 'ghost',
							size: 'sm',
						}),
						'w-full justify-between',
						{
							'bg-muted text-foreground': isActive,
						}
					)}
				>
					<div className='flex items-center gap-2  flex-1'>
						<p className='truncate max-w-32 text-ellipsis '>{item.title}</p>
					</div>
					<StatusChangeSelectMenu item={item} />
				</Link>
			</SidebarMenuSubItem>
		</SidebarMenuSub>
	)
}

export default TodoSidebarItem

function StatusChangeSelectMenu({ item }: { item: TodoType }) {
	const statusUpdateMutation = useUpdateTodoStatus()
	return (
		<Select
			value={item.status}
			onValueChange={(val) => {
				const normalizedValue = val as string
				statusUpdateMutation.mutateAsync({
					id: item.id,
					status: normalizedValue,
				})
			}}
		>
			<Tooltip>
				<TooltipTrigger asChild>
					<SelectTrigger className={'w-10 bg-transparent! border-none!'}>
						<span className='flex items-center cursor-pointer'>
							[{mapStatusToShape(item.status)}]
						</span>
					</SelectTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>{item.status}</p>
				</TooltipContent>
			</Tooltip>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Change Status</SelectLabel>
					<SelectItem value='todo'>
						<div className='flex items-center gap-2'>
							<div className='flex items-center'>
								[{mapStatusToShape('todo')}]
							</div>
							<p>Todo</p>
						</div>
					</SelectItem>
					<SelectItem value='in_progress'>
						<div className='flex items-center gap-2'>
							<div className='flex items-center'>
								[{mapStatusToShape('in_progress')}]
							</div>
							<p>In Progress</p>
						</div>
					</SelectItem>
					<SelectItem value='done'>
						<div className='flex items-center gap-2'>
							<div className='flex items-center'>
								[{mapStatusToShape('done')}]
							</div>
							<p>Done</p>
						</div>
					</SelectItem>
					<SelectItem value='archived'>
						<div className='flex items-center gap-2'>
							<div className='flex items-center'>
								[{mapStatusToShape('archived')}]
							</div>
							<p>Archived</p>
						</div>
					</SelectItem>
					<SelectItem value='due'>
						<div className='flex items-center gap-2'>
							<div className='flex items-center'>
								[{mapStatusToShape('due')}]
							</div>
							<p>Due</p>
						</div>
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
