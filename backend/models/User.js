const { Pool } = require('pg');
const pool = new Pool(); //DB接続

//ユーザー作成
async function createUser(name, email, hashedPassword) {
    const result = await pool.query(
        `INSERT INTO user(name, email, password) VALUES ($1, $2, $3) RETURNING id, name,email`,
        [name, email, hashedPassword]
    );
    return result.rows[0];
}

//ユーザー取得
async function findUserByEmail(email) {
    const result = await pool.query(`SELECT FROM users WHERE email=$1`, [email]);
    return result.rows[0];
}

module.exports = { createUser, findUserByEmail };