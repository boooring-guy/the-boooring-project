import { SidebarMenuSub, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { TodoType } from '@/type'
import Link from 'next/link'
import React from 'react'

const TodoSidebarItem = ({ item }: { item: TodoType }) => {
	return (
		<SidebarMenuSub>
			<SidebarMenuSubItem>
				<Link href={`/todos/${item.id}`}>
					<span>{item.title}</span>
				</Link>
			</SidebarMenuSubItem>
		</SidebarMenuSub>
	)
}

export default TodoSidebarItem
