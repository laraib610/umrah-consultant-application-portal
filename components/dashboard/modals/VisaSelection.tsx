import React, { useState } from 'react';

interface VisaSelectionProps {
    onConfirm: (visaData: { type: string; qty: number; name: string }) => void;
    onClose: () => void;
    totalTravelers: number;
}

const VisaSelection: React.FC<VisaSelectionProps> = ({ onConfirm, onClose, totalTravelers }) => {
    const [visaType, setVisaType] = useState('Umrah Visa');
    const [visaQty, setVisaQty] = useState(totalTravelers);
    const [passengerName, setPassengerName] = useState('');

    const handleConfirm = () => {
        onConfirm({
            type: visaType,
            qty: visaQty,
            name: passengerName
        });
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50 mb-8 mt-2">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                        <i className="fa-solid fa-passport"></i>
                    </div>
                    <h3 className="text-xl font-black text-[#1E3A6D]">Visa Selection</h3>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all">
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
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        placeholder="Enter name or reference..."
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[#1E3A6D] font-bold outline-none focus:border-emerald-500 transition-all"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleConfirm}
                    className="bg-[#1E3A6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all shadow-lg"
                >
                    Confirm Visa Details
                </button>
            </div>
        </div>
    );
};

export default VisaSelection;
