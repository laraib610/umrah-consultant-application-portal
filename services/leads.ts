import { Lead } from '../types';

const STORAGE_KEY = 'umrah_leads';

const MOCK_LEADS: Lead[] = [
    {
        id: '1',
        quotationNumber: 'QT-8421',
        name: 'Ahmad Khan',
        email: 'ahmad@example.com',
        phone: '+966 50 123 4567',
        flight: 'PIA (Karachi → Jeddah)',
        visa: 'Umrah Visa (4 Applicants)',
        transport: 'GMC (Airport Transfer)',
        hotel: 'Swissôtel Makkah (5 Nights)',
        status: 'New',
        paymentStatus: 'Pending',
        quotationStatus: 'Sent',
        packageStatus: 'Premium',
        date: '24/10/2023'
    },
    {
        id: '2',
        quotationNumber: 'QT-3215',
        name: 'Sarah Wilson',
        email: 'sarah.w@example.com',
        phone: '+1 415 555 0123',
        flight: 'Air Blue (Lahore → Madinah)',
        visa: 'Tourist Visa (2 Applicants)',
        transport: 'Hiace (Group Travel)',
        hotel: 'Fairmont Makkah (7 Nights)',
        status: 'In Progress',
        paymentStatus: 'Paid',
        quotationStatus: 'Approved',
        packageStatus: 'Standard',
        date: '22/10/2023'
    },
    {
        id: '3',
        quotationNumber: 'QT-9999',
        name: 'Demo Lead (Voucher)',
        email: 'demo@example.com',
        phone: '+1 234 567 8900',
        flight: 'Emirates (Dubai → Jeddah)',
        visa: 'Umrah Visa (1 Applicant)',
        transport: 'Private Car',
        hotel: 'Raffles Makkah (3 Nights)',
        status: 'New',
        paymentStatus: 'Pending',
        quotationStatus: 'Sent',
        packageStatus: 'Premium',
        date: '02/01/2026',
        voucherCode: 'Package2026',
        timerExpiry: Date.now() + 3600000, // 1 hour from now
        totalAmount: 4250,
        priceBreakdown: [
            { service: 'Flights (Emirates)', amount: 1800 },
            { service: 'Hotel (Raffles Makkah)', amount: 1500 },
            { service: 'Visa Processing', amount: 450 },
            { service: 'Private Transport', amount: 500 }
        ],
        pilgrims: [
            { name: 'Muhammad Talha', passportNumber: 'A1234567', type: 'Adult' },
            { name: 'Jane Doe', passportNumber: 'B7654321', type: 'Adult' }
        ],
        flightDetails: [
            {
                pnr: '9BBBH0',
                airline: 'PIA',
                flightNumber: '741',
                departureCity: 'Islamabad',
                departureDate: '10 Jan, 2026',
                departureTime: '01:10',
                arrivalCity: 'Jeddah',
                arrivalTime: '04:50',
                passengers: 2
            },
            {
                pnr: '9BBBH0',
                airline: 'PIA',
                flightNumber: '714',
                departureCity: 'Madinah',
                departureDate: '17 Jan, 2026',
                departureTime: '00:20',
                arrivalCity: 'Islamabad',
                arrivalTime: '06:50',
                passengers: 2
            }
        ],
        passengerDetails: [
            {
                rrn: '234566',
                description: 'Visa for 2 Persons Apply from Saudi Arabia',
                adults: 2,
                children: 0,
                infants: 0,
                additionalServices: ''
            }
        ],
        transportDetails: [
            {
                rrn: '34667',
                pickup: 'Jeddah Airport',
                date: '10 Jan, 2026',
                time: '04:50 am',
                dropOff: 'Makkah Towers\nMakkah Hotel',
                transportType: '1 Car'
            },
            {
                rrn: '245666',
                pickup: 'Makkah Towers\nMakkah Hotel',
                date: '14 Jan, 2026',
                time: '02:00 pm',
                dropOff: 'Taiba Front Madinah Hotel\nMadinah Hotel',
                transportType: '1 Car'
            },
            {
                rrn: '2344556',
                pickup: 'Taiba Front Madinah Hotel\nMadinah Hotel',
                date: '17 Jan, 2026',
                time: '07:20 pm',
                dropOff: 'Madinah Airport',
                transportType: '1 Car'
            }
        ],
        accommodationDetails: [
            {
                hcn: '23860',
                city: 'Makkah',
                hotelName: 'Makkah Towers',
                checkIn: '10 Jan, 2026',
                checkOut: '14 Jan, 2026',
                nights: 4,
                occupancy: 'Standard Double Room',
                qty: 1,
                food: 'RO'
            },
            {
                hcn: '34745',
                city: 'Madinah',
                hotelName: 'Taiba Front Madinah Hotel',
                checkIn: '14 Jan, 2026',
                checkOut: '17 Jan, 2026',
                nights: 3,
                occupancy: 'Standard Double Room',
                qty: 1,
                food: 'BB'
            }
        ],
        documents: [
            {
                id: 'doc1',
                type: 'Customer',
                category: 'Passport',
                name: 'passport_mtalha.pdf',
                url: '#',
                uploadedAt: '02/01/2026'
            },
            {
                id: 'doc2',
                type: 'Agency',
                category: 'Visa',
                name: 'visa_approved_mtalha.pdf',
                url: '#',
                uploadedAt: '03/01/2026'
            }
        ]
    }
];

export const leadsService = {
    getAllLeads: (): Lead[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let leads: Lead[] = stored ? JSON.parse(stored) : [...MOCK_LEADS];

        // Ensure demo lead with voucher exists for testing
        if (!leads.find(l => l.id === '3')) {
            leads.push(MOCK_LEADS[2]);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
        }

        return leads;
    },

    addLead: (lead: Lead) => {
        const leads = leadsService.getAllLeads();
        const newLeads = [lead, ...leads];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLeads));
        return newLeads;
    },

    updateLead: (id: string, updates: Partial<Lead>) => {
        const leads = leadsService.getAllLeads();
        const index = leads.findIndex(l => l.id === id);
        if (index !== -1) {
            leads[index] = { ...leads[index], ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
            return leads[index];
        }
        return null;
    },

    addDocument: (leadId: string, doc: any) => {
        const leads = leadsService.getAllLeads();
        const index = leads.findIndex(l => l.id === leadId);
        if (index !== -1) {
            const currentDocs = leads[index].documents || [];
            leads[index] = { ...leads[index], documents: [doc, ...currentDocs] };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
            return leads[index];
        }
        return null;
    },

    deleteLead: (id: string) => {
        const leads = leadsService.getAllLeads();
        const newLeads = leads.filter(l => l.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLeads));
        return newLeads;
    }
};
