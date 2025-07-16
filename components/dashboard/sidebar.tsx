"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  FolderOpen, 
  Plus, 
  User, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navigation = [
  {
    name: "My Projects",
    href: "/projects",
    icon: FolderOpen,
    badge: null
  },
  {
    name: "New Project",
    href: "/projects/new",
    icon: Plus,
    badge: "AI"
  },
  {
    name: "My Profile",
    href: "/my",
    icon: User,
    badge: null
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className={cn(
      "flex flex-col h-full bg-muted/30 border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <span>VibeGuide</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isCollapsed && "px-2"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="mt-8 pt-8 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <Link href="/projects/new">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Plus className="h-3 w-3" />
                  Create Project
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          {!isCollapsed && (
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className={cn(
              "w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50",
              isCollapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && "Sign Out"}
          </Button>
        </div>
      </div>
    </div>
  );
}