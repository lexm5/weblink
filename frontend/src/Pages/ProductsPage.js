import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ProductsPage(){
    const [products,setProducts] = useState({});

    useEffect(() => {
        //APIから商品一覧を取得
        axios.get('/api/products').then(response =>{
            setProducts(response.data);
        })
        .catch(err =>{
            console.error("商品一覧の取得エラー:", err);
        });
    }, []);

    return(
        <div>
            <h1>商品一覧</h1>
            <ul>
            {products.map((product, index) => (
                    <li key={index}>{product.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductsPage;