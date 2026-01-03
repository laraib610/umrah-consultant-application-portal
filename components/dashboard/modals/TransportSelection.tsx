import React, { useState } from 'react';

interface VehicleType {
    id: number;
    name: string;
    capacity: string;
    storage: string;
    icon: string;
}

interface TransportSelectionProps {
    onConfirm: (transportData: {
        route: string;
        vehicles: Record<string, number>;
        arrivalDate: string;
    }) => void;
    onClose: () => void;
    transportVehicles: VehicleType[];
}

const TransportSelection: React.FC<TransportSelectionProps> = ({ onConfirm, onClose, transportVehicles }) => {
    const [transportRoute, setTransportRoute] = useState('Jeddah Airport-Makkah');
    const [selectedVehicles, setSelectedVehicles] = useState<Record<string, number>>({});
    const [arrivalDate, setArrivalDate] = useState('');

    const handleConfirm = () => {
        const selectedVehicleEntries = Object.entries(selectedVehicles).filter(([_, qty]: [string, number]) => qty > 0);

        if (selectedVehicleEntries.length === 0) {
            alert('Please select at least one vehicle');
            return;
        }

        onConfirm({
            route: transportRoute,
            vehicles: selectedVehicles,
            arrivalDate
        });
    };

    return (
        <div className="bg-white rounded-[32px] p-6 border border-slate-100 animate-[slideUp_0.4s_ease-out] relative z-50 mb-8 mt-2">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#24B3BA]/10 rounded-xl flex items-center justify-center text-[#24B3BA]">
                        <i className="fa-solid fa-bus"></i>
                    </div>
                    <h3 className="text-xl font-black text-[#1E3A6D]">Transport Selection</h3>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Vehicle Types (Multiple Allowed)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {transportVehicles.map((vehicle) => {
                            const quantity = selectedVehicles[vehicle.name] || 0;
                            const isSelected = quantity > 0;

                            return (
                                <div
                                    key={vehicle.id}
                                    className={`p-4 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 text-center ${isSelected
                                        ? 'bg-[#24B3BA] border-transparent text-white'
                                        : 'bg-white border-slate-100 text-[#1E3A6D]'
                                        }`}
                                >
                                    <i className={`fa-solid ${vehicle.icon} text-xl ${isSelected ? 'text-white' : 'text-[#24B3BA]'}`}></i>
                                    <span className="font-extrabold text-sm">{vehicle.name}</span>
                                    <div className={`text-[9px] font-bold uppercase tracking-tighter ${isSelected ? 'text-blue-50' : 'text-slate-400'}`}>
                                        <p>{vehicle.capacity}</p>
                                        <p>{vehicle.storage}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 mt-2 w-full">
                                        <button
                                            onClick={() => {
                                                const newQty = Math.max(0, quantity - 1);
                                                setSelectedVehicles(prev => {
                                                    if (newQty === 0) {
                                                        const { [vehicle.name]: _, ...rest } = prev;
                                                        return rest;
                                                    }
                                                    return { ...prev, [vehicle.name]: newQty };
                                                });
                                            }}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90 ${isSelected
                                                ? 'bg-white/20 text-white hover:bg-white/30'
                                                : 'bg-slate-100 text-[#1E3A6D] hover:bg-slate-200'
                                                }`}
                                        >
                                            <i className="fa-solid fa-minus text-xs"></i>
                                        </button>
                                        <span className={`text-lg font-black flex-1 text-center tabular-nums ${isSelected ? 'text-white' : 'text-[#1E3A6D]'}`}>
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => {
                                                setSelectedVehicles(prev => ({
                                                    ...prev,
                                                    [vehicle.name]: quantity + 1
                                                }));
                                            }}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90 ${isSelected
                                                ? 'bg-white/20 text-white hover:bg-white/30'
                                                : 'bg-slate-100 text-[#1E3A6D] hover:bg-slate-200'
                                                }`}
                                        >
                                            <i className="fa-solid fa-plus text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleConfirm}
                        className="bg-[#1E3A6D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={Object.values(selectedVehicles).every(qty => qty === 0)}
                    >
                        Confirm Transport Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransportSelection;
