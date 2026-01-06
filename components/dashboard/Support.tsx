import React, { useState, useEffect } from 'react';
import { Lead, SupportTicket, TicketAction } from '../../types';
import { supportService } from '../../services/support';

interface SupportProps {
    leads: Lead[];
}

const TICKET_ACTIONS: TicketAction[] = [
    'Downgrade Service',
    'Upgrade Service',
    'Update Final Quotation',
    'Change Flight',
    'Change Hotel',
    'Refund',
    'General Inquiry',
    'General Inquiry',
    'Other'
];

// Constants for Upgrade/Downgrade
const HOTELS_DATA = [
    { id: 1, name: 'Swissôtel Makkah', location: '0m', price: 850, city: 'Makkah', rating: 5 },
    { id: 2, name: 'Fairmont Makkah', location: '0m', price: 950, city: 'Makkah', rating: 5 },
    { id: 3, name: 'Anjum Hotel', location: '300m', price: 450, city: 'Makkah', rating: 4 },
    { id: 4, name: 'Oberoi Madinah', location: '0m', price: 1200, city: 'Madinah', rating: 5 },
    { id: 5, name: 'Pulman Zamzam', location: '50m', price: 650, city: 'Madinah', rating: 5 },
    { id: 6, name: 'Dar Al Taqwa', location: '0m', price: 800, city: 'Madinah', rating: 4 },
    { id: 7, name: 'Millennium Madinah', location: '100m', price: 400, city: 'Madinah', rating: 4 }
];

const TRANSPORT_VEHICLES = [
    { id: 1, name: 'Staria' },
    { id: 2, name: 'GMC' },
    { id: 3, name: 'Hyundai H1' },
    { id: 4, name: 'Hiace' },
    { id: 5, name: 'Bus' },
    { id: 6, name: 'Coaster' }
];

const AIRLINES = ['PIA', 'Saudia', 'Emirates', 'Qatar Airways', 'FlyDubai'];

const CITIES = ['Makkah', 'Madinah'];
const RATINGS = [4, 5];
const ROOM_TYPES = ['Double', 'Triple', 'Quad', 'Sharing'];

const Support: React.FC<SupportProps> = ({ leads }) => {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    // New Ticket State
    const [selectedLeadId, setSelectedLeadId] = useState('');
    const [selectedAction, setSelectedAction] = useState<TicketAction>('General Inquiry');
    const [description, setDescription] = useState('');

    // Refund Specific State
    const [refundAmount, setRefundAmount] = useState<number>(0);
    const [refundServices, setRefundServices] = useState('');
    const [refundReason, setRefundReason] = useState('');
    const [refundProof, setRefundProof] = useState<string>(''); // Mock URL for now

    // Upgrade/Downgrade State
    const [serviceType, setServiceType] = useState<'Hotel' | 'Transport' | 'Flight'>('Hotel');
    const [upgradeCity, setUpgradeCity] = useState(CITIES[0]);
    const [upgradeRating, setUpgradeRating] = useState(RATINGS[1]);
    const [upgradeHotelName, setUpgradeHotelName] = useState('');
    const [upgradeHotelQty, setUpgradeHotelQty] = useState(1);
    const [upgradeHotelNights, setUpgradeHotelNights] = useState(3);
    const [upgradeHotelRoomType, setUpgradeHotelRoomType] = useState('Double');

    const [upgradeRoute, setUpgradeRoute] = useState('Jeddah Airport-Makkah');
    const [upgradeVehicleType, setUpgradeVehicleType] = useState(TRANSPORT_VEHICLES[0].name);
    const [upgradeTransportQty, setUpgradeTransportQty] = useState(1);

    const [upgradeAirline, setUpgradeAirline] = useState(AIRLINES[0]);

    // Initial Filter for Hotel
    useEffect(() => {
        const filtered = HOTELS_DATA.filter(h => h.city === upgradeCity && h.rating === upgradeRating);
        if (filtered.length > 0) {
            setUpgradeHotelName(filtered[0].name);
        } else {
            setUpgradeHotelName('');
        }
    }, [upgradeCity, upgradeRating]);

    useEffect(() => {
        setTickets(supportService.getAllTickets());
    }, []);

    const resetForm = () => {
        setSelectedLeadId('');
        setSelectedAction('General Inquiry');
        setDescription('');
        setRefundAmount(0);
        setRefundServices('');
        setRefundReason('');
        setRefundProof('');
        setServiceType('Hotel');
        setUpgradeCity(CITIES[0]);
        setUpgradeRating(RATINGS[1]);
        setUpgradeHotelName('');
        setUpgradeHotelQty(1);
        setUpgradeHotelNights(3);
        setUpgradeHotelRoomType('Double');
        setUpgradeRoute('Jeddah Airport-Makkah');
        setUpgradeVehicleType(TRANSPORT_VEHICLES[0].name);
        setUpgradeTransportQty(1);
        setUpgradeAirline(AIRLINES[0]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLeadId) return;

        const lead = leads.find(l => l.id === selectedLeadId);
        if (!lead) return;

        const ticketData: any = {
            leadId: lead.id,
            leadName: lead.name,
            action: selectedAction,
            description: selectedAction === 'Refund' ? `Refund Request: ${refundReason}` : description
        };

        if (selectedAction === 'Upgrade Service' || selectedAction === 'Downgrade Service') {
            ticketData.upgradeDowngradeDetails = {
                serviceType: serviceType,
                ...(serviceType === 'Hotel' && {
                    city: upgradeCity,
                    rating: upgradeRating,
                    hotelName: upgradeHotelName,
                    hotelQuantity: upgradeHotelQty,
                    nights: upgradeHotelNights,
                    roomType: upgradeHotelRoomType
                }),
                ...(serviceType === 'Transport' && {
                    route: upgradeRoute,
                    vehicleType: upgradeVehicleType,
                    transportQuantity: upgradeTransportQty
                }),
                ...(serviceType === 'Flight' && {
                    airline: upgradeAirline
                })
            };
            ticketData.description = `${selectedAction} for ${serviceType}: ${serviceType === 'Hotel' ? `${upgradeHotelName} (${upgradeCity}, ${upgradeRating} Star) - ${upgradeHotelQty}x ${upgradeHotelRoomType} for ${upgradeHotelNights} Nights` :
                serviceType === 'Transport' ? `${upgradeVehicleType} on route ${upgradeRoute} (Qty: ${upgradeTransportQty})` :
                    `${upgradeAirline}`
                } - ${description}`;
        }

        if (selectedAction === 'Refund') {
            ticketData.refundDetails = {
                quotationNumber: lead.quotationNumber,
                amount: refundAmount,
                services: refundServices,
                reason: refundReason,
                customerName: lead.name,
                proofUrl: refundProof
            };
        }

        const newTickets = supportService.addTicket(ticketData);

        setTickets(newTickets);
        setIsCreating(false);
        resetForm();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // In a real app, upload file and get URL. Here we fake it.
            setRefundProof(URL.createObjectURL(e.target.files[0]));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-yellow-100 text-yellow-700';
            case 'In Progress': return 'bg-blue-100 text-blue-700';
            case 'Resolved': return 'bg-green-100 text-green-700';
            case 'Closed': return 'bg-slate-100 text-slate-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-extrabold text-[#1E3A6D]">Support Tickets</h2>
                        <p className="text-sm text-slate-500 font-medium">Manage your support cases and requests.</p>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-[#1E3A6D] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
                    >
                        <i className="fa-solid fa-plus"></i> Create Ticket
                    </button>
                </div>

                {tickets.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <div className="text-slate-300 text-4xl mb-4"><i className="fa-solid fa-ticket"></i></div>
                        <h3 className="text-lg font-bold text-slate-700">No Tickets Yet</h3>
                        <p className="text-slate-500 text-sm">Create a new ticket to get help with your leads.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-4 px-4 text-xs font-extrabold text-slate-400 uppercase">Ticket ID</th>
                                    <th className="text-left py-4 px-4 text-xs font-extrabold text-slate-400 uppercase">Lead</th>
                                    <th className="text-left py-4 px-4 text-xs font-extrabold text-slate-400 uppercase">Action</th>
                                    <th className="text-left py-4 px-4 text-xs font-extrabold text-slate-400 uppercase">Status</th>
                                    <th className="text-left py-4 px-4 text-xs font-extrabold text-slate-400 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-4 text-sm font-bold text-[#1E3A6D]">{ticket.id}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-slate-600">{ticket.leadName}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-slate-600">
                                            <div className="flex flex-col">
                                                <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600 w-fit mb-1">
                                                    {ticket.action}
                                                </span>
                                                {ticket.action === 'Refund' && ticket.refundDetails && (
                                                    <span className="text-xs text-slate-400">
                                                        Amt: {ticket.refundDetails.amount} | Quot: {ticket.refundDetails.quotationNumber}
                                                    </span>
                                                )}
                                                {(ticket.action === 'Upgrade Service' || ticket.action === 'Downgrade Service') && ticket.upgradeDowngradeDetails && (
                                                    <span className="text-xs text-slate-400">
                                                        {ticket.upgradeDowngradeDetails.serviceType}: {
                                                            ticket.upgradeDowngradeDetails.serviceType === 'Hotel' ?
                                                                `${ticket.upgradeDowngradeDetails.hotelName} (${ticket.upgradeDowngradeDetails.hotelQuantity}x ${ticket.upgradeDowngradeDetails.roomType}, ${ticket.upgradeDowngradeDetails.nights} Nights)` :
                                                                ticket.upgradeDowngradeDetails.serviceType === 'Transport' ?
                                                                    `${ticket.upgradeDowngradeDetails.vehicleType} (${ticket.upgradeDowngradeDetails.transportQuantity}x)` :
                                                                    ticket.upgradeDowngradeDetails.airline
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm font-medium text-slate-500">{ticket.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Helper Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 transition-all hover:shadow-md">
                    <i className="fa-solid fa-comments text-blue-500 text-2xl mb-4"></i>
                    <h3 className="font-extrabold text-[#1E3A6D] mb-2">Live Chat</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4">Chat with our support team in real-time for urgent matters.</p>
                    <button className="bg-white text-[#1E3A6D] px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-all border border-blue-200">Start Chat</button>
                </div>
                <div className="p-6 bg-cyan-50 rounded-xl border border-cyan-100 transition-all hover:shadow-md">
                    <i className="fa-solid fa-envelope text-cyan-500 text-2xl mb-4"></i>
                    <h3 className="font-extrabold text-[#1E3A6D] mb-2">Email Support</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4">Send us an email for general inquiries or detailed requests.</p>
                    <button className="bg-white text-[#1E3A6D] px-6 py-2 rounded-lg text-sm font-bold hover:bg-cyan-100 transition-all border border-cyan-200">Send Email</button>
                </div>
            </div>

            {/* Create Ticket Modal */}
            {isCreating && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white h-[600px] overflow-y-auto scrollbar-none rounded-2xl w-full max-w-lg shadow-xl animate-[slideIn_0.3s_ease-out]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-extrabold text-[#1E3A6D]">Create Support Ticket</h3>
                            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Select Lead</label>
                                <select
                                    required
                                    value={selectedLeadId}
                                    onChange={(e) => setSelectedLeadId(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select a lead...</option>
                                    {leads.map(lead => (
                                        <option key={lead.id} value={lead.id}>
                                            {lead.name} ({lead.quotationNumber})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Action Required</label>
                                <select
                                    required
                                    value={selectedAction}
                                    onChange={(e) => setSelectedAction(e.target.value as TicketAction)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    {TICKET_ACTIONS.map(action => (
                                        <option key={action} value={action}>{action}</option>
                                    ))}
                                </select>
                            </div>



                            {selectedAction === 'Refund' ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Quotation No.</label>
                                            <input
                                                type="text"
                                                value={leads.find(l => l.id === selectedLeadId)?.quotationNumber || ''}
                                                readOnly
                                                className="w-full bg-slate-100 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Customer</label>
                                            <input
                                                type="text"
                                                value={leads.find(l => l.id === selectedLeadId)?.name || ''}
                                                readOnly
                                                className="w-full bg-slate-100 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Refund Amount</label>
                                        <input
                                            required
                                            type="number"
                                            value={refundAmount}
                                            onChange={(e) => setRefundAmount(parseFloat(e.target.value))}
                                            placeholder="Enter amount..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Services to Refund</label>
                                        <input
                                            required
                                            type="text"
                                            value={refundServices}
                                            onChange={(e) => setRefundServices(e.target.value)}
                                            placeholder="e.g. Flight, Hotel, Visa..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Reason for Refund</label>
                                        <textarea
                                            required
                                            value={refundReason}
                                            onChange={(e) => setRefundReason(e.target.value)}
                                            rows={3}
                                            placeholder="Why is the refund being requested?"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Proof of Request (Optional)</label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-xs file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                        />
                                    </div>
                                </>
                            ) : (selectedAction === 'Upgrade Service' || selectedAction === 'Downgrade Service') ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Service to {selectedAction.split(' ')[0]}</label>
                                        <div className="flex gap-2">
                                            {['Hotel', 'Transport', 'Flight'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setServiceType(type as any)}
                                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${serviceType === type
                                                        ? 'bg-[#1E3A6D] text-white border-[#1E3A6D]'
                                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {serviceType === 'Hotel' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">City</label>
                                                <select
                                                    value={upgradeCity}
                                                    onChange={(e) => setUpgradeCity(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                >
                                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Star Rating</label>
                                                <select
                                                    value={upgradeRating}
                                                    onChange={(e) => setUpgradeRating(Number(e.target.value))}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                >
                                                    {RATINGS.map(r => <option key={r} value={r}>{r} Star</option>)}
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Select Hotel</label>
                                                <select
                                                    value={upgradeHotelName}
                                                    onChange={(e) => setUpgradeHotelName(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                >
                                                    {HOTELS_DATA.filter(h => h.city === upgradeCity && h.rating === upgradeRating).map(h => (
                                                        <option key={h.id} value={h.name}>{h.name}</option>
                                                    ))}
                                                    {HOTELS_DATA.filter(h => h.city === upgradeCity && h.rating === upgradeRating).length === 0 && (
                                                        <option value="">No hotels available</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Room Type</label>
                                                <select
                                                    value={upgradeHotelRoomType}
                                                    onChange={(e) => setUpgradeHotelRoomType(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                >
                                                    {ROOM_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Nights</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={upgradeHotelNights}
                                                        onChange={(e) => setUpgradeHotelNights(Number(e.target.value))}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Quantity</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={upgradeHotelQty}
                                                        onChange={(e) => setUpgradeHotelQty(Number(e.target.value))}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    )}

                                    {serviceType === 'Transport' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Route</label>
                                                <select
                                                    value={upgradeRoute}
                                                    onChange={(e) => setUpgradeRoute(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                >
                                                    <option>Jeddah Airport-Makkah</option>
                                                    <option>Makkah-Madinah</option>
                                                    <option>Madinah-Jeddah Airport</option>
                                                    <option>Makkah-Jeddah Airport</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Vehicle Type</label>
                                                <select
                                                    value={upgradeVehicleType}
                                                    onChange={(e) => setUpgradeVehicleType(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                >
                                                    {TRANSPORT_VEHICLES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Quantity</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={upgradeTransportQty}
                                                    onChange={(e) => setUpgradeTransportQty(Number(e.target.value))}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {serviceType === 'Flight' && (
                                        <div>
                                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Preferred Airline</label>
                                            <select
                                                value={upgradeAirline}
                                                onChange={(e) => setUpgradeAirline(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                            >
                                                {AIRLINES.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Additional Note</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={2}
                                            placeholder="Any specific instructions..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                                        />
                                    </div>

                                </div>
                            ) : (
                                <div>
                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-2">Description</label>
                                    <textarea
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        placeholder="Please describe your request in detail..."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A6D] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#1E3A6D] text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
                                >
                                    Submit Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div >
    );
};

export default Support;

