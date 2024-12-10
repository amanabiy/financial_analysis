'use client';

import React from 'react';
import Head from 'next/head';
import CompanyList from './components/CompanyList';
import InputResponse from './components/InputResponse';
import { CompanyProvider } from './context/CompanyContext';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 h-screen text-white">
      <Head>
        <title>Query Response App with Company Info</title>
      </Head>
      <CompanyProvider>
        <div className="flex flex-col sm:flex-row h-full rounded-lg shadow-sm">
          {/* InputResponse Section with Adjusted Spacing */}
          <div className="w-full sm:w-[80%] flex flex-col p-6 rounded-lg shadow-md">
            <InputResponse />
          </div>

          {/* CompanyList Section */}
          <div className="w-full sm:w-[33.33%] bg-black rounded-b-lg sm:rounded-r-lg shadow-inner">
            <CompanyList />
          </div>
        </div>
      </CompanyProvider>
    </div>
  );
};

export default Home;
