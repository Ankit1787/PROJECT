import React, { useEffect } from 'react'
import Header from './components/layout/Header/Header.js'
import Footer from './components/layout/Footer/Footer.js'

import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import SingleProduct from './pages/SingleProduct/SingleProduct.jsx'
import Product from './pages/Product/Product.jsx'
import LoginSignup from './components/layout/user/LoginSignup.jsx'
import Myaccount from './components/layout/user/Myaccount.jsx'

import { CLEARLOADERROR, LoadUser } from './Actions/useraction.js'
import { useDispatch,useSelector } from 'react-redux'

import Resetpassword from './components/layout/user/Resetpassword.jsx'
import Cart from './pages/Cart/Cart.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'

import Checkout from "./pages/Checkout/Checkout.jsx"
import PaymentSuccess from './components/layout/Payment/PaymentSuccess.jsx'
import PaymentError from './components/layout/Payment/PaymentError.jsx'
import Confirmorder from './pages/Checkout/Confirmorder.jsx'
import MyOrders from './pages/Myorders/MyOrders.jsx'
import SingleOrder from './pages/Myorders/SingleOrder.jsx'
import {PrivateRoutes,AdminRoutes} from './Routes/PrivateRoutes.js'
import Cookies from 'js-cookie';
import Dashboard from './Admin/Dashboard/Dashboard.jsx'
import ALLProducts from './Admin/Products/ALLProducts.jsx'
import AddProducts from './Admin/Products/AddProducts.jsx'
import Orders from './Admin/Orders/Orders.jsx'
import Order from './Admin/Orders/Order.jsx'
import Forgotpassword from './components/layout/user/Forgotpassword.jsx'
const App = () => {
 
  const {profile,err,isAuth}=useSelector((state)=>state.LoadUser)
 
  const dispatch=useDispatch()
  const token=Cookies.get('token')
 useEffect(()=>{
 
    const callback=()=>{

      dispatch(CLEARLOADERROR())
    }  

    if(err){
      return callback
      
   
      
    }
    
    
 
    
    else if(token){
       if(!isAuth)
      dispatch(LoadUser())

    }
    else if(token){
    
      dispatch(LoadUser())

    }
    else if(token){
      if(err)
      dispatch(CLEARLOADERROR())
    }
   
 
  
  


  
    
   },[dispatch,err,token,isAuth])
   console.log(profile.role,'role')

  return (
      <Router>
       <Header /> 

      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<PrivateRoutes isAuthenticated={!isAuth} element={<LoginSignup/>} path={'/'}/>} />

          <Route path='/products/:productid' element={<SingleProduct />} />
          <Route exact path='/product' element={<Product />} />
         <Route path='/cart' element={<Cart/>} />
          <Route path='/product/:search' element={<Product />} />
          
          <Route path='/myaccount' element={<PrivateRoutes isAuthenticated={isAuth} element={<Myaccount/>} path={'/signup'}/>} />
          <Route path='/forgot-password' element={<Forgotpassword/>} />
          <Route path='/myorders' element={<PrivateRoutes isAuthenticated={isAuth} element={<MyOrders />} path={'/signup'}/>} />
          <Route path='/myorders/:id' element={<PrivateRoutes isAuthenticated={isAuth} element={<SingleOrder />} path={'/signup'}/>} />
          <Route path='/checkout/shipping' element={<PrivateRoutes isAuthenticated={isAuth} element={<Checkout />} path={'/signup'}/>} />
          <Route path='/checkout/shipping/confirmorder' element={<PrivateRoutes isAuthenticated={isAuth} element={<Confirmorder />} path={'/signup'}/>} />
          <Route path='/checkout/shipping/confirmorder/paymentsuccess' element={<PrivateRoutes isAuthenticated={isAuth} element={<PaymentSuccess />} path={'/signup'}/>} />
          <Route path='/checkout/shipping/confirmorder/paymenterror' element={<PrivateRoutes isAuthenticated={isAuth} element={<PaymentError />} path={'/signup'}/>} />
          <Route path='/user/password/reset/:token' element={<Resetpassword />} />
          {/* admin routes */}
         {(profile.role==='admin' ) &&  <Route path='/admin/dashboard' element={<AdminRoutes isAuthenticated={isAuth} element={<Dashboard />} path={'/signup'}  admin={profile.role}   /> } />}
           {(profile.role==='admin' ) && <Route path='/admin/products' element={<AdminRoutes isAuthenticated={isAuth} element={<ALLProducts />} path={'/signup'}  admin={profile.role}   /> } />}
           {(profile.role==='admin' ) && <Route path='/admin/products/new' element={<AdminRoutes isAuthenticated={isAuth} element={<AddProducts />} path={'/signup'}  admin={profile.role}    />} />}
           {(profile.role==='admin' ) && <Route path='/admin/orders' element={<AdminRoutes isAuthenticated={isAuth} element={<Orders />} path={'/signup'}  admin={profile.role} />   } />}
          {(profile.role==='admin' ) &&  <Route path='/admin/orders/:id' element={<AdminRoutes isAuthenticated={isAuth} element={<Order />} path={'/signup'}   admin={profile.role}   />} />}
          
          
        
         
         
         
          <Route path='*' element={<h1>Page Not Found</h1>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
 
      <Footer />
      </Router>
  );
};

export default App