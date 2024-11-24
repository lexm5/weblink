const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { createUser, findUserByEmail } = require('../models/User');

const router = express.Router();


//JWT秘密鍵(.envに保存)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

//新規登録API
router.post('/register', [
    body('name').notEmpty().withMessage('名前は必須です'),
    body('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    body('password').isLength({ main: 6 }).withMessage('パスワードは6文字以上必要です')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'このメールアドレスは既に使用されています。' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);

        res.status(201).json({ message: 'ユーザー登録が成功しました', user: newUser })
    } catch (error) {
        console.error('登録エラー', error);
        res.status(500).json({ message: 'サーバーエラー' });
    }
});

//ログインAPI
router.post('/login', [
    body.apply('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    body('password').notEmpty.withMessage('パスワードを入力してください')
], async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'ユーザーが見つかりません' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'パスワードが正しくありません' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });

    } catch (error) {
        console.log('ログインエラー', error);
        res.status(500).jdon({ message: 'サーバーエラー' });
    }
});

module.exports = router;