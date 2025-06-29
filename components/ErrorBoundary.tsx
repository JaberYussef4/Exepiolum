'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
            <h1 className="text-3xl font-bold">Something went wrong.</h1>
            <p>We are sorry for the inconvenience.</p>
            <button onClick={() => this.setState({ hasError: false })} className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md">
                Try again
            </button>
        </div>
      );
    }

    return this.props.children;
  }
} 