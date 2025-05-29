

// import React, { useState } from 'react';

// export default function ChatAssistant() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]); // FIXED: should be an array, not ''
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     setError('');
//     try {
//       const res = await fetch('http://localhost:5000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });
//       if (!res.ok) throw new Error('Failed to fetch AI response');
//       const data = await res.json();
//       setMessages((prev) => [
//         ...prev,
//         { from: 'user', text: input },
//         { from: 'ai', text: data.reply },
//       ]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//       setInput('');
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Ask AI</h2>

//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type your question..."
//         className="w-full p-2 border rounded mb-2"
//         disabled={loading}
//       />

//       <button
//         onClick={handleSend}
//         disabled={loading || !input.trim()}
//         className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         {loading ? 'Sending...' : 'Send'}
//       </button>

//       {error && <p className="text-red-600 mt-2">{error}</p>}

//       {/* ✅ Show chat history */}
//       <div className="mt-4 space-y-2">
//         {messages.map((msg, i) => (
//           <p
//             key={i}
//             className={`p-2 rounded ${
//               msg.from === 'ai' ? 'bg-gray-100 text-left' : 'bg-blue-100 text-right'
//             }`}
//           >
//             <strong>{msg.from === 'ai' ? 'AI:' : 'You:'}</strong> {msg.text}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from 'react';

export default function ChatAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:5050/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }), // ✅ Fixed line
      });

      if (!res.ok) throw new Error('Failed to fetch AI response');

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: 'user', text: userMessage },
        { from: 'ai', text: data.reply },
      ]);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white shadow-xl rounded-xl w-full h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-3 text-blue-700">Ask CarNest Assistant</h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-2 max-h-60">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-sm ${
              msg.from === 'ai'
                ? 'bg-gray-100 text-left text-gray-800'
                : 'bg-blue-100 text-right text-blue-900'
            }`}
          >
            <strong>{msg.from === 'ai' ? 'AI:' : 'You:'}</strong> {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
