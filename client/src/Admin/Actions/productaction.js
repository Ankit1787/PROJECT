import axios from 'axios';
import { clearCREATEProductErrors, createproductFail, createproductRequest, createproductSuccess } from '../reducers/productreducers';
import Cookies from 'js-cookie';

export const CREATEPRODUCT=(data)=>async (dispatch) => {
   
 
 try {
  
    dispatch(createproductRequest());
  
       
   
     const response = await axios.post(`http://localhost:8002/api/v2/admin/products/new`,data,{
        headers:{
            Authorization: `Bearer ${Cookies.get('token')}`
        }
     })
     console.log(response.data)
     dispatch(createproductSuccess(response?.data))
 
    
  
 } catch (error) {
      console.log(error)
       dispatch(createproductFail(error.response.data.error.message || "Something went wrong"))

     
   }
   // dispatch(allProductFail(error?.response?.data?.error?.message))
 
 
}


export const CLEARPRODUCTERROR=()=>async(dispatch)=>{
    dispatch(clearCREATEProductErrors())
}