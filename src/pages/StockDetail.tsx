import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DollarSign, TrendingUp, Calendar, Info, RefreshCw, Star, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const StockDetail: React.FC = () => {
  const { symbol } = useParams();
  const [budget, setBudget] = useState<string>('');

  // Mock data - would be fetched from API in production
  const stockData = {
    symbol: 'TD.TO',
    name: 'Toronto-Dominion Bank',
    price: 82.45,
    lastUpdated: '2024-02-20T15:30:00Z',
    sector: 'Finance',
    description: 'Toronto-Dominion Bank is a Canadian multinational banking and financial services corporation headquartered in Toronto, Ontario.',
    marketCap: '150.2B',
    exchange: 'TSX',
    dividend: {
      yield: 4.4,
      amount: 0.96,
      frequency: 'Quarterly',
      nextPayment: '2024-04-30',
      requiredShares: 25,
    },
  };

  const calculateShares = (amount: number) => {
    const shares = Math.floor(amount / stockData.price);
    const meetsDRIP = shares >= stockData.dividend.requiredShares;
    const shortfall = meetsDRIP ? 0 : 
      (stockData.dividend.requiredShares - shares) * stockData.price;
    
    return { shares, meetsDRIP, shortfall };
  };

  const calculation = budget ? calculateShares(parseFloat(budget)) : null;

  return (
    <div className="min-h-screen bg-background-light pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{stockData.symbol}</h1>
            <p className="text-xl text-text-secondary">{stockData.name}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Button
              variant="outline"
              leftIcon={<Star className="h-5 w-5" />}
            >
              Add to Watchlist
            </Button>
            <Button
              variant="primary"
              leftIcon={<ExternalLink className="h-5 w-5" />}
              onClick={() => window.open('https://www.questrade.com', '_blank')}
            >
              View on Questrade
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Key Information */}
          <Card className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">${stockData.price}</h2>
                  <p className="text-sm text-text-secondary">
                    Last updated: {new Date(stockData.lastUpdated).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<RefreshCw className="h-4 w-4" />}
                >
                  Refresh (1 Token)
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-light p-2 rounded-full">
                    <Info className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-text-secondary">Sector</p>
                    <p className="font-medium">{stockData.sector}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-light p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-text-secondary">Market Cap</p>
                    <p className="font-medium">${stockData.marketCap}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-text-secondary">{stockData.description}</p>
              </div>
            </div>
          </Card>

          {/* DRIP Details */}
          <Card>
            <h3 className="text-lg font-bold mb-4">DRIP Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Dividend Yield</span>
                <span className="font-medium">{stockData.dividend.yield}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Dividend Amount</span>
                <span className="font-medium">${stockData.dividend.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Frequency</span>
                <span className="font-medium">{stockData.dividend.frequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Next Payment</span>
                <span className="font-medium">
                  {new Date(stockData.dividend.nextPayment).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Required Shares</span>
                <span className="font-medium">{stockData.dividend.requiredShares}</span>
              </div>
              <div className="pt-4 border-t">
                <span className="font-medium">Minimum Investment</span>
                <p className="text-xl font-bold text-primary-dark">
                  ${(stockData.price * stockData.dividend.requiredShares).toFixed(2)}
                </p>
              </div>
            </div>
          </Card>

          {/* DRIP Calculator */}
          <Card className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-4">DRIP Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Your Investment Budget
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">$</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter amount"
                    className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {calculation && (
                <div className="space-y-4">
                  <div>
                    <p className="text-text-secondary">Shares You Can Buy</p>
                    <p className="text-2xl font-bold">{calculation.shares}</p>
                  </div>
                  
                  {calculation.meetsDRIP ? (
                    <div className="bg-green-50 text-green-800 p-4 rounded-md">
                      ✓ Meets DRIP requirement
                    </div>
                  ) : (
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
                      <p>Additional investment needed for DRIP:</p>
                      <p className="font-bold">${calculation.shortfall.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;