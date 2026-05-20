import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

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
          <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-10 border border-red-500/20 text-center max-w-md animate-scale-in">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08),transparent_70%)] pointer-events-none" />
            <div className="relative">
              <AlertTriangle size={48} className="text-red-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-red-300 mb-4 font-heading">出了点问题</h2>
              <p className="text-gray-400 mb-8">页面渲染遇到了意外错误，请尝试刷新页面。</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-gray-300 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                回到首页
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
