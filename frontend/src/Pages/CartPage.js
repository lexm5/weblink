// frontend/src/pages/CartPage.js
import React from 'react';

function CartPage({ cart, setCart }) {
    const handleQuantityChange = (productId, amount) => { //amountは増減の引数
        setCart((prevCart) => //prevCartはuseStateのコールバック関数
            prevCart.map((item) =>
                item._id === productId ? { ...item, quantity: item.quantity + amount } : item //...itemという書き方はitemと同じプロパティを持つ新しいオブジェクト生成
            ).filter((item) => item.quantity > 0) // 数量が0以下の場合は削除
        );
    };

    //商品を削除する関数
    const handleRemoveItem = (prodcutId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== prodcutId));
    };

    //合計金額を計算
    const totalAmount = cart.reduce((total, prodcut) => total + prodcut.price * prodcut.quantity, 0);
    //reduceはjsの配列メソッド

    return (
        <div>
            <h1>カート</h1>
            {cart.length === 0 ? (
                <p>カートに商品がありません。</p>
            ) : (
                <div>
                    {cart.map((product, index) => (
                        <div key={index} style={{ border: '1px solid #ddd', padding: '16px', margin: '8px' }}>
                            <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
                            <h2>{product.name}</h2>
                            <p>価格: ¥{product.price}</p>
                            <p>数量: {product.quantity}</p>
                            <button onClick={() => handleQuantityChange(product._id, 1)}>+</button>
                            <button onClick={() => handleQuantityChange(product._id, -1)}>-</button>
                            <button onClick={() => handleRemoveItem(product._id, -1)}>削除</button> { /* 削除ボタン*/}
                        </div>
                    ))}
                    <hr />
                    <h2>合計金額: ¥{totalAmount}</h2>
                </div>
            )}
        </div>
    );
}

export default CartPage;