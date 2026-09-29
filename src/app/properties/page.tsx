"use client";

import React, { useState } from 'react';
import { useMockData } from '@/context/MockDataContext';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatKES } from '@/lib/utils';
import { Plus, Building2, MapPin, LayoutGrid, MoreVertical } from 'lucide-react';
import Link from 'next/link';

export default function PropertiesPage() {
  const { properties, addProperty } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    type: 'Apartment',
    totalUnits: '',
    expectedRent: '',
    occupancyStatus: 'Partial',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProperty({
      id: Math.random().toString(36).substr(2, 9),
      ...newProperty,
      totalUnits: parseInt(newProperty.totalUnits),
      expectedRent: parseInt(newProperty.expectedRent),
    } as any);
    setIsModalOpen(false);
    setNewProperty({ name: '', location: '', type: 'Apartment', totalUnits: '', expectedRent: '', occupancyStatus: 'Partial' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Properties</h1>
          <p className="text-slate-500">Manage your residential real estate portfolio.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div key={property.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Building2 size={24} />
                </div>
                <Badge variant={property.occupancyStatus === 'Full' ? 'success' : property.occupancyStatus === 'Vacant' ? 'danger' : 'warning'}>
                  {property.occupancyStatus}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{property.name}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <MapPin size={14} />
                {property.location}
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Units</p>
                  <p className="text-sm font-bold text-slate-700">{property.totalUnits}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Expected Rent</p>
                  <p className="text-sm font-bold text-slate-700">{formatKES(property.expectedRent)}</p>
                </div>
              </div>
              <Link
                href={`/properties/${property.id}`}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <LayoutGrid size={18} />
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Property"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Property Name</label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={newProperty.name}
              onChange={e => setNewProperty({ ...newProperty, name: e.target.value })}
              placeholder="e.g. Westlands Heights"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Location</label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={newProperty.location}
              onChange={e => setNewProperty({ ...newProperty, location: e.target.value })}
              placeholder="e.g. Kilimani, Nairobi"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Type</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={newProperty.type}
                onChange={e => setNewProperty({ ...newProperty, type: e.target.value as any })}
              >
                <option value="Apartment">Apartment</option>
                <option value="Court">Court</option>
                <option value="Heights">Heights</option>
                <option value="Plaza">Plaza</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Total Units</label>
              <input
                required
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={newProperty.totalUnits}
                onChange={e => setNewProperty({ ...newProperty, totalUnits: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Monthly Expected Rent (KES)</label>
            <input
              required
              type="number"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={newProperty.expectedRent}
              onChange={e => setNewProperty({ ...newProperty, expectedRent: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Occupancy Status</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={newProperty.occupancyStatus}
              onChange={e => setNewProperty({ ...newProperty, occupancyStatus: e.target.value as any })}
            >
              <option value="Full">Full</option>
              <option value="Partial">Partial</option>
              <option value="Vacant">Vacant</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Create Property
          </button>
        </form>
      </Modal>
    </div>
  );
}
