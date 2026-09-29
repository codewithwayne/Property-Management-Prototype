"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  CreditCard,
  Wrench,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Units', href: '/units', icon: DoorOpen },
  { name: 'Tenants', href: '/tenants', icon: Users },
  { name: 'Rent & Payments', href: '/rent', icon: CreditCard },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
        <h1 className="text-xl font-bold text-white tracking-tight">PropManage</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-900/20 hover:text-red-400 transition-colors text-left"
          onClick={() => alert('Logout clicked')}
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
