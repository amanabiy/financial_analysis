// context/CompanyContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Company {
  Ticker: string;
  Name: string;
  Sector: string;
  Industry: string;
  Country: string;
//   volume: number;
//   stockPrice: number;
//   lastWeekPrice: number;
//   marketCap: string;
//   peRatio: number;
  logoUrl: string;
}

interface CompanyContextType {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  return (
    <CompanyContext.Provider value={{ companies, setCompanies }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};
