import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const isDev = import.meta.env.DEV;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
          <h2 className="text-xl font-bold">문제가 발생했습니다</h2>
          <p className="text-gray-600">
            {isDev
              ? this.state.error?.message || "알 수 없는 오류가 발생했습니다."
              : "서비스 이용 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."}
          </p>
          {isDev && this.state.error?.stack && (
            <pre className="max-w-full overflow-auto rounded-md bg-gray-100 p-3 text-left text-xs text-gray-700">
              {this.state.error.stack}
            </pre>
          )}
          <div className="flex gap-2">
            <button
              onClick={this.handleRetry}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              type="button"
            >
              다시 시도
            </button>
            <button
              onClick={this.handleGoHome}
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
              type="button"
            >
              홈으로 이동
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
