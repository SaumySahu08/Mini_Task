import React, { useEffect, useRef, useState } from 'react';

function Chat() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("wss://ws.ifelse.io");
    socketRef.current = socket;

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, { text: event.data, from: 'server' }]);
    };

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    socketRef.current.send(input);
    setMessages((prev) => [...prev, { text: input, from: 'user' }]);
    setInput('');
  };

  return (
    <>
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed bottom-6 right-6 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-full shadow-lg z-50 cursor-pointer"
        >
          Chat
        </button>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              💬 Live Chat
            </h2>
            <button
              onClick={() => setVisible(false)}
              className="text-red-400 hover:text-red-600 text-xl cursor-pointer"
            >
              ❌
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.from === 'user'
                    ? 'bg-blue-500 text-white self-end ml-auto'
                    : 'bg-gray-200 text-black self-start mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded bg-gray-700 text-white"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
