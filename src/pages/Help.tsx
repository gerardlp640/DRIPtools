import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, BookOpen, DollarSign, RefreshCw, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface FAQItem {
  question: string;
  answer: string;
}

const Help: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How do I determine if a stock is DRIP eligible?",
      answer: "A stock's DRIP eligibility is shown in its details page. Generally, you need to own a minimum number of shares to participate in a company's DRIP program. DRIP Tools displays this minimum requirement and calculates if your planned investment meets the threshold."
    },
    {
      question: "How do dividend payout cycles work?",
      answer: "Companies typically pay dividends on a quarterly basis, though some pay monthly or annually. The frequency is clearly displayed on each stock's detail page, along with the next expected payment date and amount. This helps you plan your DRIP investments effectively."
    },
    {
      question: "How does the token system work?",
      answer: "Tokens are used for advanced features like real-time data updates and advanced search filters. Each token represents one use of a premium feature. You can purchase tokens in bundles, and they never expire. Basic features like viewing stock information remain free."
    },
    {
      question: "How do I use the search filters effectively?",
      answer: "Our search filters help you find stocks matching your criteria. You can filter by price range, dividend yield, sector, and DRIP requirements. Premium filters (requiring tokens) include volatility metrics and historical dividend growth rates."
    },
    {
      question: "How often is the stock data updated?",
      answer: "Basic stock data is updated daily during market hours. Premium users can use tokens to refresh data on-demand for specific stocks. Dividend information is updated as soon as companies make new announcements."
    }
  ];

  return (
    <div className="min-h-screen bg-background-light pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Help & Resources</h1>

        {/* What is DRIP? Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What is DRIP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-4">
                A Dividend Reinvestment Plan (DRIP) automatically reinvests your cash dividends 
                into additional shares of the same stock or ETF, often with benefits like:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-primary-dark mt-1 mr-2" />
                  <span>No commission fees on reinvested shares</span>
                </li>
                <li className="flex items-start">
                  <RefreshCw className="h-5 w-5 text-primary-dark mt-1 mr-2" />
                  <span>Automatic reinvestment of dividends</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-primary-dark mt-1 mr-2" />
                  <span>Potential discounts on share purchases (1-5%)</span>
                </li>
              </ul>
            </div>
            <Card className="bg-primary-light border-none p-6">
              <h3 className="text-xl font-bold mb-4">How DRIP Works</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center mr-3">
                    1
                  </div>
                  <p>Purchase qualifying number of shares</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center mr-3">
                    2
                  </div>
                  <p>Receive dividend payment</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center mr-3">
                    3
                  </div>
                  <p>Automatically reinvest in more shares</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center mr-3">
                    4
                  </div>
                  <p>Compound your returns over time</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="text-center mb-4">
                <div className="bg-primary-light rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary-dark" />
                </div>
                <h3 className="text-xl font-bold">Search</h3>
              </div>
              <p className="text-text-secondary">
                Use our search tools to find stocks and ETFs that match your investment criteria
                and DRIP requirements.
              </p>
            </Card>
            <Card>
              <div className="text-center mb-4">
                <div className="bg-primary-light rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary-dark" />
                </div>
                <h3 className="text-xl font-bold">Research</h3>
              </div>
              <p className="text-text-secondary">
                Review detailed information about each investment, including dividend history,
                DRIP requirements, and fees.
              </p>
            </Card>
            <Card>
              <div className="text-center mb-4">
                <div className="bg-primary-light rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <RefreshCw className="h-8 w-8 text-primary-dark" />
                </div>
                <h3 className="text-xl font-bold">Track</h3>
              </div>
              <p className="text-text-secondary">
                Add investments to your watchlist to monitor performance and stay updated on
                dividend payments.
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{item.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-text-secondary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-text-secondary" />
                  )}
                </div>
                {expandedFaq === index && (
                  <div className="mt-4 pt-4 border-t text-text-secondary">
                    {item.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="bg-primary-light border-none">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-text-secondary mb-6">
                Our support team is here to help you with any questions about DRIP Tools.
              </p>
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Mail className="h-5 w-5" />}
                onClick={() => window.location.href = 'mailto:support@driptools.ca'}
              >
                Contact Support
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Help;