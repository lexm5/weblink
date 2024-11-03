require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDBに接続しました！");
    } catch (error) {
        console.error("MongoDB接続エラー:", error);
        process.exit(1); // エラー時にアプリを終了
    }
};

module.exports = connectDB;