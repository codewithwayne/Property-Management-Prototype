"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Property, Unit, Tenant, Payment, MaintenanceRequest } from '@/types';

interface MockDataContextType {
  properties: Property[];
  units: Unit[];
  tenants: Tenant[];
  payments: Payment[];
  maintenanceRequests: MaintenanceRequest[];
  isLoading: boolean;
  addProperty: (property: Property) => Promise<void>;
  updateUnitStatus: (unitId: string, status: Unit['status'], tenantId?: string) => Promise<void>;
  recordPayment: (payment: Payment) => Promise<void>;
  updateMaintenanceStatus: (id: string, status: MaintenanceRequest['status']) => Promise<void>;
  addMaintenanceRequest: (request: MaintenanceRequest) => Promise<void>;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

const STORAGE_KEY = 'pms_demo_data';

const INITIAL_DATA = {
  properties: [
    { id: 'p1', name: 'Westlands Heights', location: 'Westlands, Nairobi', type: 'Heights', totalUnits: 10, expectedRent: 450000, occupancyStatus: 'Partial' },
    { id: 'p2', name: 'Kilimani Apartments', location: 'Kilimani, Nairobi', type: 'Apartment', totalUnits: 15, expectedRent: 600000, occupancyStatus: 'Partial' },
    { id: 'p3', name: 'Ruaka Court', location: 'Ruaka, Kiambu', type: 'Court', totalUnits: 8, expectedRent: 200000, occupancyStatus: 'Partial' },
  ],
  units: [
    { id: 'u1', propertyId: 'p1', unitNumber: 'A1', type: '2BR', monthlyRent: 45000, status: 'Occupied', tenantId: 't1' },
    { id: 'u2', propertyId: 'p1', unitNumber: 'A2', type: '2BR', monthlyRent: 45000, status: 'Occupied', tenantId: 't2' },
    { id: 'u3', propertyId: 'p1', unitNumber: 'B1', type: '1BR', monthlyRent: 30000, status: 'Vacant' },
    { id: 'u4', propertyId: 'p1', unitNumber: 'B2', type: '1BR', monthlyRent: 30000, status: 'Occupied', tenantId: 't3' },
    { id: 'u5', propertyId: 'p2', unitNumber: '101', type: '3BR', monthlyRent: 65000, status: 'Occupied', tenantId: 't4' },
    { id: 'u6', propertyId: 'p2', unitNumber: '102', type: '3BR', monthlyRent: 65000, status: 'Occupied', tenantId: 't5' },
    { id: 'u7', propertyId: 'p2', unitNumber: '201', type: '2BR', monthlyRent: 45000, status: 'Vacant' },
    { id: 'u8', propertyId: 'p2', unitNumber: '202', type: '2BR', monthlyRent: 45000, status: 'Occupied', tenantId: 't6' },
    { id: 'u9', propertyId: 'p3', unitNumber: 'C1', type: '1BR', monthlyRent: 25000, status: 'Occupied', tenantId: 't7' },
    { id: 'u10', propertyId: 'p3', unitNumber: 'C2', type: '1BR', monthlyRent: 25000, status: 'Occupied', tenantId: 't8' },
    { id: 'u11', propertyId: 'p3', unitNumber: 'C3', type: 'Studio', monthlyRent: 15000, status: 'Vacant' },
  ],
  tenants: [
    { id: 't1', name: 'John Kamau', phone: '+254 712 345 678', email: 'john.kamau@email.com', propertyId: 'p1', unitId: 'u1', monthlyRent: 45000, leaseStatus: 'Active' },
    { id: 't2', name: 'Mary Atieno', phone: '+254 723 456 789', email: 'mary.atieno@email.com', propertyId: 'p1', unitId: 'u2', monthlyRent: 45000, leaseStatus: 'Active' },
    { id: 't3', name: 'Samuel Otieno', phone: '+254 734 567 890', email: 'samuel.otieno@email.com', propertyId: 'p1', unitId: 'u4', monthlyRent: 30000, leaseStatus: 'Active' },
    { id: 't4', name: 'Faith Mutua', phone: '+254 745 678 901', email: 'faith.mutua@email.com', propertyId: 'p2', unitId: 'u5', monthlyRent: 65000, leaseStatus: 'Active' },
    { id: 't5', name: 'Peter Njenga', phone: '+254 756 789 012', email: 'peter.njenga@email.com', propertyId: 'p2', unitId: 'u6', monthlyRent: 65000, leaseStatus: 'Active' },
    { id: 't6', name: 'Alice Wambui', phone: '+254 767 890 123', email: 'alice.wambui@email.com', propertyId: 'p2', unitId: 'u8', monthlyRent: 45000, leaseStatus: 'Active' },
    { id: 't7', name: 'David Kiprop', phone: '+254 778 901 234', email: 'david.kiprop@email.com', propertyId: 'p3', unitId: 'u9', monthlyRent: 25000, leaseStatus: 'Active' },
    { id: 't8', name: 'Sarah Hassan', phone: '+254 789 012 345', email: 'sarah.hassan@email.com', propertyId: 'p3', unitId: 'u10', monthlyRent: 25000, leaseStatus: 'Active' },
  ],
  payments: [
    { id: 'pay1', tenantId: 't1', propertyId: 'p1', unitId: 'u1', amountDue: 45000, amountPaid: 45000, balance: 0, dueDate: '2026-09-01', status: 'Paid', date: '2026-09-01' },
    { id: 'pay2', tenantId: 't2', propertyId: 'p1', unitId: 'u2', amountDue: 45000, amountPaid: 40000, balance: 5000, dueDate: '2026-09-01', status: 'Partially Paid', date: '2026-09-02' },
    { id: 'pay3', tenantId: 't3', propertyId: 'p1', unitId: 'u4', amountDue: 30000, amountPaid: 0, balance: 30000, dueDate: '2026-09-01', status: 'Overdue', date: '2026-09-01' },
    { id: 'pay4', tenantId: 't4', propertyId: 'p2', unitId: 'u5', amountDue: 65000, amountPaid: 65000, balance: 0, dueDate: '2026-09-01', status: 'Paid', date: '2026-09-01' },
  ],
  maintenanceRequests: [
    { id: 'm1', title: 'Leaking Tap', description: 'Kitchen tap is leaking continuously.', propertyId: 'p1', unitId: 'u1', tenantId: 't1', priority: 'Medium', status: 'Open', dateReported: '2026-09-20' },
    { id: 'm2', title: 'Power Outage', description: 'No power in the bedroom.', propertyId: 'p2', unitId: 'u5', tenantId: 't4', priority: 'High', status: 'In Progress', dateReported: '2026-09-22' },
    { id: 'm3', title: 'Broken Tile', description: 'Living room tile is cracked.', propertyId: 'p3', unitId: 'u9', tenantId: 't7', priority: 'Low', status: 'Resolved', dateReported: '2026-09-15' },
  ],
};

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_DATA;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = async (newData: Partial<typeof INITIAL_DATA>) => {
    setIsLoading(true);
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 300));
    setState((prev: typeof INITIAL_DATA) => ({ ...prev, ...newData }));
    setIsLoading(false);
  };

  const addProperty = async (property: Property) => {
    await updateState({ properties: [...state.properties, property] });
  };

  const updateUnitStatus = async (unitId: string, status: Unit['status'], tenantId?: string) => {
    const newUnits = state.units.map((u: Unit) => u.id === unitId ? { ...u, status, tenantId } : u);
    await updateState({ units: newUnits });
  };

  const recordPayment = async (payment: Payment) => {
    await updateState({ payments: [...state.payments, payment] });
  };

  const updateMaintenanceStatus = async (id: string, status: MaintenanceRequest['status']) => {
    const newRequests = state.maintenanceRequests.map((r: MaintenanceRequest) => r.id === id ? { ...r, status } : r);
    await updateState({ maintenanceRequests: newRequests });
  };

  const addMaintenanceRequest = async (request: MaintenanceRequest) => {
    await updateState({ maintenanceRequests: [...state.maintenanceRequests, request] });
  };

  return (
    <MockDataContext.Provider
      value={{
        properties: state.properties,
        units: state.units,
        tenants: state.tenants,
        payments: state.payments,
        maintenanceRequests: state.maintenanceRequests,
        isLoading,
        addProperty,
        updateUnitStatus,
        recordPayment,
        updateMaintenanceStatus,
        addMaintenanceRequest
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) throw new Error('useMockData must be used within a MockDataProvider');
  return context;
};
