'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { RenderMessage } from './Markdown'

interface Response {
  markdown: string;
}

const InputResponse: React.FC = () => {
  const [response, setResponse] = useState<Response | null>(null);
  const [input, setInput] = useState<string>('');

  const sendRequest = async () => {
    if (input.trim()) {
      try {
        // Making the fetch request
        const query = encodeURIComponent(input);
        const res = await fetch(`http://127.0.0.1:5000/get_products?query=${query}`, {
          method: 'GET',
          // mode: 'no-cors',
        });
        console.log(res)
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log(res.ok)
        const data = await res.json();
        console.log("response data", data)
        // Assuming the response contains a markdown string
        const serverResponse: Response = { markdown: data.response };
        setResponse(serverResponse);
      } catch (error) {
        console.error('Error:', error);
        // Handle error here (e.g., set an error message)
      }
      setInput('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      sendRequest();
    }
  };

  return (
    <div className={`flex flex-col h-full w-full items-center bg-black text-white ${!response ? 'justify-center' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4">Find Your Next Investment</h2>
      <p className="text-sm mb-4 text-gray-400">
        Discover stocks with natural language queries, e.g.,
        <em>"What companies build data centers?"</em>.
        Search NYSE stocks by metrics like Market Cap, Volume, Sector, and more.
      </p>
      <div className="w-full mb-4">
        {/* Input and Button Together */}
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full py-3 pl-4 pr-16 bg-black text-white border border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your query..."
          />
          <button
            onClick={sendRequest}
            disabled={!input.trim()}
            className={`absolute right-0 top-0 bottom-0 px-6 py-4 bg-blue-600 text-white rounded-r-lg shadow-md transition duration-300 ease-in-out ${!input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            Send
          </button>
        </div>
      </div>
      <div className="w-full mt-4">
        {response && (
          <div className="p-6 border rounded-lg bg-gray-800 shadow-md">
            <RenderMessage>{response.markdown}</RenderMessage>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputResponse;
