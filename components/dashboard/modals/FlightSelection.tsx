import React, { useState } from 'react';

interface FlightSelectionProps {
    onConfirm: (flightData: {
        brand: string;
        date: string;
        departureCountry: string;
        departureCity: string;
        duration: number;
    }) => void;
    onClose: () => void;
    countryData: Record<string, string[]>;
}

const FlightSelection: React.FC<FlightSelectionProps> = ({ onConfirm, onClose, countryData }) => {
    const [flightBrand, setFlightBrand] = useState('PIA');
    const [flightDate, setFlightDate] = useState('');
    const [departureCountry, setDepartureCountry] = useState(Object.keys(countryData)[0]);
    const [departureCity, setDepartureCity] = useState(countryData[Object.keys(countryData)[0]][0]);
    const [flightDuration, setFlightDuration] = useState(7);

    const handleConfirm = () => {
        onConfirm({
            brand: flightBrand,
            date: flightDate,
            departureCountry,
            departureCity,
            duration: flightDuration
        });
    };

    return (
        <div className="bg-white rounded-[32px] p-6 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50 mb-8 mt-2">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
                        <i className="fa-solid fa-plane"></i>
                    </div>
                    <h3 className="text-xl font-black text-[#1E3A6D]">Flight Selection</h3>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all">
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
                    onClick={handleConfirm}
                    className="bg-[#1E3A6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all shadow-lg"
                >
                    Confirm Flight Details
                </button>
            </div>
        </div>
    );
};

export default FlightSelection;
