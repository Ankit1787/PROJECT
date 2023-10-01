import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux'
import store from './store';
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "./components/layout/Footer/Footer.css"
import "./components/layout/Header/Header.css"
import "./pages/Home/Home.css"
import "./pages/SingleProduct/SingleProduct.css"
import "./pages/Product/Product.css"
import './components/layout/user/LoginSignup.css'
import { positions, transitions, Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
    transitions:transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
 
  <AlertProvider template={AlertTemplate} {...options}>
  
    <App /> 
    
    </AlertProvider>
    
   
  
    </Provider>
   
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
