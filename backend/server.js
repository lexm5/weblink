const express = require('express');
const connectDB = require('./DB'); // MongoDB接続設定

const app = express();
connectDB(); // MongoDBに接続

app.use(express.json());

// ルートやAPIエンドポイントの設定など...

app.listen(5000, () => {
    console.log("サーバーがポート5000で起動しました！");
});