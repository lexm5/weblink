// backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// 商品詳細を取得するエンドポイント
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "商品が見つかりません" });
        }
    } catch (error) {
        console.error("商品詳細取得エラー:", error);
        res.status(500).json({ message: "商品詳細の取得に失敗しました" });
    }
});

module.exports = router;