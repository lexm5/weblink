// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import '../styles/LoginPage.css'; // CSSファイルをインポート

function LoginPage({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });
            setUser(response.data); // ログインしたユーザー情報を設定
            setSuccess('ログインに成功しました！');
            setError('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('ログインに失敗しました。もう一度試してください。');
            setSuccess('');
        }
    };

    return (
        <Box className="login-container">
            <Typography variant="h4" gutterBottom className="login-title">
                ログイン
            </Typography>
            {error && <Alert severity="error" className="login-alert">{error}</Alert>}
            {success && <Alert severity="success" className="login-alert">{success}</Alert>}
            <TextField
                label="メールアドレス"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
            />
            <TextField
                label="パスワード"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                disabled={!email || !password}
                className="login-button"
            >
                ログイン
            </Button>
        </Box>
    );
}

export default LoginPage;
