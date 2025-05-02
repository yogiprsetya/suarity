import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

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
      {children}
      <ToastProvider />
    </>
  );
}
