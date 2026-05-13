import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileHeader } from "@/components/sidebar/mobile-header";
import { UploadFAB } from "@/components/sidebar/upload-fab";
import { GlobalErrorListener } from "@/components/layout/global-error-listener";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <MobileHeader />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
      <UploadFAB />
      <GlobalErrorListener />
    </div>
  );
}
