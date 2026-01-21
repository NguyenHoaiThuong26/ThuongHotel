import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export interface BookingFormData {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
}

interface BookingFormProps {
  pricePerNight: number;
  onSubmit: (data: BookingFormData) => void;
  isLoading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ pricePerNight, onSubmit, isLoading }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays > 0 ? diffDays : 1) * pricePerNight;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: numAdults,
      children: numChildren
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="checkIn" className="block text-sm font-medium mb-1">Check In</label>
        <input
          id="checkIn"
          type="datetime-local"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="checkOut" className="block text-sm font-medium mb-1">Check Out</label>
        <input
          id="checkOut"
          type="datetime-local"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="adults" className="block text-sm font-medium mb-1">Adults</label>
          <input
            id="adults"
            type="number"
            min="1"
            value={numAdults}
            onChange={(e) => setNumAdults(parseInt(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="children" className="block text-sm font-medium mb-1">Children</label>
          <input
            id="children"
            type="number"
            min="0"
            value={numChildren}
            onChange={(e) => setNumChildren(parseInt(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="pt-2 border-t flex justify-between items-center font-bold">
        <span>Total Price:</span>
        <span>${calculateTotal().toLocaleString()}</span>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700 flex justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
