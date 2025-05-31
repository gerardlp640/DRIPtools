import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import StockDetail from './pages/StockDetail';
import Watchlist from './pages/Watchlist';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import TokenHistory from './pages/TokenHistory';
import Help from './pages/Help';
import ControlPanel from './pages/ControlPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="search/results" element={<SearchResults />} />
          <Route path="stock/:symbol" element={<StockDetail />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="tokens" element={<TokenHistory />} />
          <Route path="help" element={<Help />} />
          <Route path="control-panel" element={<ControlPanel />} />
          <Route path="learn" element={<div className="min-h-screen pt-24">Coming Soon: Learn</div>} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;