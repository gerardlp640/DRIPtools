import React from 'react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight mb-4 animate-fade-in">
              Find DRIP-eligible Canadian stocks and ETFs that match your budget
            </h1>
            <p className="text-lg text-text-secondary mb-8 animate-slide-in">
              DRIP Tools helps you discover, research, and track dividend reinvestment opportunities tailored to your investment goals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-in" style={{animationDelay: '0.1s'}}>
              <Link to="/learn/what-is-drip">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Learn About DRIP
                </Button>
              </Link>
              <a 
                href="https://www.questrade.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ExternalLink className="h-5 w-5" />}
                >
                  Open Questrade Account
                </Button>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-4">DRIP Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Automatically reinvest dividends without commission fees</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Harness the power of compound growth over time</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Some companies offer discounts of 1-5% on DRIP shares</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;