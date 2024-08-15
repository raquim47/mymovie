import React, { Component, ReactNode } from 'react';
import { ERRORS } from 'utils/errors';
import ErrorView from '../error-view';

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView message={this.state.error?.message || ERRORS.UNKNOWN_ERROR} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
