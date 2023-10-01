 import {configureStore } from '@reduxjs/toolkit';
import productReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import  productdetailReducer  from './productdetailreducer';
import userReducer from './userreducer';
import profileReducer from './profilereducer';
 import cartReducer from './Cartreducer.js';
 import loaduserReducer from './userload';
 import orderReducer from './orderreducer';
 import MyOrdersReducer from './MyOrdersReducer';
 import ratingReducer from './ratingreducer';
 import ALLOrderReducer from './Admin/reducers/orderreducer.js';
 import CreateProductReducer from './Admin/reducers/productreducers.js';
 import allUserReducer from './Admin/reducers/userreducers.js';
 const store=configureStore({
    reducer:{
        custom:productReducer,
        productDetail:productdetailReducer,
        user:userReducer,
        profile:profileReducer,
        cart:cartReducer,
        LoadUser:loaduserReducer,
        orders:orderReducer,
        myorders:MyOrdersReducer,
        rating:ratingReducer,
        Products:CreateProductReducer,
        ORDERS:ALLOrderReducer,
        Users:allUserReducer,
    
    },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
 })
 export default store;