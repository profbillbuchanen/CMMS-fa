'use client';

import { TrendingUp, TrendingDown, Wrench, ClipboardList, CheckCircle, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<{ size?: number }>;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: 'bg-blue-100 text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    icon: 'bg-green-100 text-green-600',
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    icon: 'bg-yellow-100 text-yellow-600',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: 'bg-red-100 text-red-600',
  },
};

export default function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{Math.abs(change)}٪ نسبت به ماه قبل</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.icon}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
