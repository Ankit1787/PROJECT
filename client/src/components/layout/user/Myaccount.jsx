import React, { useEffect, useState } from 'react'
import  {useDispatch,useSelector} from 'react-redux'
import Loader from '../Loader.js/Loader'
import Button from '@mui/material/Button';
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom'
import { CLEARLOADERROR, ClearprofileError, LoadUser, logoutUser, updateUser } from '../../../Actions/useraction';
import Metadata from '../Metadata'
import { updatePassword } from '../../../Actions/useraction';
import {IoIosArrowRoundBack} from 'react-icons/io'
const Myaccount = () => {

  const navigate= useNavigate()
const dispatch=useDispatch()
  const alert = useAlert();
    const {profile,Load,isAuth,err} =useSelector((state)=>state.LoadUser)
    const {isUpdated,Loading,Error}=useSelector((state)=>state.profile)
    const [isEditing, setIsEditing] = useState({
      name:false,email:false,mob:false,image:false
    });
   
    
  
  
 const [profileView,setprofileView]=useState("profile")
  
 
    const [avatar,setAvatar]=useState('')
    const [avatarPreview,setAvatarPreview]=useState('')
        const [User, setUser] = useState({
   
    });
  
    const handleAvatarchange=(e)=>{
   
   const selectedAvatar = e.target.files[0];

   if (selectedAvatar) {
     const reader = new FileReader();
     reader.onload = () => {
       if (reader.readyState === 2) {
         setAvatar(reader.result); // Set the selected avatar file
         setAvatarPreview(reader.result)
         // Set the avatar preview
       }
     };
     reader.readAsDataURL(selectedAvatar); // Read the image as a data URL
   }
 
 } 
    

  
 console.log(User)
  const handleEditClick = (type) => {
    setIsEditing({
      ...isEditing,
      [type]: true,
    });
   
  };
   const [changepassword,setchangepassword]=useState({
   
   })
  const handleInputChange = (event,type) => {
      
    if(type==='profile'){
      setUser({
        ...User,
        [event.target.name]: event.target.value,
      });
    }
    else if(type==='changepassword'){
      setchangepassword({
        ...changepassword,
        [event.target.name]: event.target.value,
      });
    
    }
    
   
 
    
  }

 
  useEffect(()=>{
    const callback=()=>{
      dispatch(ClearprofileError());
      dispatch(CLEARLOADERROR())
    };
    
    
    if(profile){
      setUser({...profile})
     
      setAvatar(profile?.avatar?.url)
    }
    if(Error || err){

      alert.show(Error || err)
     
     return callback
    }
   
   
     
    
    
    
  
  },[err,dispatch,profile,Error,alert,isUpdated,isAuth,navigate])
  const handlelogout=()=>{
    dispatch(logoutUser()).then(()=>{
      dispatch(LoadUser())
      alert.show('Logged Out Successfully')
      navigate('/')
    })
  }
  const handleformsubmit=(event,type)=>{
  
   const myform=new FormData()
   myform.append('name',User.name)
   myform.append('email',User.email)
   myform.append('avatar',avatar)
    dispatch(updateUser(myform)).then(()=>{
      dispatch(LoadUser())
      alert.show('Profile Updated Successfully')   


    })
    
   
  
   
    setIsEditing({
      ...isEditing,
      [type]: false,
    });
    setAvatarPreview('')
  }
  const formsubmit=(e)=>{
    e.preventDefault()
  }
  const passwordsubmit=(e)=>{
   e.preventDefault();
   dispatch(updatePassword(changepassword)).then(()=>{
    if(isUpdated){
      alert.show('Password Updated Successfully')

    }
    setprofileView('profile')
   })
   console.log(
    'password change succesfuly'

   )
   console.log(changepassword)
  }
  const getMaskedValue = (value) => {
  
    // Display the first 2 characters, mask the middle characters, and display the last 2 characters
   
      const firstTwo =  value.substring(0, 2);
      const masked = '*'.repeat(value.length - 4); // Mask middle characters
      const lastTwo = value.substring(value.length - 2);
      return `${firstTwo}${masked}${lastTwo}`;
  
    
  };
  
  if(Load||Loading){
      return <Loader />
    }
  return (
    <>
    <Metadata title={`My Profile`}/>
        <div >
        <div className='back-btn'>
                <Button onClick={()=>navigate(-1)}> <IoIosArrowRoundBack size={40} />Back</Button>
            </div>
        <div className="myaccount-container">
            <h2>My Profile</h2>
            <div className="myaccount-body">
        
    
             
             <div className="account-nav" >
                 <ul>
                 <li onClick={()=>setprofileView('profile')}><span className="">Profile</span></li> 
                 
                 <li><span className="" onClick={()=>setprofileView('changepassword')}>Change Password</span></li>
                
                  <li><span className="" onClick={handlelogout}>Logout</span></li>
                 
                 </ul>
                  </div>
             
    
     
 {(profileView==="profile") ?
 <form className='form'  id='form' action="" onSubmit={formsubmit}>
   <div className='myaccount-img'>
               <img src={avatar} alt="" />
               {!isEditing.image ? (
        <button onClick={()=>handleEditClick('image')} className='edit'>Change Profile pic</button>
      ) : <div className='edit-button'>
  {!avatarPreview ? <input type="file"  id='avatar' name='avatar' onChange={handleAvatarchange}  accept='image/*' />
  :<Button type='submit' onClick={(e)=>handleformsubmit(e,'image')} variant="contained" sx={{padding:'15px 45px',textTransform:'capitalize' }} className='' >Save</Button>
}          
      </div>}
  
    </div>
     <div className='myaccount-form'>

     
      <div className='myaccount-form-name'>
      <input
          type="text"
          className={`username ${isEditing.name ? "" : "disabled input-name"}`}
          name="name"
          required
          disabled={!isEditing.name}
          autoComplete="name"
          tabIndex="1"
          value={User.name}
          onChange={(e)=>handleInputChange(e,'profile')}
        />
          {!isEditing.name ? (
        <button onClick={()=>handleEditClick('name')} className='edit'>Edit</button>
      ) :""}
      { isEditing.name && <Button type='submit' onClick={(e)=>handleformsubmit(e,'name')} variant="contained" sx={{padding:'15px 45px',textTransform:'capitalize' }} className='' >Save</Button>}
       
      </div>
      {/* email */}
      <div>
      <h2>Email</h2>
      <div>
      <input
          type="email"
          className={`username email ${isEditing.email ? "" : "disabled input-name"}`}
          name="email"
          required
          disabled={!isEditing.email}
          autoComplete="name"
          tabIndex="1"
          value={isEditing.email? User.email: User.email && getMaskedValue(User?.email)}
          onChange={(e)=>handleInputChange(e,'profile')}
        />
          {!isEditing.email ? (
        <button onClick={()=>handleEditClick('email')} className='edit'>Edit</button>
      ) :""}
      { isEditing.email && <Button onClick={(e)=>handleformsubmit(e,'email')} type='submit' variant="contained" sx={{padding:'15px 45px',textTransform:'capitalize' }} className='' >Save</Button>}
       

      </div>
    
      </div>
      {/* mobile  */}
      <div>
      <h2>Mobile Number</h2>
      <div>
      <input
          type="text"
          className={`username mobile ${isEditing.mob ? "" : "disabled input-name"}`}
          name="mob"
          required
          disabled={!isEditing.mob}
          autoComplete="name"
          tabIndex="1"
          value={getMaskedValue('9876544312')}
          onChange={(e)=>handleInputChange(e,'profile')}
        />
          {!isEditing.mob ? (
        <button onClick={()=>handleEditClick('mob')} className='edit'>Edit</button>
      ) :""}
      { isEditing.mob && <Button type='submit' variant="contained" sx={{padding:'15px 45px',textTransform:'capitalize' }} className='' >Save</Button>}
   
      </div>
         
      </div>
      </div>
     </form> :
     <form className='form'  id='form' action="" onSubmit={passwordsubmit}>

     <div className='myaccount-form'>
      {/* email */}
      <div>
      <h2>Current Password</h2>
      <div>
      <input
          type="password"
          name="oldpassword"
          required
          autoComplete="oldpassword"
          tabIndex="1"
          className={`username`}
          onChange={(e)=>handleInputChange(e,'changepassword')}
          placeholder='Enter current password'
        />
        

      </div>
    
      </div>
      <div>
      <h2>New Password</h2>
      <div>
      <input
          type="password"
          name="newpassword"
          required
          autoComplete="newpassword"
          tabIndex="1"
          className={`username`}
          onChange={(e)=>handleInputChange(e,'changepassword')}
          placeholder='Enter new password'
        />
        

      </div>
    
      </div>
      {/* mobile  */}
      <div>
      <h2>Confirm Password</h2>
      <div>
      <input
          type="password"
          name="confirmPassword"
          required
          autoComplete="confirmPassword"
          tabIndex="1"
          className={`username`}
          onChange={(e)=>handleInputChange(e,'changepassword')}
          placeholder='Enter confirm password'
        />
      </div>
         
      </div>
    
     
      <Button type='submit' variant="contained" sx={{padding:'15px 45px' ,mt:3,textTransform:'capitalize' }} className='' >Proceed</Button>

    

      </div>
     </form>
}
    
    
  
            </div>
        </div>
        </div>
    </>
  )
}

export default Myaccount