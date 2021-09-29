import React from 'react';

const OrderCard = (props) => {
    const { imageURL, quantity, price, shoeName, orderDate } = props.order;
    return (
        <div class="card mb-3" style={{maxWidth: '540px'}}>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={imageURL} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{shoeName}</h5>
                        <p class="card-text">Price: {price}</p>
                        <p class="card-text">Quantity: {quantity}</p>
                        <p class="card-text"><small class="text-muted">{orderDate}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;