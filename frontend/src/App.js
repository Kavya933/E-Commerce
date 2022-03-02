
import './App.css';
import Header from "./component/Layout/Header/Header.js";
import { BrowserRouter as Router,Route } from 'react-router-dom';
import webFont from "webfontloader";
import React from "react";
import Footer from './component/Layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/Layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from "./component/Cart/Cart";
import { Dashboard } from './component/Admin/Dashboard';




function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })

    store.dispatch(loadUser());      // user lina lai /me wala , state ma data rahnxa jaile aaba 

  },[]);
  
  return (
    <Router>
      <Header/>

      {isAuthenticated && <UserOptions user={user} />}

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route  path="/products/:keyword" component={Products} />

      <Route exact path="/search" component={Search} />

      <ProtectedRoute exact path="/account" component={Profile} />

      <Route exact path="/login" component={LoginSignUp} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/cart" component={Cart} />

      {/* <Route exact path="/admin/dashboard" component={Dashboard} /> */}
     

      
      <Footer/>
    </Router>
    
  );
}

export default App;
