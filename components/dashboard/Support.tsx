import React from 'react';

const Support: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#1E3A6D] mb-4">Support</h2>
            <p className="text-sm text-slate-500 font-medium mb-6">Need help? Our team is here to support you at every stage.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 transition-all hover:shadow-md">
                    <i className="fa-solid fa-comments text-blue-500 text-2xl mb-4"></i>
                    <h3 className="font-extrabold text-[#1E3A6D] mb-2">Live Chat</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4">Chat with our support team in real-time.</p>
                    <button className="bg-[#1E3A6D] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md">Start Chat</button>
                </div>
                <div className="p-6 bg-cyan-50 rounded-xl border border-cyan-100 transition-all hover:shadow-md">
                    <i className="fa-solid fa-envelope text-cyan-500 text-2xl mb-4"></i>
                    <h3 className="font-extrabold text-[#1E3A6D] mb-2">Email Support</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                    <button className="bg-[#1E3A6D] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md">Send Email</button>
                </div>
            </div>
        </div>
    );
};

export default Support;
