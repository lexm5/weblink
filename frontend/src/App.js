// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DetailPage from './pages/DetailPage.js'; // インポート

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">ホーム</Link> | <Link to="/products">商品一覧</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<DetailPage />} /> {/* 商品詳細ページ */}
            </Routes>
        </Router>
    );
}

export default App;