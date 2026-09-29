import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
}

export function Badge({ variant = 'neutral', children, className, ...props }: BadgeProps) {
  const variants = {
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    danger: 'bg-rose-100 text-rose-700 border-rose-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
