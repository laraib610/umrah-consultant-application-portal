
import React, { useState } from 'react';
import { Lead, ApplicationData } from '../types';

interface DashboardProps {
  userData: ApplicationData;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onLogout }) => {
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0A2540] text-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-kaaba text-white"></i>
          </div>
          <span className="font-bold tracking-tight uppercase">Umrah Network</span>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 bg-cyan-500/10 text-cyan-400 p-3 rounded-lg font-medium">
            <i className="fa-solid fa-house"></i> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-all">
            <i className="fa-solid fa-user"></i> Profile Builder
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-all">
            <i className="fa-solid fa-headset"></i> Support
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-all">
            <i className="fa-solid fa-money-bill-transfer"></i> Bank Info
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-all">
            <i className="fa-regular fa-bell"></i> Notifications
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-all">
            <i className="fa-solid fa-file-contract"></i> Terms & Conditions
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-all">
            <i className="fa-solid fa-circle-question"></i> FAQs
          </a>
        </nav>

        <button
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors p-3"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-[#0A2540]">Welcome back, {userData.name}</h1>
            <p className="text-slate-500">Here's what's happening with your leads today.</p>
          </div>

        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Khidmah Points", val: "1,250", icon: "fa-star", color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Rewards Tier", val: "Silver", icon: "fa-trophy", color: "text-purple-500", bg: "bg-purple-50" },
            { label: "Total Leads", val: "24", icon: "fa-users", color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Conversion Rate", val: "15%", icon: "fa-chart-line", color: "text-green-500", bg: "bg-green-50" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-[#0A2540]">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* CRM Link Banner */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A6D] rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Manage Your Leads & Customers</h2>
            <p className="text-cyan-100 mb-6 md:mb-0">Access the full CRM system to generate quotes, track payments, and more.</p>
          </div>
          <div className="relative z-10">
            <a
              href="https://crm.umrahconsultant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              Go to CRM System <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>

          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

        {/* Lead Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-[#0A2540]">Recent Leads</h3>
            <button className="text-cyan-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                    <td className="px-6 py-4 text-slate-600">{lead.email}</td>
                    <td className="px-6 py-4 text-slate-600">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'Contacted' ? 'bg-cyan-100 text-cyan-700' :
                          lead.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                        }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{lead.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-slate-400 hover:text-cyan-600 transition-colors">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* New Lead Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 animate-[slideIn_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0A2540]">Generate Lead</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Lead Name</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="Potential Client Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="+1..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0A2540] text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-md mt-4"
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
