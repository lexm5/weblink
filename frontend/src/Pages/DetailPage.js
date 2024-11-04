// frontend/src/pages/detailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
    const { id } = useParams(); // URLパラメータから商品IDを取得
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log("Fetching product with ID:", id); // デバッグ用ログ
                const response = await axios.get(`/api/products/${id}`);
                console.log("Product data:", response.data); // デバッグ用ログ
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error("商品詳細の取得エラー:", err);
                setError("商品情報の取得に失敗しました");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {product && (
                <div style={{ padding: '20px', border: '1px solid #ddd', maxWidth: '400px', margin: '0 auto' }}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>価格: ¥{product.price}</p>
                    <p>在庫: {product.stock}</p>
                </div>
            )}
        </div>
    );
}

export default DetailPage;