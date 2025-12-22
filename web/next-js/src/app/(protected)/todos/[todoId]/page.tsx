import React from 'react'

const TodoIdPage = async ({
	params,
}: {
	params: Promise<{ todoId: string }>
}) => {
	const { todoId } = await params
	return <div>{todoId}</div>
}

export default TodoIdPage
