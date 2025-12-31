import React from 'react';
import FAQs from './FAQs';
import Notifications from './Notifications';
import TermsConditions from './TermsConditions';
import Support from './Support';
import BankInfo from './BankInfo';

const ProfileBuilder: React.FC = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* General Section */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-fit">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-lg flex items-center justify-center shadow-sm">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h2 className="text-xl font-extrabold text-[#1E3A6D]">General Profile Info</h2>
                </div>
                <p className="text-sm text-slate-500 font-medium mb-6">Manage your basic account settings and public profile info.</p>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                            <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]" placeholder="+1..." />
                        </div>
                        <div>
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Qualification</label>
                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]">
                                <option value="">Select Qualification</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Islamic Scholar">Islamic Scholar</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Current Job / Business Details</label>
                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-[#1E3A6D]" placeholder="Describe your current professional role..." />
                        </div>
                    </div>
                    <button className="bg-[#1E3A6D] text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg">Save Changes</button>
                </div>
            </div>

            {/* Bank Details Section */}
            <div className="h-fit">
                <BankInfo />
            </div>

            {/* Notifications Section */}
            <div className="h-fit">
                <Notifications />
            </div>

            {/* Support Section */}
            <div className="h-fit">
                <Support />
            </div>

            {/* FAQs Section */}
            <div className="h-fit">
                <FAQs />
            </div>

            {/* Terms & Conditions Section */}
            <div className="h-fit">
                <TermsConditions />
            </div>
        </div>
    );
};

export default ProfileBuilder;
