'use client';

export default function QuoteList({ quotes, onEdit }) {
  const backgroundClasses = ['bg-tile-1', 'bg-tile-2', 'bg-tile-3'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {quotes.map((quote, index) => (
        <div
          key={quote.id}
          className={`quote-tile ${backgroundClasses[index % backgroundClasses.length]} p-6 rounded-lg shadow-md text-black`}
          style={{ whiteSpace: 'pre-line' }}
        >
          <textarea
            className="w-full bg-transparent resize-none border-none focus:outline-none text-black"
            value={quote.text.replace(/, /g, ',\n').replace(/\. /g, '.\n')}
            readOnly
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={quote.isUsed}
              onChange={(e) => onEdit(quote.id, { isUsed: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm">Is Used</span>
          </div>
          <button
            onClick={() => onEdit(quote.id)}
            className="btn bg-black text-white hover:bg-gray-800 px-4 py-2 rounded w-full mt-4"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
