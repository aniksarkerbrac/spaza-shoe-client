import React,{ useContext} from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
import logo from '../../images/14-08.png'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {name} = loggedInUser;
    return (
        <div className="container header d-flex justify-content-between">
            <nav>
                <Link to="/"><img src={logo} alt="logo"></img></Link>            
            </nav>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory/addProduct">Admin</Link>
                {
                    loggedInUser.name ? name : <Link to="/login"><Button variant="danger">Log In</Button></Link>
                }
            </nav>
        </div>
    );
};

export default Header;