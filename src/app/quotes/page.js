'use client';
import { useState, useEffect } from 'react';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/quotes')
      .then(response => response.json())
      .then(data => setQuotes(data));
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quotes</h1>
      <ul>
        {quotes.map(quote => (
          <li key={quote.id}>{quote.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={addQuote} className="btn btn-primary">
        Add Quote
      </button>
    </div>
  );
}
