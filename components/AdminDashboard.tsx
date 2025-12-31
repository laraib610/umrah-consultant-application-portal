import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { authService } from '../services/auth';
import { sendActivationEmail } from '../services/email';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadPendingUsers();
    }, []);

    const loadPendingUsers = () => {
        setPendingUsers(authService.getPendingUsers());
    };

    const handleActivate = async (user: User) => {
        if (!confirm(`Are you sure you want to activate ${user.name}?`)) return;

        setIsLoading(true);
        try {
            await sendActivationEmail(user);
            authService.activateUser(user.email);
            loadPendingUsers();
            alert(`User ${user.name} activated successfully.`);
        } catch (error) {
            console.error('Activation failed', error);
            alert('Failed to activate user.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-[#1E3A6D]">Admin Dashboard</h1>
                    <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-800">
                        Logout
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-xl font-bold text-slate-800">Pending Applications</h2>
                        <p className="text-sm text-slate-500">Review videos and activate consultants.</p>
                    </div>

                    {pendingUsers.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            <i className="fa-solid fa-check-circle text-4xl text-green-100 mb-4 block"></i>
                            No pending applications found.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {pendingUsers.map(user => (
                                <div key={user.id} className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-extrabold text-lg text-[#1E3A6D]">{user.name}</h3>
                                            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">Pending Review</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                                            <span className="flex items-center gap-1"><i className="fa-solid fa-envelope"></i> {user.email}</span>
                                            <span className="flex items-center gap-1"><i className="fa-solid fa-phone"></i> {user.phone}</span>
                                            <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {user.city}, {user.country}</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between border border-slate-200">
                                            <span className="font-bold text-slate-700 text-sm"><i className="fa-solid fa-video text-cyan-500 mr-2"></i> Intro Video</span>
                                            {/* In a real app, this would be the actual video URL. We're mocking it or using Loom link if available */}
                                            <a href="#" className="text-cyan-600 hover:underline text-sm font-medium">View Video</a>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={() => handleActivate(user)}
                                            disabled={isLoading}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
                                            Approve & Activate
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
