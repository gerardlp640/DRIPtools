import React from 'react';
import { X, CreditCard, HelpCircle, Clock } from 'lucide-react';
import Button from '../ui/Button';

interface TokenPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTokens: number;
}

const TokenPurchaseModal: React.FC<TokenPurchaseModalProps> = ({
  isOpen,
  onClose,
  currentTokens,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Purchase Tokens</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Current balance */}
            <div className="bg-background-subtle rounded-lg p-4 mb-6">
              <p className="text-text-secondary">Current Balance</p>
              <p className="text-2xl font-bold text-primary-dark">{currentTokens} Tokens</p>
            </div>

            {/* Package selection */}
            <div className="mb-6">
              <div className="border rounded-lg p-4 relative">
                <div className="absolute -top-3 right-4 bg-primary text-white text-sm px-2 py-1 rounded">
                  Best Value
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold">5 Tokens</h4>
                    <p className="text-text-secondary">Access advanced features</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$2.99</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Token usage info */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">What can you do with tokens?</h4>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-primary" />
                  Use advanced search filters
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  Refresh stock data on demand
                </li>
              </ul>
            </div>

            {/* Payment form */}
            <div className="mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-bold mb-4">Payment Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Card Number
                    </label>
                    <div className="stripe-card-element p-3 border rounded-md bg-white">
                      [Stripe Card Element]
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">Frequently Asked Questions</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                    When do tokens expire?
                  </p>
                  <p className="text-text-secondary ml-6">
                    Tokens never expire and can be used at any time.
                  </p>
                </div>
                <div>
                  <p className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                    Can I get a refund?
                  </p>
                  <p className="text-text-secondary ml-6">
                    Tokens are non-refundable once purchased.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              variant="primary"
              className="w-full sm:w-auto sm:ml-3"
              leftIcon={<CreditCard className="h-5 w-5" />}
            >
              Purchase Tokens
            </Button>
            <Button
              variant="text"
              className="w-full mt-3 sm:w-auto sm:mt-0"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPurchaseModal;