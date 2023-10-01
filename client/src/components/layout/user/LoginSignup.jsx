
import React, { useEffect, useState } from 'react'
import './LoginSignup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import  Loader from '../../layout/Loader.js/Loader'
import { CLEARLOADERROR } from '../../../Actions/useraction';
import { getuserdata ,userRegister,ClearUserError } from '../../../Actions/useraction';

const LoginSignup = () => {
     const alert =useAlert()
     const navigate=useNavigate()
  const {isAuthenticated,error,loading}  =useSelector((state)=>state.user)
  const {isAuth,Error,Loading}  =useSelector((state)=>state.LoadUser)
  const [activeHeading,setActiveHeading]=useState('signup')
  const dispatch=useDispatch()
  
 
  const [avatar,setavatar]=useState(null)
 
  const [userData, setUserData] = useState({
   name:''
    , email: ""
    , password: ""
  

  });
  const [avatarPreview,setAvatarPreview]=useState(null)
  const [loginData, setLoginData] = useState({
    email: ""
    , password: ""
   

    


  });

  const handelFormSubmit = (e) => {
    e.preventDefault()
    dispatch(getuserdata(loginData))
  
    

   
 
  }
  const handleRegisterSubmit=(e)=>{
    e.preventDefault()
   const myform= new FormData();

   myform.append('name',userData.name)
   myform.append('email',userData.email)
   myform.append('password',userData.password)
   myform.append('avatar',avatar)
   
   dispatch(userRegister(myform))
   console.log("register succesfully")
  
  }
  const handleAvatarchange=(e)=>{
   
    const selectedAvatar = e.target.files[0];

    if (selectedAvatar) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatar(reader.result); // Set the selected avatar file
          setAvatarPreview(reader.result); // Set the avatar preview
        }
      };
      reader.readAsDataURL(selectedAvatar); // Read the image as a data URL
    }
  
  } 
  
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'signup') {
    
      setUserData({ ...userData, [name]: value });

    
  
  }
  else if (formType === 'login') {
    setLoginData({ ...loginData, [name]: value });
   
  }
  }
  const handleTabClick = (tab) => {
    setActiveHeading(tab);
  }
  useEffect(()=>{
    if(error || Error ){
     
        alert.error(error || Error)
        dispatch(ClearUserError())
        dispatch(CLEARLOADERROR())
      }
      else if( isAuth){
        navigate('/')
       }
  
     }, [dispatch,error,alert,isAuthenticated,Error,isAuth,navigate])
  

 
  if(loading || Loading){
    return <Loader/>
  }
 

 


  return (
    <>
      <div className="user-container">
        <div className="user-box">
        <div className='user-box-header'>
        <h3 className={(activeHeading ==='signup') ? 'user-heading active' :'user-heading'} onClick={() => handleTabClick('signup')}>Signup</h3>
          <h3 className={(activeHeading ==='login') ? 'user-heading bactive' :'user-heading '} onClick={() => handleTabClick('login')}>Login</h3>
        </div>
        
      
          
          <div className="user-form-container">
          <div className={`user-form-wrapper ${activeHeading === 'signup' ? '' : 'slide-left'}`}>
            <form
             noValidate autoComplete="off"
              encType='multipart/form-data'
              onSubmit={handleRegisterSubmit}
           
              className='user-form'
            >
            
                <TextField
                  required
                  name="name"
                  label="Name"
                  className='user-textfield'
                  value={userData.name}
                  onChange={(e)=>handleInputChange(e,"signup")}
                />
              
              <TextField
                required
                type='email'
                name="email" label="Email Address"
                className='user-textfield'
                value={userData.email}
                onChange={(e)=>handleInputChange(e,"signup")} />
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={(e)=>handleInputChange(e,"signup")}
              />
              <div className='file'>
             {avatarPreview && <img src={avatarPreview} className='avatar-preview' name='avatar-preview'  alt="" /> 
              }<input type="file" sx={{}} name='avatar'  onChange={handleAvatarchange}  accept='image/*' />
              </div>
              <Button variant="contained" type='submit' onClick={handleRegisterSubmit}  >Sign up</Button>
            </form>
            </div>
          
            <div className={`user-form-wrapper ${activeHeading === 'login' ? 'slide-right' : ''}`}>
          <form
              noValidate autoComplete="off"
              encType='multipart/form-data'
              className='user-form'
              onSubmit={handelFormSubmit}
            >
          
              <TextField
                required
                name="email" label="Email Address"
                className='user-textfield'
                value={loginData.email}
                onChange={(e)=>handleInputChange(e,"login")} />
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={loginData.password}
                onChange={(e)=>handleInputChange(e,"login")}
              />
              <Button variant="contained" type='submit' onClick={handelFormSubmit} >login</Button>
              <Link to='/forgot-password' className='forgot-password'><p>Forgot Password ?</p></Link>
            </form>
          </div>
          </div>
        </div>



      </div>
    </>
  )
}

export default LoginSignup