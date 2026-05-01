import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-10 border border-white/10 text-center max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">出了点问题</h2>
            <p className="text-gray-400 mb-8">页面渲染遇到了意外错误，请尝试刷新页面。</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/30 transition-colors"
            >
              回到首页
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
