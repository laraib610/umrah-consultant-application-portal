
export interface Lead {
  id: string;
  quotationNumber: string;
  name: string;
  email: string;
  phone: string;
  flight: string;
  visa: string;
  transport: string;
  hotel: string;
  status: 'New' | 'Contacted' | 'Closed' | 'In Progress';
  paymentStatus: string;
  quotationStatus: string;
  packageStatus: string;
  date: string;
  voucherCode?: string;
  timerExpiry?: number; // timestamp
  voucherStatus?: 'Pending' | 'Accepted' | 'Rejected';
  rejectionReason?: string;
  rejectionComment?: string;
  paymentProofUrl?: string;
  totalAmount?: number;
  priceBreakdown?: {
    service: string;
    amount: number;
  }[];
  pilgrims?: {
    name: string;
    passportNumber: string;
    type: 'Adult' | 'Child' | 'Infant';
  }[];
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
