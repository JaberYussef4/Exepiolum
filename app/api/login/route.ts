import { NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();
    console.error(email + " " + password);
  // 1. Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  // 2. Check if user exists
  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials1' }, // Generic message for security
      { status: 401 }
    );
  }

  // 3. Verify password
  const isValid = await verifyPassword(user.password, password);
  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid credentials2'  },
      { status: 401 }
    );
  }

  // 4. Successful login
  return NextResponse.json(
    { message: 'Login successful', user: { id: user.id, email: user.email } },
    { status: 200 }
  );
}