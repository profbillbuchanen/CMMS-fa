'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import DataTable from '@/components/DataTable';
import { Wrench, ClipboardList, CheckCircle, AlertTriangle } from 'lucide-react';

// Sample data for charts
const maintenanceTrendData = {
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  datasets: [
    {
      label: 'تعمیرات پیشگیرانه',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
    },
    {
      label: 'تعمیرات اضطراری',
      data: [8, 12, 10, 15, 12, 8],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
    },
  ],
};

const equipmentStatusData = {
  labels: ['فعال', 'در حال تعمیر', 'از کار افتاده', 'در انتظار قطعه'],
  datasets: [
    {
      data: [45, 8, 3, 5],
      backgroundColor: [
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(99, 102, 241)',
      ],
    },
  ],
};

const workOrderPriorityData = {
  labels: ['کم', 'متوسط', 'زیاد', 'بحرانی'],
  datasets: [
    {
      label: 'تعداد درخواست‌ها',
      data: [15, 25, 18, 8],
      backgroundColor: [
        'rgb(16, 185, 129)',
        'rgb(59, 130, 246)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
      ],
    },
  ],
};

// Sample table data
const recentWorkOrders = [
  { id: 1, code: 'WO-1402-001', equipment: 'پمپ آب اصلی', priority: 'بحرانی', status: 'در حال انجام', technician: 'علی محمدی', date: '1402/07/15' },
  { id: 2, code: 'WO-1402-002', equipment: 'کمپرسور هوا', priority: 'زیاد', status: 'در انتظار', technician: 'رضا کریمی', date: '1402/07/14' },
  { id: 3, code: 'WO-1402-003', equipment: 'سیستم خنک‌کننده', priority: 'متوسط', status: 'انجام شده', technician: 'حسین احمدی', date: '1402/07/13' },
  { id: 4, code: 'WO-1402-004', equipment: 'ژنراتور برق', priority: 'بحرانی', status: 'در حال انجام', technician: 'محمد رضایی', date: '1402/07/12' },
  { id: 5, code: 'WO-1402-005', equipment: 'نوار نقاله', priority: 'کم', status: 'انجام شده', technician: 'علی محمدی', date: '1402/07/11' },
];

const tableColumns = [
  { key: 'code', label: 'شماره درخواست' },
  { key: 'equipment', label: 'تجهیز' },
  { key: 'priority', label: 'اولویت' },
  { key: 'status', label: 'وضعیت' },
  { key: 'technician', label: 'تکنسین' },
  { key: 'date', label: 'تاریخ' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="lg:mr-64 transition-all duration-300">
        <Header />
        
        <main className="p-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">داشبورد سیستم CMMS</h1>
            <p className="text-gray-600">مرور کلی وضعیت نگهداری و تعمیرات تجهیزات</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="کل تجهیزات"
              value="۶۱"
              change={12}
              icon={Wrench}
              color="blue"
            />
            <StatCard
              title="درخواست‌های فعال"
              value="۲۳"
              change={-5}
              icon={ClipboardList}
              color="yellow"
            />
            <StatCard
              title="تعمیرات انجام شده"
              value="۱۵۶"
              change={18}
              icon={CheckCircle}
              color="green"
            />
            <StatCard
              title="تعمیرات اضطراری"
              value="۸"
              change={-15}
              icon={AlertTriangle}
              color="red"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard
              title="روند تعمیرات در ۶ ماه اخیر"
              type="line"
              data={maintenanceTrendData}
            />
            <ChartCard
              title="وضعیت تجهیزات"
              type="doughnut"
              data={equipmentStatusData}
            />
          </div>

          {/* Work Orders Priority Chart */}
          <div className="mb-8">
            <ChartCard
              title="توزیع درخواست‌های تعمیر بر اساس اولویت"
              type="bar"
              data={workOrderPriorityData}
            />
          </div>

          {/* Recent Work Orders Table */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">آخرین درخواست‌های تعمیر</h2>
              <button className="btn-primary text-sm">
                مشاهده همه
              </button>
            </div>
            <DataTable
              columns={tableColumns}
              data={recentWorkOrders}
              onView={(row) => console.log('View:', row)}
              onEdit={(row) => console.log('Edit:', row)}
              onDelete={(row) => console.log('Delete:', row)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
