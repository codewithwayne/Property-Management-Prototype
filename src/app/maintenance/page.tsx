"use client";

import React, { useState } from 'react';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Wrench, Plus, Search, Filter, AlertTriangle } from 'lucide-react';

export default function MaintenancePage() {
  const { maintenanceRequests, updateMaintenanceStatus, addMaintenanceRequest, properties, units, tenants } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    propertyId: 'p1',
    unitId: 'u1',
    tenantId: 't1',
    priority: 'Medium' as any,
    status: 'Open' as any,
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    addMaintenanceRequest({
      id: Math.random().toString(36).substr(2, 9),
      ...newRequest,
      dateReported: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(false);
    setNewRequest({ title: '', description: '', propertyId: 'p1', unitId: 'u1', tenantId: 't1', priority: 'Medium', status: 'Open' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Maintenance</h1>
          <p className="text-slate-500">Track and resolve property maintenance issues.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Open Requests */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            Open Requests
          </h3>
          <div className="space-y-3">
            {maintenanceRequests.filter(r => r.status === 'Open').map(req => (
              <MaintenanceCard key={req.id} request={req} updateStatus={updateMaintenanceStatus} />
            ))}
            {maintenanceRequests.filter(r => r.status === 'Open').length === 0 && (
              <p className="text-sm text-slate-500 italic p-4 border border-dashed border-slate-300 rounded-lg text-center">No open requests</p>
            )}
          </div>
        </div>

        {/* In Progress */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            In Progress
          </h3>
          <div className="space-y-3">
            {maintenanceRequests.filter(r => r.status === 'In Progress').map(req => (
              <MaintenanceCard key={req.id} request={req} updateStatus={updateMaintenanceStatus} />
            ))}
            {maintenanceRequests.filter(r => r.status === 'In Progress').length === 0 && (
              <p className="text-sm text-slate-500 italic p-4 border border-dashed border-slate-300 rounded-lg text-center">No active work</p>
            )}
          </div>
        </div>

        {/* Resolved */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Resolved
          </h3>
          <div className="space-y-3">
            {maintenanceRequests.filter(r => r.status === 'Resolved').map(req => (
              <MaintenanceCard key={req.id} request={req} updateStatus={updateMaintenanceStatus} />
            ))}
            {maintenanceRequests.filter(r => r.status === 'Resolved').length === 0 && (
              <p className="text-sm text-slate-500 italic p-4 border border-dashed border-slate-300 rounded-lg text-center">No resolved issues</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Maintenance Request"
      >
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Issue Title</label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={newRequest.title}
              onChange={e => setNewRequest({ ...newRequest, title: e.target.value })}
              placeholder="e.g. Leaking pipe in bathroom"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24"
              value={newRequest.description}
              onChange={e => setNewRequest({ ...newRequest, description: e.target.value })}
              placeholder="Provide more details about the problem..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Property</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={newRequest.propertyId}
                onChange={e => setNewRequest({ ...newRequest, propertyId: e.target.value })}
              >
                {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Priority</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={newRequest.priority}
                onChange={e => setNewRequest({ ...newRequest, priority: e.target.value as any })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Submit Request
          </button>
        </form>
      </Modal>
    </div>
  );
}

function MaintenanceCard({ request, updateStatus }: { request: any, updateStatus: any }) {
  const { properties, units, tenants } = useMockData();
  const property = properties.find(p => p.id === request.propertyId);
  const unit = units.find(u => u.id === request.unitId);
  const tenant = tenants.find(t => t.id === request.tenantId);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold text-slate-900 leading-tight">{request.title}</h4>
        <Badge variant={request.priority === 'High' ? 'danger' : request.priority === 'Medium' ? 'warning' : 'neutral'}>
          {request.priority}
        </Badge>
      </div>
      <p className="text-xs text-slate-500 line-clamp-2">{request.description}</p>
      <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold">
        <span className="bg-slate-100 px-1.5 py-0.5 rounded">{property?.name}</span>
        <span className="bg-slate-100 px-1.5 py-0.5 rounded">Unit {unit?.unitNumber}</span>
        <span className="bg-slate-100 px-1.5 py-0.5 rounded">{tenant?.name}</span>
      </div>
      <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">{request.dateReported}</span>
        <div className="flex gap-2">
          {request.status === 'Open' && (
            <button
              onClick={() => updateStatus(request.id, 'In Progress')}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
            >
              Start Work
            </button>
          )}
          {request.status === 'In Progress' && (
            <button
              onClick={() => updateStatus(request.id, 'Resolved')}
              className="text-xs font-medium text-emerald-600 hover:text-emerald-800"
            >
              Resolve
            </button>
          )}
          {request.status === 'Resolved' && (
            <span className="text-xs font-medium text-slate-400">Done</span>
          )}
        </div>
      </div>
    </div>
  );
}
