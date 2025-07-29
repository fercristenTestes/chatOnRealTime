import React, { useEffect, useState } from 'react';

const ws = new WebSocket(`wss://${window.location.host}`);

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    ws.onmessage = async (event) => {
      const text = typeof event.data === 'string'
        ? event.data
        : await event.data.text(); // <- converte o Blob em string
      setMessages((prev) => [...prev, text]);
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      ws.send(input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-time Chat</h1>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%', marginRight: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
