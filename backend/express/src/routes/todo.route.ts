import { Router } from 'express'
import { authMiddleware } from '@/middleware/auth.middleware'
import {
	createTodoHandler,
	deleteTodoHandler,
	getAllTodosHandler,
	updateTodoHandler,
	statusUpdateHandler,
} from '@/controllers/todo.controller'
import { singleUpload } from '@/middleware/upload'

const router = Router()

// Must be authenticated to access any of the routes below
router.use(authMiddleware)

router.get('/all', getAllTodosHandler)
router.post('/new', singleUpload('image'), createTodoHandler) //image is the name of the file, it is key of the key-value pair
router.put('/status/:id/:status', statusUpdateHandler)
router.patch('/:id', singleUpload('image'), updateTodoHandler)
router.delete('/:id', deleteTodoHandler)
export default router
