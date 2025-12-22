import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/modules/todos/ui/components/AppSidebar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider key={'app-sidebar'}>
			<AppSidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	)
}

export default DashboardLayout
