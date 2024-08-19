'use client';
import { useState, useEffect } from 'react';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/tags')
      .then(response => response.json())
      .then(data => setTags(data));
  }, []);

  const addTag = async () => {
    const response = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newTag = await response.json();
    setTags([...tags, newTag]);
    setName('');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={addTag} className="btn btn-primary">
        Add Tag
      </button>
    </div>
  );
}
