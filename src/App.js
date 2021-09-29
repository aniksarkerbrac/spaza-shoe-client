import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AddProduct from './components/AddProduct/AddProduct';
import ManageProduct from './components/ManageProduct/ManageProduct';
import Login from './components/Login/Login';
import Checkout from "./components/Checkout/Checkout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Order from "./components/Order/Order";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Header></Header>
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Header></Header>
            <Home></Home>
          </Route>

          <PrivateRoute path="/inventory/addProduct">
            <AddProduct></AddProduct>
          </PrivateRoute>
          
          <Route path="/inventory/manageProduct">
            <ManageProduct></ManageProduct>
          </Route>
          <Route path="/login">
            <Header></Header>
            <Login></Login>
          </Route>

          <PrivateRoute path="/checkout/:id">
            <Header></Header>
            <Checkout></Checkout>
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Header></Header>
            <Order></Order>
          </PrivateRoute>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
