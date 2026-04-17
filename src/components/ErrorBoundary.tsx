import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfaf7] p-6 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-brand-900/10 max-w-lg border border-brand-100">
            <h1 className="text-2xl font-display font-bold text-red-600 mb-4">Oops, something went wrong</h1>
            <p className="text-gray-600 mb-6">
              There was an error loading this part of the app. Try refreshing the page.
            </p>
            <pre className="text-left bg-gray-50 p-4 rounded-xl overflow-auto text-xs text-red-500 mb-6 max-h-40 border border-gray-100">
              {this.state.error?.message}
            </pre>
            <button
              className="px-6 py-3 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
