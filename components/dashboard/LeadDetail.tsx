import React from 'react';
import { Lead } from '../../types';
import VoucherDocument from './VoucherDocument';
import DocumentManager from './DocumentManager';

interface LeadDetailProps {
    lead: Lead;
    onBack: () => void;
    onManageVoucher: () => void;
    onUpdateStatus: (status: string) => void;
    onAddDocument: (doc: any) => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onBack, onManageVoucher, onUpdateStatus, onAddDocument }) => {
    const handleDownload = () => {
        const originalTitle = document.title;
        document.title = `Voucher_${lead.quotationNumber || lead.id}`;
        window.print();
        document.title = originalTitle;
    };

    const handleDownloadDocument = (doc: any) => {
        if (doc.url === '#' || doc.url.startsWith('blob:')) {
            const content = `Mock content for document: ${doc.name}\nType: ${doc.type}\nCategory: ${doc.category}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = doc.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else {
            window.open(doc.url, '_blank');
        }
    };

    const getBadgeStyle = (status: string) => {
        const lower = status.toLowerCase();
        if (lower.includes('paid') || lower.includes('approved') || lower.includes('confirmed'))
            return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        if (lower.includes('pending') || lower.includes('sent'))
            return 'bg-amber-50 text-amber-600 border-amber-100';
        return 'bg-slate-50 text-slate-600 border-slate-100';
    };

    const STATUS_OPTIONS = [
        'Lead Created',
        'Sent to Companions',
        'Quotation Received',
        'Quotation Sent to Customer',
        'Quotation Accepted',
        'Quotation Rejected',
        'Payment Received',
        'Payment Verified',
        'Journey Started',
        'Journey Ended'
    ];

    return (
        <div className="space-y-6 animate-[fadeIn_0.5s_ease-out] print:space-y-0 print:animate-none">
            {/* Header Actions - hidden in print */}
            <div className="flex flex-col gap-4 mb-5 print:hidden">
                <div className="flex items-center justify-between">
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
                                    Manage Quotation
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Status Update Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1E3A6D]/5 text-[#1E3A6D] rounded-xl flex items-center justify-center text-lg">
                        <i className="fa-solid fa-list-check"></i>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="status-select" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Current Workflow Status
                        </label>
                        <div className="relative">
                            <select
                                id="status-select"
                                value={lead.status}
                                onChange={(e) => onUpdateStatus(e.target.value)}
                                className="w-full appearance-none bg-slate-50 border border-slate-200 text-[#1E3A6D] font-bold text-sm rounded-xl px-4 py-2.5 pr-10 hover:border-[#1E3A6D] focus:border-[#1E3A6D] focus:ring-0 transition-colors cursor-pointer"
                            >
                                {STATUS_OPTIONS.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-[#1E3A6D]/5 px-4 py-2 rounded-xl border border-[#1E3A6D]/10">
                            <span className="text-[10px] font-black text-[#1E3A6D]/60 uppercase tracking-widest block mb-0.5">Active Stage</span>
                            <span className="text-xs font-bold text-[#1E3A6D]">{lead.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 print:block">
                {/* Voucher Section - Takes 2 cols */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-3xl print:block overflow-hidden shadow-xl border border-slate-100 print:static">
                        <VoucherDocument lead={lead} />
                    </div>
                </div>

                {/* Document Manager Section - Takes 1 col */}
                <div className="xl:col-span-1 sticky top-6 print:hidden">
                    <DocumentManager
                        lead={lead}
                        onAddDocument={onAddDocument}
                        onDownloadDocument={handleDownloadDocument}
                    />
                </div>
            </div>

            <style>{`
                @media print {
                    /* Hide everything by default */
                    body > * { display: block !important; }
                    
                    /* Reset parents to allow printing */
                    html, body, #root, main, .overflow-y-auto {
                        height: auto !important;
                        overflow: visible !important;
                        position: static !important;
                    }

                    /* Make specifically marked items visible and positioned */
                    .print\:static {
                        display: block !important;
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        visibility: visible !important;
                        z-index: 9999 !important;
                        background: white !important;
                    }
                    
                    /* Ensure children of print:static are visible */
                    .print\:static * {
                        visibility: visible !important;
                        display: block; /* helper dependent, might need flex if layout requires */
                    }
                    
                    /* Restore flex/grid for inner layouts if needed, broadly */
                    .print\:static .flex { display: flex !important; }
                    .print\:static .grid { display: grid !important; }
                    .print\:static .hidden { display: none !important; }
                    
                    /* Clean up print view */
                    .print\:hidden { display: none !important; }
                    
                    /* Remove shadows and borders for print */
                    .shadow-xl, .shadow-lg, .shadow-md, .shadow-sm { box-shadow: none !important; }
                    .border { border: none !important; }
                }
                @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>
        </div>
    );
};

export default LeadDetail;
