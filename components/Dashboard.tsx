
import React, { useState } from 'react';
import { Lead, ApplicationData } from '../types';
import Sidebar from './Sidebar';
import DashboardHome from './dashboard/DashboardHome';
import ProfileBuilder from './dashboard/ProfileBuilder';
import NewLead from './dashboard/NewLead';
import LeadsList from './dashboard/LeadsList';
import LeadDetail from './dashboard/LeadDetail';
import VoucherAction from './dashboard/VoucherAction';
import Support from './dashboard/Support';
import { leadsService } from '../services/leads';

interface DashboardProps {
  userData: ApplicationData;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>(() => leadsService.getAllLeads());
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isManagingVoucher, setIsManagingVoucher] = useState(false);
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
      case 'support':
        return { title: 'Support & Help', sub: 'Need assistance? Our support team is here for you.' };
      case 'leads':
        return { title: 'Leads Managment', sub: 'Manage and track your customer leads and quotations.' };
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
      case 'support':
        return <Support />;
      case 'leads':
        if (isCreatingLead) {
          return (
            <NewLead
              onCreateLead={(lead) => {
                const updatedLeads = leadsService.addLead(lead);
                setLeads(updatedLeads);
                setIsCreatingLead(false);
              }}
              onCancel={() => setIsCreatingLead(false)}
            />
          );
        }

        if (selectedLeadId) {
          const lead = leads.find(l => l.id === selectedLeadId);
          if (lead) {
            return (
              <LeadDetail
                lead={lead}
                onBack={() => setSelectedLeadId(null)}
                onManageVoucher={() => setIsManagingVoucher(true)}
                onUpdateStatus={(status) => {
                  const updatedLeads = leadsService.updateLead(lead.id, { status: status as Lead['status'] });
                  if (updatedLeads) setLeads(leadsService.getAllLeads());
                }}
                onAddDocument={(doc) => {
                  const updatedLeads = leadsService.addDocument(lead.id, doc);
                  if (updatedLeads) setLeads(leadsService.getAllLeads());
                }}
              />
            );
          }
        }

        return (
          <LeadsList
            leads={leads}
            onAddNewLead={() => setIsCreatingLead(true)}
            onViewLead={(id) => setSelectedLeadId(id)}
            onManageVoucher={(id) => {
              setSelectedLeadId(id);
              setIsManagingVoucher(true);
            }}
            onDeleteLead={(id) => {
              const updatedLeads = leadsService.deleteLead(id);
              setLeads(updatedLeads);
            }}
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
              <h1 className="text-3xl print:hidden font-extrabold text-[#1E3A6D]">
                {headerInfo.title}
              </h1>
              <p className="text-slate-500 print:hidden font-medium text-sm mt-1">
                {headerInfo.sub}
              </p>
            </div>
          </div>

          {renderContent()}
        </div>
      </main>

      {isManagingVoucher && selectedLeadId && (
        <VoucherAction
          lead={leads.find(l => l.id === selectedLeadId)!}
          onClose={() => setIsManagingVoucher(false)}
          onUpdate={(updates) => {
            const updatedLeads = leadsService.updateLead(selectedLeadId, updates);
            if (updatedLeads) setLeads(leadsService.getAllLeads());
          }}
        />
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Dashboard;
