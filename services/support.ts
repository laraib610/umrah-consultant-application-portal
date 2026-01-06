import { SupportTicket, TicketAction } from '../types';

const STORAGE_KEY = 'umrah_support_tickets';

const MOCK_TICKETS: SupportTicket[] = [
    {
        id: 'T-1001',
        leadId: '1',
        leadName: 'Ahmad Khan',
        action: 'Change Flight',
        description: 'Client wants to change departure date to 12 Jan if possible.',
        status: 'Open',
        createdAt: '04/01/2026',
        updatedAt: '04/01/2026'
    }
];

export const supportService = {
    getAllTickets: (): SupportTicket[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let tickets: SupportTicket[] = stored ? JSON.parse(stored) : [...MOCK_TICKETS];
        return tickets;
    },

    addTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
        const tickets = supportService.getAllTickets();
        const newTicket: SupportTicket = {
            ...ticket,
            id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'Open',
            createdAt: new Date().toLocaleDateString('en-GB'),
            updatedAt: new Date().toLocaleDateString('en-GB')
        };
        const newTickets = [newTicket, ...tickets];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTickets));
        return newTickets;
    },

    updateTicket: (id: string, updates: Partial<SupportTicket>) => {
        const tickets = supportService.getAllTickets();
        const index = tickets.findIndex(t => t.id === id);
        if (index !== -1) {
            tickets[index] = {
                ...tickets[index],
                ...updates,
                updatedAt: new Date().toLocaleDateString('en-GB')
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
            return tickets[index];
        }
        return null;
    }
};
