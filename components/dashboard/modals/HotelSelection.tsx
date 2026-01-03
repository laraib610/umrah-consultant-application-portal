import React, { useState } from 'react';

interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
    city: string;
    rating: number;
}

interface HotelSelectionProps {
    onConfirm: (hotelData: {
        hotelId: number;
        hotelName: string;
        nights: number;
        qty: number;
        rating: number;
        roomType: string;
        checkIn: string;
        checkOut: string;
    }) => void;
    onClose: () => void;
    hotelsData: Hotel[];
    transportRoute: string;
}

const HotelSelection: React.FC<HotelSelectionProps> = ({ onConfirm, onClose, hotelsData, transportRoute }) => {
    const [hotelNights, setHotelNights] = useState(3);
    const [hotelQty, setHotelQty] = useState(1);
    const [hotelRating, setHotelRating] = useState(5);
    const [hotelRoomType, setHotelRoomType] = useState('Double');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

    const getTargetCity = () => {
        if (transportRoute.includes('Makkah')) return 'Makkah';
        if (transportRoute.includes('Madinah')) return 'Madinah';
        return 'Makkah'; // Default
    };

    const filteredHotels = hotelsData.filter(h =>
        h.city === getTargetCity() && h.rating === hotelRating
    );

    const handleConfirm = () => {
        if (!selectedHotelId) {
            alert('Please select a hotel');
            return;
        }

        const selectedHotel = hotelsData.find(h => h.id === selectedHotelId);
        if (!selectedHotel) return;

        onConfirm({
            hotelId: selectedHotelId,
            hotelName: selectedHotel.name,
            nights: hotelNights,
            qty: hotelQty,
            rating: hotelRating,
            roomType: hotelRoomType,
            checkIn,
            checkOut
        });
    };

    return (
        <div className="bg-white rounded-[40px] p-5 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 text-2xl">
                        <i className="fa-solid fa-hotel"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-[#1E3A6D]">Hotel Selection</h3>
                        <p className="text-slate-400 text-sm font-medium">Available hotels in {getTargetCity()} for your dates</p>
                    </div>
                </div>
                <button onClick={onClose} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-2xl">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
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
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Room Type</label>
                        <select
                            value={hotelRoomType}
                            onChange={(e) => setHotelRoomType(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-sky-500 transition-all"
                        >
                            <option>Double</option>
                            <option>Triple</option>
                            <option>Quad</option>
                        </select>
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
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-sky-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-Out Date</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-sky-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {filteredHotels.map(h => (
                    <div key={h.id} className="group cursor-pointer" onClick={() => setSelectedHotelId(h.id)}>
                        <div className={`bg-slate-50 rounded-2xl p-4 border-2 border-transparent ${selectedHotelId === h.id
                            ? 'bg-[#24B3BA] border-transparent text-white'
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

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleConfirm}
                    className="bg-[#1E3A6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all disabled:opacity-50"
                    disabled={!selectedHotelId}
                >
                    Confirm Hotel Selection
                </button>
            </div>
        </div>
    );
};

export default HotelSelection;
