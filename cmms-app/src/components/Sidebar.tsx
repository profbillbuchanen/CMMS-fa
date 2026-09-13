'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  Settings,
  Users,
  FileText,
  Bell,
  ChevronRight,
  Menu,
  X,
  Package,
  TrendingUp,
  Calendar,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'داشبورد', href: '/' },
  { icon: Wrench, label: 'تجهیزات', href: '/equipment' },
  { icon: ClipboardList, label: 'درخواست‌های تعمیر', href: '/work-orders' },
  { icon: Calendar, label: 'برنامه زمان‌بندی', href: '/schedule' },
  { icon: Package, label: 'قطعات یدکی', href: '/parts' },
  { icon: Users, label: 'پرسنل', href: '/personnel' },
  { icon: FileText, label: 'گزارشات', href: '/reports' },
  { icon: TrendingUp, label: 'آنالیز و شاخص‌ها', href: '/analytics' },
  { icon: Settings, label: 'تنظیمات', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0 lg:w-20'
        } overflow-hidden`}
      >
        <div className="p-4">
          {/* Logo */}
          <div className={`flex items-center gap-3 mb-8 ${!isOpen && 'lg:justify-center'}`}>
            <Wrench size={32} className="text-blue-400" />
            {isOpen && (
              <div>
                <h1 className="text-xl font-bold">سیستم CMMS</h1>
                <p className="text-xs text-gray-400">مدیریت نگهداری و تعمیرات</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                  } ${!isOpen && 'lg:justify-center'}`}
                >
                  <Icon size={20} />
                  {isOpen && <span className="flex-1">{item.label}</span>}
                  {isOpen && isActive && (
                    <ChevronRight size={16} className="animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User info at bottom */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">کاربر مدیر</p>
                <p className="text-xs text-gray-400">مدیر سیستم</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
