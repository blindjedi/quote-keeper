import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">QuoteKeeper</h1>
        <p className="mb-8 text-lg text-gray-700">Your personal collection of inspiration, ready for action.</p>
        <div className="space-x-4">
          <Link href="/quotes">
            <button className="btn btn-primary">View Quotes</button>
          </Link>
          <Link href="/quotes/create">
            <button className="btn btn-secondary">Add Quote</button>
          </Link>
          <Link href="/quotes/bulk-import">
            <button className="btn btn-secondary">Bulk Import</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
