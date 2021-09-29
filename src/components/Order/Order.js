import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../App';
import OrderCard from '../OrderCard/OrderCard';

const Order = () => {
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://radiant-mesa-75563.herokuapp.com/findByEmail',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loggedInUser)
        })
        .then(res=> res.json())
        .then(data=> setOrders(data))
    },[])
    
    return (
        <div className="container p-5">
            <h2 style={{ color: 'green', textAlign: 'center'}}>Hello {loggedInUser.name}, Thank you for placing {orders.length} order </h2>
            <div className="m-5 d-flex flex-column align-items-center">
                {
                    orders.map(order => <OrderCard key={order._id} order={order}></OrderCard>)
                }
            </div>
        </div>
    );
};

export default Order;