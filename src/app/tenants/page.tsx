"use client";

import React from 'react';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, User, Phone, Mail, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function TenantsPage() {
  const { tenants, properties } = useMockData();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tenants</h1>
          <p className="text-slate-500">Manage tenant information and lease status.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tenants..."
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
            />
          </div>
          <button className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4">Tenant Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Property/Unit</th>
              <th className="px-6 py-4">Lease Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tenants.map(tenant => {
              const property = properties.find(p => p.id === tenant.propertyId);
              return (
                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-900">{tenant.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={12} />
                        {tenant.phone}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={12} />
                        {tenant.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex flex-col">
                      <span>{property?.name}</span>
                      <span className="text-xs text-slate-400 font-medium">Unit {tenant.unitId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={tenant.leaseStatus === 'Active' ? 'success' : tenant.leaseStatus === 'Expired' ? 'danger' : 'warning'}>
                      {tenant.leaseStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/tenants/${tenant.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-xs"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
