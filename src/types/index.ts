export type Property = {
  id: string;
  name: string;
  location: string;
  type: 'Apartment' | 'Court' | 'Heights' | 'Plaza';
  totalUnits: number;
  expectedRent: number;
  occupancyStatus: 'Full' | 'Partial' | 'Vacant';
};

export type Unit = {
  id: string;
  propertyId: string;
  unitNumber: string;
  type: 'Studio' | '1BR' | '2BR' | '3BR';
  monthlyRent: number;
  status: 'Occupied' | 'Vacant';
  tenantId?: string;
};

export type Tenant = {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyId: string;
  unitId: string;
  monthlyRent: number;
  leaseStatus: 'Active' | 'Expired' | 'Pending';
};

export type PaymentStatus = 'Paid' | 'Partially Paid' | 'Overdue' | 'Pending';

export type Payment = {
  id: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  amountDue: number;
  amountPaid: number;
  balance: number;
  dueDate: string;
  status: PaymentStatus;
  date: string;
};

export type MaintenancePriority = 'Low' | 'Medium' | 'High';
export type MaintenanceStatus = 'Open' | 'In Progress' | 'Resolved';

export type MaintenanceRequest = {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  unitId: string;
  tenantId: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  dateReported: string;
};
