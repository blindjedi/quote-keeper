'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import QuoteList from './components/QuoteList';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  }, []);

  const handleEdit = (id, updatedFields) => {
    // Handle the edit functionality here
    console.log('Editing quote:', id, updatedFields);

    // You can then update the state or make an API call to save changes
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id ? { ...quote, ...updatedFields } : quote
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 p-6">
      <div className="w-full max-w-4xl">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Quotes</h1>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-4 sm:mt-0">
            <Link href="/quotes/create">
              <button
                className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded w-full sm:w-auto"
              >
                Add Quote
              </button>
            </Link>
            <button
              className="btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded w-full sm:w-auto"
            >
              Export as CSV
            </button>
          </div>
        </div>
        <QuoteList quotes={quotes} onEdit={handleEdit} />
      </div>
    </div>
  );
}
