'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { RenderMessage } from './Markdown';
import { useCompanies, Company } from '../context/CompanyContext';

interface Response {
  markdown: string;
  tickers: string[]; // Assuming tickers is an array of company tickers
}

const InputResponse: React.FC = () => {
  const [response, setResponse] = useState<Response | null>(null);
  const { companies, setCompanies } = useCompanies();
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // New loading state

  const sendRequest = async () => {
    if (input.trim()) {
      setLoading(true); // Start loading
      try {
        // Making the fetch request
        const query = encodeURIComponent(input);
        const res = await fetch(`http://127.0.0.1:5000/get_products?query=${query}`, {
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        console.log("response data", data);

        // Assuming the response contains markdown and tickers
        const serverResponse: Response = { markdown: data.response, tickers: data.tickers };
        setResponse(serverResponse);

        // Set companies using the tickers from the response
        const seenTickers = new Set<string>();
        const uniqueTickers: Company[] = [];

        data.tickers.forEach((ticker: any) => {
          if (!seenTickers.has(ticker['Ticker'])) {
            seenTickers.add(ticker['Ticker']);  // Add to the Set
            uniqueTickers.push(ticker);  // Add to the unique list
          }
        });

        setCompanies(uniqueTickers)

      } catch (error) {
        console.error('Error:', error);
        // Handle error here (e.g., set an error message)
      } finally {
        setLoading(false); // Stop loading after request
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
            disabled={!input.trim() || loading} // Disable button while loading
            className={`absolute right-0 top-0 bottom-0 px-6 py-4 bg-blue-600 text-white rounded-r-lg shadow-md transition duration-300 ease-in-out ${(!input.trim() || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            {loading ? 'Loading...' : 'Send'} {/* Show loading text on button */}
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
