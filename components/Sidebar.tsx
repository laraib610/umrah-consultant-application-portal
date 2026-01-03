import React from 'react';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-house' },
        { id: 'leads', label: 'Leads', icon: 'fa-user-tag' },
        { id: 'packages', label: 'Packages', icon: 'fa-box-archive' },
        { id: 'customers', label: 'Customers', icon: 'fa-users' },
        { id: 'reports', label: 'Reports', icon: 'fa-chart-simple' },
        { id: 'support', label: 'Support', icon: 'fa-headset' },
        { id: 'profile', label: 'Settings', icon: 'fa-gear' },
    ];

    return (
        <aside className="w-full print:hidden md:w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 pb-6">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <span className="font-bold text-[#1E3A6D] text-lg tracking-tight uppercase">Umrah <span className="text-cyan-500">Companions</span></span>
                </div>

                {/* Profile Completion Card */}
                <div className="bg-[#F0F9FF] rounded-2xl p-6 mb-8 text-center relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-slate-200 flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                            <span className="font-bold text-[#1E3A6D]">50%</span>
                        </div>
                        <h4 className="font-bold text-[#1E3A6D] text-sm mb-1">Profile Completion</h4>
                        <p className="text-[10px] text-slate-500 mb-4 px-2">Complete your profile to unlock all features.</p>
                        <button
                            onClick={() => onTabChange('profile')}
                            className="w-full bg-cyan-500 text-white text-xs py-2 rounded-lg font-bold hover:bg-cyan-600 transition-all shadow-sm"
                        >
                            Complete Profile
                        </button>
                    </div>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${activeTab === item.id
                                ? 'bg-[#1E3A6D] text-white shadow-lg'
                                : 'text-slate-400 hover:text-[#1E3A6D] hover:bg-slate-50'
                                }`}
                        >
                            <i className={`fa-solid ${item.icon} w-5`}></i>
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-auto px-6">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors p-3 w-full group"
                >
                    <i className="fa-solid fa-arrow-right-from-bracket rotate-180 group-hover:-translate-x-1 transition-transform"></i>
                    <span className="text-sm font-medium">Log out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
