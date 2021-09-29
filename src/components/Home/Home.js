import React, { useState, useEffect } from 'react';
import ShoeCard from '../ShoeCard/ShoeCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://radiant-mesa-75563.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, [])

    return (
        (products.length == 0)
                ? <div style={{height: '400px'}} class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
        <div className="container m-5 p-5 d-flex justify-content-between flex-wrap">   
                {
                    products.map(product => <ShoeCard product={product}></ShoeCard>)
                }
        </div>
    );
};

export default Home;