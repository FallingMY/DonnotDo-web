import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('ddi_game_state');
    location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-8">
          <div className="bg-surface border border-border p-8 max-w-md w-full text-center space-y-6">
            <div className="font-mono text-xs text-text-secondary uppercase tracking-widest">
              [ SYSTEM / ERROR ]
            </div>
            <div className="font-mono text-text-primary text-lg">
              发生错误
            </div>
            <div className="font-mono text-xs text-text-secondary break-all">
              {this.state.error?.message || 'Unknown error'}
            </div>
            <button
              onClick={this.handleReset}
              className="font-mono uppercase border bg-accent border-accent text-bg min-h-[44px] px-6 py-2 hover:bg-text-primary hover:border-text-primary active:bg-text-primary active:border-text-primary w-full"
            >
              重新开始
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
