import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./MyOrders.css"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { CLEARGETORDERERROR, getOrders } from '../../Actions/orderaction'
import Loader from '../../components/layout/Loader.js/Loader';
const MyOrders = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
   
    const { Orders, error, loading } = useSelector((state) => state.myorders)

    useEffect(() => {
        const callback = () => {
            alert.error(error)
            dispatch(CLEARGETORDERERROR())
        }
        if (error) {
            return callback

        }
        else {
            dispatch(getOrders())
        }


    }, [error, dispatch, alert])
  if(loading){
    return <Loader />
  }

    return (
        <>
            <div className=" myorders" >



                <div className="myorders-main">
                    <div className='confirm-order-heading '>
                        <h3 className="confirm-order-heading-h3 myorders-h3" > My Orders </h3>
                     </div>
                     <div className="myorder-body">
                 {Orders && Orders.map((order,index)=>(

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
        </>
    )
}

export default MyOrders