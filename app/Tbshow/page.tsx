"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [labels, setLabels] = useState<string[]>([]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    
    try {
      const response = await fetch('/api/Tbshow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      
      if (response.ok) {
        setLabels([...labels, input]);
        setInput("");
      }
    } catch (error) {
      console.error('Save failed:', error);
    }
  }

  return (
    <div>
      <main>
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter text for tbtest"
            style={{ marginRight: 8 }}
          />
          <button type="submit">Add to DB</button>
        </form>
        
        <h3>Stored in tbtest:</h3>
        <ul>
          {labels.map((label, idx) => (
            <li key={idx}>{label}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}