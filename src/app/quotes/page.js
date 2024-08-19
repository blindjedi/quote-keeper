'use client';
import { useState, useEffect } from 'react';
import QuoteInput from './components/QuoteInput';
import QuoteList from './components/QuoteList';
import CsvUploader from './components/CsvUploader';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  }, []);

  const addQuote = async (text) => {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newQuote = await response.json();
    setQuotes([...quotes, newQuote]);
  };

  const addQuoteFromCsv = async (quoteText) => {
    await addQuote(quoteText);
  };

  const checkQuoteExists = (text) => {
    return quotes.some((quote) => quote.text.toLowerCase() === text.toLowerCase());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Manage Quotes</h1>
        <QuoteInput onAddQuote={addQuote} onQuoteExists={checkQuoteExists} />
        <CsvUploader onAddQuoteFromCsv={addQuoteFromCsv} />
        <QuoteList quotes={quotes} />
      </div>
    </div>
  );
}
