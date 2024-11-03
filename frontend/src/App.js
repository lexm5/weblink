import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

function App(){
  return (
    <Router>
      <nav>   {/* 異なるページに移動できるためのlink提供 */}
        <Link to="/">ホーム</Link> | <Link to="/products">商品一覧</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;