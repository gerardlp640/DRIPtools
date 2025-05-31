import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import Button from '../components/ui/Button';

interface SearchResult {
  name: string;
  symbol: string;
  sector: string;
  dividendYield: number;
  dividendFrequency: string;
  sharesRequired: number;
  recommendedShares: number;
  price: number;
}

const mockResults: SearchResult[] = [
  {
    name: "Johnson & Johnson",
    symbol: "JNJ",
    sector: "Healthcare",
    dividendYield: 2.8,
    dividendFrequency: "Quarterly",
    sharesRequired: 125,
    recommendedShares: 138,
    price: 152.50
  },
  {
    name: "Toronto-Dominion Bank",
    symbol: "TD.TO",
    sector: "Finance",
    dividendYield: 4.4,
    dividendFrequency: "Quarterly",
    sharesRequired: 25,
    recommendedShares: 28,
    price: 82.45
  },
  {
    name: "VANGUARD FTSE CANADIAN HIGH DIV YIELD INDEX ETF",
    symbol: "VDY.TO",
    sector: "ETF",
    dividendYield: 4.9,
    dividendFrequency: "Quarterly",
    sharesRequired: 60,
    recommendedShares: 66,
    price: 41.20
  }
];

const SearchResults: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>
        
        <div className="space-y-4">
          {mockResults.map((result) => (
            <div
              key={result.symbol}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => navigate(`/stock/${result.symbol}`)}
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{result.symbol}</h3>
                    <p className="text-text-secondary">{result.name}</p>
                  </div>
                  <span className="mt-2 sm:mt-0 inline-flex bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm">
                    {result.sector}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex justify-between sm:block border-b sm:border-b-0 pb-2 sm:pb-0">
                    <span className="text-text-secondary">Current Price</span>
                    <span className="font-medium">${result.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between sm:block border-b sm:border-b-0 pb-2 sm:pb-0">
                    <span className="text-text-secondary">Dividend Yield</span>
                    <span className="font-medium">{result.dividendYield}%</span>
                  </div>
                  
                  <div className="flex justify-between sm:block border-b sm:border-b-0 pb-2 sm:pb-0">
                    <span className="text-text-secondary">Frequency</span>
                    <span className="font-medium">{result.dividendFrequency}</span>
                  </div>
                  
                  <div className="flex justify-between sm:block">
                    <span className="text-text-secondary">Required Shares</span>
                    <span className="font-medium">{result.sharesRequired}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="text-text-secondary">Recommended Investment</p>
                    <p className="font-medium">{result.recommendedShares} shares (${(result.recommendedShares * result.price).toFixed(2)})</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-4 sm:mt-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/stock/${result.symbol}`);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;