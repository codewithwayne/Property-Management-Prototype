import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
}

export function StatCard({ title, value, description, trend, icon }: StatCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
          {icon}
        </div>
      </div>
      {description && (
        <p className="text-xs text-slate-500 mt-4">{description}</p>
      )}
      {trend && (
        <div className={cn(
          "mt-2 text-xs font-medium flex items-center gap-1",
          trend.isPositive ? "text-emerald-600" : "text-rose-600"
        )}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
          <span className="text-slate-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
}
