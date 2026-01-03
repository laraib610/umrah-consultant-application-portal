
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
  status: 'New' | 'Contacted' | 'Closed' | 'In Progress' | 'Lead Created' | 'Sent to Companions' | 'Quotation Received' | 'Quotation Sent to Customer' | 'Quotation Accepted' | 'Quotation Rejected' | 'Payment Received' | 'Payment Verified' | 'Journey Started' | 'Journey Ended';
  paymentStatus: string;
  quotationStatus: string;
  packageStatus: string;
  date: string;
  voucherCode?: string;
  timerExpiry?: number;
  voucherStatus?: 'Pending' | 'Accepted' | 'Rejected';
  rejectionReason?: string;
  rejectionComment?: string;
  paymentProofUrl?: string;
  totalAmount?: number;
  priceBreakdown?: {
    service: string;
    amount: number;
  }[];
  // Extended Details for Voucher
  flightDetails?: {
    pnr: string;
    airline: string;
    flightNumber: string;
    departureCity: string;
    departureDate: string;
    departureTime: string;
    arrivalCity: string;
    arrivalTime: string;
    passengers: number;
  }[];
  passengerDetails?: {
    rrn: string;
    description: string;
    adults: number;
    children: number;
    infants: number;
    additionalServices: string;
  }[];
  transportDetails?: {
    rrn: string;
    pickup: string;
    date: string;
    time: string;
    dropOff: string;
    transportType: string;
  }[];
  accommodationDetails?: {
    hcn: string;
    city: string;
    hotelName: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    occupancy: string;
    qty: number;
    food: string;
  }[];
  termsAndConditions?: string[];
  documents?: {
    id: string;
    type: 'Agency' | 'Customer';
    category: 'Passport' | 'ID Card' | 'Visa' | 'Ticket' | 'Voucher' | 'Other';
    name: string;
    url: string;
    uploadedAt: string;
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
