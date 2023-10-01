import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error:null,
    isAuthenticated:false,
    user:{},
    islogout:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userLoginRequest:(state)=>{
            state.loading=true;
            state.error=null;
            state.isAuthenticated=false;
        },
        registerRequest:(state)=>{
            state.loading=true;
            state.error=null;
            state.isAuthenticated=false;
        },
           userlogoutRequest:(state)=>{
            state.loading=true;
            state.error=null;
            state.islogout=false;
        },
        
        userLoginSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload;
            state.isAuthenticated=true;
        
        },
        registerSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload;
            state.isAuthenticated=true;
        
        },
      
        
        
        userlogoutSuccess:(state)=>{
            state.loading=false;
            state.error=null;
            state.islogout=true;

        },
       
        
      
        userLoginFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          
        },
        registerFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
           
        },
      
        userlogoutFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          

        },
        
        clearusererror:(state)=>{
            state.error=null;
        }
    }
})

export const {userLoginRequest,userLoginSuccess,userLoginFail,registerRequest,registerSuccess,registerFail,updateuserRequest,updateuserSuccess,updateuserFail,clearusererror,userlogoutRequest,userlogoutSuccess,userlogoutFail} = userSlice.actions
export default userSlice.reducer;