import React, { useEffect } from 'react'
import Checkoutsteps from './Checkoutsteps'
import Metadata from './../../components/layout/Metadata'

import Button from '@mui/material/Button';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import Loader from "../../components/layout/Loader.js/Loader"
import "./Checkout.css"
import "./Confirmorder.css"

import { CLEARORDERERROR } from '../../Actions/orderaction';
import { createOrder } from '../../Actions/orderaction';
import { CLEARCART } from '../../Actions/cartaction';
import OrderDetail from './OrderDetail';
const Confirmorder = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, checkout, shippinginfo } = useSelector((state) => state.cart)
  const { error, loading } = useSelector((state) => state.orders)




  const subtotal = checkout?.subtotal;
  const GST = checkout?.GST;
  const Shipping = checkout?.Shipping;
  const Total = checkout?.Total;

  const OrderData = {
   shippinginfo,
    orderitems: items,
    itemprice: subtotal,
    taxprice: GST,
    shippingprice: Shipping,
    totalprice: Total,

    orderstatus: 'Processing'




  }
 
 
  

  const handleConfirm = async () => {

    try {
      const amount = Total
      const response = await axios.post('http://localhost:8002/api/v2/payment/process', { amount })
      const Order = response.data.order;
      const Key = response.data.key;
      const options = {
        key: Key, // Enter the Key ID generated from the Dashboard
        amount: Order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Vk Ecomerse",
        description: "Test Transaction",
        image: "https://cdn-icons-png.flaticon.com/512/25/25684.png",
        order_id: Order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler":  function (response) {
          console.log(response)
        
        
         axios.post('http://localhost:8002/api/v2/payment/verify', response).then((resp)=>{
          if(resp.data.success){
          
        
              OrderData.paymentinfo = {
          id: response.razorpay_payment_id,
          status: "Paid"
        }
       
        dispatch(createOrder(OrderData))
        dispatch(CLEARCART())
        navigate('paymentsuccess')
        
      

          }
         }).catch((error)=>{
          alert.error(error?.response?.data?.error?.message || 'something went wrong')
         })  
       
        },


        prefill: {
          name: shippinginfo.firstname,
          email: "gaurav.kumar@example.com",
          contact: shippinginfo.mobile
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#131415"
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
     
      // Handle payment success
      rzp1.on('payment.error', (error) => {
        // Handle payment error
        alert.error('Payment error:', error);
        rzp1.close();
        window.location.href = 'confirmorder/paymenterror';
        // Redirect to the error page or take further actions
        return 
      });

     



    } catch (error) {

      alert.error("Something went wrong")


    }

  }
  useEffect(() => {
    const callback = () => {
      alert.error(error)
      dispatch(CLEARORDERERROR())
    }
   
    if (error) {
      return callback
    }


  }, [error, dispatch, alert])

  if (loading) {
    return <Loader />
  }
  return (
    <>
 { items.length>0 ?
 <>
  <Metadata title="Confirm Order" />

<Checkoutsteps activeStep={1} />
<div className=" confirm-order" >


  <div className="confirm-order-body">


    <div className="confirm-order-main confirm-order-shipping">
      <div className='confirm-order-heading'>
        <div>


          <h3 className="confirm-order-heading-h3" ><LocalShippingIcon />  Shipping Address</h3>
        </div>
        <div>
          <span>  <LocationOnIcon /> 121001</span>
        </div>
      </div>


      <div className="Confirm-detail confirm-order-address">

        <h3 style={{ textTransform: 'capitalize' }}>{shippinginfo.firstname} {shippinginfo.lastname}</h3>
        <div style={{ textTransform: 'capitalize' }}>


          <p>{shippinginfo && shippinginfo.addressline1}</p>
          <p>{shippinginfo && shippinginfo.addressline2}</p>
          <p>{shippinginfo && shippinginfo.city}, {shippinginfo.state}</p>
          <p>{shippinginfo && shippinginfo.mobile}</p>
        </div>
        <Button variant="contained" onClick={() => handleConfirm()} className='confirm-order-button' >Proceed To Payment</Button>

      </div>

    </div>

    <div className="confirm-order-main ">
      <div className='confirm-order-heading'>
        <div>


          <h3 className="confirm-order-heading-h3" ><ShoppingBagIcon />  Your Order Summary</h3>
        </div>

      </div>


      <div className="Confirm-detail">

        <div className='responsive-div'>



          {items && items.map((item, index) => (
            <>
              <OrderDetail item={item} key={index} />
            </>
          ))}





        </div>


        <div >


          <hr />
          <div >

            <table className='confirm-order-charges '>
              <tr>
                <td>Subtotal:</td>
                <td><span>₹{subtotal}</span> </td>

              </tr>
              <tr>
                <td>Shipping Charges:</td>
                <td><span>₹{Shipping}</span></td>

              </tr>
              <tr>
                <td>Gst 18%:</td>
                <td><span>₹{GST}</span></td>

              </tr>

            </table>
            <hr />
            <table className='confirm-order-charges'>

              <tr>
                <td>Total:</td>
                <td><span>₹{Total}</span></td>

              </tr>
            </table>

          </div>

        </div>
      </div>

    </div>



  </div>

</div>
  
 </>
 : <>
 <div className='Checkout-empty'>
 <div >
 <h2>Cart Empty</h2>
 <Button onClick={()=>navigate('/')}>Go Back to Home Page</Button>
 
 </div>
 
 </div>
   </>
      

      
}

    </>
  )
}

export default Confirmorder