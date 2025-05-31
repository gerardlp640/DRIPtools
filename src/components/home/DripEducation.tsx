import React from 'react';
import Button from '../ui/Button';
import { BookOpen, RefreshCw, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const DripEducation: React.FC = () => {
  return (
    <div className="section bg-background-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What is DRIP?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A Dividend Reinvestment Plan (DRIP) allows you to automatically reinvest your 
            dividend payments into additional shares of the same stock or ETF, often with advantages 
            like no commission fees and sometimes at a discount.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary-light rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <RefreshCw className="h-8 w-8 text-primary-dark" />
            </div>
            <h3 className="text-xl font-bold mb-2">Automatic Reinvestment</h3>
            <p className="text-text-secondary mb-4">
              DRIPs automatically reinvest your dividends to purchase additional shares, 
              eliminating the need to manually reinvest and helping you avoid commission fees.
            </p>
            <Link to="/learn/automatic-reinvestment" className="text-primary-dark font-medium hover:text-primary transition-colors">
              Learn more &rarr;
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary-light rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-primary-dark" />
            </div>
            <h3 className="text-xl font-bold mb-2">Compound Growth</h3>
            <p className="text-text-secondary mb-4">
              By reinvesting dividends, you harness the power of compounding, as your additional 
              shares generate more dividends, which are then reinvested to purchase more shares.
            </p>
            <Link to="/learn/compound-growth" className="text-primary-dark font-medium hover:text-primary transition-colors">
              Learn more &rarr;
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary-light rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-primary-dark" />
            </div>
            <h3 className="text-xl font-bold mb-2">Price Discounts</h3>
            <p className="text-text-secondary mb-4">
              Some companies offer a discount of 1-5% on shares purchased through their DRIP programs, 
              allowing you to acquire shares below the current market price.
            </p>
            <Link to="/learn/price-discounts" className="text-primary-dark font-medium hover:text-primary transition-colors">
              Learn more &rarr;
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button
            variant="secondary"
            size="lg"
            leftIcon={<BookOpen className="h-5 w-5" />}
            onClick={() => {}}
          >
            Explore Full DRIP Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DripEducation;