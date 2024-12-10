import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCompanies } from '../context/CompanyContext';

const CompanyList: React.FC = () => {
  const { companies, setCompanies } = useCompanies();

  const dummyCompanyData = [
    {
      Ticker: 'AAPL',
      Name: 'Apple Inc.',
      volume: 100000000,
      stockPrice: 145.30,
      lastWeekPrice: 140.50,
      marketCap: '2.42T',
      peRatio: 27.3,
      logoUrl: 'https://logo.clearbit.com/apple.com',
    },
    {
      Ticker: 'GOOG',
      Name: 'Alphabet Inc. (Google)',
      volume: 15000000,
      stockPrice: 2735.50,
      lastWeekPrice: 2650.10,
      marketCap: '1.81T',
      peRatio: 22.8,
      logoUrl: 'https://logo.clearbit.com/google.com',
    },
    {
      Ticker: 'MSFT',
      Name: 'Microsoft Corp.',
      volume: 20000000,
      stockPrice: 299.15,
      lastWeekPrice: 295.70,
      marketCap: '2.25T',
      peRatio: 35.6,
      logoUrl: 'https://logo.clearbit.com/microsoft.com',
    },
    {
      Ticker: 'AMZN',
      Name: 'Amazon.com Inc.',
      volume: 25000000,
      stockPrice: 3442.15,
      lastWeekPrice: 3385.50,
      marketCap: '1.75T',
      peRatio: 58.9,
      logoUrl: 'https://logo.clearbit.com/amazon.com',
    },
  ];

  useEffect(() => {
    // Set companies data globally
    setCompanies(dummyCompanyData);
  }, [setCompanies]);

  const calculatePercentageChange = (currentPrice: number, lastWeekPrice: number) => {
    return ((currentPrice - lastWeekPrice) / lastWeekPrice) * 100;
  };

  const placeholderLogo = 'https://via.placeholder.com/40'; // Placeholder image URL

  return (
    <div className="p-6 bg-black rounded-lg shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Companies Overview</h2>
      <div className="overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-rounded-md">
        <ul className="space-y-4">
          {companies.map((company, index) => {
            return (
              <li
                key={index}
                className="relative flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition group opacity-80 hover:opacity-100"
              >
                <Image
                  src={company.logoUrl || placeholderLogo} // Use placeholder if logoUrl is not available
                  alt={`${company.Name} logo`}
                  width={40}
                  height={40}
                  className="mr-4 rounded-full border border-gray-600"
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{company.Name}</span>
                    <span className="text-sm text-gray-400">{company.Ticker}</span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 bg-black bg-opacity-80 p-4 rounded-lg">
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm text-gray-200">Sector: {company.Sector}</span>
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
