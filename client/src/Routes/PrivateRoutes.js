import React from 'react'
import { Navigate } from 'react-router-dom';


export const PrivateRoutes = ({isAuthenticated,element,path}) => {

 
    if (isAuthenticated) {
    // Redirect unauthenticated users to the login page
  
  return element;
    
  }

  // Allow authenticated users to access the route
  return <Navigate to={path} replace />;
}


export const AdminRoutes = ({isAuthenticated,element,path ,admin}) => {
  console.log(admin,'admin')
  if (isAuthenticated && admin==="admin") {
  // Redirect unauthenticated users to the login page
  
    return element;
   
  }
  
    return <Navigate to={path} replace />; 
  }

  // Allow authenticated users to access the route
 
