import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../AddProduct/AddProduct.css';
import plusIcon from '../../icons/plus 1.png'
import manageProduct from '../../icons/grid 1.png'
import { useForm } from "react-hook-form";
import { Col, FormControl, FormLabel, Row } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import deleteIcon from '../../icons/Group 33150.png';
import logo from '../../images/14-08.png'

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('https://radiant-mesa-75563.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, []) 

    const handleDeleteProduct = (id) => {
        fetch(`https://radiant-mesa-75563.herokuapp.com/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res=> res.json())
        .then(result =>{
            console.log(result);
            if(result){
                setProducts(products.filter(product => product._id !== id));
            }
        })
        
    }
    return (
        <div className="dash-manageProduct d-flex">
            <div className="side-nav w-25 p-4">
                <div className="logo-style">
                    <Link to="/"><img src={logo} alt="logo"></img></Link>
                </div>
                <br />
                <Link to="/inventory/addProduct"><img src={plusIcon} alt=""/> Add Product</Link>
                <br />
                <Link to="/inventory/manageProduct"><img src={manageProduct} alt=""/> Manage Product</Link>
            </div>
            <div className="inventory w-75 p-5">
                <h3>Manage Product</h3><br/>
                {(products.length == 0)
                ? (<div style={{height: '400px'}} class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>)
                :
                (<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="center">Weight</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Action</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    id="table-row"
                                    key={product.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="center">{product.weight}</TableCell>
                                    <TableCell align="center">{product.price}</TableCell>
                                    <TableCell className="delete-icon" align="center"><img onClick={()=>handleDeleteProduct(product._id)} src={deleteIcon} alt=""></img></TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)
                }
            </div>
        </div>
    );
};

export default ManageProduct;