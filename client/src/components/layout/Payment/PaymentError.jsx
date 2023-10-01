import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./PaymentSuccess.css"
import ClearIcon from '@mui/icons-material/Clear';
const PaymentError = () => {
    const navigate=useNavigate()
  return (
    <>
               <div className="paymentsuccess">

<div>
   <div className='doneicon cancelicon'>
   <ClearIcon className='' />

   </div>
    <h2>Your Payment was Failed</h2>
    <p>retry payment or go back to cart page</p>
      <div style={{margin:'15px 0'}}>
      <Button onClick={()=>navigate('/cart')}>Go Back to Cart Page</Button></div>

      </div>
</div>

    </>
  )
}

export default PaymentError