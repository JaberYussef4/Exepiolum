'use server';

import { signIn } from '@/lib/auth';
import bcrypt from 'bcrypt';

// A simple in-memory user store for demonstration
const users: Record<string, { hashedPassword: string }> = {};

export async function signup(prevState: any, formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	// Basic validation
	if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
		return { message: 'Invalid credentials' };
	}

	// In a real app, you'd use a library like bcrypt to hash the password
	// For this example, we'll store it in-memory.
	// This is NOT secure and only for demonstration purposes.
	if (users[email]) {
		return { message: 'User already exists' };
	}

	const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
	if (!passwordRegex.test(password)) {
		return {
			message: 'Password must be at least 8 characters long, contain a number, and a special character.',
		};
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	users[email] = { hashedPassword };

	try {
		// For demo, we sign in the user directly after signup
		await signIn('credentials', { email, password, redirectTo: '/dashboard' });
	} catch (error: any) {
		if (error.type === 'CredentialsSignin') {
			return { message: 'Invalid credentials' };
		}
		if (error.type) {
			return { message: 'An error occurred' };
		}
		throw error;
	}
	return { message: 'Signup successful, redirecting...' };
}

export async function login(prevState: any, formData: FormData) {
	try {
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		await signIn('credentials', { email, password, redirectTo: '/dashboard' });
	} catch (error: any) {
		if (error.type === 'CredentialsSignin') {
			return { message: 'Invalid email or password' };
		}
		if (error.type) {
			return { message: 'Something went wrong.' };
		}
		throw error;
	}
	return { message: 'Login successful, redirecting...' };
} 