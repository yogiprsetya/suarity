import { SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="pt-10">
      <aside className="w-3/12 border-r pr-4">
        <AppSidebar />
      </aside>

      <main className="w-9/12 pl-6">{children}</main>
    </SidebarProvider>
  );
}
