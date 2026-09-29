"use client";

import React, { useState } from 'react';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatKES } from '@/lib/utils';
import { CreditCard, Search, Filter, Plus } from 'lucide-react';

export default function RentPage() {
  const { payments, tenants, properties, recordPayment } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  function handleOpenPaymentModal(tenant: Tenant) {
    setSelectedTenant(tenant);
    setPaymentAmount('');
    setIsModalOpen(true);
  }

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenant) return;

    const amount = parseInt(paymentAmount);
    const existingPayment = payments.find(p => p.tenantId === selectedTenant.id && p.date.startsWith('2026-09'));

    const paymentData = {
      id: Math.random().toString(36).substr(2, 9),
      tenantId: selectedTenant.id,
      propertyId: selectedTenant.propertyId,
      unitId: selectedTenant.unitId,
      amountDue: selectedTenant.monthlyRent,
      amountPaid: amount,
      balance: Math.max(0, selectedTenant.monthlyRent - amount),
      dueDate: '2026-09-01',
      status: amount >= selectedTenant.monthlyRent ? 'Paid' : 'Partially Paid',
      date: new Date().toISOString().split('T')[0],
    } as any;

    recordPayment(paymentData);
    setIsModalOpen(false);
    setSelectedTenant(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Rent & Payments</h1>
          <p className="text-slate-500">Track and manage monthly rent collections.</p>
        </div>
        <button
          onClick={() => {
            // For prototype, we'll let them pick a tenant in the modal or just open it
            // To keep it simple, we can just open a general payment modal
            alert('Please select a tenant from the list to record a payment.');
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Record Payment
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Property/Unit</th>
              <th className="px-6 py-4">Amount Due</th>
              <th className="px-6 py-4">Amount Paid</th>
              <th className="px-6 py-4">Balance</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map(pay => {
              const tenant = tenants.find(t => t.id === pay.tenantId);
              const property = properties.find(p => p.id === pay.propertyId);
              return (
                <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{tenant?.name}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex flex-col">
                      <span>{property?.name}</span>
                      <span className="text-xs text-slate-400">Unit {pay.unitId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{formatKES(pay.amountDue)}</td>
                  <td className="px-6 py-4 text-slate-700">{formatKES(pay.amountPaid)}</td>
                  <td className="px-6 py-4 font-medium text-rose-600">{formatKES(pay.balance)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={pay.status === 'Paid' ? 'success' : pay.status === 'Partially Paid' ? 'warning' : 'danger'}>
                      {pay.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => tenant && handleOpenPaymentModal(tenant)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-xs px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
                    >
                      Record Payment
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Payment"
      >
        <form onSubmit={handleSubmitPayment} className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-6">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Tenant</p>
            <p className="font-bold text-slate-900">{selectedTenant?.name}</p>
            <p className="text-sm text-slate-600">Due Amount: {formatKES(selectedTenant?.monthlyRent || 0)}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Amount Paid (KES)</label>
            <input
              required
              type="number"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={paymentAmount}
              onChange={e => setPaymentAmount(e.target.value)}
              placeholder="Enter amount paid"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Save Payment
          </button>
        </form>
      </Modal>
    </div>
  );
}

type Tenant = {
  id: string;
  name: string;
  propertyId: string;
  unitId: string;
  monthlyRent: number;
};
