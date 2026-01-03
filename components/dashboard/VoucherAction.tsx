import React, { useState } from 'react';
import { Lead } from '../../types';

interface VoucherActionProps {
    lead: Lead;
    onClose: () => void;
    onUpdate: (updates: Partial<Lead>) => void;
}

const REJECTION_REASONS = [
    'Price is too high',
    'Schedule does not match',
    'Customer preferred another agent',
    'Package details changed',
    'Incorrect voucher applied',
    'Other'
];

const VoucherAction: React.FC<VoucherActionProps> = ({ lead, onClose, onUpdate }) => {
    const [action, setAction] = useState<'Accept' | 'Reject' | null>(null);
    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');
    const [paymentFile, setPaymentFile] = useState<File | null>(null);

    const handleSave = () => {
        if (action === 'Accept') {
            if (!paymentFile) {
                alert('Please upload payment proof before accepting.');
                return;
            }
            onUpdate({
                voucherStatus: 'Accepted',
                paymentProofUrl: URL.createObjectURL(paymentFile), // Temporary URL for demo
                paymentStatus: 'Paid',
                status: 'In Progress'
            });
        } else if (action === 'Reject') {
            if (!reason) {
                alert('Please select a reason for rejection.');
                return;
            }
            onUpdate({
                voucherStatus: 'Rejected',
                rejectionReason: reason,
                rejectionComment: comment,
                status: 'Contacted'
            });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-[scaleIn_0.3s_ease-out]">
                <div className="flex justify-between items-center p-8 border-b border-slate-50 bg-[#F9FBFF]">
                    <div>
                        <h3 className="text-xl font-black text-[#1E3A6D]">Voucher Management</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                            Lead: {lead.quotationNumber}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="p-8">
                    {!action ? (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setAction('Accept')}
                                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-emerald-50 bg-emerald-50/20 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center"
                            >
                                <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-[0_8px_20px_-5px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-110">
                                    <i className="fa-solid fa-check-circle"></i>
                                </div>
                                <div>
                                    <span className="block font-black text-[#1E3A6D]">Accept</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Upload Payment Proof</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setAction('Reject')}
                                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-rose-50 bg-rose-50/20 hover:border-rose-500 hover:bg-rose-50 transition-all text-center"
                            >
                                <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-[0_8px_20px_-5px_rgba(244,63,94,0.4)] transition-transform group-hover:scale-110">
                                    <i className="fa-solid fa-times-circle"></i>
                                </div>
                                <div>
                                    <span className="block font-black text-[#1E3A6D]">Reject</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Specify Reasons</span>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <button
                                onClick={() => setAction(null)}
                                className="text-xs text-slate-400 font-bold hover:text-[#1E3A6D] flex items-center gap-1 mb-2"
                            >
                                <i className="fa-solid fa-arrow-left text-[10px]"></i> Change selection
                            </button>

                            {action === 'Accept' ? (
                                <div className="animate-[slideIn_0.3s_ease-out]">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">Upload Payment Proof</label>
                                    <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all text-center ${paymentFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-slate-50/50 hover:border-cyan-500'}`}>
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
                                            accept="image/*,application/pdf"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <i className={`fa-solid ${paymentFile ? 'fa-file-circle-check text-emerald-500' : 'fa-cloud-upload text-slate-300'} text-3xl`}></i>
                                            <p className="text-sm font-bold text-[#1E3A6D]">
                                                {paymentFile ? paymentFile.name : 'Click to upload proof'}
                                            </p>
                                            <p className="text-[10px] text-slate-400">PDF, JPG, or PNG (Max. 5MB)</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-[slideIn_0.3s_ease-out]">
                                    <div>
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Rejection Reason</label>
                                        <select
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-[#1E3A6D] focus:border-rose-500 focus:ring-0 transition-all outline-none"
                                        >
                                            <option value="">Select a reason...</option>
                                            {REJECTION_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Additional Comments</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={3}
                                            placeholder="Tell us more about why it was rejected..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-[#1E3A6D] focus:border-rose-500 focus:ring-0 transition-all outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold py-3.5 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className={`flex-1 text-white font-black py-3.5 rounded-xl transition-all shadow-lg ${action === 'Accept' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20'
                                        }`}
                                >
                                    Save Decision
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>
        </div>
    );
};

export default VoucherAction;
