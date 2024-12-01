// frontend/src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import '../styles/RegisterPage.css'; // CSSファイルをインポート

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password,
            });
            setSuccess('登録が完了しました！ログインしてください。');
            setError('');
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('登録に失敗しました。もう一度試してください。');
            setSuccess('');
        }
    };

    return (
        <Box className="register-container">
            <Typography variant="h4" gutterBottom className="register-title">
                新規登録
            </Typography>
            {error && <Alert severity="error" className="register-alert">{error}</Alert>}
            {success && <Alert severity="success" className="register-alert">{success}</Alert>}
            <TextField
                label="名前"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="register-input"
            />
            <TextField
                label="メールアドレス"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
            />
            <TextField
                label="パスワード"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                disabled={!name || !email || !password}
                className="register-button"
            >
                登録
            </Button>
        </Box>
    );
}

export default RegisterPage;
