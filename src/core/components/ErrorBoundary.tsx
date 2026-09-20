import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  toolName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error caught in tool ${this.props.toolName || 'Unknown'}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-950 border border-red-800 rounded-lg text-red-200">
          <h3 className="text-lg font-bold mb-2">
            Something went wrong in {this.props.toolName || 'this module'}.
          </h3>
          <p className="text-sm font-mono bg-red-900 p-2 rounded overflow-auto">
            {this.state.error?.message}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-red-800 hover:bg-red-700 rounded text-white text-sm transition-colors"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again / Reset Tool
          </button>
        </div>
      );
    }

    return this.props.children;
  }
          }
