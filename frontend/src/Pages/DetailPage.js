import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider, Rating } from '@mui/material';
import '../styles/DetailPage.css'; // CSSファイルをインポート

function DetailPage({ addTocart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(null);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');


    useEffect(() => {
        const fetchProduct = async () => { //商品情報をAPIから取得⒮るう非同期関数
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
                setReviews(response.data.reviews || []);
                setLoding(false);
            } catch (err) {
                console.log("商品詳細の取得エラー:", err);
                setError("商品情報の取得に失敗しました。");
                setLoding(false);
            }
        };
        fetchProduct();
    }, [id]);

    const submitReview = async () => {
        try {
            const response = await axios.post(`/api/products/${id}/review`,
                {
                    rating: newRating,
                    comment: newComment
                });
            setReviews((prevReviws) => [...prevReviws, response.data]);
            setNewRating(0); //フォームをリセット
            setNewComment('');
        } catch (err) {
            console.error("レビュー送信エラー:", err);
            alert('レビューの送信に失敗しました');
        }
    };
    if (loading) {
        return <Typography>読み込み中...</Typography>
    }
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div className="detail-container">
            {product && ( //productが真のときだけ、&&の右側の内容が評価され、画面に描画される。
                <div className="product-section">
                    <img src={product.imageUrl} alert={product.name} className="prodcut-image" />
                    <Typography className="product-title">{product.name}</Typography>
                    <Typography className="product-description">{product.description}</Typography>
                    <Typography className="product-price">価格:\{product.price}</Typography>
                    <Typography className="product-stock">在庫:{product.stock}</Typography>

                    <Button variant="contained" color="primary" onClick={() => addTocart(product)} className="add-to-cart-button">カートに追加</Button>
                </div>
            )}

            {/*レビューセクション*/}
            <div className="review-section">
                <Typography variant="h5">レビュー</Typography>
                <List className="review-list">
                    {reviews.map((review, index) => (
                        <React.Fragment key={index}>
                            <ListItemText primary={`${review.name} (${review.rating}/5)`} secondary={review.comment}></ListItemText>
                            <Divider className="review-divider" />
                        </React.Fragment>
                    ))}
                </List>

                <div className="add-review-section">
                    <Typography variant="h6">レビュー追加</Typography>
                    <Rating value={newRating} onChange={(event, newValue) => setNewRating(newValue)} className="rating-input"></Rating>
                    <TextField label="コメント" variant="outlined" fullWidth multiline rows={4} value={newComment}
                        onChange={(e) => setNewComment(e.target.value)} className="comment-input"></TextField>
                    <Button variant="contained" color="secondary" onClick={submitReview} disabeled={!newRating || !newComment} className="submit-button">送信</Button>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;