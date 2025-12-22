import { z } from 'zod'

export const AuthSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
})

export type AuthType = z.infer<typeof AuthSchema>
