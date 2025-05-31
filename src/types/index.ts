// User types
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastLogin: Date;
}

// Stock and ETF types
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  price: number;
  dividend: {
    yield: number;
    frequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
    amount: number;
    growthRate: number;
  };
  drip: {
    discount: number;
    fractionalShares: boolean;
    minimumAmount: number | null;
  };
  riskMetrics: {
    beta: number;
    volatility: number;
  };
}

export interface ETF extends Omit<Stock, 'industry'> {
  assetClass: string;
  holdings: number;
  managementFee: number;
  mer: number;
}

// Featured stock of the week
export interface FeaturedStock {
  stock: Stock | ETF;
  analysis: string;
  recommendation: 'buy' | 'hold' | 'sell';
  targetPrice: number;
  analystName: string;
}

// Authentication types
export type AuthProvider = 'google' | 'facebook' | 'email';

// Router route types
export type AppRoute = 
  | 'home'
  | 'search'
  | 'learn'
  | 'watchlist'
  | 'profile'
  | 'admin';