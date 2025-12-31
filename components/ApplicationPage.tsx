import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ApplicationData } from '../types';
import PhoneInput from 'react-phone-input-2';
import { countries } from '../data/countries';
import { initEmailService, sendWelcomeEmail, sendVideoUploadedEmail, sendCompletionEmail } from '../services/email';
import { authService } from '../services/auth';

import 'react-phone-input-2/lib/style.css';

interface ApplicationPageProps {
    data: ApplicationData;
    setData: React.Dispatch<React.SetStateAction<ApplicationData>>;
    onComplete: () => void;
}

const ApplicationPage: React.FC<ApplicationPageProps> = ({ data, setData, onComplete }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [countryCode, setCountryCode] = useState('us');
    const [loomLink, setLoomLink] = useState('');

    React.useEffect(() => {
        initEmailService();

        // Handle resume state
        if (location.state && location.state.step) {
            setStep(location.state.step);
        }

        fetch('https://ipwho.is/')
            .then(res => res.json())
            .then(data => {
                if (data && data.country_code) {
                    setCountryCode(data.country_code.toLowerCase());

                    let countryName = data.country;
                    // Normalize specific cases
                    if (data.country_code === 'US') countryName = 'United States of America';
                    if (data.country_code === 'GB') countryName = 'United Kingdom';
                    if (data.country_code === 'SA') countryName = 'Saudi Arabia';

                    if (countries.includes(countryName)) {
                        setData(prev => ({ ...prev, country: countryName }));
                    }
                }
            })
            .catch(err => console.error('Error fetching country:', err));
    }, [location.state]);

    const nextStep = async () => {
        setIsProcessing(true);
        try {
            if (step === 1) {
                // Sign up logic
                let user = authService.getUser(data.email);
                console.log(user);
                if (!user) {
                    const result = authService.signUp(data);
                    console.log(result);
                    await sendWelcomeEmail(data, result.password);
                } else {
                    authService.updateUser(data.email, { ...data, status: 'step1_complete' });
                }
                setStep(2);
            } else if (step === 2) {
                // Video step logic
                if (loomLink) {
                    authService.updateUser(data.email, { videoUploaded: true, status: 'pending_approval' });
                    await sendVideoUploadedEmail(data, loomLink);
                    setStep(3);
                } else if (data.videoUploaded) {
                    // If they uploaded a file previously
                    authService.updateUser(data.email, { status: 'active' });
                    setStep(3);
                }
            }
        } catch (error) {
            console.error('Error in step processing:', error);
            alert('Something went wrong. Please check your connection.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'radio') {
            setData(prev => ({ ...prev, [name]: value === 'yes' }));
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'videoUploaded') => {
        if (e.target.files && e.target.files.length > 0) {
            setIsProcessing(true);
            setTimeout(async () => {
                setIsProcessing(false);
                setData(prev => ({ ...prev, [field]: true }));

                // Video Step upload complete
                authService.updateUser(data.email, { videoUploaded: true, status: 'active' });
                await sendVideoUploadedEmail(data, 'File Uploaded (Mock URL)');
                setStep(3);

            }, 2000);
        }
    };

    return (
        <div className="h-[100vh] bg-slate-50 flex overflow-hidden justify-center ">
            <div className="flex-1 bg-[#1E3A6D] flex flex-col justify-center opacity-90" style={{ backgroundImage: 'url("assets/images/Frame-3.png")', backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
                <div className="px-5 ">
                    <h1 className="text-white text-4xl font-bold px-5">Professional Consultant Registry</h1>
                    <p className="text-gray-100 text-lg p-5">Begin your career as a verified Umrah Consultant with access to a global network.</p>
                </div>
                <div className="p-6 pt-9">
                    <ul className="p-5 m-0 space-y-4">
                        <li className="flex items-center gap-5">
                            <img className="w-5 h-5" src="assets/images/check.png" alt="" />
                            <div>
                                <p className="text-white font-bold text-lg">Verified Hub</p>
                                <span className="text-gray-100">Work within a secure, recognized network</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-5">
                            <img className="w-5 h-5" src="assets/images/check.png" alt="" />
                            <div>
                                <p className="text-white font-bold text-lg">Sincere Khidmah</p>
                                <span className="text-gray-100">Professionalizim rooted in spiritual excellence</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-5">
                            <img className="w-5 h-5" src="assets/images/check.png" alt="" />
                            <div>
                                <p className="text-white font-bold text-lg">Intelligent Curation</p>
                                <span className="text-gray-100">Draft high-tier Journeys with AI support</span>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>

            <div className="flex-1 container mx-auto  max-w-3xl overflow-y-scroll">
                <div className="bg-white relative animate-[fadeIn_0.3s_ease-out]">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                        <div
                            className="h-full bg-cyan-500 transition-all duration-500"
                            style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                    </div>



                    <div className="p-8 md:p-12 md:py-8 h-full">
                        {isProcessing ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                                <h3 className="text-xl font-extrabold text-[#1E3A6D]">
                                    {step === 1 ? 'Creating Profile & Sending Credentials...' :
                                        step === 2 ? 'Uploading & notifying admin...' : 'Finalizing Application...'}
                                </h3>
                                <p className="text-slate-500 mt-2">Please wait...</p>
                            </div>
                        ) : (
                            <>
                                {step === 1 && (
                                    <div className="animate-[slideIn_0.4s_ease-out]">
                                        <div className="w-full flex py-5 justify-center items-center gap-2">
                                            <img className="w-16 h-16" src="assets/images/footerlogo.png" alt="" />
                                        </div>
                                        <div className="w-full flex flex-col px-5 justify-center items-center gap-2">
                                            <h2 className="text-3xl font-bold text-[#1E3A6D] mb-2">Registry Application</h2>
                                            <p className="text-slate-500 mb-8">Please provide accurate personal details.</p>
                                        </div>
                                        <div className="w-full flex px-5 justify-end items-center gap-2">
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="text-slate-500 underline hover:text-slate-800 font-medium transition-colors flex items-center gap-2"
                                            >
                                                Login
                                            </button>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={data.name}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Country/Region</label>
                                                    <select
                                                        name="country"
                                                        value={data.country}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]"
                                                    >
                                                        <option value="">Select a country</option>
                                                        {countries.map((c) => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={data.city || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]"
                                                        placeholder="City"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                                                <PhoneInput
                                                    country={countryCode}
                                                    value={data.phone}
                                                    onChange={(phone) => setData(prev => ({ ...prev, phone }))}
                                                    inputClass="!w-full !px-4 !py-3 !bg-slate-50 !border !border-slate-100 !rounded-xl !h-[50px] !pl-[48px] focus:!ring-2 focus:!ring-cyan-500 !outline-none font-medium text-[#1E3A6D]"
                                                    containerClass="!w-full"
                                                    buttonClass="!bg-slate-50 !border-slate-100 !rounded-l-xl"
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Have you performed Umrah or Hajj?</label>
                                                    <div className="flex gap-6">
                                                        <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1E3A6D]"><input type="radio" name="hasPerformedUmrah" value="yes" checked={data.hasPerformedUmrah === true} onChange={handleInputChange} className="w-5 h-5 accent-cyan-500" /> Yes</label>
                                                        <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1E3A6D]"><input type="radio" name="hasPerformedUmrah" value="no" checked={data.hasPerformedUmrah === false} onChange={handleInputChange} className="w-5 h-5 accent-cyan-500" /> No</label>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Are you tech-driven?</label>
                                                    <div className="flex gap-6">
                                                        <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1E3A6D]"><input type="radio" name="isTechDriven" value="yes" checked={data.isTechDriven === true} onChange={handleInputChange} className="w-5 h-5 accent-cyan-500" /> Yes</label>
                                                        <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1E3A6D]"><input type="radio" name="isTechDriven" value="no" checked={data.isTechDriven === false} onChange={handleInputChange} className="w-5 h-5 accent-cyan-500" /> No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Current Qualification</label>
                                                <select name="qualification" value={data.qualification} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-[#1E3A6D]">
                                                    <option value="">Select Qualification</option>
                                                    <option value="Graduate">Graduate</option>
                                                    <option value="Post Graduate">Post Graduate</option>
                                                    <option value="Islamic Scholar">Islamic Scholar</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <button
                                                onClick={nextStep}
                                                disabled={!data.name || !data.email || !data.phone}
                                                className="w-full bg-[#1E3A6D] text-white py-4 rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg"
                                            >
                                                Start Application
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="animate-[slideIn_0.4s_ease-out] text-center h-full">
                                        <div className="w-full  flex py-5 justify-center items-center gap-2">
                                            <img className="w-16 h-16" src="assets/images/footerlogo.png" alt="" />
                                        </div>
                                        <div className="w-full flex flex-col px-5 justify-center items-center gap-2">

                                            <h2 className="text-3xl text-[#1E3A6D] font-extrabold mb-2">Upload Demo Video</h2>
                                            <p className="text-slate-500 mb-8">Record a 1-2 minute video introducing yourself.</p>
                                        </div>
                                        <div className="w-full flex px-5 pb-2 justify-end items-center gap-2">
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="text-slate-500 underline hover:text-slate-800 font-medium transition-colors flex items-center gap-2"
                                            >
                                                Login
                                            </button>
                                        </div>


                                        <div className="space-y-6 h-full">
                                            {/* Loom Link Option */}
                                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left">
                                                <label className="block text-sm font-bold text-slate-700 mb-2">Option 1: Loom/Video Link</label>
                                                <div className="mb-4 space-y-2">
                                                    <p className="text-xs text-slate-500 flex items-center gap-2"><i className="fa-solid fa-1 bg-[#1E3A6D] text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]"></i> Record your 1-2 min intro on <a href="https://www.loom.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-bold underline hover:text-cyan-700">Loom</a>.</p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-2"><i className="fa-solid fa-2 bg-[#1E3A6D] text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]"></i> Click "Share" and copy the link.</p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-2"><i className="fa-solid fa-3 bg-[#1E3A6D] text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]"></i> Paste the link below and submit.</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={loomLink}
                                                        onChange={(e) => setLoomLink(e.target.value)}
                                                        placeholder="https://www.loom.com/share/..."
                                                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none placeholder:text-slate-300"
                                                    />
                                                    <button
                                                        onClick={nextStep}
                                                        disabled={!loomLink}
                                                        className="bg-[#1E3A6D] text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 transition-all hover:bg-slate-800"
                                                    >
                                                        Submit Link
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="relative flex py-2 items-center">
                                                <div className="flex-grow border-t border-slate-200"></div>
                                                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">Or upload file</span>
                                                <div className="flex-grow border-t border-slate-200"></div>
                                            </div>

                                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 relative group cursor-pointer hover:bg-slate-100 transition-all">
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => handleFileUpload(e, 'videoUploaded')}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-300 group-hover:text-[#1E3A6D] mb-4 transition-colors"></i>
                                                <p className="font-bold text-slate-700 mb-2">Option 2: Upload Video File</p>
                                                <div className="text-xs text-slate-500 space-y-1">
                                                    <p>1. Select a video from your device</p>
                                                    <p>2. Maximum file size: 50MB</p>
                                                    <p>3. Supported formats: MP4, MOV, WebM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="animate-[slideIn_0.4s_ease-out] text-center">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <i className="fa-solid fa-check text-green-600 text-3xl"></i>
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-[#1E3A6D] mb-2">Thank You!</h2>
                                        <p className="text-slate-500 mb-8 px-8">
                                            We have received your video. Our manager will review it and approve your request.
                                            <br /><br />
                                            You will receive an email once your profile is activated.
                                            Thank you for your time and patience.
                                        </p>

                                        <button
                                            onClick={() => navigate('/')}
                                            className="bg-[#1E3A6D] text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors"
                                        >
                                            Return to Home
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                `}</style>
            </div>
        </div>
    );
};

export default ApplicationPage;
