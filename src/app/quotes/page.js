'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import QuoteList from './components/QuoteList';
import CsvUploader from './components/CsvUploader';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 p-6">
      <div className="w-full max-w-4xl">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Quotes</h1>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/quotes/create">
              <button className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded">
                Add Quote
              </button>
            </Link>
            <CsvUploader onAddQuoteFromCsv={(quote) => setQuotes([...quotes, quote])} />
            <button className="btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded">
              Export as CSV
            </button>
          </div>
        </div>
        <QuoteList quotes={quotes} />
      </div>
    </div>
  );
}
