import React from 'react';

const BankInfo: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#1E3A6D] mb-4">Bank Info</h2>
            <p className="text-sm text-slate-500 font-medium mb-6">Manage your payout methods and bank details securely.</p>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 mb-6">
                <i className="fa-solid fa-circle-exclamation text-amber-500 mt-1"></i>
                <p className="text-sm text-amber-700 font-medium">Please ensure your bank details are correct to avoid delays in commission payouts.</p>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Account Holder Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Bank Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]"
                            placeholder="e.g. Saudi National Bank"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">IBAN / Account Number</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]"
                            placeholder="SA00 0000 0000 0000 0000 0000"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">SWIFT / BIC Code</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]"
                            placeholder="Optional"
                        />
                    </div>
                </div>
                <div className="pt-4">
                    <button className="bg-[#1E3A6D] text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2">
                        <i className="fa-solid fa-save"></i> Update Bank Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankInfo;
