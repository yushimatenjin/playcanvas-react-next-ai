"use client"

import { ReactNode } from 'react';

interface CanvasLayoutProps {
  children: ReactNode;
}

export default function CanvasLayout({ children }: CanvasLayoutProps) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}