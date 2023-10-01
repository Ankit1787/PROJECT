import axios from "axios";
import Cookies from 'js-cookie';
import {allProductRequest,allProductSuccess,allProductFail,clearErrors} from "../reducer"
import  {allProductDetailRequest,allProductDetailSuccess,allProductDetailFail,clearProductDetailErrors} from "../productdetailreducer"
import { clearreviewerror, createreviewFail, createreviewRequest, createreviewSuccess } from "../ratingreducer";
export const getproducts=(search='',currentPage=1,price=[0,300000],category,rating=0)=>async (dispatch) => {
 
  try {
   
     dispatch(allProductRequest());
     if(category){
      const response = await axios.get(`http://localhost:8002/api/v2/products/?keyword=${search}&category=${category}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`)
      dispatch(allProductSuccess(response?.data))

         }
        
     else{
      const response = await axios.get(`http://localhost:8002/api/v2/products/?keyword=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`)
      dispatch(allProductSuccess(response?.data))
  
     }
   
  } catch (error) {
       console.log(error)
      if((error.response?.data?.error?.message)!==undefined){
      dispatch(allProductFail(error.response?.data?.error.message))
        }
      else{
        dispatch(allProductFail("Something went wrong"))

      }
    }
    // dispatch(allProductFail(error?.response?.data?.error?.message))
  
  
}
export const getallproducts=(currentPage=1)=>async (dispatch) => {
 
  try {
   
     dispatch(allProductRequest());
   
        
    
      const response = await axios.get(`http://localhost:8002/api/v2/products/?page=${currentPage}`)
      dispatch(allProductSuccess(response?.data))
  
     
   
  } catch (error) {
       console.log(error)
      if((error.response?.data?.error?.message)!==undefined){
      dispatch(allProductFail(error.response?.data?.error.message))
        }
      else{
        dispatch(allProductFail("Something went wrong"))

      }
    }
    // dispatch(allProductFail(error?.response?.data?.error?.message))
  
  
}

//get product detail by id 


export const getproductdetail=(id)=>async (dispatch) => {
  try {
     dispatch(allProductDetailRequest());
    const response = await axios.get(`http://localhost:8002/api/v2/product/${id}`);
 
      dispatch(allProductDetailSuccess(response?.data.product))
  } catch (error) {
    console.log(error.response?.data?.error.message)
    if((error.response?.data?.error?.message)!==undefined){
      dispatch(allProductDetailFail(error.response?.data?.error.message))
      }
    else{
      dispatch(allProductDetailFail("Something went wrong"))

    }
  
    
  }

}

export const createReview=(id,review)=>async (dispatch,getState)=>{
  try {
    dispatch(createreviewRequest())
   const response=await axios.put(`http://localhost:8002/api/v2/product/review`,{id,review},{headers: {
    Authorization: `Bearer ${Cookies.get('token')}`, // Get the token from the cookie
  }})
  console.log(response)
  
  dispatch(createreviewSuccess(response.data.success))
}
   catch (error) {
    console.log(error)
      dispatch(createreviewFail(error.response.data.error.message || 'something went wrong'))
    
    
  }
}
export const clearerror=()=> async(dispatch)=>{
  dispatch(clearErrors())
}
export const  clearProdErrors=()=> async(dispatch)=>{
  dispatch( clearProductDetailErrors())
}
export const  clearReviewError=()=> async(dispatch)=>{
  dispatch( clearreviewerror())
}