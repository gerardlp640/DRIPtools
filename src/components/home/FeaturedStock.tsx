import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { FeaturedStock as FeaturedStockType } from '../../types';

interface FeaturedStockProps {
  featuredStock: FeaturedStockType;
}

// Temporary mock data for development
const mockFeaturedStock: FeaturedStockType = {
  stock: {
    id: '1',
    symbol: 'ENB',
    name: 'Enbridge Inc.',
    sector: 'Energy',
    industry: 'Oil & Gas Midstream',
    price: 49.32,
    dividend: {
      yield: 7.15,
      frequency: 'quarterly',
      amount: 0.885,
      growthRate: 3.2
    },
    drip: {
      discount: 2,
      fractionalShares: true,
      minimumAmount: null
    },
    riskMetrics: {
      beta: 0.92,
      volatility: 14.6
    }
  },
  analysis: 'Enbridge offers an attractive dividend yield with 27 consecutive years of dividend increases. Their DRIP program includes a 2% discount on shares, making it an excellent choice for income-focused investors.',
  recommendation: 'buy',
  targetPrice: 54.75,
  analystName: 'Sarah Chen'
};

const FeaturedStock: React.FC<FeaturedStockProps> = ({ featuredStock = mockFeaturedStock }) => {
  const { stock, analysis, recommendation, targetPrice, analystName } = featuredStock;
  
  // Helper function to determine recommendation color
  const getRecommendationColor = (rec: 'buy' | 'hold' | 'sell') => {
    switch (rec) {
      case 'buy':
        return 'text-success';
      case 'hold':
        return 'text-warning';
      case 'sell':
        return 'text-error';
      default:
        return 'text-text-primary';
    }
  };
  
  return (
    <div className="section bg-background-light py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-4">
          <Star className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-2xl font-bold">Stock of the Week</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="md:w-2/3 md:pr-6">
              <div className="flex items-center mb-4">
                <div className="bg-primary-light rounded-lg p-3 mr-4">
                  <img
                    src={`https://api.dicebear.com/7.x/shapes/svg?seed=${stock.symbol}`}
                    alt={stock.name}
                    className="h-12 w-12"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{stock.symbol}</h3>
                  <p className="text-text-secondary">{stock.name}</p>
                </div>
              </div>
              
              <p className="mb-4">{analysis}</p>
              
              <div className="mb-4">
                <p className="text-sm text-text-secondary">
                  Analyst: {analystName}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-dark transition-colors">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
                <button className="text-primary hover:text-primary-dark px-4 py-2 transition-colors">
                  Add to Watchlist
                </button>
              </div>
            </div>
            
            <div className="md:w-1/3 mt-6 md:mt-0 bg-background-subtle p-4 rounded-lg">
              <h4 className="font-medium mb-4">Key Metrics</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Current Price</span>
                  <span className="font-medium">${stock.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Dividend Yield</span>
                  <span className="font-medium text-primary-dark">{stock.dividend.yield.toFixed(2)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">DRIP Discount</span>
                  <span className="font-medium text-primary-dark">{stock.drip.discount}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Target Price</span>
                  <span className="font-medium">${targetPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Recommendation</span>
                  <span className={`font-medium uppercase ${getRecommendationColor(recommendation)}`}>
                    {recommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStock;