// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/LoginPage'
import LoginPage from './pages/RegisterPage';
function App() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : []; // 配列として読み込む
    });

    useEffect(() => {
        console.log("Saving cart to localStorage:", cart); // デバッグ用のログ
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === product._id);
            if (existingProduct) {
                // 同じ商品が既にカートにある場合、数量を増やす
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // 商品がカートにない場合、新しく追加
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <Router>
            <nav>
                <Link to="/">ホーム</Link> | <Link to="/products">商品一覧</Link> | <Link to="/cart">カート ({cart.length})</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<DetailPage addToCart={addToCart} />} />
                <Route path="/login" element={<LoginPage />} /> {/* 修正: LoginPageを追加 */}
                <Route path="/register" element={<RegisterPage />} /> {/* 修正: RegisterPageを追加 */}
            </Routes>
        </Router>
    );
}

export default App;