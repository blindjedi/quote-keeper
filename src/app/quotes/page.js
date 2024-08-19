'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [text, setText] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  }, []);

  const addQuote = async () => {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newQuote = await response.json();
    setQuotes([...quotes, newQuote]);
    setText('');
  };

  const checkQuoteExists = () => {
    return quotes.some((quote) => quote.text.toLowerCase() === text.toLowerCase());
  };

  const handleAddQuote = () => {
    if (checkQuoteExists()) {
      alert('Quote already exists!');
    } else {
      addQuote();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Manage Quotes</h1>
        <div className="mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a new quote"
            className="input input-bordered input-primary w-full"
          />
        </div>
        <button
          onClick={handleAddQuote}
          className="btn btn-primary w-full"
        >
          Add Quote
        </button>
        <ul className="mt-6 space-y-2">
          {quotes.map((quote) => (
            <li key={quote.id} className="bg-gray-100 p-4 rounded shadow">
              {quote.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
