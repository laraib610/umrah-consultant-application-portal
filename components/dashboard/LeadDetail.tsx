import React from 'react';
import { Lead } from '../../types';

interface LeadDetailProps {
    lead: Lead;
    onBack: () => void;
    onManageVoucher: () => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onBack, onManageVoucher }) => {
    const handleDownload = () => {
        window.print();
    };

    const getBadgeStyle = (status: string) => {
        const lower = status.toLowerCase();
        if (lower.includes('paid') || lower.includes('approved') || lower.includes('confirmed'))
            return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        if (lower.includes('pending') || lower.includes('sent'))
            return 'bg-amber-50 text-amber-600 border-amber-100';
        return 'bg-slate-50 text-slate-600 border-slate-100';
    };

    const DetailCard = ({ title, icon, color, content }: { title: string, icon: string, color: string, content: string | React.ReactNode }) => (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-110`}>
                    <i className={`fa-solid ${icon}`}></i>
                </div>
                <h3 className="font-extrabold text-[#1E3A6D] text-lg">{title}</h3>
            </div>
            <div className="text-slate-500 font-medium text-sm leading-relaxed">
                {content || <span className="text-slate-300 italic">No details available</span>}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out] print:space-y-0 print:animate-none">
            {/* Header Actions - hidden in print */}
            <div className="flex items-center justify-between mb-2 print:hidden">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-400 hover:text-[#1E3A6D] font-bold transition-colors group"
                >
                    <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
                    Back to Leads
                </button>
                <div className="flex gap-3">
                    {lead.voucherCode && (
                        <>
                            <button
                                onClick={handleDownload}
                                className="bg-white border border-slate-200 text-[#1E3A6D] font-bold py-2.5 px-6 rounded-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <i className="fa-solid fa-file-pdf"></i>
                                Download PDF
                            </button>
                            <button
                                onClick={onManageVoucher}
                                className="bg-[#1E3A6D] hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-95"
                            >
                                <i className="fa-solid fa-ticket"></i>
                                Manage Voucher
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Document Body - Optimized for both screen and print */}
            <div>
                <div className="">
                    {/* Header Actions - hidden in print */}
                    <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-[#F9FBFF] print:hidden">
                        <div className="flex items-center gap-4">

                            <div>
                                <h3 className="text-xl font-black text-[#1E3A6D]">Official Voucher</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Reference: {lead.quotationNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Document Body */}
                    <div className="p-10 md:p-16 space-y-12 print:p-0">
                        {/* Brand Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-bold text-[#1E3A6D] text-2xl tracking-tight uppercase">Umrah <span className="text-cyan-500">Companions</span></span>
                                <div className="mt-4 text-sm text-slate-400 font-medium italic">
                                    Professional Umrah Consultancy Services<br />
                                    Authorized Registration No: UC-2026-9921
                                </div>
                            </div>
                            <div className="text-right">
                                <h1 className="text-4xl font-black text-[#1E3A6D] mb-2 uppercase tracking-tighter">Voucher</h1>
                                <div className="bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl inline-block text-left">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Issue Date</div>
                                    <div className="text-lg font-bold text-[#1E3A6D]">{lead.date}</div>
                                </div>
                            </div>
                        </div>

                        {/* Customer & Lead Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                            <div>
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4">Customer Information</label>
                                <div className="space-y-2">
                                    <p className="text-2xl font-black text-[#1E3A6D]">{lead.name}</p>
                                    <p className="text-slate-500 font-bold flex items-center gap-2"><i className="fa-solid fa-envelope text-cyan-500 w-4"></i> {lead.email}</p>
                                    <p className="text-slate-500 font-bold flex items-center gap-2"><i className="fa-solid fa-phone text-emerald-500 w-4"></i> {lead.phone}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4">Booking Summary</label>
                                <div className="space-y-4">
                                    <div className="flex justify-between pb-2 border-b border-dashed border-slate-200">
                                        <span className="text-slate-500 font-bold">Quotation #</span>
                                        <span className="text-[#1E3A6D] font-black">{lead.quotationNumber}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-dashed border-slate-200">
                                        <span className="text-slate-500 font-bold">Package Type</span>
                                        <span className="text-cyan-500 font-black uppercase tracking-widest text-xs">{lead.packageStatus}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-bold">Booking Status</span>
                                        <span className="text-[#1E3A6D] font-black uppercase tracking-widest text-xs">{lead.quotationStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pilgrims Table */}
                        <div>
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-6 px-1">Pilgrim Info</label>
                            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-[#1E3A6D] text-white">
                                        <tr>
                                            <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Full Name</th>
                                            <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Passport Number</th>
                                            <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {lead.pilgrims?.map((p, i) => (
                                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-8 py-5 font-bold text-[#1E3A6D]">{p.name}</td>
                                                <td className="px-8 py-5 text-slate-500 font-medium tabular-nums">{p.passportNumber}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${p.type === 'Adult' ? 'bg-cyan-50 text-cyan-600' : 'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        {p.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) || (
                                                <tr>
                                                    <td colSpan={3} className="px-8 py-8 text-center text-slate-400 italic font-medium">No pilgrim information documented</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Service Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                            <div>
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-6">Service Summary</label>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                            <i className="fa-solid fa-plane"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#1E3A6D] uppercase tracking-widest mb-1">Flight</p>
                                            <p className="text-sm text-slate-500 font-medium">{lead.flight}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                            <i className="fa-solid fa-passport"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#1E3A6D] uppercase tracking-widest mb-1">Visa</p>
                                            <p className="text-sm text-slate-500 font-medium">{lead.visa}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                            <i className="fa-solid fa-bus"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#1E3A6D] uppercase tracking-widest mb-1">Transport</p>
                                            <p className="text-sm text-slate-500 font-medium">{lead.transport}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                            <i className="fa-solid fa-hotel"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#1E3A6D] uppercase tracking-widest mb-1">Accommodation</p>
                                            <p className="text-sm text-slate-500 font-medium">{lead.hotel}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Breakdown */}
                            <div className="bg-[#1E3A6D] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] block mb-8 px-1">Financial Document</label>
                                <div className="space-y-5">
                                    {lead.priceBreakdown?.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center pb-2 border-b border-white/10">
                                            <span className="text-white/70 font-bold text-sm">{item.service}</span>
                                            <span className="font-extrabold tabular-nums">SAR {item.amount.toLocaleString()}</span>
                                        </div>
                                    ))}
                                    <div className="pt-10">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Grand Total</p>
                                                <p className="text-5xl font-black tracking-tighter tabular-nums text-cyan-400">SAR {lead.totalAmount?.toLocaleString() || 'N/A'}</p>
                                            </div>
                                            {lead.voucherCode && (
                                                <div className="bg-white/10 px-4 py-2 rounded-xl text-right">
                                                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Applied Voucher</p>
                                                    <p className="text-xs font-black text-emerald-400 tracking-wider">#{lead.voucherCode}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Terms */}
                        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-8">
                            <div className="max-w-md">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Terms & Conditions</p>
                                <ul className="text-[11px] text-slate-400 font-medium space-y-2 list-disc pl-4 leading-relaxed">
                                    <li>This voucher is valid for the specified dates and pilgrims only.</li>
                                    <li>Any changes to the itinerary may incur additional service charges.</li>
                                    <li>Travel insurance is highly recommended for all travelers.</li>
                                    <li>Please carry your passport and this voucher at all times during travel.</li>
                                </ul>
                            </div>
                            <div className="text-right flex flex-col items-end gap-3 mt-auto">
                                <div className="w-32 h-16 border-b border-slate-300 relative flex items-center justify-center">
                                    <span className="text-slate-300 text-[10px] font-bold absolute -bottom-4 left-0 right-0 text-center uppercase tracking-widest">Authorized Signature</span>
                                </div>
                                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-2 px-2 italic">Scanned Digital Signature Applied</p>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                @media print {
                    body * { visibility: hidden; }
                    .print\:static, .print\:static * { visibility: visible; }
                    .print\:static { position: absolute; left: 0; top: 0; width: 100%; border: none !important; box-shadow: none !important; }
                    .print\:hidden { display: none !important; }
                }
                @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>
            </div>
        </div>
    );
};

export default LeadDetail;
