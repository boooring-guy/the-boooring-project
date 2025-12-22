'use client'

import React from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthSchema, AuthType } from '@/modules/auth/schema'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { HugeiconsIcon } from '@hugeicons/react'
import {
	ArrowRight02Icon,
	CircleLock01Icon,
	Mail01Icon,
	UserAccountIcon,
	ViewIcon,
	ViewOffIcon,
} from '@hugeicons/core-free-icons'
import { Spinner } from '@/components/ui/spinner'
import { useLoginMutation, useRegisterMutation } from '../../hooks/useAuth'
import { toast } from 'sonner'

interface AuthViewProps {
	variant: 'login' | 'register'
}

const AuthView = ({ variant }: AuthViewProps) => {
	const isLogin = variant === 'login'
	const [seePassword, setSeePassword] = React.useState(false)

	const loginMutation = useLoginMutation()
	const registerMutation = useRegisterMutation()

	const isPending = loginMutation.isPending || registerMutation.isPending

	const {
		control,
		handleSubmit,
		clearErrors,
		formState: { errors, isSubmitted },
	} = useForm<AuthType>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: AuthType) => {
		const mutation = isLogin ? loginMutation : registerMutation

		toast.promise(mutation.mutateAsync(data), {
			loading: isLogin ? 'Signing you in...' : 'Creating your account...',
			success: () => {
				return isLogin
					? 'Logged in successfully!'
					: 'Account created successfully!'
			},
			error: (err: { response?: { data?: { message?: string } } }) => {
				return err?.response?.data?.message || 'Authentication failed'
			},
		})
	}

	return (
		<main className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background'>
			{/* Decorative background elements */}
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10'>
				<div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]' />
				<div className='absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]' />
			</div>

			<Card className='w-full max-w-[24rem] border-none shadow-2xl bg-card/80 backdrop-blur-sm sm:border sm:border-border/50'>
				<CardHeader className='pb-4'>
					<div className='flex items-center justify-between'>
						<div className='flex p-2.5 rounded-xl bg-primary/10 text-primary'>
							<HugeiconsIcon
								icon={UserAccountIcon}
								strokeWidth={2}
								size={24}
							/>
						</div>
					</div>
					<div className='mt-4 space-y-1.5'>
						<CardTitle className='text-2xl font-bold tracking-tight'>
							{isLogin ? 'Welcome back' : 'Create an account'}
						</CardTitle>
						<CardDescription className='text-muted-foreground/80'>
							{isLogin
								? 'Enter your credentials to access your account'
								: 'Fill in the details below to get started'}
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-5'
						noValidate
					>
						<FieldGroup className='space-y-4'>
							<Field data-invalid={isSubmitted && !!errors.email}>
								<FieldLabel htmlFor='email'>Email Address</FieldLabel>
								<Controller
									name='email'
									control={control}
									render={({ field }) => (
										<InputGroup>
											<InputGroupAddon>
												<HugeiconsIcon
													icon={Mail01Icon}
													strokeWidth={1.5}
												/>
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												id='email'
												type='email'
												placeholder='name@example.com'
												disabled={isPending}
												aria-invalid={isSubmitted && !!errors.email}
												onChange={(e) => {
													field.onChange(e)
													clearErrors('email')
												}}
												className='transition-all focus:ring-2 focus:ring-primary/20'
											/>
										</InputGroup>
									)}
								/>
								<FieldError errors={[errors.email]} />
							</Field>

							<Field data-invalid={isSubmitted && !!errors.password}>
								<div className='flex items-center justify-between'>
									<FieldLabel htmlFor='password'>Password</FieldLabel>
									{isLogin && (
										<Link
											href='/auth/forgot-password'
											className='text-[11px] font-medium text-primary hover:underline'
										>
											Forgot password?
										</Link>
									)}
								</div>
								<Controller
									name='password'
									control={control}
									render={({ field }) => (
										<InputGroup>
											<InputGroupAddon>
												<HugeiconsIcon
													icon={CircleLock01Icon}
													strokeWidth={1.5}
												/>
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												id='password'
												type={seePassword ? 'text' : 'password'}
												placeholder='••••••••'
												disabled={isPending}
												aria-invalid={isSubmitted && !!errors.password}
												onChange={(e) => {
													field.onChange(e)
													clearErrors('password')
												}}
												className='transition-all focus:ring-2 focus:ring-primary/20'
											/>
											<InputGroupAddon align='inline-end'>
												<InputGroupButton
													variant='ghost'
													size='icon-xs'
													type='button'
													onClick={() => setSeePassword(!seePassword)}
												>
													<HugeiconsIcon
														icon={seePassword ? ViewIcon : ViewOffIcon}
														strokeWidth={1.5}
													/>
												</InputGroupButton>
											</InputGroupAddon>
										</InputGroup>
									)}
								/>
								<FieldError errors={[errors.password]} />
							</Field>
						</FieldGroup>

						<Button
							type='submit'
							className='w-full h-10 font-semibold transition-all'
							disabled={isPending}
						>
							{isPending ? (
								<Spinner className='mr-0' />
							) : (
								<>
									{isLogin ? 'Sign In' : 'Create Account'}
									<HugeiconsIcon
										icon={ArrowRight02Icon}
										strokeWidth={2}
										size={18}
										className='ml-2'
									/>
								</>
							)}
						</Button>

						<div className='relative my-6'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t border-border/50' />
							</div>
							<div className='relative flex justify-center text-[10px] uppercase'>
								<span className='bg-card px-2 text-muted-foreground/60'>
									Or continue with
								</span>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-3'>
							<Button
								variant='outline'
								className='w-full h-9 border-border/50 hover:bg-muted/50 transition-colors'
								type='button'
								disabled={isPending}
								onClick={() => {
									toast.info('Google login is not implemented yet', {
										description: 'You can expect it in the next update',
									})
								}}
							>
								{/* Placeholder for Google Login */}
								<span className='text-xs font-medium'>Google</span>
							</Button>
							<Button
								variant='outline'
								className='w-full h-9 border-border/50 hover:bg-muted/50 transition-colors'
								type='button'
								disabled={isPending}
								onClick={() => {
									toast.info('Github login is not implemented yet', {
										description: 'You can expect it in the next update',
									})
								}}
							>
								{/* Placeholder for GitHub Login */}
								<span className='text-xs font-medium'>GitHub</span>
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4 rounded-b-xl border-t border-border/50 bg-muted/30 py-6 mt-4'>
					<p className='text-center text-[13px] text-muted-foreground'>
						{isLogin ? "Don't have an account?" : 'Already have an account?'}
						<Link
							href={isLogin ? '/auth/register' : '/auth/login'}
							className='ml-1.5 font-semibold text-primary hover:underline transition-colors decoration-primary/30 underline-offset-4'
						>
							{isLogin ? 'Create one now' : 'Sign in here'}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</main>
	)
}

export default AuthView
