import React, { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset?: {
    symbol: string;
    name: string;
    sector: string;
    price: number;
    dividendYield: number;
    dripThreshold: number;
    status: 'active' | 'inactive';
    type: 'stock' | 'etf';
  };
  onSave: (assetData: any) => void;
}

const sectors = [
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

const AssetModal: React.FC<AssetModalProps> = ({
  isOpen,
  onClose,
  asset,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    sector: 'Finance',
    price: 0,
    dividendYield: 0,
    dripThreshold: 0,
    status: 'active',
    type: 'stock',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (asset) {
      setFormData(asset);
    } else {
      setFormData({
        symbol: '',
        name: '',
        sector: 'Finance',
        price: 0,
        dividendYield: 0,
        dripThreshold: 0,
        status: 'active',
        type: 'stock',
      });
    }
  }, [asset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate symbol format for TSX stocks
      if (formData.type === 'stock' && !formData.symbol.endsWith('.TO')) {
        throw new Error('TSX stock symbols must end with .TO');
      }

      // Basic validation
      if (!formData.symbol || !formData.name) {
        throw new Error('Symbol and name are required');
      }

      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchData = async () => {
    setError(null);
    setLoading(true);

    try {
      // Simulate API fetch
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data fetch
      setFormData(prev => ({
        ...prev,
        name: 'Toronto-Dominion Bank',
        price: 82.45,
        dividendYield: 4.4,
        dripThreshold: 25,
      }));
    } catch (err) {
      setError('Failed to fetch asset data');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {asset ? 'Edit Asset' : 'Add New Asset'}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-900 text-red-300 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Symbol
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={formData.symbol}
                        onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="TD.TO"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-l-none border-gray-700 text-gray-300 hover:bg-gray-700"
                        onClick={handleFetchData}
                        disabled={!formData.symbol}
                      >
                        <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'stock' | 'etf' })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="stock">Stock</option>
                      <option value="etf">ETF</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sector
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dividend Yield (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={formData.dividendYield}
                      onChange={(e) => setFormData({ ...formData, dividendYield: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    DRIP Threshold (shares)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.dripThreshold}
                    onChange={(e) => setFormData({ ...formData, dripThreshold: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto sm:ml-3"
                disabled={loading}
              >
                {loading ? 'Saving...' : asset ? 'Save Changes' : 'Add Asset'}
              </Button>
              <Button
                type="button"
                variant="text"
                className="w-full mt-3 sm:w-auto sm:mt-0 text-gray-300 hover:bg-gray-700"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetModal;