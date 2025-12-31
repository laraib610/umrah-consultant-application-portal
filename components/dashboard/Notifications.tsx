import React from 'react';

const Notifications: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-extrabold text-[#1E3A6D]">Notifications</h2>
            </div>
            <div className="divide-y divide-slate-100">
                {[
                    { title: "New Lead Assigned", time: "2 hours ago", desc: "A new lead 'Musa Hashim' has been assigned to you.", icon: "fa-user-plus", bg: "bg-blue-100", text: "text-blue-600" },
                    { title: "Commission Paid", time: "1 day ago", desc: "Your commission for October has been processed.", icon: "fa-money-bill", bg: "bg-green-100", text: "text-green-600" },
                    { title: "System Update", time: "2 days ago", desc: "We've added new features to the lead management system.", icon: "fa-gear", bg: "bg-slate-100", text: "text-slate-600" }
                ].map((notif, i) => (
                    <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex gap-4">
                        <div className={`w-10 h-10 ${notif.bg} ${notif.text} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <i className={`fa-solid ${notif.icon}`}></i>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-[#1E3A6D]">{notif.title}</h3>
                                <span className="text-xs text-slate-400 font-medium">{notif.time}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">{notif.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
