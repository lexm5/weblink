// backend/models/Product.js
const mongoose = require('mongoose');

// 商品スキーマの定義
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

// Productモデルの作成
const Product = mongoose.model('Product', productSchema);

module.exports = Product;