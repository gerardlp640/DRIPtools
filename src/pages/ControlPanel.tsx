import React, { useState } from 'react';
import { Users, Database, Settings, Activity, Search, Filter, MoreVertical, ChevronDown, ArrowUpDown, RefreshCw, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AssetModal from '../components/admin/AssetModal';

interface User {
  id: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
  tokenBalance: number;
  status: 'active' | 'blocked';
}

interface Transaction {
  id: string;
  userId: string;
  userEmail: string;
  date: string;
  type: 'purchase' | 'usage';
  tokens: number;
  amount?: number;
  status: 'completed' | 'pending' | 'failed';
  stripeId?: string;
  feature?: string;
  stockSymbol?: string;
}

interface Asset {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  dividendYield: number;
  dripThreshold: number;
  lastUpdated: string;
  status: 'active' | 'inactive';
  type: 'stock' | 'etf';
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    registrationDate: '2024-01-15T10:00:00Z',
    lastLogin: '2024-02-20T15:30:00Z',
    tokenBalance: 25,
    status: 'active',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    registrationDate: '2024-01-20T14:30:00Z',
    lastLogin: '2024-02-19T09:15:00Z',
    tokenBalance: 10,
    status: 'active',
  },
  {
    id: '3',
    email: 'blocked.user@example.com',
    registrationDate: '2024-01-10T08:45:00Z',
    lastLogin: '2024-01-15T16:20:00Z',
    tokenBalance: 0,
    status: 'blocked',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'txn1',
    userId: '1',
    userEmail: 'john.doe@example.com',
    date: '2024-02-20T15:30:00Z',
    type: 'purchase',
    tokens: 5,
    amount: 2.99,
    status: 'completed',
    stripeId: 'ch_123456',
  },
  {
    id: 'txn2',
    userId: '1',
    userEmail: 'john.doe@example.com',
    date: '2024-02-19T10:15:00Z',
    type: 'usage',
    tokens: -1,
    status: 'completed',
    feature: 'Advanced Search',
  },
  {
    id: 'txn3',
    userId: '2',
    userEmail: 'jane.smith@example.com',
    date: '2024-02-18T09:45:00Z',
    type: 'purchase',
    tokens: 10,
    amount: 5.99,
    status: 'failed',
    stripeId: 'ch_123457',
  },
];

const mockAssets: Asset[] = [
  {
    symbol: 'TD.TO',
    name: 'Toronto-Dominion Bank',
    sector: 'Finance',
    price: 82.45,
    dividendYield: 4.4,
    dripThreshold: 25,
    lastUpdated: '2024-02-20T15:30:00Z',
    status: 'active',
    type: 'stock',
  },
  {
    symbol: 'ENB.TO',
    name: 'Enbridge Inc.',
    sector: 'Energy',
    price: 47.32,
    dividendYield: 7.6,
    dripThreshold: 50,
    lastUpdated: '2024-02-20T15:30:00Z',
    status: 'active',
    type: 'stock',
  },
  {
    symbol: 'VDY.TO',
    name: 'Vanguard FTSE Canadian High Dividend Yield Index ETF',
    sector: 'ETF',
    price: 41.20,
    dividendYield: 4.9,
    dripThreshold: 60,
    lastUpdated: '2024-02-20T15:30:00Z',
    status: 'inactive',
    type: 'etf',
  },
];

const sectors = [
  'All',
  'Finance',
  'Energy',
  'Technology',
  'Healthcare',
  'Consumer',
  'Industrial',
  'Materials',
  'Utilities',
  'Real Estate',
  'ETF',
];

const ControlPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('assets');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [transactionType, setTransactionType] = useState<'all' | 'purchase' | 'usage'>('all');
  const [transactionStatus, setTransactionStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [assetSector, setAssetSector] = useState('All');
  const [assetStatus, setAssetStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [yieldRange, setYieldRange] = useState({ min: 0, max: 10 });
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(undefined);

  const handleSaveAsset = async (assetData: any) => {
    console.log('Saving asset:', assetData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowAddAssetModal(false);
    setSelectedAsset(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400">Manage users, transactions, and assets</p>
          </div>
          <Button
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-800"
            onClick={() => window.location.href = '/'}
          >
            Return to User View
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg">
          <button
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedTab === 'users'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setSelectedTab('users')}
          >
            <Users className="h-5 w-5 mr-2" />
            Users
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedTab === 'transactions'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setSelectedTab('transactions')}
          >
            <Activity className="h-5 w-5 mr-2" />
            Transactions
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedTab === 'assets'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setSelectedTab('assets')}
          >
            <Database className="h-5 w-5 mr-2" />
            Assets
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-lg p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={`Search ${selectedTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            {selectedTab === 'assets' && (
              <>
                <select
                  value={assetSector}
                  onChange={(e) => setAssetSector(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
                <select
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value as typeof assetStatus)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button
                  variant="primary"
                  leftIcon={<Plus className="h-5 w-5" />}
                  onClick={() => setShowAddAssetModal(true)}
                >
                  Add Asset
                </Button>
              </>
            )}
          </div>

          {/* Assets Table */}
          {selectedTab === 'assets' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="pb-3">Symbol</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Sector</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Yield</th>
                    <th className="pb-3">DRIP Threshold</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAssets.map((asset) => (
                    <tr key={asset.symbol} className="border-b border-gray-700">
                      <td className="py-4 text-white">{asset.symbol}</td>
                      <td className="py-4 text-white">{asset.name}</td>
                      <td className="py-4 text-white">{asset.sector}</td>
                      <td className="py-4 text-white">${asset.price.toFixed(2)}</td>
                      <td className="py-4 text-white">{asset.dividendYield}%</td>
                      <td className="py-4 text-white">{asset.dripThreshold}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          asset.status === 'active'
                            ? 'bg-green-900 text-green-300'
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="text"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => {
                              setSelectedAsset(asset);
                              setShowAddAssetModal(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="text"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            leftIcon={<RefreshCw className="h-4 w-4" />}
                          >
                            Refresh
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AssetModal
        isOpen={showAddAssetModal}
        onClose={() => {
          setShowAddAssetModal(false);
          setSelectedAsset(undefined);
        }}
        asset={selectedAsset}
        onSave={handleSaveAsset}
      />
    </div>
  );
};

export default ControlPanel;