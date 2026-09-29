"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { formatKES } from '@/lib/utils';
import { DoorOpen, Building2, User, ChevronLeft, ExternalLink, CreditCard, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function UnitDetailPage() {
  const params = useParams();
  const { units, properties, tenants } = useMockData();

  const unit = units.find(u => u.id === params.id);
  const property = properties.find(p => p.id === unit?.propertyId);
  const tenant = tenants.find(t => t.id === unit?.tenantId);

  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-900">Unit Not Found</h2>
        <Link href="/units" className="mt-4 text-indigo-600 hover:underline">Return to Units</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/units"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Unit {unit.unitNumber}</h1>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Building2 size={14} />
            {property?.name}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Unit Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Type</span>
                <span className="text-sm font-medium text-slate-900">{unit.type}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Monthly Rent</span>
                <span className="text-sm font-medium text-slate-900">{formatKES(unit.monthlyRent)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Status</span>
                <Badge variant={unit.status === 'Occupied' ? 'success' : 'neutral'}>
                  {unit.status}
                </Badge>
              </div>
            </div>
          </div>

          {tenant && (
            <div className="bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                  <User size={20} />
                </div>
                <h3 className="text-lg font-semibold text-indigo-900">Current Tenant</h3>
              </div>
              <p className="text-indigo-900 font-bold text-xl mb-1">{tenant.name}</p>
              <p className="text-indigo-700 text-sm mb-4">{tenant.email}</p>
              <Link
                href={`/tenants/${tenant.id}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                View Profile
                <ExternalLink size={16} />
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/rent`}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                  <CreditCard size={20} />
                </div>
                <span className="font-semibold text-slate-900">Manage Payments</span>
              </div>
              <p className="text-sm text-slate-500">Record a new payment or check balance for this unit.</p>
            </Link>
            <Link
              href={`/maintenance`}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                  <Wrench size={20} />
                </div>
                <span className="font-semibold text-slate-900">Maintenance</span>
              </div>
              <p className="text-sm text-slate-500">Create a new request or track current issues.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
