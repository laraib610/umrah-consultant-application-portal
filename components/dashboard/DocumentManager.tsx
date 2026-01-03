import React, { useState } from 'react';
import { Lead } from '../../types';

interface DocumentManagerProps {
    lead: Lead;
    onAddDocument: (doc: any) => void;
    onDownloadDocument: (doc: any) => void;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ lead, onAddDocument, onDownloadDocument }) => {
    const [uploadType, setUploadType] = useState<'Agency' | 'Customer'>('Customer');
    const [category, setCategory] = useState<string>('Passport');
    const [isUploading, setIsUploading] = useState(false);

    const categories = ['Passport', 'ID Card', 'Visa', 'Ticket', 'Voucher', 'Other'];

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            // Simulate upload delay
            setTimeout(() => {
                const newDoc = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: uploadType,
                    category: category,
                    name: file.name,
                    url: URL.createObjectURL(file), // In real app, this would be cloud S3 URL
                    uploadedAt: new Date().toLocaleDateString()
                };
                onAddDocument(newDoc);
                setIsUploading(false);
                e.target.value = ''; // Reset input
            }, 1000);
        }
    };

    const DocumentList = ({ type }: { type: 'Agency' | 'Customer' }) => {
        const docs = lead.documents?.filter(d => d.type === type) || [];

        return (
            <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    {type === 'Agency' ? <i className="fa-solid fa-briefcase"></i> : <i className="fa-solid fa-user"></i>}
                    {type} Documents
                </h4>

                {docs.length === 0 ? (
                    <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-medium">No documents uploaded</p>
                    </div>
                ) : (
                    <div className="grid gap-2">
                        {docs.map((doc, idx) => (
                            <div key={idx} className="bg-white border border-slate-100 p-3 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
                                        ${doc.category === 'Passport' ? 'bg-purple-100 text-purple-600' :
                                            doc.category === 'Visa' ? 'bg-green-100 text-green-600' :
                                                doc.category === 'Ticket' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-slate-100 text-slate-600'}`}>
                                        <i className={`fa-solid ${doc.category === 'Passport' ? 'fa-passport' :
                                            doc.category === 'Visa' ? 'fa-stamp' :
                                                doc.category === 'Ticket' ? 'fa-plane-departure' :
                                                    'fa-file-lines'
                                            }`}></i>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-700">{doc.category}</span>
                                        <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{doc.name}</span>
                                    </div>
                                </div>
                                <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 hover:text-[#1E3A6D] transition-colors"
                                    title="View"
                                >
                                    <i className="fa-solid fa-eye text-xs"></i>
                                </a>
                                <button
                                    onClick={() => onDownloadDocument(doc)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 hover:text-[#1E3A6D] transition-colors"
                                    title="Download"
                                >
                                    <i className="fa-solid fa-download text-xs"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )
                }
            </div >
        );
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6  flex flex-col print:hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#1E3A6D] text-white rounded-xl flex items-center justify-center ">
                    <i className="fa-solid fa-folder-open"></i>
                </div>
                <div>
                    <h3 className="text-lg font-extrabold text-[#1E3A6D]">Document Manager</h3>
                    <p className="text-xs text-slate-400 font-medium">Manage passports, visas & IDs</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                <DocumentList type="Agency" />
                <div className="border-t border-slate-100 my-4"></div>
                <DocumentList type="Customer" />
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={() => setUploadType('Customer')}
                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${uploadType === 'Customer' ? 'bg-white text-[#1E3A6D] shadow-sm' : 'text-slate-400 hover:bg-slate-100'
                                }`}
                        >
                            Customer
                        </button>
                        <button
                            onClick={() => setUploadType('Agency')}
                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${uploadType === 'Agency' ? 'bg-white text-[#1E3A6D] shadow-sm' : 'text-slate-400 hover:bg-slate-100'
                                }`}
                        >
                            Agency
                        </button>
                    </div>

                    <div className="mb-3">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#1E3A6D]"
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <label className="flex items-center justify-center w-full py-3 px-4 bg-[#1E3A6D] hover:bg-[#152C55] text-white rounded-xl cursor-pointer transition-all active:scale-95 group">
                        <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                        {isUploading ? (
                            <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                        ) : (
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-cloud-arrow-up group-hover:-translate-y-0.5 transition-transform"></i>
                                <span className="text-xs font-bold">Upload Document</span>
                            </div>
                        )}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DocumentManager;
