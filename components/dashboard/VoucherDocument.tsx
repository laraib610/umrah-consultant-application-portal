import React, { useEffect, useState } from 'react';
import { Lead } from '../../types';

interface VoucherDocumentProps {
    lead: Lead;
}

const VoucherDocument: React.FC<VoucherDocumentProps> = ({ lead }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const voucherRef = lead.quotationNumber; // Using quotation number as ref if voucher code is absent
    const voucherCode = lead.voucherCode || `VCH-${lead.quotationNumber}`;

    useEffect(() => {
        // Generate QR Code URL using a public API for simplicity
        // In a real production app, you might generate this server-side or use a local library
        const data = `Voucher: ${voucherCode}, Customer: ${lead.name}, Ref: ${voucherRef}`;
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`);
    }, [voucherCode, lead.name, voucherRef]);

    return (
        <div className="bg-white print text-slate-800 font-sans print:w-full mx-auto p-8 md:p-12 print:p-0  min-h-[297mm]">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b-2 border-[#1E3A6D] pb-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2">
                        {/* Placeholder Logo */}
                        <div className="w-12 h-12 bg-[#1E3A6D] rounded-lg flex items-center justify-center text-white text-2xl">
                            <i className="fa-solid fa-kaaba"></i>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#1E3A6D] uppercase tracking-tighter leading-none">Umrah<br /><span className="text-cyan-600 text-sm tracking-widest">Consultant</span></h1>
                        </div>
                    </div>
                    <div className="text-[#1E3A6D]">
                        <h2 className="text-lg font-bold">Reservation Confirmation</h2>
                        <p className="text-xs font-semibold text-slate-500">PNR : {lead.flightDetails?.[0]?.pnr || 'PENDING'}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-bold text-[#1E3A6D] mb-2 tracking-tight">Quotation</h1>
                    <p className="text-sm font-bold text-slate-600 mb-2">{voucherCode}</p>
                    {qrCodeUrl && (
                        <div className="inline-block border border-slate-200 p-1 rounded bg-white">
                            <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
                        </div>
                    )}
                </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-6">
                <p className="text-sm font-medium text-slate-600">
                    Thank you for choosing <span className="font-bold text-[#1E3A6D]">UMRAH CONSULTANT</span>. We are pleased to confirm your reservation as under:
                </p>
            </div>

            {/* Customer Details */}
            <div className="mb-4">
                <div className="bg-slate-200 py-1.5 text-center mb-2 border-t border-b border-slate-300">
                    <h3 className="text-[#1E3A6D] font-bold text-sm">Customer Details</h3>
                </div>
                <table className="w-full text-xs text-left">
                    <thead>
                        <tr className="text-[#1E3A6D]">
                            <th className="py-1 px-2 font-bold w-1/4">Customer</th>
                            <th className="py-1 px-2 font-bold w-1/4">Email</th>
                            <th className="py-1 px-2 font-bold w-1/4">Mobile</th>
                            <th className="py-1 px-2 font-bold w-1/4">Total Passengers</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 border-t border-slate-200">
                        <tr>
                            <td className="py-2 px-2 font-medium bg-white">{lead.name}</td>
                            <td className="py-2 px-2 font-medium bg-white">{lead.email}</td>
                            <td className="py-2 px-2 font-medium bg-white">{lead.phone}</td>
                            <td className="py-2 px-2 font-medium bg-white">{lead.pilgrims?.length || lead.flightDetails?.[0]?.passengers || 1}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Flight Details */}
            {lead.flightDetails && lead.flightDetails.length > 0 && (
                <div className="mb-4">
                    <div className="bg-slate-200 py-1.5 text-center mb-2 border-t border-b border-slate-300">
                        <h3 className="text-[#1E3A6D] font-bold text-sm">Flight Details</h3>
                    </div>
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-[#1E3A6D]">
                                <th className="py-1 px-2 font-bold text-left">PNR</th>
                                <th className="py-1 px-2 font-bold text-left">Airline</th>
                                <th className="py-1 px-2 font-bold text-left">Flight#</th>
                                <th className="py-1 px-2 font-bold text-left">Depart/City</th>
                                <th className="py-1 px-2 font-bold text-left">Depart/Date</th>
                                <th className="py-1 px-2 font-bold text-left">Depart/Time</th>
                                <th className="py-1 px-2 font-bold text-left">Arrival/City</th>
                                <th className="py-1 px-2 font-bold text-left">Arrival/Time</th>
                                <th className="py-1 px-2 font-bold text-center">PAX</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 border-t border-slate-200 bg-white">
                            {lead.flightDetails.map((flight, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.pnr}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.airline}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.flightNumber}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.departureCity}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.departureDate}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.departureTime}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.arrivalCity}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{flight.arrivalTime}</td>
                                    <td className="py-2 px-2 font-medium text-center text-slate-600 border-r border-slate-100">{flight.passengers}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Passengers Detail */}
            {lead.passengerDetails && lead.passengerDetails.length > 0 && (
                <div className="mb-4">
                    <div className="bg-slate-200 py-1.5 text-center mb-2 border-t border-b border-slate-300">
                        <h3 className="text-[#1E3A6D] font-bold text-sm">Passengers Detail</h3>
                    </div>
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-[#1E3A6D]">
                                <th className="py-1 px-2 font-bold">BRN/Ref#</th>
                                <th className="py-1 px-2 font-bold w-1/3">Description</th>
                                <th className="py-1 px-2 font-bold">Adults</th>
                                <th className="py-1 px-2 font-bold">Children</th>
                                <th className="py-1 px-2 font-bold">Infants</th>
                                <th className="py-1 px-2 font-bold">Additional Services</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 border-t border-slate-200 bg-white">
                            {lead.passengerDetails.map((p, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{p.rrn}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{p.description}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{p.adults}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{p.children}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{p.infants}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{p.additionalServices}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Transfers Detail */}
            {lead.transportDetails && lead.transportDetails.length > 0 && (
                <div className="mb-4">
                    <div className="bg-slate-200 py-1.5 text-center mb-2 border-t border-b border-slate-300">
                        <h3 className="text-[#1E3A6D] font-bold text-sm">Transfers Detail</h3>
                    </div>
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-[#1E3A6D]">
                                <th className="py-1 px-2 font-bold">BRN/Ref#</th>
                                <th className="py-1 px-2 font-bold w-1/4">Pickup</th>
                                <th className="py-1 px-2 font-bold">DateTime</th>
                                <th className="py-1 px-2 font-bold w-1/4">DropOff</th>
                                <th className="py-1 px-2 font-bold text-right">Transport</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 border-t border-slate-200 bg-white">
                            {lead.transportDetails.map((t, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{t.rrn}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">
                                        {t.pickup.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">
                                        <div>{t.time}</div>
                                        <div>{t.date}</div>
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">
                                        {t.dropOff.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-right text-slate-600 border-r border-slate-100">{t.transportType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Accommodation Details */}
            {lead.accommodationDetails && lead.accommodationDetails.length > 0 && (
                <div className="mb-4">
                    <div className="bg-slate-200 py-1.5 text-center mb-2 border-t border-b border-slate-300">
                        <h3 className="text-[#1E3A6D] font-bold text-sm">Accommodation Details</h3>
                    </div>
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-[#1E3A6D]">
                                <th className="py-1 px-2 font-bold">HCN/Ref#</th>
                                <th className="py-1 px-2 font-bold">City</th>
                                <th className="py-1 px-2 font-bold w-1/4">Hotel</th>
                                <th className="py-1 px-2 font-bold">Check Dates</th>
                                <th className="py-1 px-2 font-bold text-center">N</th>
                                <th className="py-1 px-2 font-bold w-1/5">Occupancy</th>
                                <th className="py-1 px-2 font-bold text-center">Qty</th>
                                <th className="py-1 px-2 font-bold text-center">Food</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 border-t border-slate-200 bg-white">
                            {lead.accommodationDetails.map((acc, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{acc.hcn}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{acc.city}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{acc.hotelName}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">
                                        <div>{acc.checkIn}</div>
                                        <div>{acc.checkOut}</div>
                                    </td>
                                    <td className="py-2 px-2 font-medium text-center text-slate-600 border-r border-slate-100">{acc.nights}</td>
                                    <td className="py-2 px-2 font-medium text-slate-600 border-r border-slate-100">{acc.occupancy}</td>
                                    <td className="py-2 px-2 font-medium text-center text-slate-600 border-r border-slate-100">{acc.qty}</td>
                                    <td className="py-2 px-2 font-medium text-center text-slate-600 border-r border-slate-100">{acc.food}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Empty State / Fallback if details are missing */}
            {(!lead.flightDetails && !lead.passengerDetails && !lead.transportDetails && !lead.accommodationDetails) && (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl mb-6">
                    <p className="text-slate-500 italic">Detailed itinerary information pending.</p>
                </div>
            )}

            {/* Terms and Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-[#1E3A6D] uppercase mb-2">Terms & Conditions</h4>
                        <ul className="list-disc pl-4 space-y-1">
                            {lead.termsAndConditions?.map((term, i) => (
                                <li key={i}>{term}</li>
                            )) || [
                                "All timings are local.",
                                "Reporting time for domestic flights is 2 hours prior to departure.",
                                "Reporting time for international flights is 4 hours prior to departure.",
                                "Passengers are responsible for their valid travel documents."
                            ].map((term, i) => <li key={i}>{term}</li>)}
                        </ul>
                    </div>
                    <div className="text-right flex flex-col justify-end">
                        <p className="mb-8">Authorized Signature</p>
                        <div className="h-0 border-b border-slate-400 w-32 ml-auto mb-2"></div>
                        <p className="font-bold text-[#1E3A6D]">UMRAH CONSULTANT</p>
                    </div>
                </div>
            </div>

            {/* Print Footer / Page Numbering style would go here if needed */}
            <div className="print:fixed print:bottom-4 print:left-0 print:w-full text-center text-[10px] text-slate-400 hidden print:block">
                Generated by Umrah Consultant Portal
            </div>
        </div>
    );
};

export default VoucherDocument;
