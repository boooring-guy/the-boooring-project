import express from 'express'
import cookieParser from 'cookie-parser'
import { db } from './db'
import { ENV } from './env'
import chalk from 'chalk'
import authRouter from './routes/auth.route'
import todoRouter from './routes/todo.route'

const app = express()
const port = ENV.PORT || 3000

// necssary middleware
app.use(express.json())
app.use(cookieParser())

// catch all rotues
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
