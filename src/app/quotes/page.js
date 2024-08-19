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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Quotes</h1>
          <div className="space-x-4">
            <Link href="/quotes/create">
              <button className="btn btn-primary">Add Quote</button>
            </Link>
            <CsvUploader onAddQuoteFromCsv={(quote) => setQuotes([...quotes, quote])} />
          </div>
        </div>
        <QuoteList quotes={quotes} />
      </div>
    </div>
  );
}
