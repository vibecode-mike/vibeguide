"use client";

import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  headerActions?: React.ReactNode;
}

export function DashboardLayout({ 
  children, 
  title, 
  description, 
  headerActions 
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title={title} description={description}>
          {headerActions}
        </DashboardHeader>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}