// frontend/src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import '../styles/ProductsPage.css'; // CSSファイルをインポート

function ProductsPage() {
    const [products, setProducts] = useState([]); // スペル修正

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                const data = response.data;
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error('商品一覧の取得エラー:', error);
                setProducts([]); // エラー時に空の配列をセット
            });
    }, []);

    return (
        <div className="products-container">
            <Typography className="products-title" variant="h4">商品一覧</Typography>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card"> {/* 修正：product._id → product.id */}
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-content">
                            <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
                            <Typography className="product-description">{product.description}</Typography>
                            <Typography className="product-price">価格: ¥{product.price}</Typography>
                            <Typography className="product-stock">在庫: {product.stock}</Typography>
                        </div>
                        <Button
                            component={Link}
                            to={`/products/${product.id}`}
                            variant="contained"
                            color="primary"
                            className="product-button"
                        >
                            詳細を見る
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
