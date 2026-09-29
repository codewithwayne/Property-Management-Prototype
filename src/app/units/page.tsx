"use client";

import React from 'react';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { formatKES } from '@/lib/utils';
import { DoorOpen, Search, Filter, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function UnitsPage() {
  const { units, properties } = useMockData();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Units</h1>
          <p className="text-slate-500">Comprehensive list of all units across your properties.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search units..."
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
              <th className="px-6 py-4">Unit Number</th>
              <th className="px-6 py-4">Property</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Monthly Rent</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {units.map(unit => {
              const property = properties.find(p => p.id === unit.propertyId);
              return (
                <tr key={unit.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-900">{unit.unitNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{property?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{unit.type}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{formatKES(unit.monthlyRent)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={unit.status === 'Occupied' ? 'success' : 'neutral'}>
                      {unit.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/units/${unit.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-xs"
                    >
                      Details
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
