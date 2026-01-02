import React from 'react';
import { Lead } from '../../types';

interface LeadsListProps {
    leads: Lead[];
    onAddNewLead: () => void;
}

const LeadsList: React.FC<LeadsListProps> = ({ leads, onAddNewLead }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'in progress': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
            case 'contacted': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getBadgeStyle = (status: string) => {
        const lower = status.toLowerCase();
        if (lower.includes('paid') || lower.includes('approved') || lower.includes('confirmed'))
            return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        if (lower.includes('pending') || lower.includes('sent'))
            return 'bg-amber-50 text-amber-600 border-amber-100';
        if (lower.includes('unpaid') || lower.includes('failed'))
            return 'bg-rose-50 text-rose-600 border-rose-100';
        return 'bg-slate-50 text-slate-600 border-slate-100';
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-end justify-end mb-4">
                <button
                    onClick={onAddNewLead}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-cyan-500/20 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95 text-sm"
                >
                    <i className="fa-solid fa-plus text-[10px]"></i> New Lead
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Quotation #</th>
                            <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Customer Name</th>
                            <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Service Details</th>
                            <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Quotation Status</th>
                            <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Payment</th>
                            <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-[#1E3A6D] font-black">{lead.quotationNumber}</span>
                                        <span className="text-[10px] text-slate-400 font-bold">{lead.date}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#EEF3FA] rounded-xl flex items-center justify-center text-[#1E3A6D] font-bold">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-[#1E3A6D]">{lead.name}</p>
                                            <p className="text-xs text-slate-400 font-medium">{lead.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div title={lead.flight} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${lead.flight ? 'bg-cyan-50 text-cyan-500 border-cyan-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                                            <i className="fa-solid fa-plane text-xs"></i>
                                        </div>
                                        <div title={lead.visa} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${lead.visa ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                                            <i className="fa-solid fa-passport text-xs"></i>
                                        </div>
                                        <div title={lead.transport} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${lead.transport ? 'bg-orange-50 text-orange-500 border-orange-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                                            <i className="fa-solid fa-bus text-xs"></i>
                                        </div>
                                        <div title={lead.hotel} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${lead.hotel ? 'bg-sky-50 text-sky-500 border-sky-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                                            <i className="fa-solid fa-hotel text-xs"></i>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getBadgeStyle(lead.quotationStatus)}`}>
                                        {lead.quotationStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getBadgeStyle(lead.paymentStatus)}`}>
                                        {lead.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1E3A6D] hover:text-white transition-all">
                                            <i className="fa-solid fa-eye text-xs"></i>
                                        </button>
                                        <button className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                                            <i className="fa-solid fa-download text-xs"></i>
                                        </button>
                                        <button className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                                            <i className="fa-solid fa-trash-can text-xs"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {leads.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 border border-slate-100">
                            <i className="fa-solid fa-clipboard-list text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#1E3A6D] mb-2">No Quotations Found</h3>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto mb-8">You haven't generated any quotations yet. Start by creating a new lead.</p>
                        <button
                            onClick={onAddNewLead}
                            className="text-cyan-500 font-black uppercase text-xs tracking-widest hover:text-cyan-600 transition-colors"
                        >
                            Generate First Lead <i className="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadsList;
