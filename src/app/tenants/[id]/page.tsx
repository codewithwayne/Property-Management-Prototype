"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { formatKES } from '@/lib/utils';
import { User, Phone, Mail, Building2, DoorOpen, CreditCard, Wrench, ChevronLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function TenantProfilePage() {
  const params = useParams();
  const { tenants, properties, units, payments, maintenanceRequests } = useMockData();

  const tenant = tenants.find(t => t.id === params.id);
  const property = properties.find(p => p.id === tenant?.propertyId);
  const unit = units.find(u => u.id === tenant?.unitId);
  const tenantPayments = payments.filter(p => p.tenantId === params.id);
  const tenantMaintenance = maintenanceRequests.filter(r => r.tenantId === params.id);

  if (!tenant) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-900">Tenant Not Found</h2>
        <Link href="/tenants" className="mt-4 text-indigo-600 hover:underline">Return to Tenants</Link>
      </div>
    );
  }

  const totalPaid = tenantPayments.reduce((acc, p) => acc + p.amountPaid, 0);
  const totalBalance = tenantPayments.reduce((acc, p) => acc + p.balance, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/tenants"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold">
            {tenant.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{tenant.name}</h1>
            <p className="text-slate-500">Tenant ID: {tenant.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={18} />
                <span className="text-sm">{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={18} />
                <span className="text-sm">{tenant.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Building2 size={18} />
                <span className="text-sm">{property?.name}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <DoorOpen size={18} />
                <span className="text-sm">Unit {unit?.unitNumber}</span>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500">Lease Status</span>
                  <Badge variant={tenant.leaseStatus === 'Active' ? 'success' : tenant.leaseStatus === 'Expired' ? 'danger' : 'warning'}>
                    {tenant.leaseStatus}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Monthly Rent</span>
                  <span className="text-sm font-bold text-slate-900">{formatKES(tenant.monthlyRent)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financials and Maintenance */}
        <div className="lg:col-span-2 space-y-8">
          {/* Financial Summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <CreditCard size={20} className="text-indigo-600" />
                Payment History
              </h3>
              <Link
                href={`/rent`}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
              >
                Manage All Payments
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Paid</p>
                <p className="text-xl font-bold text-slate-900">{formatKES(totalPaid)}</p>
              </div>
              <div className="p-4 bg-rose-50 rounded-lg border border-rose-100">
                <p className="text-xs text-rose-500 uppercase font-bold mb-1">Outstanding Balance</p>
                <p className="text-xl font-bold text-rose-900">{formatKES(totalBalance)}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Amount Paid</th>
                    <th className="px-4 py-3">Balance</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tenantPayments.length > 0 ? (
                    tenantPayments.map(pay => (
                      <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-slate-600">{pay.date}</td>
                        <td className="px-4 py-3 font-medium text-slate-900">{formatKES(pay.amountPaid)}</td>
                        <td className="px-4 py-3 text-slate-600">{formatKES(pay.balance)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={pay.status === 'Paid' ? 'success' : pay.status === 'Partially Paid' ? 'warning' : 'danger'}>
                            {pay.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-slate-500 italic">No payment records found for this tenant.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Maintenance Summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Wrench size={20} className="text-indigo-600" />
                Maintenance Requests
              </h3>
              <Link
                href={`/maintenance`}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
              >
                All Requests
              </Link>
            </div>
            <div className="space-y-3">
              {tenantMaintenance.length > 0 ? (
                tenantMaintenance.map(req => (
                  <div key={req.id} className="p-4 rounded-lg border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-900">{req.title}</p>
                      <p className="text-xs text-slate-500">Reported on {req.dateReported}</p>
                    </div>
                    <Badge variant={req.status === 'Resolved' ? 'success' : req.status === 'In Progress' ? 'info' : 'neutral'}>
                      {req.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-slate-500 italic">No maintenance requests found for this tenant.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
