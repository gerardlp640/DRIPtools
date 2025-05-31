import React from 'react';
import Button from '../ui/Button';
import { ExternalLink } from 'lucide-react';

const QuestradeCta: React.FC = () => {
  return (
    <div className="section bg-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to start investing in DRIPs?</h2>
            <p className="text-white/80 max-w-2xl">
              Open an investment account with Questrade to access commission-free ETF purchases 
              and start building your DRIP portfolio today. Get started with as little as $1,000.
            </p>
          </div>
          
          <div>
            <a 
              href="https://www.questrade.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-dark"
                rightIcon={<ExternalLink className="h-4 w-4" />}
              >
                Open a Questrade Account
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestradeCta;