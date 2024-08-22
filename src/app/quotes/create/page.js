'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddQuotePage() {
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const [scheduledFor, setScheduledFor] = useState('');
    const [isUsed, setIsUsed] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/quotes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text.trim(),
                    scheduledFor: scheduledFor ? scheduledFor : null,
                    tags: tags.split(',').map((tag) => tag.trim()),
                    isUsed,
                }),
            });

            if (response.ok) {
                router.push('/quotes');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.details}`);
            }
        } catch (error) {
            alert('Failed to add quote. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Add a New Quote</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="quoteText" className="block text-gray-700 font-medium mb-2">
                            Quote Text
                        </label>
                        <textarea
                            id="quoteText"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows="6" // Increase the number of rows to make the textarea larger
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="tags"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="scheduledFor" className="block text-gray-700 font-medium mb-2">
                            Scheduled For (optional, format: YYYY-MM-DD)
                        </label>
                        <input
                            type="date"
                            id="scheduledFor"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={scheduledFor}
                            onChange={(e) => setScheduledFor(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="isUsed" className="block text-gray-700 font-medium mb-2">
                            Mark as Used
                        </label>
                        <input
                            type="checkbox"
                            id="isUsed"
                            className="w-4 h-4"
                            checked={isUsed}
                            onChange={(e) => setIsUsed(e.target.checked)}
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="btn bg-pink-500 text-white hover:bg-pink-600"
                        >
                            Add Quote
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
