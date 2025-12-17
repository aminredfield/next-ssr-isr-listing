import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'next-ssr-isr-listing',
    template: '%s | next-ssr-isr-listing',
  },
  description: 'Demo of SSR and ISR listing with Next.js App Router',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}