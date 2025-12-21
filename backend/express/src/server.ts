import express from 'express'
import cookieParser from 'cookie-parser'
import { db } from './db'
import { ENV } from './env'
import chalk from 'chalk'
import authRouter from './routes/auth.route'
import todoRouter from './routes/todo.route'
import { loggerMiddleware } from './middleware/logger.middleware'

const app = express()
const port = Number(ENV.PORT) || 9000

// necssary middleware
app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware) // log all requests

// catch all routes
app.get('/', (req, res) => {
	res.send('Hello World2')
})

app.get('/db-status', async (req, res) => {
	try {
		const data = await db.query.TodoTable.findFirst()
		res.json({
			status: 'success',
			data,
		})
	} catch (error) {
		console.error(error)
		res.status(500).send('DB Status')
	}
})
app.use('/api/health', (req, res) => {
	res.json({
		status: 'success',
		message: 'Server is running',
	})
})
app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter)

// Global Error Handler
import { errorHandler } from './middleware/error.middleware'
app.use(errorHandler)

app.listen(port, () => {
	console.log(chalk.bgCyan(`Server running on port ${port}`))
	console.log(
		'👉',
		chalk.bgMagenta.bold('Live at : '),
		chalk.bold(`http://localhost:${port}`)
	)
})
