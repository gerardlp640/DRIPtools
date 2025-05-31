import React, { useState } from 'react';
import { Search as SearchIcon, DollarSign, Coins } from 'lucide-react';
import Button from '../components/ui/Button';
import { Slider } from '../components/ui';

interface FilterState {
  maxPrice: number;
  maxInvestment: number;
  sector: string;
  minYield: number;
  volatility: 'low' | 'medium' | 'high' | 'any';
}

// Mock data for the table
const stocks = [
  {
    symbol: 'TD.TO',
    name: 'Toronto-Dominion Bank',
    sector: 'Finance',
    price: 82.45,
    yield: 4.4,
    frequency: 'Quarterly',
    requiredShares: 25,
    recommendedShares: 28
  },
  {
    symbol: 'ENB.TO',
    name: 'Enbridge Inc.',
    sector: 'Energy',
    price: 47.32,
    yield: 7.6,
    frequency: 'Quarterly',
    requiredShares: 50,
    recommendedShares: 55
  },
  {
    symbol: 'RY.TO',
    name: 'Royal Bank of Canada',
    sector: 'Finance',
    price: 132.75,
    yield: 4.1,
    frequency: 'Quarterly',
    requiredShares: 20,
    recommendedShares: 22
  }
];

const Search: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 500,
    maxInvestment: 10000,
    sector: 'any',
    minYield: 0,
    volatility: 'any',
  });

  const sectors = [
    'Any',
    'Finance',
    'Energy',
    'Technology',
    'Healthcare',
    'Consumer',
    'Industrial',
    'Materials',
    'Utilities',
    'Real Estate',
  ];

  return (
    <div className="min-h-screen bg-background-light pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Search Stocks and ETFs</h1>
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary text-xl">Available Tokens:</span>
            <span className="text-3xl font-bold">10</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Smart search: Try 'high-yield energy stocks' or 'monthly dividend ETFs under $50'"
            className="w-full pl-12 pr-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <p className="text-text-secondary mb-8 text-sm">
          Our AI-powered search understands natural language and combines with the filters below to find matching stocks and ETFs. 
          While AI helps surface relevant investments, always conduct your own research before making investment decisions.
        </p>

        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Advanced Filters</h2>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Coins className="h-5 w-5" />
              <span>1 token required to use advanced search and filters</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Maximum Price
              </label>
              <Slider
                min={0}
                max={500}
                step={10}
                value={filters.maxPrice}
                onChange={(value) => setFilters({ ...filters, maxPrice: value })}
                prefix="$"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Maximum DRIP Investment
              </label>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={filters.maxInvestment}
                onChange={(value) => setFilters({ ...filters, maxInvestment: value })}
                prefix="$"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Sector
              </label>
              <select
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.sector}
                onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector.toLowerCase()}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Minimum Yield
              </label>
              <Slider
                min={0}
                max={10}
                step={0.5}
                value={filters.minYield}
                onChange={(value) => setFilters({ ...filters, minYield: value })}
                suffix="%"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Volatility Preference
              </label>
              <select
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.volatility}
                onChange={(e) => setFilters({ ...filters, volatility: e.target.value as FilterState['volatility'] })}
              >
                <option value="any">Any</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Required Shares</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-4 whitespace-nowrap font-medium">{stock.symbol}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{stock.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {stock.sector}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">${stock.price.toFixed(2)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-primary-dark">{stock.yield}%</td>
                  <td className="px-4 py-4 whitespace-nowrap">{stock.frequency}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">{stock.requiredShares}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-primary-dark">{stock.recommendedShares}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Search;