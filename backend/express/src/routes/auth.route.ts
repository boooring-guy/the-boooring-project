import { Router } from 'express'
import {
	loginHandler,
	logoutHandler,
	registerHandler,
	whoAmIHandler,
} from '@/controllers/auth.controller'

const router = Router()

router.post('/login', loginHandler)
router.get('/health', (req, res) => {
	res.json({
		status: 'success',
		message: 'Auth API is running',
	})
})

router.post('/register', registerHandler)

router.post('/logout', logoutHandler)
router.get('/whoami', whoAmIHandler)
export default router
