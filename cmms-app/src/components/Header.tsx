'use client';

import { Bell, Search, User, LogOut } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="جستجو در تجهیزات، درخواست‌ها، پرسنل..."
                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4 mr-6">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">کاربر مدیر</p>
                <p className="text-xs text-gray-500">مدیر سیستم</p>
              </div>
              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                <LogOut size={20} className="text-gray-600 group-hover:text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
