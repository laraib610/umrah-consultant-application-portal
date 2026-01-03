import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ApplicationPage from './components/ApplicationPage';
import Dashboard from './components/Dashboard';
import { ApplicationData } from './types';
import LoginPage from './components/LoginPage';

import ContractPage from './components/ContractPage';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [appData, setAppData] = useState<ApplicationData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    hasPerformedUmrah: false,
    isTechDriven: false,
    qualification: '',
    videoUploaded: false,
    contractSigned: false
  });

  const handleApplicationComplete = () => {
    navigate('/dashboard');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage onApply={() => navigate('/apply')} />}
      />
      <Route
        path="/login"
        element={<LoginPage setAppData={setAppData} />}
      />
      <Route
        path="/apply"
        element={
          <ApplicationPage
            data={appData}
            setData={setAppData}
            onComplete={handleApplicationComplete}
          />
        }
      />
      <Route
        path="/contract"
        element={<ContractPage userData={appData} setAppData={setAppData} />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard onLogout={() => navigate('/')} userData={appData} />}
      />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </BrowserRouter>
  );
};

export default App;
