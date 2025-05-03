import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AppNavbar } from './app-navbar';

const ToastProvider = dynamic(
  () => import('~/components/layout/ToastProvider').then((mod) => mod.ToastProvider),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Credibility Management System'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppNavbar />
      {children}
      <ToastProvider />
    </>
  );
}
