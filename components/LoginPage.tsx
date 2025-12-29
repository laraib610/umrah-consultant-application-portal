import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { ApplicationData } from '../types';

interface LoginPageProps {
    setAppData: React.Dispatch<React.SetStateAction<ApplicationData>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAppData }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const user = authService.login(email, password);

        if (user) {
            setAppData(user);
            // Redirect based on status
            if (user.status === 'step1_complete') {
                navigate('/apply', { state: { step: 2 } });
            } else if (user.status === 'step2_complete' || user.status === 'pending_approval') {
                navigate('/apply', { state: { step: 3 } });
            } else if (user.status === 'active') {
                navigate('/contract');
            } else if (user.status === 'completed') {
                navigate('/dashboard');
            } else {
                navigate('/apply');
            }
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <img className="w-20 h-20 mx-auto mb-4" src="assets/images/footerlogo.png" alt="Logo" />
                    <h2 className="text-2xl font-bold text-[#0A2540]">Resume Application</h2>
                    <p className="text-slate-500">Enter user credentials sent to your email</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#1E3A6D] text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg"
                    >
                        Login to Resume
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={() => navigate('/apply')} className="text-sm text-slate-500 hover:text-[#1E3A6D]">
                        Start New Application
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
