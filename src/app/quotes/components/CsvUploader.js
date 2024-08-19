'use client';
import Papa from 'papaparse';

export default function CsvUploader({ onAddQuoteFromCsv }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        results.data.forEach((row) => {
          if (row.quote) {
            onAddQuoteFromCsv(row.quote);
          }
        });
      },
    });
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="file-input file-input-bordered w-full max-w-xs"
      />
    </div>
  );
}
