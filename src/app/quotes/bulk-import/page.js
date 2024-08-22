'use client';
import { useState } from 'react';
import CsvUploader from "@/app/quotes/bulk-import/components/CsvUploader";


export default function BulkImportPage() {
  const [message, setMessage] = useState('');

  // This function will handle the parsed CSV data
  async function handleAddQuoteFromCsv(quotesData) {
    console.log('Parsed CSV Data:', quotesData); // Log the parsed data for debugging
    try {
      const response = await fetch('/api/quotes/bulk-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quotes: quotesData }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`${result.updatedQuotes} quotes were updated successfully.`);
      } else {
        setMessage('Bulk import failed.');
      }
    } catch (error) {
      setMessage('An error occurred during the bulk import.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="w-full max-w-2xl text-center bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bulk Import Quotes</h1>
        <CsvUploader onAddQuoteFromCsv={handleAddQuoteFromCsv} />
        {message && <p className="mt-4 text-gray-800">{message}</p>}
      </div>
    </div>
  );
}
