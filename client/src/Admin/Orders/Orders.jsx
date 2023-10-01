import React, { useEffect } from 'react'

import Button from '@mui/material/Button';
import "../Dashboard/Dashboard.css"
import "./Orders.css"
import { useAlert } from 'react-alert';
import { useDispatch ,useSelector} from 'react-redux';
import Sidebar from '../Dashboard/Sidebar';
import { Link } from 'react-router-dom';
import { ClearAllOrdersErrors, getallOrder } from '../Actions/orderaction';
import Loader from '../../components/layout/Loader.js/Loader';
const Orders = () => {
    const alert =useAlert()
    const dispatch=useDispatch()
    const {orders,Loading,Error} = useSelector((state)=>state.ORDERS)
    useEffect(() => {
        const callback=()=>{
            alert.error(Error)
            dispatch(ClearAllOrdersErrors())
        }
        if(Error){
            return callback
        }
        else{
            dispatch(getallOrder())
        }
    },[Error,dispatch,alert])

    if(Loading){
        return <Loader />
    }
  return (
    <>
    <div className="dashboard">
      

      <div className="dashboard-main">
    
      

    <Sidebar/>
    <div className="dashboard-body">
      
      <div>
    
                <h2 className='myorders-h2'>Orders</h2>

                <div className="dashboard-orders">
                    <div className="myorder-body">
                 {orders.length>0 && orders.map((order,index)=>(

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
                        <Link to={`/admin/orders/${order._id}`}><Button variant="outlined" className='btn-myorder'>View order</Button></Link>
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

export default Orders