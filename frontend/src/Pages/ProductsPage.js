// frontend/src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                const data = response.data;
                // productsが配列であることを確認し、そうでない場合は空の配列にする
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch(error => {
                console.error("商品一覧の取得エラー:", error);
                setProducts([]); // エラー時も空の配列をセットしてエラーを防ぐ
            });
    }, []);

    return (
        <div>
            <h1>商品一覧</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ddd', padding: '16px', margin: '8px', width: '200px' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
                            <Link to={`/products/${product._id}`}>{product.name}</Link>
                        <p>{product.description}</p>
                        <p>価格: ¥{product.price}</p>
                        <p>在庫: {product.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;