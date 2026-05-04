import React, { Component, ReactNode } from 'react';
import { Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-museum-beige flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-museum-cream rounded-2xl shadow-warm-lg p-10 max-w-md w-full border border-museum-walnut/10">
            <h1 className="text-2xl font-bold text-museum-walnut mb-2">Ceva nu a mers bine</h1>
            <p className="text-museum-walnut/60 mb-8">Reîncarcă pagina sau revino la tururi.</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-museum-walnut text-museum-cream px-6 py-3 rounded-full font-semibold shadow-warm hover:bg-museum-walnut/90 transition-all"
            >
              <Home size={18} /> Tururi
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
