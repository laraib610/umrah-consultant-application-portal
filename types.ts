
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Closed' | 'In Progress';
  date: string;
}

export interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  hasPerformedUmrah: boolean;
  isTechDriven: boolean;
  qualification: string;
  videoUploaded: boolean;
  contractSigned: boolean;
}

export interface User extends ApplicationData {
  password?: string;
  status: 'step1_complete' | 'step2_complete' | 'pending_approval' | 'active' | 'inactive' | 'completed';
  id: string;
}

export enum AppStep {
  FORM = 1,
  VIDEO = 2,
  CONTRACT = 3,
  DASHBOARD = 4
}
