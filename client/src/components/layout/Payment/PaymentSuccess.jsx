import React from 'react'
import Checkoutsteps from '../../../pages/Checkout/Checkoutsteps';
import "./PaymentSuccess.css"
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
   
     const navigate=useNavigate()
  // Use the get method to retrieve the values of the query parameters
 
  
    
    return (
        <>
          <Checkoutsteps activeStep={2} />
            <div className="paymentsuccess">

                <div>
                   <div className='doneicon'>
                   <DoneIcon className='' />

                   </div>
                    <h2>Your Payment was Successfull</h2>
                    <p>Your Order will be delivered soon</p>
                      <div style={{margin:'15px 0'}}>
                      <Button onClick={()=>navigate('/myorders')}>Go To MyOrders</Button>

                      </div>
                </div>
              
            </div>
        </>
    )
}

export default PaymentSuccess