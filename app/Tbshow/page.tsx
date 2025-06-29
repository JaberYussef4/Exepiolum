"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [labels, setLabels] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      setLabels([...labels, input]);
      setInput("");
    }
  }

  return (
    <div >
      <main >
        {/* New label input UI */}
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter label text"
            style={{ marginRight: 8 }}
          />
          <button type="submit">Add Label</button>
        </form>
        <ul>
          {labels.map((label, idx) => (
            <li key={idx}><label>{label}</label></li>
          ))}
        </ul>
      
      

        
      </main>
     
    </div>
  );
}
