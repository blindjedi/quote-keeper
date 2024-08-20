'use client';

export default function QuoteList({ quotes }) {
  const backgroundClasses = ['bg-tile-1', 'bg-tile-2', 'bg-tile-3'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {quotes.map((quote, index) => (
        <div
          key={quote.id}
          className={`quote-tile ${backgroundClasses[index % backgroundClasses.length]} p-4 rounded shadow text-black`}
          style={{ whiteSpace: 'pre-line' }}
        >
          {quote.text.replace(/, /g, ',\n').replace(/\. /g, '.\n')}
        </div>
      ))}
    </div>
  );
}
