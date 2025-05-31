import React, { useState } from 'react';
import { Calendar, CreditCard, Search, RefreshCw, Download } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface DateRange {
  start: string;
  end: string;
}

interface Transaction {
  id: string;
  date: string;
  type: 'purchase' | 'usage';
  tokens: number;
  amount?: number;
  status?: 'completed' | 'pending' | 'failed';
  receiptUrl?: string;
  feature?: string;
  stockSymbol?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-20T15:30:00Z',
    type: 'purchase',
    tokens: 5,
    amount: 2.99,
    status: 'completed',
    receiptUrl: 'https://stripe.com/receipt/1',
  },
  {
    id: '2',
    date: '2024-02-19T10:15:00Z',
    type: 'usage',
    tokens: -1,
    feature: 'Advanced Search',
  },
  {
    id: '3',
    date: '2024-02-19T09:45:00Z',
    type: 'usage',
    tokens: -1,
    feature: 'Data Refresh',
    stockSymbol: 'TD.TO',
  },
];

const TokenHistory: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: '',
    end: '',
  });
  const [transactionType, setTransactionType] = useState<'all' | 'purchase' | 'usage'>('all');

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (transactionType !== 'all' && transaction.type !== transactionType) return false;
    // Add date filtering logic here when implemented
    return true;
  });

  return (
    <div className="min-h-screen bg-background-light pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Token History</h1>
            <p className="text-text-secondary mt-2">Track your token purchases and usage</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Card className="bg-primary-light border-none">
              <div className="text-center">
                <p className="text-text-secondary">Current Balance</p>
                <p className="text-3xl font-bold text-primary-dark">10 Tokens</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="p-2 border rounded-md"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="p-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Transaction Type
              </label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value as typeof transactionType)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Transactions</option>
                <option value="purchase">Purchases</option>
                <option value="usage">Usage</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                leftIcon={<Download className="h-5 w-5" />}
                className="w-full"
              >
                Export History
              </Button>
            </div>
          </div>
        </Card>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${
                    transaction.type === 'purchase' 
                      ? 'bg-primary-light text-primary-dark' 
                      : 'bg-background-subtle text-text-secondary'
                  }`}>
                    {transaction.type === 'purchase' ? (
                      <CreditCard className="h-6 w-6" />
                    ) : transaction.feature === 'Advanced Search' ? (
                      <Search className="h-6 w-6" />
                    ) : (
                      <RefreshCw className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'purchase' ? 'Token Purchase' : transaction.feature}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {new Date(transaction.date).toLocaleString()}
                    </p>
                    {transaction.stockSymbol && (
                      <p className="text-sm text-primary-dark mt-1">
                        Stock: {transaction.stockSymbol}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center md:space-x-6">
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'purchase' ? 'text-success' : 'text-text-primary'
                    }`}>
                      {transaction.type === 'purchase' ? '+' : ''}{transaction.tokens} Tokens
                    </p>
                    {transaction.amount && (
                      <p className="text-sm text-text-secondary">
                        ${transaction.amount.toFixed(2)}
                      </p>
                    )}
                  </div>
                  {transaction.receiptUrl && (
                    <Button
                      variant="text"
                      size="sm"
                      onClick={() => window.open(transaction.receiptUrl, '_blank')}
                    >
                      View Receipt
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Buy More Tokens */}
        <div className="mt-8 text-center">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<CreditCard className="h-5 w-5" />}
            onClick={() => {}}
          >
            Buy More Tokens
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenHistory;