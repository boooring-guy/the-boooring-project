import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

		// Initial check
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

		const onChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches)
		}

		// Modern browsers
		mql.addEventListener('change', onChange)

		return () => mql.removeEventListener('change', onChange)
	}, [])

	return !!isMobile
}
