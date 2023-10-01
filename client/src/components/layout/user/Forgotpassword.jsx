import {React,useEffect,useState} from 'react'
import './LoginSignup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'

import {  forgotPassword } from '../../../Actions/useraction';
import {ClearUserError } from '../../../Actions/useraction';

const Forgotpassword = () => {
    const alert =useAlert()
    const navigate=useNavigate()
 
 const {Error,message}=useSelector((state)=>state.profile)

 const dispatch=useDispatch()
 


 const [userData, setUserData] = useState({
   email: ""
 
 });
 

 const handelFormSubmit = (e) => {
   e.preventDefault()
   dispatch(forgotPassword(userData))
  console.log(userData)
   

  

 }
 
 
 
 const handleInputChange = (e) => {
   const { id, value } = e.target;
 
     setUserData({ ...userData, [id]: value });

 }

 useEffect(()=>{
   if(Error ){
    
       alert.error(Error)
       dispatch(ClearUserError())
     }
    else if(message){
     alert.success(message)
     navigate('/')
     
    }
  
  
  
 }
 
    , [dispatch,Error,alert,message,navigate])
 
  return (
    <>
             <div className="user-container">
        <div className="user-box">
       
        <h3 className="user-heading"  >Forgot Password</h3>
         
    
        
      
          
          <div className="user-form-container">
       
          
            <div className="user-form-wrapper">
        <form
              noValidate autoComplete="off"
              encType='multipart/form-data'
              className='user-form'
              onSubmit={handelFormSubmit}
            >
          
              <TextField
                required
                type='email'
                id="email" label="Email Address"
                className='user-textfield'
                value={userData.email}
                onChange={(e)=>handleInputChange(e)} />
             
              <Button variant="contained" type='submit'  >Submit</Button>
            </form> 
          </div>
          </div>
        </div>



      </div>
    </>
  )
}

export default Forgotpassword