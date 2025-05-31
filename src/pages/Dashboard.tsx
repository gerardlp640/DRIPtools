import React, { useState } from 'react';
import { Slider } from '../components/ui';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface FilterState {
  maxPrice: number;
  maxInvestment: number;
  sector: string;
  minYield: number;
  volatility: 'low' | 'medium' | 'high' | 'any';
}

const Dashboard: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Recommended DRIP Stocks</h1>
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary">Available Tokens:</span>
            <span className="font-medium">10</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
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

        {/* Table */}
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

export default Dashboard;