import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowUpDown } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  dividendYield: number;
  frequency: string;
  sharesRequired: number;
  recommendedShares: number;
  lastUpdated: string;
}

type SortField = 'name' | 'price' | 'yield' | 'shares';
type SortOrder = 'asc' | 'desc';

const mockWatchlist: WatchlistItem[] = [
  {
    symbol: 'TD.TO',
    name: 'Toronto-Dominion Bank',
    price: 82.45,
    change: 0.8,
    dividendYield: 4.4,
    frequency: 'Quarterly',
    sharesRequired: 25,
    recommendedShares: 28,
    lastUpdated: '2024-02-20T15:30:00Z'
  },
  {
    symbol: 'ENB.TO',
    name: 'Enbridge Inc.',
    price: 47.32,
    change: -0.3,
    dividendYield: 7.6,
    frequency: 'Quarterly',
    sharesRequired: 50,
    recommendedShares: 55,
    lastUpdated: '2024-02-20T15:30:00Z'
  },
  {
    symbol: 'VDY.TO',
    name: 'Vanguard FTSE Canadian High Dividend Yield Index ETF',
    price: 41.20,
    change: 0.5,
    dividendYield: 4.9,
    frequency: 'Monthly',
    sharesRequired: 60,
    recommendedShares: 66,
    lastUpdated: '2024-02-20T15:30:00Z'
  }
];

const Watchlist: React.FC = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    switch (sortField) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'price':
        return multiplier * (a.price - b.price);
      case 'yield':
        return multiplier * (a.dividendYield - b.dividendYield);
      case 'shares':
        return multiplier * (a.sharesRequired - b.sharesRequired);
      default:
        return 0;
    }
  });

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol));
  };

  return (
    <div className="min-h-screen bg-background-light pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Watchlist</h1>
        </div>

        {watchlist.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-text-secondary text-lg mb-4">
                Add stocks or ETFs to your watchlist to track them here
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/search')}
              >
                Search Stocks
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Sort Controls */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-text-secondary">Sort by:</span>
              {[
                { field: 'name', label: 'Name' },
                { field: 'price', label: 'Price' },
                { field: 'yield', label: 'Yield' },
                { field: 'shares', label: 'DRIP Shares' }
              ].map(({ field, label }) => (
                <button
                  key={field}
                  onClick={() => handleSort(field as SortField)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors font-bold ${
                    sortField === field
                      ? 'text-primary-dark'
                      : 'text-text-secondary hover:text-primary-dark'
                  }`}
                >
                  <span>{label}</span>
                  {sortField === field && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>

            {/* Watchlist Items */}
            {sortedWatchlist.map((item) => (
              <div
                key={item.symbol}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-bold mr-2">{item.symbol}</h3>
                        <span className={`text-sm ${
                          item.change >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {item.change >= 0 ? '+' : ''}{item.change}%
                        </span>
                      </div>
                      <p className="text-text-secondary">{item.name}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <Button
                        variant="text"
                        size="sm"
                        className="text-error hover:bg-error/10"
                        leftIcon={<Trash2 className="h-4 w-4" />}
                        onClick={() => removeFromWatchlist(item.symbol)}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/stock/${item.symbol}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <span className="text-text-secondary">Current Price</span>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Dividend Yield</span>
                      <p className="font-medium">{item.dividendYield}%</p>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Frequency</span>
                      <p className="font-medium">{item.frequency}</p>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Required Shares</span>
                      <p className="font-medium">{item.sharesRequired}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center text-sm text-text-secondary">
                      <span>Last updated: {new Date(item.lastUpdated).toLocaleString()}</span>
                      <span>Recommended: {item.recommendedShares} shares</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;