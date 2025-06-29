import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

// A simple in-memory user store for demonstration
const users: Record<string, { hashedPassword: string }> = {};

// The NextAuthConfig type is causing a linter error, so we are letting
// TypeScript infer the type of the config object.
export const config = {
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: {  label: "Password", type: "password" }
			},
			async authorize(credentials) {
				if (!credentials || !credentials.email || !credentials.password) {
					return null;
				}

				const email = credentials.email as string;
				const password = credentials.password as string;

				const user = users[email];
				if (!user) return null;

				const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
				if (passwordsMatch) {
					return { id: email, name: email, email };
				}

				return null;
			},
		}),
	],
	callbacks: {
		// authorized({ request, auth }) {
		//   const { pathname } = request.nextUrl;
		//   if (pathname === "/middleware-example") return !!auth;
		//   return true;
		// },
	},
	// secret: process.env.AUTH_SECRET, // Add a secret for production
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// Mock signup function that "adds" a user to the in-memory store
(async () => {
	const email = 'admin@example.com';
	if (!users[email]) {
		const hashedPassword = await bcrypt.hash('password123!', 10);
		users[email] = { hashedPassword };
		console.log('Test user created: admin@example.com / password123!');
	}
})(); 