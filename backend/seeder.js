// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

console.log(Product); // Productが正しくインポートされているか確認

const seedProducts = [
    {
        name: "テスト商品1",
        description: "これはテスト商品の説明です",
        price: 1000,
        stock: 10,
        imageUrl: "https://via.placeholder.com/150",
    },
    {
        name: "テスト商品2",
        description: "これは別のテスト商品の説明です",
        price: 2000,
        stock: 5,
        imageUrl: "https://via.placeholder.com/150",
    },
];

const seedDB = async () => {
    await Product.deleteMany({}); // ここでエラーが出る場合、Productが正しくインポートされていない可能性
    await Product.insertMany(seedProducts);
    console.log("データベースにテスト商品を追加しました！");
    mongoose.connection.close();
};

seedDB();