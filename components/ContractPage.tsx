import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { authService } from '../services/auth';
import { sendCompletionEmail } from '../services/email';

interface ContractPageProps {
    userData: User | null;
    setAppData: React.Dispatch<React.SetStateAction<User>>;
}

const ContractPage: React.FC<ContractPageProps> = ({ userData, setAppData }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'video' | 'contract'>('video');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!userData) {
            navigate('/login');
            return;
        }
        if (userData.status === 'pending_approval') {
            alert("Your account is still pending approval.");
            navigate('/apply', { state: { step: 3 } });
            return;
        }
        if (userData.status === 'completed') {
            navigate('/dashboard');
        }
    }, [userData, navigate]);

    const handleContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsProcessing(true);
            setTimeout(async () => {
                if (userData) {
                    const updatedUser: User = { ...userData, contractSigned: true, status: 'completed' };
                    authService.updateUser(userData.email, { contractSigned: true, status: 'completed' });
                    setAppData(updatedUser);
                    await sendCompletionEmail(updatedUser); // Notify completion
                    navigate('/dashboard');
                }
                setIsProcessing(false);
            }, 2000);
        }
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden animate-[fadeIn_0.5s_ease-out]">

                {step === 'video' && (
                    <div className="p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-extrabold text-[#1E3A6D] mb-4">Welcome to the Team, {userData.name}!</h2>
                        <p className="text-slate-500 mb-8 text-lg">Before we sign the contract, please watch this short orientation video.</p>

                        <div className="aspect-video bg-slate-900 rounded-xl mb-8 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                            {/* Placeholder for Demo Video */}
                            <img src="/assets/images/umrah-consultant.png" className="w-full h-full object-cover opacity-50" alt="Video Placeholder" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-play text-white text-3xl ml-2"></i>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep('contract')}
                            className="bg-[#1E3A6D] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg"
                        >
                            Got it, I'm Ready
                        </button>
                    </div>
                )}

                {step === 'contract' && (
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-extrabold text-[#1E3A6D] mb-2">Final Step: Consultant Agreement</h2>
                        <p className="text-slate-500 mb-8">Please download the agreement, sign it, and upload the scanned copy.</p>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <i className="fa-solid fa-file-pdf text-red-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Umrah_Consultant_Agreement_v2.pdf</p>
                                        <p className="text-xs text-slate-500">2.4 MB</p>
                                    </div>
                                </div>
                                <button className="text-[#1E3A6D] hover:bg-[#1E3A6D]/5 px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-transparent hover:border-[#1E3A6D]/10">
                                    Download
                                </button>
                            </div>

                            {isProcessing ? (
                                <div className="border-2 border-slate-200 rounded-2xl p-12 bg-slate-50 flex flex-col items-center justify-center text-center">
                                    <i className="fa-solid fa-spinner fa-spin text-3xl text-cyan-500 mb-4"></i>
                                    <p className="font-bold text-slate-700">Finalizing your account...</p>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-cyan-200 rounded-2xl p-12 bg-cyan-50/30 relative group cursor-pointer hover:bg-cyan-50 transition-colors text-center">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={handleContractUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-cyan-300 group-hover:text-cyan-500 mb-4 transition-colors"></i>
                                    <h3 className="text-xl font-extrabold text-[#1E3A6D] mb-2">Upload Signed Agreement</h3>
                                    <p className="text-slate-500 text-sm">Drag & drop or click to browse</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default ContractPage;
