import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ShoeCard = (props) => {
    const { _id, name, price, imageURL } = props.product;
    return (
        <div className="pb-5">
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={imageURL} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center pt-2">
                        <h6>{price} BDT</h6>
                        <Link to={`/checkout/${_id}`}><Button className="btn-sm" variant="danger">Buy Now</Button></Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ShoeCard;