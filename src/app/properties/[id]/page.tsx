"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { formatKES } from '@/lib/utils';
import { Building2, MapPin, DoorOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailPage() {
  const params = useParams();
  const { properties, units } = useMockData();

  const property = properties.find(p => p.id === params.id);
  const propertyUnits = units.filter(u => u.propertyId === params.id);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-900">Property Not Found</h2>
        <Link href="/properties" className="mt-4 text-indigo-600 hover:underline">Return to Properties</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/properties"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{property.name}</h1>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={14} />
            {property.location}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Property Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Type</span>
                <span className="text-sm font-medium text-slate-900">{property.type}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Total Units</span>
                <span className="text-sm font-medium text-slate-900">{property.totalUnits}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Monthly Expected Rent</span>
                <span className="text-sm font-medium text-slate-900">{formatKES(property.expectedRent)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Status</span>
                <Badge variant={property.occupancyStatus === 'Full' ? 'success' : property.occupancyStatus === 'Vacant' ? 'danger' : 'warning'}>
                  {property.occupancyStatus}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Units</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>{propertyUnits.filter(u => u.status === 'Occupied').length} Occupied</span>
              <span className="text-slate-300">•</span>
              <span>{propertyUnits.filter(u => u.status === 'Vacant').length} Vacant</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {propertyUnits.map(unit => (
              <div key={unit.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                    <DoorOpen size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Unit {unit.unitNumber}</p>
                    <p className="text-xs text-slate-500">{unit.type} • {formatKES(unit.monthlyRent)}/mo</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={unit.status === 'Occupied' ? 'success' : 'neutral'}>
                    {unit.status}
                  </Badge>
                  <Link
                    href={`/units/${unit.id}`}
                    className="p-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 transition-all"
                  >
                    <ChevronLeft size={18} className="rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
