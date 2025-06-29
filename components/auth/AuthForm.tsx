'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login, signup } from '@/actions/auth-actions';
import { useEffect, useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);
	const [loginState, loginAction] = useFormState(login, undefined);
	const [signupState, signupAction] = useFormState(signup, undefined);
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const emailRegex = useMemo(() => /.+@.+\..+/, []);
	const passwordRegex = useMemo(() => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, []);

	useEffect(() => {
		if(email && !emailRegex.test(email)) {
			setEmailError('Please enter a valid email address.');
		} else {
			setEmailError('');
		}
	}, [email, emailRegex]);

	useEffect(() => {
		if(password && !isLogin && !passwordRegex.test(password)) {
			setPasswordError('Password must be at least 8 characters long, contain a number, and a special character.');
		} else {
			setPasswordError('');
		}
	}, [password, isLogin, passwordRegex]);

	useEffect(() => {
		if (loginState?.message) {
			if (loginState.message.includes('successful')) {
				toast.success(loginState.message);
				router.push('/dashboard');
			} else {
				toast.error(loginState.message);
			}
		}
	}, [loginState, router]);

	useEffect(() => {
		if (signupState?.message) {
			if (signupState.message.includes('successful')) {
				toast.success(signupState.message);
				const formData = new FormData();
				formData.append('email', email);
				formData.append('password', password);
				loginAction(formData);
			} else {
				toast.error(signupState.message);
			}
		}
	}, [signupState, loginAction, email, password]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
			<div className="w-full max-w-md p-8 space-y-6 bg-white/10 rounded-lg shadow-2xl backdrop-blur-md">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-white">{isLogin ? 'Login' : 'Sign Up'}</h1>
					<p className="text-gray-300">
						{isLogin ? 'Welcome back!' : 'Create an account to get started.'}
					</p>
				</div>
				<form action={isLogin ? loginAction : signupAction} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-200"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className={`block w-full px-3 py-2 mt-1 text-white bg-white/20 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 sm:text-sm ${emailError ? 'border-red-500' : 'border-gray-600'}`}
						/>
						{emailError && <p className="mt-2 text-sm text-red-400">{emailError}</p>}
					</div>
					<div className="relative">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-200"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className={`block w-full px-3 py-2 mt-1 text-white bg-white/20 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 sm:text-sm ${passwordError ? 'border-red-500' : 'border-gray-600'}`}
						/>
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer top-7" onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
						</div>
						{passwordError && <p className="mt-2 text-sm text-red-400">{passwordError}</p>}
					</div>
					<SubmitButton />
				</form>
				<p className="text-sm text-center text-gray-400">
					{isLogin ? "Don't have an account?" : 'Already have an account?'}
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="ml-1 font-medium text-indigo-400 hover:text-indigo-300"
					>
						{isLogin ? 'Sign up' : 'Login'}
					</button>
				</p>
			</div>
		</div>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			aria-disabled={pending}
			className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 transition-opacity"
		>
			{pending ? 'Submitting...' : 'Submit'}
		</button>
	);
} 