import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		host: 'localhost',
		port: 5432,
		user: 'tbrs',
		password: 'tbrs',
		database: 'tbrs_db',
		ssl: false,
	},
})
