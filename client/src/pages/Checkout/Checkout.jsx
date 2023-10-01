import React, { useEffect, useState } from 'react'
import "./Checkout.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import Checkoutsteps from './Checkoutsteps';
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { UPDATESHIPPINGINFO } from '../../Actions/cartaction';
const Checkout = () => {
  
  const dispatch=useDispatch()
  const alert= useAlert()
  const navigate=useNavigate()
  
  const {items,shippinginfo} = useSelector((state)=>state.cart)
 
  const [shippingData,setShipingData]=useState({})
  const handleInputChange = (e) => {

    setShipingData({
      ...shippingData,[e.target.name]:e.target.value})
   
  }
  
  const handleCheckoutSubmit = (e) => {
    e.preventDefault()
    console.log(shippingData.mobile)
    if(shippingData.pincode===undefined ){
       alert.error("Please Enter Pincode")
    }
    if(shippingData.mobile ?shippingData.mobile.length!==10 : true){
      alert.error("Please Enter 10 digit mobile number")
    }
    if(!shippingData.firstname){
      alert.error("Please enter First Name")
    }
    if(!shippingData.lastname){
      alert.error("Please Enter last name")
    }
    if(!shippingData.addressline1){
      alert.error("Please Enter Address line2")
    }
    if(!shippingData.addressline2){
      alert.error("Please Enter Address line2")
    }
    
    
   dispatch(UPDATESHIPPINGINFO(shippingData))
   if(shippinginfo){
   alert.success('Address Submited succesfuly')
    navigate('confirmorder')
    console.log("register succesfully")
    console.log(shippingData)
   }
  
  
   
  }
    
  


  

  async function fetchLocationData(pincode) {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (response.data && response.data[0] && response.data[0].PostOffice) {
        const postOffice = response.data[0].PostOffice[0];
        const state = postOffice.State;
        const city = postOffice.District;
        return { state, city };
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
    return null;
  }
  const [Data, setData] = useState({})
  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    const locationData = await fetchLocationData(pincode);

    if (locationData) {
      // Do something with locationData, e.g., set it in state or display it to the user.
      console.log('State:', locationData.state);
      console.log('City:', locationData.city);
      setData(locationData)
     setShipingData({...shippingData,[e.target.name]:e.target.value,'state':locationData.state,'city':locationData.city})

    }
  };
  useEffect(() => {

    if(shippinginfo?.pincode){
      setShipingData({...shippinginfo})
    }
  },[shippinginfo])

  return (
    <>
   { items.length>0 ? 
   <><Checkoutsteps activeStep={0}/>
      <div className="checkout-container">

        <div className="checkout-Main">
          <h2>Checkout </h2>


          <form
            noValidate autoComplete="off"
            encType='multipart/form-data'
            onSubmit={handleCheckoutSubmit}

            className=''
          >
            <h4>Shipping Address </h4>
            <div>
              <div className='checkout-form-name'>


                <TextField
                  required
                  value={shippingData.firstname}
                  name='firstname'
                  label="Name"
                  id="standard-size-normal"
                  className='checkout-textfield'
                  onChange={(e) => handleInputChange(e)}
                  variant="standard"
                />
                <TextField
                value={shippingData.lastname}
                  required
                  name='lastname'
                  label="Last Name"
                  id="standard-size-normal"
                  className='checkout-textfield'
                  onChange={(e) => handleInputChange(e)}
                  variant="standard"
                />
              </div>
              <TextField
                required
                value={shippingData.mobile}
                name='mobile'
                label="Mobile No"
                type='number'
               
                id="standard-size-normal"
                className='checkout-textfield'
                onChange={(e) => handleInputChange(e)}
                variant="standard"
              />
              <TextField
                required
                 value={shippingData.addressline1}
                name='addressline1'
                label="Address Line 1"
                id="standard-size-normal"
                className='checkout-textfield'
                onChange={(e) => handleInputChange(e)}
                variant="standard"
              />
           
              <TextField
                required
                value={shippingData.addressline2}
                name='addressline2'
                label="Address Line 2"
                id="standard-size-normal"
                className='checkout-textfield'
                onChange={(e) => handleInputChange(e)}
                variant="standard"
              />

              <TextField
              value={shippingData.pincode}
              name='pincode'
                label="Enter Pincode"
                variant="standard"
                className="user-textfield"
                onChange={handlePincodeChange}

              />

              <div className='checkout-form-name'>



                <TextField
                name='state'
                  defaultValue={"State"}
                  value={shippingData.state ? shippingData.state : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled={Data === {} ? true : false}
                  label="State"
                  variant="standard"
                  className="checkout-textfield"

                />
                <TextField
                  defaultValue={"City"}
                  name='city'
                  disabled={Data === {} ? true : false}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={shippingData.city ? shippingData.city : ''}
                  label="City"
                  variant="standard"
                  className="checkout-textfield"
                />
              </div>





 
<Button className='checkout-shipping-btn' variant="contained" type='submit'   >Proceed</Button>


            </div>
          </form>

        </div>

      </div>
    </> : <div className='Checkout-empty'>
 <div >
 <h2>Cart Empty</h2>
 <Button onClick={()=>navigate('/')}>Go Back to Home Page</Button>
 
 </div>
 
 </div>}
    </>
  )
}

export default Checkout