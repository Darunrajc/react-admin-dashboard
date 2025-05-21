import React, { Component} from 'react';
import type { ErrorInfo, ReactNode } from 'react';


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    return this.state.hasError
      ? <h2>Something went wrong.</h2>
      : this.props.children;
  }
}

export default ErrorBoundary;
