// backend/server.js
const express = require('express');
const connectDB = require('./DB');
const productRoutes = require('./routes/productRoutes'); // ルートをインポート
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

// /api/products ルートの設定
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました！`);
});