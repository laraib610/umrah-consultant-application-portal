
import React, { useState } from 'react';
import { Lead, ApplicationData } from '../types';
import Sidebar from './Sidebar';
import DashboardHome from './dashboard/DashboardHome';
import ProfileBuilder from './dashboard/ProfileBuilder';
import NewLead from './dashboard/NewLead';
import LeadsList from './dashboard/LeadsList';

interface DashboardProps {
  userData: ApplicationData;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      quotationNumber: 'QT-8421',
      name: 'Ahmad Khan',
      email: 'ahmad@example.com',
      phone: '+966 50 123 4567',
      flight: 'PIA (Karachi → Jeddah)',
      visa: 'Umrah Visa (4 Applicants)',
      transport: 'GMC (Airport Transfer)',
      hotel: 'Swissôtel Makkah (5 Nights)',
      status: 'New',
      paymentStatus: 'Pending',
      quotationStatus: 'Sent',
      packageStatus: 'Premium',
      date: '24/10/2023'
    },
    {
      id: '2',
      quotationNumber: 'QT-3215',
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      phone: '+1 415 555 0123',
      flight: 'Air Blue (Lahore → Madinah)',
      visa: 'Tourist Visa (2 Applicants)',
      transport: 'Hiace (Group Travel)',
      hotel: 'Fairmont Makkah (7 Nights)',
      status: 'In Progress',
      paymentStatus: 'Paid',
      quotationStatus: 'Approved',
      packageStatus: 'Standard',
      date: '22/10/2023'
    },
  ]);

  const [isCreatingLead, setIsCreatingLead] = useState(false);

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
        return { title: 'Leads', sub: 'Manage leads and quotations for your client.' };
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
        return isCreatingLead ? (
          <NewLead
            onCreateLead={(lead) => {
              setLeads([lead, ...leads]);
              setIsCreatingLead(false);
            }}
            onCancel={() => setIsCreatingLead(false)}
          />
        ) : (
          <LeadsList
            leads={leads}
            onAddNewLead={() => setIsCreatingLead(true)}
          />
        );
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
            {activeTab !== 'leads' && (
              <button
                onClick={() => {
                  setActiveTab('leads');
                  setIsCreatingLead(true);
                }}
                className="bg-[#1E3A6D] hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-all"
              >
                <i className="fa-solid fa-plus text-xs"></i> Generate New Lead
              </button>
            )}
          </div>

          {renderContent()}
        </div>
      </main>

      <style>{`
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Dashboard;
