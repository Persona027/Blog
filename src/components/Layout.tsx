import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="pt-20 pb-20 px-4 max-w-6xl mx-auto">
    {children}
  </div>
);
