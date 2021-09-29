import React,{useEffect, useState, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { UserContext } from '../../App';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedShoe, setSelectedShoe] = useState({});
    const {name, price, imageURL} = selectedShoe;
    const {id} = useParams();
    useEffect(() => {
        fetch(`https://radiant-mesa-75563.herokuapp.com/product/${id}`)
        .then(res => res.json())
        .then(data => setSelectedShoe(data[0]));
    },[])

    const handleCheckout = () => {
        const orderDetails = {
            ...loggedInUser,
            shoeName: name,
            price,
            imageURL,
            quantity: 1,
            orderDate: new Date()
        }
        fetch('https://radiant-mesa-75563.herokuapp.com/addOrder',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            alert('Order Placed Successfully')
        })
    }

    return (
        <div className="container p-5">
            <h1>Checkout</h1>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>    
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow
                                    key={name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {name}
                                    </TableCell>
                                    <TableCell align="center">1</TableCell>
                                    <TableCell align="center">{price} TK</TableCell>  
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row"><strong>Total</strong></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">{price} TK</TableCell>  
                                </TableRow>                
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={()=>handleCheckout()} className="btn-sm mt-5 float-end" variant="success">Checkout</Button>
        </div>
    );
};

export default Checkout;