import React from 'react';

const TermsConditions: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm max-w-4xl">
            <h2 className="text-xl font-extrabold text-[#1E3A6D] mb-6">Terms & Conditions</h2>
            <div className="prose prose-slate max-w-none text-slate-500 font-medium space-y-4">
                <h3 className="text-lg font-extrabold text-[#1E3A6D]">1. Introduction</h3>
                <p>Welcome to Umrah Network. By becoming a consultant, you agree to comply with our terms of service.</p>

                <h3 className="text-lg font-extrabold text-[#1E3A6D]">2. Consultant Obligations</h3>
                <p>Consultants must provide accurate information to pilgrims and adhere to the ethical guidelines set by Umrah Network.</p>

                <h3 className="text-lg font-extrabold text-[#1E3A6D]">3. Commission Structure</h3>
                <p>Commissions are paid based on the performance tiers outlined in the compensation documentation.</p>

                <h3 className="text-lg font-extrabold text-[#1E3A6D]">4. Termination</h3>
                <p>We reserve the right to terminate consultant status if any breach of terms occurs.</p>
            </div>
        </div>
    );
};

export default TermsConditions;
