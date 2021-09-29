import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddProduct.css';
import plusIcon from '../../icons/plus 1.png'
import manageProduct from '../../icons/grid 1.png'
import { useForm } from "react-hook-form";
import { Col, FormControl, FormLabel, Row } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../images/14-08.png'

const AddProduct = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageLink, setImageLink]= useState(null);
    
    const onSubmit = data => {
        const productInfo ={
            name: data.exampleName,
            weight: data.exampleWeight,
            price: data.examplePrice,
            imageURL: imageLink
        }
        fetch('https://radiant-mesa-75563.herokuapp.com/addProduct',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    };

    const handleImageUpload = event =>{
        const imageData = new FormData();
        imageData.set('key','615145d38ed76c9cc7f69d27e5315f30');
        imageData.append('image',event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',imageData)
        .then(function(response) {
            setImageLink(response.data.data.display_url);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <div className="dash-addProduct d-flex">
            <div className="side-nav w-25 p-4">
                <div className="logo-style">
                    <Link to="/"><img src={logo} alt="logo"></img></Link>
                </div>
                <br/>
                <Link to="/inventory/addProduct"><img src={plusIcon} alt="logo"/> Add Product</Link>
                <br />
                <Link to="/inventory/manageProduct"><img src={manageProduct} alt="logo"/> Manage Product</Link>
            </div>
            <div className="inventory w-75 p-5">
                <h3>Add Product</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl type="text" {...register("exampleName")}/>
                        </Col>
                        <Col>
                            <FormLabel>Weight</FormLabel>
                            <FormControl type="text" {...register("exampleWeight")}/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <FormLabel>Add Price</FormLabel>
                            <FormControl type="text" {...register("examplePrice")} />
                        </Col>
                        <Col>
                            <FormLabel>Add Photo</FormLabel>
                            <FormControl name="image" type="file" onChange={handleImageUpload} />
                        </Col>
                    </Row>
                    <br />
                    <input className="btn btn-success" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;