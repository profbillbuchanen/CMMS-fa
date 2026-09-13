'use client';

import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface TableRow {
  id: string | number;
  [key: string]: any;
}

interface DataTableProps {
  columns: Column[];
  data: TableRow[];
  onEdit?: (row: TableRow) => void;
  onDelete?: (row: TableRow) => void;
  onView?: (row: TableRow) => void;
}

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
}: DataTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider ${
                    column.width || ''
                  }`}
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                  عملیات
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
                    {row[column.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors group"
                          title="مشاهده"
                        >
                          <Eye size={18} className="text-gray-600 group-hover:text-blue-600" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-1.5 hover:bg-green-50 rounded-lg transition-colors group"
                          title="ویرایش"
                        >
                          <Edit size={18} className="text-gray-600 group-hover:text-green-600" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
                          title="حذف"
                        >
                          <Trash2 size={18} className="text-gray-600 group-hover:text-red-600" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">هیچ داده‌ای یافت نشد</p>
        </div>
      )}
    </div>
  );
}
