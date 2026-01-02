import React, { useState } from 'react';

interface JourneyItem {
    id: string;
    type: 'hotel' | 'transport' | 'visa' | 'flight';
    name: string;
    details: string;
    subDetails: string;
    price?: number;
}

interface NewLeadProps {
    onCreateLead?: (lead: any) => void;
    onCancel?: () => void;
}

const NewLead: React.FC<NewLeadProps> = ({ onCreateLead, onCancel }) => {
    const [activeServices, setActiveServices] = useState<string[]>(['visas', 'flights', 'hotels', 'transport']);
    const [guestDetails, setGuestDetails] = useState({
        name: 'Asad',
        email: 'guest@example.com',
        phone: '+966...',
        adults: 4,
        child: 0,
        infant: 0,
        departureCity: '',
        arrivalDate: '',
        checkIn: '',
        checkOut: '',
        makHotel: '',
        madHotel: ''
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

    const [activeModal, setActiveModal] = useState<'hotel' | 'visa' | 'flight' | 'transport' | null>(null);
    const [hotelNights, setHotelNights] = useState(3);
    const [hotelQty, setHotelQty] = useState(1);
    const [hotelRating, setHotelRating] = useState(5);

    const [showAddNodeSelection, setShowAddNodeSelection] = useState(false);
    const [visaType, setVisaType] = useState('Umrah Visa');
    const totalTravelers = guestDetails.adults + guestDetails.child + guestDetails.infant;
    const [visaQty, setVisaQty] = useState(totalTravelers);
    const [flightBrand, setFlightBrand] = useState('PIA');
    const [flightDate, setFlightDate] = useState('');
    const [checkIn, setHotelCheckIn] = useState('');
    const [checkOut, setHotelCheckOut] = useState('');
    const countryData: Record<string, string[]> = {
        'Pakistan': ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Sialkot'],
        'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Glasgow'],
        'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah'],
        'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
        'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston']
    };

    const [departureCountry, setDepartureCountry] = useState(Object.keys(countryData)[0]);
    const [departureCity, setDepartureCity] = useState(countryData[Object.keys(countryData)[0]][0]);
    const [flightDuration, setFlightDuration] = useState(7);

    const [transportRoute, setTransportRoute] = useState('Jeddah Airport-Makkah');
    const [transportType, setTransportType] = useState('GMC');
    const [madhotel, setMadHotel] = useState(1);
    const [makhotel, setMakHotel] = useState(1)
    const [transportQty, setTransportQty] = useState(1);
    const [arrivalDate, setArrivalDate] = useState('');

    const [currentStatus, setCurrentStatus] = useState('Jeddah Airport');

    const toggleService = (service: string) => {
        setActiveServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const hotelsData = [
        { id: 1, name: 'Swissôtel Makkah', location: '0m', price: 850, city: 'Makkah', rating: 5 },
        { id: 2, name: 'Fairmont Makkah', location: '0m', price: 950, city: 'Makkah', rating: 5 },
        { id: 3, name: 'Anjum Hotel', location: '300m', price: 450, city: 'Makkah', rating: 4 },
        { id: 4, name: 'Oberoi Madinah', location: '0m', price: 1200, city: 'Madinah', rating: 5 },
        { id: 5, name: 'Pulman Zamzam', location: '50m', price: 650, city: 'Madinah', rating: 5 },
        { id: 6, name: 'Dar Al Taqwa', location: '0m', price: 800, city: 'Madinah', rating: 4 },
        { id: 7, name: 'Millennium Madinah', location: '100m', price: 400, city: 'Madinah', rating: 4 }
    ];

    const getTargetCity = () => {
        if (transportRoute.includes('Makkah')) return 'Makkah';
        if (transportRoute.includes('Madinah')) return 'Madinah';
        return 'Makkah'; // Default
    };

    const filteredHotels = hotelsData.filter(h =>
        h.city === getTargetCity() && h.rating === hotelRating
    );

    const transportVehicles = [
        { id: 1, name: 'Staria', capacity: '7-9 Pilgrims', storage: '5-6 Bags', icon: 'fa-van-shuttle' },
        { id: 2, name: 'GMC', capacity: '6 Pilgrims', storage: '4-5 Bags', icon: 'fa-car-side' },
        { id: 3, name: 'Hyundai H1', capacity: '7-9 Pilgrims', storage: '5-6 Bags', icon: 'fa-van-shuttle' },
        { id: 4, name: 'Hiace', capacity: '12-14 Pilgrims', storage: '8-10 Bags', icon: 'fa-bus' },
        { id: 5, name: 'Bus', capacity: '45-50 Pilgrims', storage: 'Large Cargo', icon: 'fa-bus-simple' },
        { id: 6, name: 'Coaster', capacity: '20-22 Pilgrims', storage: '12-15 Bags', icon: 'fa-bus' }
    ];

    const removeItem = (id: string) => {
        setJourney(prev => prev.filter(item => item.id !== id));
    };

    const showLogistics = activeServices.includes('transport') || activeServices.includes('hotels') || activeServices.includes('visas') || activeServices.includes('flights');

    return (
        <div className="flex flex-col xl:flex-row gap-8 animate-[fadeIn_0.5s_ease-out]">
            {/* Left Column - Form & Timeline */}
            <div className="flex-1 space-y-6">


                {/* Service Provider & Tabs */}
                <div className="bg-[#EEF3FA] rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1E3A6D] rounded-xl flex items-center justify-center text-white font-bold text-xl">U</div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[3px]">Service Provider</p>
                                <h3 className="text-[#1E3A6D] font-extrabold text-xl">Umrah Companions</h3>
                            </div>
                        </div>
                    </div>


                    {/* </div> */}

                    {/* Lead Guest Details */}
                    {/* <div className="bg-[#EEF3FA] rounded-2xl p-4 shadow-sm border border-slate-100"> */}
                    <div className="flex items-center gap-3 mb-2  border-b border-white/40">
                        <h3 className="text-[#1E3A6D] font-extrabold tracking-wide uppercase text-sm">Lead Guest Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                        <div className="space-y-2">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                value={guestDetails.name}
                                onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3 text-[#1E3A6D]  focus:border-blue-500 outline-none transition-all "
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="text"
                                value={guestDetails.email}
                                onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3 text-[#1E3A6D]  focus:border-blue-500 outline-none transition-all "
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                            <input
                                type="text"
                                value={guestDetails.phone}
                                onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3 text-[#1E3A6D]  focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <div className="space-y-2">
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Adults</label>
                                <div className="flex items-center gap-4 bg-white border-2 border-slate-100 rounded-2xl p-2 w-full">
                                    <button
                                        onClick={() => setGuestDetails({ ...guestDetails, adults: Math.max(1, guestDetails.adults - 1) })}
                                        className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                    >
                                        <i className="fa-solid fa-minus text-xs"></i>
                                    </button>
                                    <span className="text-md  text-[#1E3A6D] flex-1 text-center">{guestDetails.adults}</span>
                                    <button
                                        onClick={() => setGuestDetails({ ...guestDetails, adults: guestDetails.adults + 1 })}
                                        className="w-8  h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                    >
                                        <i className="fa-solid fa-plus text-xs"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Children</label>
                                <div className="flex items-center gap-4 bg-white border-2 border-slate-100 rounded-2xl p-2 w-full">
                                    <button
                                        onClick={() => setGuestDetails({ ...guestDetails, child: Math.max(0, guestDetails.child - 1) })}
                                        className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                    >
                                        <i className="fa-solid fa-minus text-xs"></i>
                                    </button>
                                    <span className="text-md  text-[#1E3A6D] flex-1 text-center">{guestDetails.child}</span>
                                    <button
                                        onClick={() => setGuestDetails({ ...guestDetails, child: guestDetails.child + 1 })}
                                        className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                    >
                                        <i className="fa-solid fa-plus text-xs"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Infants</label>
                                <div className="flex items-center gap-4 bg-white border-2 border-slate-100 rounded-2xl p-2 w-full">
                                    <button
                                        onClick={() => setGuestDetails({ ...guestDetails, infant: Math.max(0, guestDetails.infant - 1) })}
                                        className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                    >
                                        <i className="fa-solid fa-minus text-xs"></i>
                                    </button>
                                    <span className="text-md  text-[#1E3A6D] flex-1 text-center">{guestDetails.infant}</span>
                                    <button
                                        onClick={() => setGuestDetails({ ...guestDetails, infant: guestDetails.infant + 1 })}
                                        className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                    >
                                        <i className="fa-solid fa-plus text-xs"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Conditional Departure City and Arrival Date */}
                            {(!activeServices.includes('visas') && !activeServices.includes('flights')) && (
                                <>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Departure City</label>
                                        <input
                                            type="text"
                                            value={guestDetails.departureCity}
                                            placeholder="Enter Departure City"
                                            onChange={(e) => setGuestDetails({ ...guestDetails, departureCity: e.target.value })}
                                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3 text-[#1E3A6D] focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Arrival Date</label>
                                        <input
                                            type="date"
                                            value={guestDetails.arrivalDate}
                                            onChange={(e) => setGuestDetails({ ...guestDetails, arrivalDate: e.target.value })}
                                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3 text-[#1E3A6D] focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest">Required Services</p>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { id: 'visas', label: 'Visas', icon: 'fa-file-invoice', color: 'bg-white' },
                                { id: 'flights', label: 'Flights', icon: 'fa-plane', color: 'bg-white' },
                                { id: 'hotels', label: 'Hotels', icon: 'fa-hotel', color: 'bg-white' },
                                { id: 'transport', label: 'Transport', icon: 'fa-bus', color: 'bg-white' }
                            ].map(service => (
                                <button
                                    key={service.id}
                                    onClick={() => toggleService(service.id)}
                                    className={`flex items-center gap-2 px-2 py-1 rounded-2xl transition-all border-1 ${activeServices.includes(service.id)
                                        ? `bg-[#24B3BA] text-white border-transparent scale-105`
                                        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <i className={`fa-solid ${service.icon} text-lg`}></i>
                                    <span className="font-semibold text-sm tracking-wide">{service.label}</span>
                                    {activeServices.includes(service.id) && <i className="fa-solid fa-circle-check text-[12px] ml-1"></i>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Logistics & Arrivals Section with Timeline */}
                <div className={`${showLogistics ? 'block' : 'hidden'} bg-[#EEF3FA] rounded-2xl p-4 shadow-sm border border-slate-100`}>
                    <div className="flex justify-between items-center border-b border-white/40 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 text-lg">
                                <i className="fa-solid fa-route"></i>
                            </div>
                            <h3 className="text-[#1E3A6D] font-extrabold tracking-wide uppercase text-sm">Logistics & Arrivals</h3>
                        </div>
                        <button
                            onClick={() => setShowAddNodeSelection(!showAddNodeSelection)}
                            className="text-[#1E3A6D] font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:text-cyan-500 transition-colors"
                        >
                            <i className="fa-solid fa-plus-circle"></i>
                            Add Group
                        </button>
                    </div>

                    {/* {showAddNodeSelection && (
                        <div className="mb-8 p-4 bg-white/50 rounded-2xl border-2 border-dashed border-slate-200 animate-[fadeIn_0.3s_ease-out]">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Add New Node</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setShowVisaSelection(true); setShowAddNodeSelection(false); }}
                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10"
                                >
                                    <i className="fa-solid fa-passport"></i>
                                    Visa
                                </button>
                                <button
                                    onClick={() => { setShowFlightSelection(true); setShowAddNodeSelection(false); }}
                                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10"
                                >
                                    <i className="fa-solid fa-plane"></i>
                                    Flight
                                </button>
                            </div>
                        </div>
                    )} */}


                    <div className=" space-y-2 relative ml-6">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[-15px] top-2 bottom-8 w-[2px] bg-slate-200"></div>

                        {journey.map((item) => (
                            <div key={item.id} className="relative pl-2">
                                {/* Timeline Node Icon */}
                                <div className={`absolute left-[-38px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-[#EEF3FA] flex items-center justify-center z-10 shadow-lg ${item.type === 'hotel' ? 'bg-sky-500' :
                                    item.type === 'transport' ? 'bg-[#1c8f94]' :
                                        item.type === 'visa' ? 'bg-[#24b3ba]' :
                                            item.type === 'hotel' ? 'bg-[#197d82]' : 'bg-[#24B3BA]'
                                    }`}>
                                    <i className={`fa-solid ${item.type === 'hotel' ? 'fa-hotel' :
                                        item.type === 'transport' ? 'fa-bus' :
                                            item.type === 'visa' ? 'fa-passport' : 'fa-plane'
                                        } text-white text-xs`}></i>
                                </div>

                                {/* Item Card */}
                                <div className="bg-white rounded-3xl p-4 text-[#1E3A6D] group relative hover:shadow-cyan-900/10 transition-all border border-white/5 hover:border-cyan-500/30">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-semibold uppercase tracking-[2px] px-3 py-1 rounded-full ${item.type === 'hotel' ? 'bg-sky-500/20 text-sky-400' :
                                                    item.type === 'transport' ? 'bg-orange-500/20 text-orange-400' :
                                                        item.type === 'visa' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
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
                        {showAddNodeSelection && (
                            <div className="relative pl-9">
                                <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-8 h-8 border-4 border-[#EEF3FA] bg-slate-400 rounded-full flex items-center justify-center z-10 shadow-md">
                                    <i className="fa-solid fa-plus text-white text-[10px]"></i>
                                </div>
                                <div className=" gap-2">
                                    <div className="flex items-center gap-4 text-slate-500 font-bold text-sm py-4">
                                        <i className="fa-solid fa-location-dot text-cyan-500 text-lg"></i>
                                        <div>
                                            <p className="text-[10px] uppercase text-slate-400 tracking-widest">Current Position</p>
                                            <p className="text-[#1E3A6D] text-base">You are in <span className="font-extrabold underline decoration-cyan-500/40">{currentStatus}</span></p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        {activeServices.includes('visas') && !journey.some(item => item.type === 'visa') && (
                                            <button
                                                onClick={() => { setActiveModal(activeModal === 'visa' ? null : 'visa'); }}
                                                className="bg-[#24b3ba] hover:bg-emerald-600 text-white px-3 py-2 rounded-2xl text-sm font-semibold flex items-center gap-1 transition-all hover:-translate-y-1 active:scale-95"
                                            >
                                                <i className="fa-solid fa-passport"></i>
                                                Add Visa
                                            </button>
                                        )}
                                        {activeServices.includes('flights') && !journey.some(item => item.type === 'flight') && (
                                            <button onClick={() => { setActiveModal(activeModal === 'flight' ? null : 'flight'); }} className="bg-[#24B3BA] hover:bg-cyan-600 text-white px-3 py-2 rounded-2xl text-sm font-semibold flex items-center gap-1 transition-all hover:-translate-y-1 active:scale-95">
                                                <i className="fa-solid fa-plane"></i>
                                                Add Flight
                                            </button>
                                        )}
                                        {activeServices.includes('transport') && (
                                            <button
                                                onClick={() => { setActiveModal(activeModal === 'transport' ? null : 'transport'); }}
                                                className="bg-[#1c8f94] hover:bg-emerald-600 text-white px-3 py-2 rounded-2xl text-sm font-semibold flex items-center gap-1 transition-all hover:-translate-y-1 active:scale-95"
                                            >
                                                <i className="fa-solid fa-bus "></i>
                                                Add Transport
                                            </button>
                                        )}
                                        {activeServices.includes('hotels') && (
                                            <button
                                                onClick={() => setActiveModal(activeModal === 'hotel' ? null : 'hotel')}
                                                className="bg-[#197d82] hover:bg-sky-600 text-white px-3 py-2 rounded-2xl text-sm font-semibold flex items-center gap-1 transition-all hover:-translate-y-1 active:scale-95"
                                            >
                                                <i className="fa-solid fa-hotel text-md"></i>
                                                Add Hotel
                                            </button>
                                        )}
                                        {activeServices.includes('transport') && (
                                            <button className="bg-[#1E293B] hover:bg-slate-800 text-white px-3 py-2 rounded-2xl text-sm font-semibold flex items-center gap-1 transition-all hover:-translate-y-1 active:scale-95">
                                                <i className="fa-solid fa-user-shield text-md"></i>
                                                Own Transport
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Hotel Selection Popup Grid */}

                        {activeModal === 'visa' && (
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50 mb-8 mt-2">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                                            <i className="fa-solid fa-passport"></i>
                                        </div>
                                        <h3 className="text-xl font-black text-[#1E3A6D]">Visa Selection</h3>
                                    </div>
                                    <button onClick={() => setActiveModal(null)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visa Type</label>
                                        <select
                                            value={visaType}
                                            onChange={(e) => setVisaType(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-emerald-500 transition-all"
                                        >
                                            <option>Umrah Visa</option>
                                            <option>Tourist Visa</option>
                                            <option>Personal Visit</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantity</label>
                                        <input
                                            type="number"
                                            value={visaQty}
                                            onChange={(e) => setVisaQty(parseInt(e.target.value))}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lead Passenger Name / Reference</label>
                                        <input
                                            type="text"
                                            placeholder="Enter name or reference..."
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => {
                                            const newItem: JourneyItem = {
                                                id: Date.now().toString(),
                                                type: 'visa',
                                                name: visaType,
                                                details: `${visaQty} Applicants`,
                                                subDetails: 'Approved',
                                                price: 0
                                            };
                                            setJourney([...journey, newItem]);
                                            setActiveModal(null);
                                        }}
                                        className="bg-[#1E3A6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all shadow-lg"
                                    >
                                        Confirm Visa Details
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeModal === 'flight' && (
                            <div className="bg-white rounded-[32px] p-6 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50 mb-8 mt-2">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
                                            <i className="fa-solid fa-plane"></i>
                                        </div>
                                        <h3 className="text-xl font-black text-[#1E3A6D]">Flight Selection</h3>
                                    </div>
                                    <button onClick={() => setActiveModal(null)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Flight Brand</label>
                                        <select
                                            value={flightBrand}
                                            onChange={(e) => setFlightBrand(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-cyan-500 transition-all"
                                        >
                                            <option>PIA</option>
                                            <option>Serene Air</option>
                                            <option>Air Blue</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expected Flight Date</label>
                                        <input
                                            type="date"
                                            value={flightDate}
                                            onChange={(e) => setFlightDate(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-cyan-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Departure Country</label>
                                        <select
                                            value={departureCountry}
                                            onChange={(e) => {
                                                const country = e.target.value;
                                                setDepartureCountry(country);
                                                setDepartureCity(countryData[country][0]);
                                            }}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-cyan-500 transition-all"
                                        >
                                            {Object.keys(countryData).map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Departure City</label>
                                        <select
                                            value={departureCity}
                                            onChange={(e) => setDepartureCity(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-cyan-500 transition-all"
                                        >
                                            {countryData[departureCountry].map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration of Flight</label>
                                        <div className="flex gap-4">
                                            {[7, 14, 21].map((duration) => (
                                                <button
                                                    key={duration}
                                                    onClick={() => setFlightDuration(duration)}
                                                    className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 ${flightDuration === duration
                                                        ? 'bg-cyan-500 text-white border-transparent'
                                                        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                                                >
                                                    {duration} Days
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => {
                                            const newItem: JourneyItem = {
                                                id: Date.now().toString(),
                                                type: 'flight',
                                                name: `Flight: ${flightBrand}`,
                                                details: `${departureCity} → Saudi Arabia`,
                                                subDetails: `${flightDate || 'No date'} • ${flightDuration} Days`,
                                                price: 0
                                            };
                                            setJourney([...journey, newItem]);
                                            setActiveModal(null);
                                        }}
                                        className="bg-[#1E3A6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all shadow-lg"
                                    >
                                        Confirm Flight Details
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeModal === 'transport' && (
                            <div className="bg-white rounded-[32px] p-6 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50 mb-8 mt-2">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#24B3BA]/10 rounded-xl flex items-center justify-center text-[#24B3BA]">
                                            <i className="fa-solid fa-bus"></i>
                                        </div>
                                        <h3 className="text-xl font-black text-[#1E3A6D]">Transport Selection</h3>
                                    </div>
                                    <button onClick={() => setActiveModal(null)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Route</label>
                                            <select
                                                value={transportRoute}
                                                onChange={(e) => setTransportRoute(e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-[#24B3BA] transition-all"
                                            >
                                                <option>Jeddah Airport-Makkah</option>
                                                <option>Makkah-Madinah</option>
                                                <option>Madinah-Makkah</option>
                                                <option>Makkah-Jeddah Airport</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Arrival Date</label>
                                            <input
                                                type="date"
                                                value={arrivalDate}
                                                onChange={(e) => setArrivalDate(e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-[#24B3BA] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantity</label>
                                            <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-100 rounded-2xl p-[6px] w-full">
                                                <button
                                                    onClick={() => setTransportQty(Math.max(1, transportQty - 1))}
                                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all font-black transition-all active:scale-90"
                                                >
                                                    <i className="fa-solid fa-minus text-xs"></i>
                                                </button>
                                                <span className="text-xl font-black text-[#1E3A6D] flex-1 text-center">{transportQty}</span>
                                                <button
                                                    onClick={() => setTransportQty(transportQty + 1)}
                                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all font-black transition-all active:scale-90"
                                                >
                                                    <i className="fa-solid fa-plus text-xs"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Choose Vehicle Type</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {transportVehicles.map((vehicle) => (
                                                <button
                                                    key={vehicle.id}
                                                    onClick={() => setTransportType(vehicle.name)}
                                                    className={`p-4 rounded-[24px] border-2 transition-all flex flex-col items-center gap-2 text-center group ${transportType === vehicle.name
                                                        ? 'bg-[#24B3BA] border-transparent text-white '
                                                        : 'bg-white border-slate-100 text-[#1E3A6D] hover:border-[#24B3BA]/30'
                                                        }`}
                                                >
                                                    <i className={`fa-solid ${vehicle.icon} text-xl ${transportType === vehicle.name ? 'text-white' : 'text-[#24B3BA]'}`}></i>
                                                    <span className="font-extrabold text-sm">{vehicle.name}</span>
                                                    <div className={`text-[9px] font-bold uppercase tracking-tighter ${transportType === vehicle.name ? 'text-blue-50' : 'text-slate-400'}`}>
                                                        <p>{vehicle.capacity}</p>
                                                        <p>{vehicle.storage}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setActiveModal(null)}
                                            className="bg-[#1E3A6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all"
                                        >
                                            Confirm Transport Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Hotel Selection Popup Grid */}
                        {activeModal === 'hotel' && (
                            <div className="bg-white rounded-[40px] p-5 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 text-2xl">
                                            <i className="fa-solid fa-hotel"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-[#1E3A6D]">Hotel Selection</h3>
                                            <p className="text-slate-400 text-sm font-medium">Available hotels in Makkah for your dates</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setActiveModal(null)} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-2xl">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className=" bg-slate-50 p-6 rounded-[32px] border border-slate-100 mb-8 ">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">No. of Nights</label>
                                            <div className="flex items-center gap-4 bg-white border-2 border-slate-100 rounded-2xl p-2 w-full">
                                                <button
                                                    onClick={() => setHotelNights(Math.max(1, hotelNights - 1))}
                                                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                                >
                                                    <i className="fa-solid fa-minus text-xs"></i>
                                                </button>
                                                <span className="text-xl font-black text-[#1E3A6D] flex-1 text-center">{hotelNights}</span>
                                                <button
                                                    onClick={() => setHotelNights(hotelNights + 1)}
                                                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                                >
                                                    <i className="fa-solid fa-plus text-xs"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Room Quantity</label>
                                            <div className="flex items-center gap-4 bg-white border-2 border-slate-100 rounded-2xl p-2 w-full">
                                                <button
                                                    onClick={() => setHotelQty(Math.max(1, hotelQty - 1))}
                                                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                                >
                                                    <i className="fa-solid fa-minus text-xs"></i>
                                                </button>
                                                <span className="text-xl font-black text-[#1E3A6D] flex-1 text-center">{hotelQty}</span>
                                                <button
                                                    onClick={() => setHotelQty(hotelQty + 1)}
                                                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E3A6D] hover:bg-slate-100 transition-all active:scale-95"
                                                >
                                                    <i className="fa-solid fa-plus text-xs"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ratings</label>
                                            <select
                                                value={hotelRating}
                                                onChange={(e) => setHotelRating(parseInt(e.target.value))}
                                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-sky-500 transition-all"
                                            >
                                                <option value={5}>5 Star Hotels</option>
                                                <option value={4}>4 Star Hotels</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-In Date</label>
                                            <input type="date"
                                                value={checkIn}
                                                onChange={(e) => setHotelCheckIn(e.target.value)}
                                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-sky-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-Out Date</label>
                                            <input type="date"
                                                value={checkOut}
                                                onChange={(e) => setHotelCheckOut(e.target.value)}
                                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-sky-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                                    {filteredHotels.map(h => (
                                        <div key={h.id} className="group cursor-pointer " onClick={() => setMakHotel(h.id)}>
                                            <div className={`bg-slate-50 rounded-2xl p-4 border-2 border-transparent  ${makhotel === h.id
                                                ? 'bg-[#24B3BA] border-transparent text-white '
                                                : 'bg-slate-50 border-slate-100 text-[#1E3A6D] hover:border-[#24B3BA]/30'}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 shadow-sm">
                                                        {h.location} TO HARAM
                                                    </div>
                                                </div>
                                                <h4 className="font-extrabold text-lg transition-colors mb-1">{h.name}</h4>
                                                <div className="flex gap-0.5 text-amber-400 text-[10px] mb-1">
                                                    {[...Array(h.rating)].map((_, i) => (
                                                        <i key={i} className="fa-solid fa-star"></i>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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


            </div>

            {/* Right Column - Trip Summary (Premium Sticky) */}
            <div className="w-full xl:w-[400px] space-y-6">
                <div className="bg-[#EEF3FA] rounded-2xl p-5 text-[#1E3A6D] sticky top-10  overflow-hidden">

                    <h3 className="text-xl text-[#1E3A6D] font-bold mb-2 flex items-center gap-5 relative z-10  pb-2">
                        Trip Summary
                    </h3>

                    <div className="space-y-2 relative z-10">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">Service Provider</span>
                            <span className="text-cyan-400 underline underline-offset-8 decoration-cyan-500/40 font-black text-sm">Umrah Companions</span>
                        </div>

                        <div className=" border-t border-white/10">
                            {[
                                { label: 'Flight', icon: 'fa-plane', color: 'text-slate-400' },
                                { label: 'Visas (4)', icon: 'fa-passport', color: 'text-emerald-400' },
                                { label: 'Hotels (2)', icon: 'fa-hotel', color: 'text-sky-400' },
                                { label: 'Transport (3)', icon: 'fa-bus-simple', color: 'text-orange-400' }
                            ].map((row, idx) => (
                                <div key={idx} className="flex justify-between items-center group cursor-default p-2 rounded-2xl hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${row.color} border border-white/5 group-hover:border-white/20 transition-all shadow-inner`}>
                                            <i className={`fa-solid ${row.icon} text-sm`}></i>
                                        </div>
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-[1px]">{row.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 space-y-5">
                            <button
                                onClick={() => document.getElementById('submit-quotation-trigger')?.click()}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white py-3 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-4 group relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                <i className="fa-solid fa-paper-plane relative z-10 group-hover:rotate-12 transition-transform"></i>
                                <span className="relative z-10">Request a Quotation</span>
                            </button>
                            <div className="grid grid-cols-2 gap-5">
                                <button className="bg-white/5 border border-gray-300 hover:bg-white/10 text-[#1E3A6D] py-5 rounded-[20px] font-black transition-all  text-xs uppercase tracking-[2px]">
                                    Save Draft
                                </button>
                                <button className="bg-white/5 border border-gray-300 hover:bg-white/10 text-[#1E3A6D] py-5 rounded-[20px] font-black transition-all  text-xs uppercase tracking-[2px]" onClick={onCancel}>
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                </div>


            </div>

            {/* Hidden form for final submission */}
            <div className="hidden">
                <button
                    id="submit-quotation-trigger"
                    onClick={() => {
                        const flightItem = journey.find(i => i.type === 'flight');
                        const visaItem = journey.find(i => i.type === 'visa');
                        const transportItem = journey.find(i => i.type === 'transport');
                        const hotelItem = journey.find(i => i.type === 'hotel');

                        onCreateLead?.({
                            id: Date.now().toString(),
                            quotationNumber: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
                            name: guestDetails.name,
                            email: guestDetails.email,
                            phone: guestDetails.phone,
                            flight: flightItem ? `${flightItem.name} (${flightItem.details})` : '',
                            visa: visaItem ? `${visaItem.name} (${visaItem.details})` : '',
                            transport: transportItem ? `${transportItem.name} (${transportItem.details})` : '',
                            hotel: hotelItem ? `${hotelItem.name} (${hotelItem.details})` : '',
                            status: 'New',
                            paymentStatus: 'Unpaid',
                            quotationStatus: 'Pending',
                            packageStatus: 'Standard',
                            date: new Date().toLocaleDateString('en-GB')
                        });
                    }}
                ></button>
            </div>
        </div>
    );
};

export default NewLead;
