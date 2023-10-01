import axios from 'axios';
import {createorderRequest,createorderSuccess,createorderFail,clearorderError} from "../orderreducer"
import Cookies from 'js-cookie';
import {getordersRequest,getordersSuccess,getordersFail,clearGetOrdersError,getsingleorderRequest,getsingleordersSuccess,getsingleorderFail,cleargetSingleOrdersError} from "../MyOrdersReducer"
export const createOrder=(order)=>async(dispatch)=>{
try {
  console.log(order)
    dispatch(createorderRequest());
    const response=axios.post("http://localhost:8002/api/v2/orders/new",order,{ headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get('token')}`, // Get the token from the cookie
    }})
    console.log(response)
    dispatch(createorderSuccess(response?.data?.order))
    
} catch (error) {
    if((error.response?.data?.error?.message)!==undefined){
        dispatch(createorderFail(error.response?.data?.error.message))
        }
      else{
        dispatch(createorderFail("Something went wrong"))
  
      }
    
}


}

export const getOrders=()=>async(dispatch)=>{
  try {
 
    dispatch(getordersRequest());
    const response= await axios.get('http://localhost:8002/api/v2/me/orders',{ headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get('token')}`, // Get the token from the cookie
    }})
    console.log(response)
    dispatch(getordersSuccess(response?.data?.orders))
    
} catch (error) {
  console.log(error)
    if((error.response?.data?.error?.message)!==undefined){
        dispatch(getordersFail(error.response?.data?.error.message))
        }
      else{
        dispatch(getordersFail("Something went wrong"))
  
      }
    
}
}
export const getSingleOrder=(id)=>async(dispatch)=>{
  try {
 
    dispatch(getsingleorderRequest());
    const response= await axios.get(`http://localhost:8002/api/v2/order/${id}`,{ headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get('token')}`, // Get the token from the cookie
    }})
    console.log(response)
    dispatch(getsingleordersSuccess(response?.data?.order))
    
} catch (error) {
  console.log(error)

    if((error.response?.data?.error?.message)!==undefined){
        dispatch(getsingleorderFail(error.response?.data?.error.message))
        }
      else{
        dispatch(getsingleorderFail("Something went wrong"))
  
      }
    
}
}

export const  CLEARORDERERROR=()=>async(dispatch)=>{
   dispatch(clearorderError())
}
export const  CLEARGETORDERERROR=()=>async(dispatch)=>{
   dispatch(clearGetOrdersError())
}
export const  CLEARGETSINGLEORDERERROR=()=>async(dispatch)=>{
   dispatch(cleargetSingleOrdersError())
}