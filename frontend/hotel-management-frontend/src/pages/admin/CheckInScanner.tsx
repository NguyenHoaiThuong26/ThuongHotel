import React, { useState } from 'react';
import { Scan, CheckCircle, XCircle } from 'lucide-react';

const CheckInScanner: React.FC = () => {
    const [qrInput, setQrInput] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!qrInput.trim()) return;

        try {
            const response = await fetch(`/bookings/check-in?qrData=${qrInput}`, {
                method: 'POST'
            });
            const data = await response.json();

            if (response.ok) {
                setResult(data.result);
                setError(null);
                setQrInput('');
            } else {
                setError(data.message || 'Check-in failed');
                setResult(null);
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Scan className="w-6 h-6" /> Reception Check-In
            </h1>

            <form onSubmit={handleScan} className="mb-6">
                <label className="block text-sm font-medium mb-2">Scan QR Code (or type code)</label>
                <div className="flex gap-2">
                    <input
                        value={qrInput}
                        onChange={(e) => setQrInput(e.target.value)}
                        placeholder="BOOKING_..."
                        className="flex-1 border rounded p-2"
                        autoFocus
                    />
                    <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded font-bold hover:bg-teal-700">
                        Check In
                    </button>
                </div>
            </form>

            {result && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
                    <div>
                        <h3 className="font-bold text-green-800">Check-In Successful!</h3>
                        <p className="text-sm text-green-700">Booking ID: {result.bookingId}</p>
                        <p className="text-sm text-green-700">Guest: {result.userId}</p>
                        <p className="text-sm text-green-700">Room: {result.roomId}</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3">
                    <XCircle className="text-red-600 w-6 h-6" />
                    <p className="text-red-800">{error}</p>
                </div>
            )}
        </div>
    );
};

export default CheckInScanner;
