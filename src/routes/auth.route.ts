import { Router } from 'express'
import {
	loginHandler,
	logoutHandler,
	registerHandler,
	whoAmIHandler,
} from '@/controllers/auth.controller'

const router = Router()

router.post('/login', loginHandler)

router.post('/register', registerHandler)

router.post('/logout', logoutHandler)
router.get('/whoami', whoAmIHandler)
export default router
