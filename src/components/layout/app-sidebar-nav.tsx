"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAV_ITEMS } from '@/lib/constants';
import { PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className="flex flex-col h-full">
      <div className={cn(
        "flex items-center gap-2 p-4 border-b border-sidebar-border",
        state === "collapsed" && "justify-center"
      )}>
        <PiggyBank className="h-8 w-8 text-primary" />
        {state === "expanded" && (
          <h1 className="text-xl font-bold text-sidebar-foreground">Penny Pincher</h1>
        )}
      </div>
      <SidebarGroup className="flex-1 overflow-y-auto p-2">
        {state === "expanded" && <SidebarGroupLabel className="mt-2">Navigation</SidebarGroupLabel>}
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, className: "ml-2" }}
                  className="justify-start"
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    {state === "expanded" && <span>{item.label}</span>}
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      {/* Optional Footer in Sidebar */}
      {/* <div className="p-4 border-t border-sidebar-border mt-auto">
        {state === "expanded" && <p className="text-xs text-sidebar-foreground/70">&copy; 2024 Penny Pincher</p>}
      </div> */}
    </div>
  );
}
