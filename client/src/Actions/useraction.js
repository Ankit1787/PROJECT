import axios from "axios";
import {userLoginRequest,userLoginSuccess,userLoginFail,registerRequest,registerSuccess,registerFail,clearusererror,userlogoutRequest,userlogoutSuccess,userlogoutFail} from "../userreducer"
import { updateprofileRequest, updateprofileSuccess, updateprofileFail,clearprofileerror,updatepasswordRequest,updatepasswordSuccess,updatepasswordFail,forgotpasswordRequest,forgotpasswordSuccess,forgotpasswordFail,resetpasswordRequest,resetpasswordSuccess,resetpasswordFail} from "../profilereducer"
import Cookies from 'js-cookie';

 import {loaduserFail,loaduserRequest,loaduserSuccess,clearLoadError} from './../userload'

export const getuserdata=(userdata)=>async(dispatch)=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
  
    try {
        dispatch(userLoginRequest())
        const response=await axios.post("http://localhost:8002/api/v2/user/login",userdata,config)
       
        dispatch(userLoginSuccess(response.data?.user))
        Cookies.set('token', response.data.token,{expires:7});
      
    }
    
        
    catch (error) {
        console.log(error)
        if((error.response?.data?.error?.message)!==undefined){
      dispatch(userLoginFail(error.response?.data?.error.message))
        }
      else{
        dispatch(userLoginFail("Something went wrong"))

      }
        
    }
}
export const userRegister = (myform) => async(dispatch)=>{
  const config = {
    headers: {
      "Content-Type": "mutipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  }
    try {
      dispatch(registerRequest())
        const response = await axios.post("http://localhost:8002/api/v2/user/register",myform,config)
       
        dispatch(registerSuccess(response.data.user))
        Cookies.set('token', response.data.token,{expires:7});
    } catch (error) {
      if((error.response?.data?.error?.message)!==undefined){
    dispatch(registerFail(error.response?.data?.error.message))
      }
    else{
      dispatch(registerFail("Something went wrong"))

    }
    }

}
export  const LoadUser =()=>async(dispatch)=>{
  
 
 
  try {
    dispatch(loaduserRequest())
    const response =await axios.get("http://localhost:8002/api/v2/user/me",{
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`, 
  }},)
  
    dispatch(loaduserSuccess(response?.data))
    
  } catch (error) {
   console.log(error)
    
    if(error.response?.data?.error?.message){
      
        dispatch(loaduserFail(error.response?.data?.error?.message) || "Something went wrong")
  
      }
  }
}

export const updateUser=(data)=>async(dispatch)=>{
 
  
  try {
    dispatch(updateprofileRequest())
    const response =await axios.put("http://localhost:8002/api/v2/user/me/updateuserprofile",data,{ 
  headers: {
    "Content-Type": "mutipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    
    Authorization: `Bearer ${Cookies.get('token')}`, 
  }})
  
    dispatch(updateprofileSuccess(response?.data.success))
   console.log(response)  
  } catch (error) {
    console.log(error)
    if((error.response?.data?.error?.message)!==undefined){
      dispatch(updateprofileFail(error.response?.data?.error.message))
        }
      else{
        dispatch(updateprofileSuccess("Something went wrong"))
  
      }
  
    
  }
}

export const logoutUser=()=>async(dispatch)=>{
  try {
    dispatch(userlogoutRequest())
    const response =await axios.get("http://localhost:8002/api/v2/user/logout",{
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  }},)
  
    dispatch(userlogoutSuccess(response?.data.success))
    Cookies.remove('token');
   
  
    
  } catch (error) {

      if((error.response?.data?.error?.message)!==undefined){
      dispatch(userlogoutFail(error.response?.data?.error.message))
        }
      else{
        dispatch(userLoginFail("Something went wrong"))
  
      }
  }
}
export const updatePassword=(data)=>async(dispatch)=>{
  try {
    dispatch(updatepasswordRequest())
    const response =await axios.put("http://localhost:8002/api/v2/user/password/updatepassword",data,{ headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get('token')}`, // Get the token from the cookie
  }})
  console.log(response.data)
    dispatch(updatepasswordSuccess())
  } catch (error) {
    console.log(error)
    if((error.response?.data?.error?.message)!==undefined){
      dispatch(updatepasswordFail(error.response?.data?.error.message))
        }
      else{
        dispatch(updatepasswordFail("Something went wrong"))
  
      }
  }
}
export const forgotPassword=(data)=>async(dispatch)=>{
  try {
    dispatch(forgotpasswordRequest())
    const response =await axios.post("http://localhost:8002/api/v2/user/forgot-password",data)
  console.log(response.data)
    dispatch(forgotpasswordSuccess(response.data.message))
  } catch (error) {
    console.log(error)
    if((error.response?.data?.error?.message)!==undefined){
      dispatch(forgotpasswordFail(error.response?.data?.error.message))
        }
      else{
        dispatch(forgotpasswordFail("Something went wrong"))
  
      }
  }
}
export const resetPassword=(token,data)=>async(dispatch)=>{
  try {
    dispatch(resetpasswordRequest())
    const response =await axios.put(`http://localhost:8002/api/v2/user/password/reset/${token}`,data)
  console.log(response.data)
    dispatch(resetpasswordSuccess(response.data.success))
  } catch (error) {
    console.log(error)
    if((error.response?.data?.error?.message)!==undefined){
      dispatch(resetpasswordFail(error.response?.data?.error.message))
        }
      else{
        dispatch(resetpasswordFail("Something went wrong"))
  
      }
  }
}

export const ClearUserError=()=>async(dispatch)=>{
  dispatch(clearusererror())
}
export const ClearprofileError=()=>async(dispatch)=>{
  dispatch(clearprofileerror())
}
export const  CLEARLOADERROR=()=>async(dispatch)=>{
  dispatch(clearLoadError())

}
