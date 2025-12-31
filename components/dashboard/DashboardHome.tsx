import React, { useState } from 'react';
import { Lead, ApplicationData } from '../../types';

interface DashboardHomeProps {
    userData: ApplicationData;
    leads: Lead[];
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ userData }) => {
    const [performanceTab, setPerformanceTab] = useState<'earnings' | 'bookings'>('earnings');
    const [scheduleTab, setScheduleTab] = useState<'current' | 'upcoming' | 'completed'>('current');

    const stats = [
        { label: 'Total Earnings', value: 'SAR 124750', trend: '+ SAR 2500 from last month', icon: 'fa-wallet', color: 'bg-cyan-50' },
        { label: 'Commission Due', value: 'SAR 124750', trend: '+ SAR 2500 from last month', icon: 'fa-money-bill-transfer', color: 'bg-amber-50' },
        { label: 'Conversion Rate', value: '68%', trend: '- 3% from last month', icon: 'fa-chart-pie', color: 'bg-indigo-50' },
        { label: 'Performance Ranking', value: 'Top 22%', trend: 'Ranked 3 of 28 agents', icon: 'fa-ranking-star', color: 'bg-green-50' },
    ];

    const travelers = [
        { name: 'Ahmed Ali', date: 'May 25, 2025' },
        { name: 'Ahmed Ali', date: 'May 25, 2025' },
        { name: 'Ahmed Ali', date: 'May 25, 2025' },
        { name: 'Ahmed Ali', date: 'May 25, 2025' },
    ];

    return (
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-40 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
                        <p className="text-slate-500 text-sm font-medium mb-4">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-[#1E3A6D] mb-2">{stat.value}</h3>
                        <p className={`text-[11px] ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-slate-400'}`}>{stat.trend}</p>
                        <div className="mt-6 flex justify-between items-center text-cyan-600 text-xs font-bold">
                            <button className="hover:underline flex items-center gap-1">View details <i className="fa-solid fa-arrow-right text-[10px]"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Travel Schedule & Financial Summary */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Travel Schedule */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[#1E3A6D]">Travel Schedule</h3>
                        </div>
                        <div className="flex gap-2 p-1 bg-slate-50 rounded-xl mb-6 w-fit">
                            {['current', 'upcoming', 'completed'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setScheduleTab(tab as any)}
                                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${scheduleTab === tab ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-3">
                            {travelers.map((traveler, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">AA</div>
                                        <div>
                                            <p className="font-bold text-[#1E3A6D]">{traveler.name}</p>
                                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                <i className="fa-regular fa-calendar text-[10px]"></i> Travel Date: {traveler.date}
                                            </p>
                                        </div>
                                    </div>
                                    <i className="fa-solid fa-chevron-right text-slate-300 group-hover:text-cyan-500 transition-colors"></i>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-[#1E3A6D]">Financial Summary</h3>
                                <p className="text-xs text-slate-500 mt-1">Your current financial status</p>
                            </div>
                            <button className="text-cyan-600 text-sm font-bold px-4 py-2 rounded-lg border border-cyan-100 hover:bg-cyan-50">View History</button>
                        </div>

                        <div className="bg-cyan-50 p-4 rounded-xl flex gap-3 mb-8">
                            <i className="fa-solid fa-circle-info text-cyan-500 mt-0.5"></i>
                            <p className="text-[11px] text-cyan-700 font-medium">Payments are automatically released based on company policy.</p>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                <span className="text-sm font-medium text-slate-600 flex items-center gap-2"><i className="fa-solid fa-sack-dollar text-slate-300"></i> Available Balance</span>
                                <span className="font-bold text-[#1E3A6D]">SAR 1850</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                <span className="text-sm font-medium text-slate-600 flex items-center gap-2"><i className="fa-solid fa-hourglass-half text-slate-300"></i> Pending Payments</span>
                                <span className="font-bold text-[#1E3A6D]">SAR 1850</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#1E3A6D] mb-6">Commission Breakdown</h4>
                            <div className="space-y-6">
                                {[
                                    { label: 'Premium Packages', value: 'SAR 1800', percent: 67, color: 'bg-cyan-500' },
                                    { label: 'Standard Packages', value: 'SAR 1300', percent: 47, color: 'bg-cyan-300' },
                                    { label: 'Budget Packages', value: 'SAR 450', percent: 14, color: 'bg-cyan-100' },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs font-bold mb-2">
                                            <span className="text-slate-600">{item.label}</span>
                                            <span className="text-[#1E3A6D]">{item.value} ({item.percent}%)</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Performance & Reports */}
                <div className="space-y-8">
                    {/* Performance Overview */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 pb-2">
                        <h3 className="text-xl font-bold text-[#1E3A6D] mb-1">Performance Overview</h3>
                        <p className="text-xs text-slate-500 mb-6 font-medium">Monthly Breakdown</p>

                        <div className="flex p-0.5 bg-slate-50 rounded-xl mb-8">
                            <button
                                onClick={() => setPerformanceTab('earnings')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${performanceTab === 'earnings' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400'}`}
                            >
                                Earnings
                            </button>
                            <button
                                onClick={() => setPerformanceTab('bookings')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${performanceTab === 'bookings' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400'}`}
                            >
                                Bookings
                            </button>
                        </div>

                        <div className="w-full">
                            <div className="grid grid-cols-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                                <span>Earnings</span>
                                <span className="text-right">Amount</span>
                            </div>
                            <div className="space-y-1">
                                {[
                                    { label: 'This Month', value: 'SAR 2500' },
                                    { label: 'Previous Month', value: 'SAR 2500' },
                                    { label: 'Total', value: 'SAR 2500', bold: true },
                                ].map((row, i) => (
                                    <div key={i} className={`grid grid-cols-2 p-3 rounded-xl ${row.bold ? 'bg-slate-50 border-t border-slate-100' : ''}`}>
                                        <span className={`text-sm ${row.bold ? 'font-bold text-[#1E3A6D]' : 'text-slate-500 font-medium'}`}>{row.label}</span>
                                        <span className={`text-sm text-right ${row.bold ? 'font-bold text-[#1E3A6D]' : 'text-slate-700 font-bold'}`}>{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Reports */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xl font-bold text-[#1E3A6D]">Recent Reports</h3>
                            <button className="text-cyan-600 text-xs font-bold hover:underline">View All</button>
                        </div>
                        <p className="text-xs text-slate-500 mb-6 font-medium">Download your recent reports.</p>

                        <div className="bg-cyan-50 p-3 rounded-xl flex gap-3 mb-6">
                            <i className="fa-solid fa-circle-info text-cyan-500 text-[10px] mt-1"></i>
                            <p className="text-[9px] text-cyan-700 font-bold uppercase tracking-tight">Reports are auto-generated as per sales policy.</p>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                            <i className="fa-regular fa-file-pdf"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#1E3A6D]">Monthly Performance Report</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">May 2023 · Generated on May 31, 2025</p>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-cyan-500 group-hover:border-cyan-100 transition-all">
                                        <i className="fa-solid fa-arrow-down-long text-xs"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
