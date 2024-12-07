import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Company {
  ticker: string;
  name: string;
  volume: number;
  stockPrice: number;
//   comparisonToLastWeek: string;
  logoUrl: string;
  marketCap: string;
  peRatio: number;
  lastWeekPrice: number;
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  // Dummy company data
  const dummyCompanyData = [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      volume: 100000000,
      stockPrice: 145.30,
      lastWeekPrice: 140.50,
      marketCap: '2.42T',
      peRatio: 27.3,
      logoUrl: 'https://logo.clearbit.com/apple.com', // Apple logo URL
    },
    {
        ticker: 'GOOG',
        name: 'Alphabet Inc. (Google)',
        volume: 15000000,
        stockPrice: 2735.50,
        lastWeekPrice: 2650.10,
        marketCap: '1.81T',
        peRatio: 22.8,
        logoUrl: 'https://logo.clearbit.com/google.com', // Google logo URL
      },
      {
        ticker: 'MSFT',
        name: 'Microsoft Corp.',
        volume: 20000000,
        stockPrice: 299.15,
        lastWeekPrice: 295.70,
        marketCap: '2.25T',
        peRatio: 35.6,
        logoUrl: 'https://logo.clearbit.com/microsoft.com', // Microsoft logo URL
      },
      {
        ticker: 'AMZN',
        name: 'Amazon.com Inc.',
        volume: 25000000,
        stockPrice: 3442.15,
        lastWeekPrice: 3385.50,
        marketCap: '1.75T',
        peRatio: 58.9,
        logoUrl: 'https://logo.clearbit.com/amazon.com', // Amazon logo URL
      },
    {
      ticker: 'GOOG',
      name: 'Alphabet Inc. (Google)',
      volume: 15000000,
      stockPrice: 2735.50,
      lastWeekPrice: 2650.10,
      marketCap: '1.81T',
      peRatio: 22.8,
      logoUrl: 'https://logo.clearbit.com/google.com', // Google logo URL
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corp.',
      volume: 20000000,
      stockPrice: 299.15,
      lastWeekPrice: 295.70,
      marketCap: '2.25T',
      peRatio: 35.6,
      logoUrl: 'https://logo.clearbit.com/microsoft.com', // Microsoft logo URL
    },
    {
      ticker: 'AMZN',
      name: 'Amazon.com Inc.',
      volume: 25000000,
      stockPrice: 3442.15,
      lastWeekPrice: 3385.50,
      marketCap: '1.75T',
      peRatio: 58.9,
      logoUrl: 'https://logo.clearbit.com/amazon.com', // Amazon logo URL
    },
  ];

  useEffect(() => {
    // Simulate fetching data
    setCompanies(dummyCompanyData);
  }, []);

  // Function to calculate percentage change
  const calculatePercentageChange = (currentPrice: number, lastWeekPrice: number) => {
    return ((currentPrice - lastWeekPrice) / lastWeekPrice) * 100;
  };


  return (
    <div className="p-6 bg-black rounded-lg shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Companies Overview</h2>
      <div className="overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-rounded-md"> {/* Scrollable container with screen height */}
        <ul className="space-y-4">
          {companies.map((company, index) => {
            const percentageChange = calculatePercentageChange(company.stockPrice, company.lastWeekPrice);
            return (
              <li
                key={index}
                className="relative flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition group opacity-80 hover:opacity-100"
              >
                {/* Company Logo */}
                <Image
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  width={40}
                  height={40}
                  className="mr-4 rounded-full border border-gray-600"
                />

                {/* Company Information */}
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{company.name}</span>
                    <span className="text-sm text-gray-400">{company.ticker}</span>
                  </div>

                  <span className="text-sm text-gray-400">Volume: {company.volume.toLocaleString()}</span>
                  <span className="text-sm text-gray-400">Stock Price: ${company.stockPrice.toFixed(2)}</span>

                  {/* Percentage Change Compared to Last Week */}
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`ml-2 font-semibold text-lg ${percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {percentageChange > 0 ? '↑' : '↓'} {percentageChange.toFixed(2)}%
                    </span>
                  </div>

                  {/* Hoverable Information */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 bg-black bg-opacity-80 p-4 rounded-lg">
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm text-gray-200">Market Cap: {company.marketCap}</span>
                      <span className="text-sm text-gray-200">P/E Ratio: {company.peRatio}</span>
                      {/* <span className="text-sm text-gray-200">Volume: {company.volume.toLocaleString()}</span> */}
                      <span className="text-sm text-gray-200">Stock Price: ${company.stockPrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-200">Last Week Price: ${company.lastWeekPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CompanyList;