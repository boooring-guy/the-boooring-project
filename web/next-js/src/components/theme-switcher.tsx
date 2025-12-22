'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, ColorsIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ButtonGroup, ButtonGroupText } from './ui/button-group'

export const ThemeSwitcher = () => {
	const { setTheme, theme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	// Wait until mounted on client to prevent hydration mismatch
	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		// Return a placeholder with the same dimensions to avoid Layout Shift
		return (
			<Button
				variant='outline'
				size='icon'
				disabled
				className='opacity-0'
			/>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{/* <ButtonGroup className='bg-accent'>
					<ButtonGroupText>
						<HugeiconsIcon icon={ColorsIcon} />
						{theme}
					</ButtonGroupText>
					<Button
						variant='outline'
						size='icon'
					>
						<HugeiconsIcon icon={ChevronDown} />
					</Button>
				</ButtonGroup> */}
				<div className='flex items-center gap-2 bg-card text-card-foreground p-1 border-border'>
					<HugeiconsIcon icon={ColorsIcon} />
					<span className='capitalize'>{theme}</span>
					<div>
						<HugeiconsIcon icon={ChevronDown} />
					</div>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className='w-40'
			>
				{['latte', 'frappe', 'macchiato', 'mocha'].map((t) => (
					<DropdownMenuItem
						key={t}
						onClick={() => setTheme(t)}
						className='capitalize bg-primary-foreground'
					>
						{t}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
