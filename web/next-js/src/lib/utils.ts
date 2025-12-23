import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

import { faker } from '@faker-js/faker'

export function fakeTodoMaker() {
	return faker.word.adjective() + ' ' + faker.word.noun()
}

export function fakeDescriptionMaker() {
	return faker.lorem.sentence(2)
}

export function randomStatusPicker() {
	return faker.helpers.arrayElement([
		'todo',
		'in_progress',
		'done',
		'due',
		'archived',
	])
}
