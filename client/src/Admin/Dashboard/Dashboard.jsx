import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { Button } from '@mui/material'

import {Line} from 'react-chartjs-2'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  
  
 

import {BsCurrencyRupee} from 'react-icons/bs'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

import Loader from "../../components/layout/Loader.js/Loader"
import { clearerror, getallproducts } from '../../Actions/productaction';
import Sidebar from './Sidebar';
import { ClearAllOrdersErrors, getallOrder } from '../Actions/orderaction';
const Dashboard = () => {
    const dispatch=useDispatch()
   
   
    
    const{orders,Error} = useSelector((state)=>state.ORDERS)
    const{error,loading,productcount} = useSelector((state)=>state.custom)
const [totalsales,setTotalSales] =useState(0)
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  
   
const options = {
    scales: {
      x: {
        type: 'category', // This specifies that 'x' axis should be treated as a category scale.
      },
      y: {
        beginAtZero: true, // Starts the y-axis at zero if you want it to.
        // Add any other options you need for the y-axis here.
      },
    },
  };
  
useEffect(()=>{
    const callback1=()=>{
        dispatch(clearerror())
       

    }
    const callback2=()=>{
       
        dispatch(ClearAllOrdersErrors())

    }
    if(error){

        return callback1

    }
    if(Error){

        return callback2

    }
    if(orders.length>0){
        setTotalSales(orders.reduce((acc,curr)=>curr?.totalprice+acc,0))
    }
    else{
        dispatch(getallproducts())
   
        dispatch(getallOrder())
    }
},[dispatch,error,Error,orders])

const LineState={
    labels:['INITIAL SALE','TOTAL SALES'],
    datasets:[{
        label:'Total Sales',
        backgroundColor:'tomato',
        hoverBackgroundColor:'red',
        data:[0,totalsales===0?40000:totalsales]
    }]
}
if(loading){
    return <Loader />
}

  return (
    <>
        <div className="dashboard">
    

            <div className="dashboard-main">
          
            

          <Sidebar />
                <div  id='Dashboard' className='dashboard-body'>
                    <div>
                    <div className="dashboard-heading">
                        <h2>
                            Dashboard
                        </h2>
                        <h3>Dashboard</h3>
                    </div>
                    <div className="dashboard-detail">
                        <div className='dashboard-detail-item1'>
                        <div>
                        <h2>Total Products</h2>
                           
                           <p>{productcount}</p>
                        </div>
                           
                            <div>
                                    <ShoppingBagIcon className='dashboard-detail-icon'/>
                                </div>
                           
                        </div>
                      
                        <div className='dashboard-detail-item2'>
                        <div>
                        <h2>Total Orders</h2>
                           
                           <p>{orders.length}</p>
                        </div>
                           
                            <div>
                                    <LocalShippingIcon className='dashboard-detail-icon'/>
                                </div>
                           
                        </div>
                      
                        <div className='dashboard-detail-item3'>
                        <div>
                        <h2>Total sales</h2>
                           
                           <p>₹{totalsales}/-</p>
                        </div>
                           
                            <div>
                                    <BsCurrencyRupee className='dashboard-detail-icon'/>
                                </div>
                           
                        </div>
                      
                   

                    </div>
                    <div id='orders' className="dashboard-statistc">
                        <div>
                            <h2>Sale Statistics</h2>
                        </div>
                        <div>
                            <Line data={LineState} options={options}/>
                        
                        </div>
                    </div>
                    <div className="dashboard-orders">
                    <h2>Recent Orders</h2>
                    <div className="myorder-body">
                 {orders.length>0 &&  orders.slice(-4).reverse().map((order,index)=>(

                    <div key={index}>

                    
                     <div className='myorder-body-det'>

                    
                        <div>
                          <h2>order placed</h2>
                          <h3>{(order?.CreatedAt).substring(0,10)}</h3>
                        </div>
                        <div>
                          <h2>order status</h2>
                          <h3>{order.orderstatus}</h3>
                        </div>
                        
                        <div>
                          <h2>order total</h2>
                          <h3>₹{order.totalprice}/-</h3>
                        </div>
                        </div>
                        <div>
                        <Link to={`/myorders/${order._id}`}><Button variant="outlined" className='btn-myorder'>View order</Button></Link>
                        </div>
                        
                     </div>))}

                </div>
                    </div>

                    
                    </div>
                </div>
               
            </div>
        </div>
    </>
  )
}

export default Dashboard