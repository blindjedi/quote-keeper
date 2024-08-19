'use client';

export default function QuoteList({ quotes }) {
  return (
    <ul className="mt-6 space-y-2">
      {quotes.map((quote) => (
        <li key={quote.id} className="bg-gray-100 p-4 rounded shadow text-black">
          {quote.text}
        </li>
      ))}
    </ul>
  );
}
