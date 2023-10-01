import React, { useEffect } from 'react'
import "./SingleOrders.css"
import { useSelector, useDispatch } from "react-redux"
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';
import { CLEARGETSINGLEORDERERROR, getSingleOrder } from '../../Actions/orderaction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {IoIosArrowRoundBack} from 'react-icons/io'
import Loader from '../../components/layout/Loader.js/Loader';

const SingleOrder = () => {
    const {id}=useParams()
    
    console.log(id)
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const alert =useAlert()
    const { Orders ,order,err,loading} = useSelector((state) => state.myorders);
    const shippingdetails=order?.shippinginfo;
    const items=order?.orderitems;
    useEffect(() => {

        const callback=()=>{
            alert.error(err)
            dispatch(CLEARGETSINGLEORDERERROR())
        }

        if(err){
            return callback
        }
        else if(Orders){
       dispatch(getSingleOrder(id));
        }
    },[dispatch,alert,Orders,err,id])
    if(loading){
        return <Loader />
      }
    return (
        <>
            <div className='single-order'>
            <div className='back-btn'>
                <Button onClick={()=>navigate(-1)}> <IoIosArrowRoundBack size={40} />Back</Button>
            </div>
                <div className='single-order-main'>
                     

                    <div className="single-order-heading">
                        <div>
                            <h2>Orders Detail</h2>

                        </div>
                        <div>
                            <h4><CalendarTodayIcon /> {(order?.CreatedAt)?.substring(0,10)}</h4>
                            <hr />

                        </div>
                    </div>

                    <div className="single-order-body">

                        <div className='single-order-info'>
                            <div >
                            <div className='single-order-customer'>   
                            <div className='single-order-icon'>
                            <PersonIcon  />
                            </div>
                            <div>

                          
                            <h2>Customer</h2>
                            <h3>name: <span>{shippingdetails?.name}</span></h3>
                                <h3>email:<span>{shippingdetails?.email}</span></h3>
                                <h3>mobile:<span>{shippingdetails?.mobile}</span></h3>
                            </div>
                            </div>
                            </div>
                            <div >
                            <div className='single-order-customer'>   
                            <div className='single-order-icon'>
                            <LocalShippingIcon  />
                            </div>
                            <div>

                          
                            <h2>order info</h2>
                            <h3>Addressline1: <span>{shippingdetails?.addressline1}</span></h3>
                            <h3>Addressline2: <span>{shippingdetails?.addressline2}</span></h3>
                            <h3>city: <span>{shippingdetails?.city}</span></h3>
                            <h3>state: <span>{shippingdetails?.state}</span></h3>
                            <h3>pincode: <span>{shippingdetails?.pincode}</span></h3>
                               
                            </div>
                            </div>
                            </div>
                           
                           
                        </div>
                        <div className='order-status'>

                            <h3>Order Status</h3>
                            <p>Order Amount: <span>₹{order?.totalprice}/-</span></p>
                            <p>Order Status: <span>{order?.orderstatus}</span></p>


                        </div>
                      
                            <div className='myorder-body-det singleorder-prod-det'>
                              <table>
                              <thead>
                                <tr>
                                    <th>
                                      #  
                                    </th>
                                    <th>
                                     product 
                                    </th>
                                    <th>
                                     product 
                                    </th>
                                    <th>
                                     price 
                                    </th>
                                    <th>
                                    quanity
                                    </th>
                                    <th>
                                    total price
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                  { items && items.map((item,index)=>( 
                                    <tr>
                                        <td>{index+1}</td>
                                        <td className='table-img'><img src={item?.images[0]?.url} alt="" /></td>
                                        <td>{item?.name}</td>
                                        <td>₹{item?.price}/-</td>
                                        <td>{item?.quantity}</td>
                                        <td>₹{(item?.quantity )* (item?.price)}/-</td>
                                    </tr>))}
                                </tbody>
                              </table>

                              

                              
                               
                           
                        </div>
                        <div className='myorder-body-charges'>
                            <table>
                                <tr>
                                    <td>
                                        Order subtotal: 
                                      
                                    </td>
                                    <td>
                                    <span>₹{order.itemprice}</span>
                                    </td>
                                   
                                </tr>
                                <tr>
                                    <td>
                                    Gst:
                                       
                                    </td>
                                    <td>
                                    <span>₹{order.taxprice}</span>
                                       
                                    </td>
                                   
                                </tr>
                                <tr>
                                    <td>
                                    shipping: 
                                       
                                    </td>
                                    <td>
                                    <span>₹{order.shippingprice}</span> 
                                       
                                    </td>
                                   
                                </tr>
                                <tr>
                                    <td>
                                    Total: 
                                     
                                    </td>
                                    <td>
                                    <span>₹{order.totalprice}</span>
                                     
                                    </td>
                                   
                                </tr>
                            </table>
                        </div>
                        
                    </div>

                </div>
            </div>

        </>
    )
}

export default SingleOrder