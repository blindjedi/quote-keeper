'use client';
import { useState } from 'react';

export default function QuoteInput({ onAddQuote, onQuoteExists }) {
  const [text, setText] = useState('');

  const handleAddQuote = () => {
    if (onQuoteExists(text)) {
      alert('Quote already exists!');
    } else {
      onAddQuote(text);
      setText(''); // Clear input after adding the quote
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new quote"
        className="input input-bordered input-primary w-full mb-4"
      />
      <button onClick={handleAddQuote} className="btn btn-primary w-full">
        Add Quote
      </button>
    </div>
  );
}
