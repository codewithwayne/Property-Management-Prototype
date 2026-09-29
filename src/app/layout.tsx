import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MockDataProvider } from '@/context/MockDataContext';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PropManage | Property Management System',
  description: 'Professional Property Management for Residential Estates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <MockDataProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              {children}
            </main>
          </div>
        </MockDataProvider>
      </body>
    </html>
  );
}
