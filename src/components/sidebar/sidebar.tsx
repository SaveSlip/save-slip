import { SidebarNav } from "./sidebar-nav";

export function Sidebar() {
  return (
    <aside
      aria-label="Sidebar"
      className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-sidebar-border bg-sidebar-background"
    >
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
        <span className="font-semibold text-base text-sidebar-foreground">
          SaveSlip
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 scrollbar-custom">
        <SidebarNav />
      </div>
    </aside>
  );
}
