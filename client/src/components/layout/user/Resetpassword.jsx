import {React,useEffect,useState} from 'react'
import './LoginSignup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate,useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import  Loader from '../../layout/Loader.js/Loader'
import { ClearprofileError, resetPassword } from '../../../Actions/useraction';
const Resetpassword = () => {
    const {token}=useParams()
    const alert =useAlert()
    const navigate=useNavigate()
 const {Loading,Error,success}=useSelector((state)=>state.profile)
 const dispatch=useDispatch()
 


 const [userData, setUserData] = useState({
   
 
 });
 

 const handelFormSubmit = (e) => {
   e.preventDefault()
   dispatch(resetPassword(token,userData))
  console.log(userData)
   

  

 }
 
 
 
 const handleInputChange = (e) => {
   const { id, value } = e.target;
 
     setUserData({ ...userData, [id]: value });

 }

 useEffect(()=>{
   if(Error ){
    
       alert.error(Error)
       dispatch(ClearprofileError())
     }
    else if(success){
      
     alert.success('password updated successfully')
     navigate('/signup')
     }
     
    }
  
 
    , [dispatch,Error,alert,success,navigate])
 
    if(Loading){
        return <Loader />
    }
  return (
    <>
               <div className="user-container">
        <div className="user-box">
       
        <h3 className="user-heading"  >Reset Password</h3>
         
    
        
      
          
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
                type='password'
                id="password" label="New Password"
                className='user-textfield'
                value={userData.password}
                onChange={(e)=>handleInputChange(e)} />
              <TextField
                required
                type='password'
                id="confirmPassword" label="Confirm Password"
                className='user-textfield'
                value={userData.confirmPassword}
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

export default Resetpassword