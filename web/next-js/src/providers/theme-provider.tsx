'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import * as React from 'react'

// In this project the themes are different these are inspired by Catppuccin
// themes are Catppuccin Latte, Frappe, Macchiato, Mocha
export type Theme = 'latte' | 'frappe' | 'macchiato' | 'mocha'
export const ThemeProvider = ({
	children,
	...props
}: React.ComponentProps<typeof NextThemeProvider>) => {
	return (
		<NextThemeProvider
			defaultTheme='latte'
			enableSystem={false}
			disableTransitionOnChange
			attribute='class'
			themes={['latte', 'frappe', 'macchiato', 'mocha']}
			{...props}
		>
			{children}
		</NextThemeProvider>
	)
}
