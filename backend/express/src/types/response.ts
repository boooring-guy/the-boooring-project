// A type for the response object

export interface ResponseType {
	status: 'success' | 'error'
	message: string
	data?: any
}

export interface SuccessResponse extends ResponseType {
	status: 'success'
}

export interface ErrorResponse extends ResponseType {
	status: 'error'
	code?: number
	stack?: string
}
