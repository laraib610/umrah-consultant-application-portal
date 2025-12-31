import React, { useState } from 'react';

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 bg-[#F9FBFF]  rounded-xl overflow-hidden border border-slate-100 transition-all hover:shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
            >
                <span className="font-bold text-[#1E3A6D] flex gap-4">
                    <span className="text-cyan-500">{index}.</span> {question}
                </span>
                <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 text-slate-500 font-medium border-t border-slate-50 italic">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQs: React.FC = () => {
    const faqs = [
        { q: "How do I track my earnings?", a: "You can track your earnings in real-time through the Dashboard stats and bank info section." },
        { q: "When are commissions paid?", a: "Commissions are typically processed by the 5th of every month for the previous month's bookings." },
        { q: "Can I refer leads from any country?", a: "Yes, Umrah Network is a global platform supporting consultants and pilgrims from all over the world." },
        { q: "What support is available for new consultants?", a: "We provide comprehensive training modules, a dedicated support team, and a mentorship program." }
    ];

    return (
        <div className="max-w-4xl bg-white p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <h2 className="text-xl font-extrabold text-[#1E3A6D] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <FAQItem key={idx} index={idx + 1} question={faq.q} answer={faq.a} />
                ))}
            </div>
        </div>
    );
};

export default FAQs;
