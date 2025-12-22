import { axiosInstance } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AuthType } from '../schema'

export const useRegisterMutation = () => {
	return useMutation({
		mutationFn: async (data: AuthType) => {
			const formData = new FormData()
			formData.append('email', data.email)
			formData.append('password', data.password)
			const response = await axiosInstance.post('/auth/register', formData)
			return response.data
		},
	})
}

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (data: AuthType) => {
			const formData = new FormData()
			formData.append('email', data.email)
			formData.append('password', data.password)
			const response = await axiosInstance.post('/auth/login', formData)
			return response.data
		},
	})
}
