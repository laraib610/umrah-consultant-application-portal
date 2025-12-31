
import React, { useState } from 'react';
import { Lead, ApplicationData } from '../types';
import Sidebar from './Sidebar';
import DashboardHome from './dashboard/DashboardHome';
import ProfileBuilder from './dashboard/ProfileBuilder';
import NewLead from './dashboard/NewLead';

interface DashboardProps {
  userData: ApplicationData;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'Ahmad Khan', email: 'ahmad@example.com', phone: '+966 50 123 4567', status: 'New', date: '2023-10-24' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah.w@example.com', phone: '+1 415 555 0123', status: 'In Progress', date: '2023-10-22' },
    { id: '3', name: 'Omar Bakri', email: 'omar@test.com', phone: '+44 7700 900077', status: 'Contacted', date: '2023-10-20' },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '' });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLead,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };
    setLeads([lead, ...leads]);
    setNewLead({ name: '', email: '', phone: '' });
    setIsFormOpen(false);
  };

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', sub: 'Welcome back to your Umrah Consultant Dashboard.' };
      case 'packages':
        return { title: 'Packages', sub: 'View and manage your curated Umrah packages.' };
      case 'customers':
        return { title: 'Customers', sub: 'Manage your client base and booking history.' };
      case 'reports':
        return { title: 'Reports', sub: 'Download and analyze your performance reports.' };
      case 'profile':
        return { title: 'Settings', sub: 'Manage your profile, bank details, and account preferences.' };
      case 'leads':
        return { title: 'New Quotation', sub: 'Generate a new lead and quotation for your client.' };
      default:
        return { title: 'Dashboard', sub: 'Welcome back.' };
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome userData={userData} leads={leads} />;
      case 'profile':
        return <ProfileBuilder />;
      case 'leads':
        return <NewLead />;
      case 'packages':
      case 'customers':
      case 'reports':
        return (
          <div className="bg-white rounded-2xl p-20 border border-slate-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-slate-50 text-[#1E3A6D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <i className={`fa-solid ${activeTab === 'packages' ? 'fa-box-archive' :
                activeTab === 'customers' ? 'fa-users' : 'fa-chart-pie'
                } text-2xl`}></i>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1E3A6D] mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              We're currently finalizing this section to provide you with the best tools for your consultancy. Stay tuned for updates!
            </p>
          </div>
        );
      default:
        return <DashboardHome userData={userData} leads={leads} />;
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#F9FBFF]">
        <div className="max-w-7xl mx-auto relative cursor-default">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-2">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1E3A6D]">
                {headerInfo.title}
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-1">
                {headerInfo.sub}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('leads')}
              className="bg-[#1E3A6D] hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-all"
            >
              <i className="fa-solid fa-plus text-xs"></i> Generate New Lead
            </button>
          </div>

          {renderContent()}
        </div>
      </main>

      {/* New Lead Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 animate-[slideIn_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-[#1E3A6D]">Generate Lead</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Lead Name</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]"
                  placeholder="Potential Client Name"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]"
                  placeholder="+1..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E3A6D] text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg mt-4"
              >
                Create Lead
              </button>
            </form>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Dashboard;
