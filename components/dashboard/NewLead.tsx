import React, { useState } from 'react';

interface JourneyItem {
    id: string;
    type: 'hotel' | 'transport';
    name: string;
    details: string;
    subDetails: string;
    price?: number;
}

const NewLead: React.FC = () => {
    const [activeServices, setActiveServices] = useState<string[]>(['visas', 'flights', 'hotels', 'transport']);
    const [guestDetails, setGuestDetails] = useState({
        name: 'Asad',
        email: 'guest@example.com',
        phone: '+966...',
        adults: 4,
        child: 0,
        infant: 0
    });

    const [journey, setJourney] = useState<JourneyItem[]>([
        {
            id: '1',
            type: 'hotel',
            name: 'Dallah Taibah Hotel',
            details: '150m to Haram',
            subDetails: '2 Jan • 1 Jan',
            price: 1656
        },
        {
            id: '2',
            type: 'transport',
            name: 'Transfer: Madina → Jeddah Airport',
            details: 'GMC • Pickup: 12:00',
            subDetails: '1 Jan',
            price: 450
        }
    ]);

    const [showHotelSelection, setShowHotelSelection] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('Jeddah Airport');

    const toggleService = (service: string) => {
        setActiveServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const makkahHotels = [
        { id: 1, name: 'Swissôtel Makkah', location: '0m', price: 850 },
        { id: 2, name: 'Fairmont Makkah', location: '0m', price: 950 },
        { id: 3, name: 'Anjum Hotel', location: '300m', price: 450 }
    ];

    const removeItem = (id: string) => {
        setJourney(prev => prev.filter(item => item.id !== id));
    };

    const totalTravelers = guestDetails.adults + guestDetails.child + guestDetails.infant;
    const showLogistics = activeServices.includes('transport') || activeServices.includes('hotels');

    return (
        <div className="flex flex-col xl:flex-row gap-8 animate-[fadeIn_0.5s_ease-out]">
            {/* Left Column - Form & Timeline */}
            <div className="flex-1 space-y-6">

                {/* Service Provider & Tabs */}
                <div className="bg-[#EEF3FA] rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1E3A6D] rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20 text-xl">U</div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[3px]">Service Provider</p>
                                <h3 className="text-[#1E3A6D] font-extrabold text-xl">Umrah Companions</h3>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest">Required Services</p>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { id: 'visas', label: 'Visas', icon: 'fa-file-invoice', color: 'bg-emerald-500' },
                                { id: 'flights', label: 'Flights', icon: 'fa-plane', color: 'bg-cyan-500' },
                                { id: 'hotels', label: 'Hotels', icon: 'fa-hotel', color: 'bg-sky-500' },
                                { id: 'transport', label: 'Transport', icon: 'fa-bus', color: 'bg-orange-500' }
                            ].map(service => (
                                <button
                                    key={service.id}
                                    onClick={() => toggleService(service.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all border-2 ${activeServices.includes(service.id)
                                        ? `${service.color} text-white border-transparent scale-105`
                                        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <i className={`fa-solid ${service.icon} text-lg`}></i>
                                    <span className="font-extrabold text-sm tracking-wide">{service.label}</span>
                                    {activeServices.includes(service.id) && <i className="fa-solid fa-circle-check text-[12px] ml-1"></i>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lead Guest Details */}
                <div className="bg-[#EEF3FA] rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/40">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                            <i className="fa-solid fa-user-tag text-lg"></i>
                        </div>
                        <h3 className="text-[#1E3A6D] font-extrabold tracking-wide uppercase text-sm">Lead Guest Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                value={guestDetails.name}
                                onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold focus:border-blue-500 outline-none transition-all shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="text"
                                value={guestDetails.email}
                                onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold focus:border-blue-500 outline-none transition-all shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                            <input
                                type="text"
                                value={guestDetails.phone}
                                onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold focus:border-blue-500 outline-none transition-all shadow-sm"
                            />
                        </div>

                        <div className="md:col-span-3 grid grid-cols-3 gap-6 pt-4">
                            <div className="space-y-2">
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Adults</label>
                                <div className="relative">
                                    <i className="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                                    <input type="number" value={guestDetails.adults} onChange={(e) => setGuestDetails({ ...guestDetails, adults: parseInt(e.target.value) })} className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-[#1E3A6D] font-bold outline-none shadow-sm" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Children</label>
                                <div className="relative">
                                    <i className="fa-solid fa-child absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                                    <input type="number" value={guestDetails.child} onChange={(e) => setGuestDetails({ ...guestDetails, child: parseInt(e.target.value) })} className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-[#1E3A6D] font-bold outline-none shadow-sm" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Infants</label>
                                <div className="relative">
                                    <i className="fa-solid fa-baby absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                                    <input type="number" value={guestDetails.infant} onChange={(e) => setGuestDetails({ ...guestDetails, infant: parseInt(e.target.value) })} className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-[#1E3A6D] font-bold outline-none shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logistics & Arrivals Section with Timeline */}
                <div className={`${showLogistics ? 'block' : 'hidden'} bg-[#EEF3FA] rounded-2xl p-4 shadow-sm border border-slate-100`}>
                    <div className="flex items-center gap-3 border-b border-white/40">
                        <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 text-lg">
                            <i className="fa-solid fa-route"></i>
                        </div>
                        <h3 className="text-[#1E3A6D] font-extrabold tracking-wide uppercase text-sm">Logistics & Arrivals</h3>
                    </div>

                    <div className=" space-y-2 relative ml-6">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[-15px] top-2 bottom-8 w-[2px] bg-slate-200"></div>

                        {journey.map((item) => (
                            <div key={item.id} className="relative pl-2">
                                {/* Timeline Node Icon */}
                                <div className={`absolute left-[-38px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-[#EEF3FA] flex items-center justify-center z-10 shadow-lg ${item.type === 'hotel' ? 'bg-sky-500' : 'bg-orange-500'
                                    }`}>
                                    <i className={`fa-solid ${item.type === 'hotel' ? 'fa-hotel' : 'fa-bus'} text-white text-xs`}></i>
                                </div>

                                {/* Item Card */}
                                <div className="bg-[#1E293B] rounded-3xl p-4 text-white group relative shadow-xl hover:shadow-cyan-900/10 transition-all border border-white/5 hover:border-cyan-500/30">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[16px] font-extrabold uppercase tracking-[2px] px-3 py-1 rounded-full ${item.type === 'hotel' ? 'bg-sky-500/20 text-sky-400' : 'bg-orange-500/20 text-orange-400'
                                                    } border border-white/5`}>
                                                    {item.type}
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-bold">{item.name}</h4>
                                            <p className="text-slate-400 text-sm font-medium">{item.details}</p>
                                            <div className="flex items-center gap-3 mt-4 text-slate-500 text-[11px] font-bold bg-white/5 px-4 py-2 rounded-xl w-fit">
                                                <i className="fa-regular fa-clock text-cyan-500"></i>
                                                {item.subDetails}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-4">
                                            <span className="text-2xl font-black text-white">SAR {item.price?.toLocaleString()}</span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                            >
                                                <i className="fa-solid fa-trash-can text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Current Status / Add New Node */}
                        <div className="relative pl-9">
                            <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-8 h-8 border-4 border-[#EEF3FA] bg-slate-400 rounded-full flex items-center justify-center z-10 shadow-md">
                                <i className="fa-solid fa-plus text-white text-[10px]"></i>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-4 text-slate-500 font-bold text-sm py-4">
                                    <i className="fa-solid fa-location-dot text-cyan-500 text-lg"></i>
                                    <div>
                                        <p className="text-[10px] uppercase text-slate-400 tracking-widest">Current Position</p>
                                        <p className="text-[#1E3A6D] text-base">You are in <span className="font-extrabold underline decoration-cyan-500/40">{currentStatus}</span></p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-2xl text-sm font-extrabold flex items-center gap-3 transition-all hover:-translate-y-1 active:scale-95">
                                        <i className="fa-solid fa-bus-simple text-lg"></i>
                                        Add Transport
                                    </button>
                                    <button
                                        onClick={() => setShowHotelSelection(!showHotelSelection)}
                                        className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-2xl text-sm font-extrabold flex items-center gap-3 transition-all hover:-translate-y-1 active:scale-95"
                                    >
                                        <i className="fa-solid fa-hotel text-lg"></i>
                                        Add Hotel Stay
                                    </button>
                                    <button className="bg-[#1E293B] hover:bg-slate-800 text-white px-3 py-2 rounded-2xl text-sm font-extrabold flex items-center gap-3 transition-all hover:-translate-y-1 active:scale-95">
                                        <i className="fa-solid fa-user-shield text-lg"></i>
                                        Own Transport
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* End of Trip Marker */}
                        <div className="relative pl-12 pt-4">
                            <div className="absolute left-[-28px] top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-100 border-4 border-[#EEF3FA] rounded-full flex items-center justify-center z-10">
                                <i className="fa-solid fa-flag-checkered text-slate-300 text-[10px]"></i>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest">End of Journey</p>
                                <h4 className="text-slate-400 font-bold italic">Departure from Jeddah Airport</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hotel Selection Popup Grid */}
                {showHotelSelection && (
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 text-2xl">
                                    <i className="fa-solid fa-hotel"></i>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#1E3A6D]">Select Your Stay</h3>
                                    <p className="text-slate-400 text-sm font-medium">Available hotels in Makkah for your dates</p>
                                </div>
                            </div>
                            <button onClick={() => setShowHotelSelection(false)} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-2xl">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {makkahHotels.map(h => (
                                <div key={h.id} className="group cursor-pointer">
                                    <div className="bg-slate-50 rounded-[32px] p-8 border-2 border-transparent group-hover:border-sky-500 group-hover:bg-white transition-all shadow-sm hover:shadow-2xl">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 shadow-sm">
                                                {h.location} TO HARAM
                                            </div>
                                        </div>
                                        <h4 className="font-extrabold text-xl text-[#1E3A6D] group-hover:text-sky-600 transition-colors mb-6">{h.name}</h4>
                                        <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Starting from</p>
                                                <p className="text-2xl font-black text-[#1E3A6D]">SAR {h.price}</p>
                                            </div>
                                            <button className="h-12 px-6 font-black uppercase text-xs text-sky-500 bg-sky-50 rounded-2xl border-2 border-sky-100 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-all flex items-center justify-center gap-2">
                                                Select <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column - Trip Summary (Premium Sticky) */}
            <div className="w-full xl:w-[400px] space-y-6">
                <div className="bg-[#EEF3FA] rounded-[40px] p-10 text-white sticky top-10  overflow-hidden">

                    <h3 className="text-3xl text-[#1E3A6D] font-bold mb-2 flex items-center gap-5 relative z-10  pb-2">
                        Trip Summary
                    </h3>

                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-10 backdrop-blur-xl relative z-10">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-6">
                            <span>Currency Display</span>
                            <span>Live Rate</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl cursor-pointer hover:bg-white/20 transition-all border border-white/5">
                                <i className="fa-solid fa-globe text-cyan-400 text-lg"></i>
                                <span className="font-black text-base">SAR</span>
                                <i className="fa-solid fa-chevron-down text-[10px] text-slate-500"></i>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black block">1.00</span>
                                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">Locked</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">Service Provider</span>
                            <span className="text-cyan-400 underline underline-offset-8 decoration-cyan-500/40 font-black text-sm">Umrah Companions</span>
                        </div>

                        <div className="space-y-5 pt-8 mt-8 border-t border-white/10">
                            {[
                                { label: 'Total Travelers', value: `${totalTravelers} Pax`, icon: 'fa-users', color: 'text-slate-400' },
                                { label: 'Total Visas (4)', value: 'SAR 2,400', icon: 'fa-passport', color: 'text-emerald-400' },
                                { label: 'Hotels (2)', value: 'SAR 4,359', icon: 'fa-hotel', color: 'text-sky-400' },
                                { label: 'Transport (3)', value: 'SAR 1,250', icon: 'fa-bus-simple', color: 'text-orange-400' }
                            ].map((row, idx) => (
                                <div key={idx} className="flex justify-between items-center group cursor-default p-2 rounded-2xl hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${row.color} border border-white/5 group-hover:border-white/20 transition-all shadow-inner`}>
                                            <i className={`fa-solid ${row.icon} text-sm`}></i>
                                        </div>
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-[1px]">{row.label}</span>
                                    </div>
                                    <span className="font-black text-white group-hover:text-cyan-400 transition-colors text-base">{row.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-10 mt-10 border-t border-white/10 flex justify-between items-end px-2">
                            <div>
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] block mb-2">Total Estimate</span>
                                <p className="text-[10px] text-slate-400 font-medium italic">Incl. all taxes & service fees</p>
                            </div>
                            <div className="text-right">
                                <h4 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SAR 8,009</h4>
                                <p className="text-[10px] text-slate-500 font-black uppercase mt-1 tracking-widest">Guaranteed Price</p>
                            </div>
                        </div>

                        <div className="pt-10 space-y-5">
                            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white py-6 rounded-[24px] font-black text-lg transition-all shadow-2xl shadow-cyan-900/60 flex items-center justify-center gap-4 group relative overflow-hidden">
                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                <i className="fa-solid fa-paper-plane relative z-10 group-hover:rotate-12 transition-transform"></i>
                                <span className="relative z-10">Request a Quotation</span>
                            </button>
                            <div className="grid grid-cols-2 gap-5">
                                <button className="bg-white/5 hover:bg-white/10 text-white py-5 rounded-[20px] font-black transition-all border border-white/10 text-xs uppercase tracking-[2px] shadow-sm">
                                    Save Draft
                                </button>
                                <button className="bg-white/5 hover:bg-white/10 text-white py-5 rounded-[20px] font-black transition-all border border-white/10 text-xs uppercase tracking-[2px] shadow-sm">
                                    Email Quote
                                </button>
                            </div>
                            <button className="w-full pt-4 text-slate-500 text-[9px] font-black uppercase tracking-[3px] hover:text-red-400 transition-colors">
                                Cancel Lead Generation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLead;
