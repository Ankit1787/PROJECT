import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Load: false,
    isAuth:false,
    err: null,
    profile:{}
}

const loadSlice=createSlice({
    initialState,
    name:"load",
    reducers:{
        loaduserRequest:(state)=>{
            state.Load=true;
            state.err=null;
            state.isAuth=false;
            state.profile={};
        },
   
  loaduserSuccess:(state,action)=>{
    state.Load=false;
            state.err=null;
            state.isAuth=action.payload.success;
            state.profile=action.payload.user
  },  
  loaduserFail:(state,action)=>{
    state.Load=false;
    state.err=action.payload;
          
          
        },
        clearLoadError:(state)=>{
            state.err=null;
            state.Load=false;
        
        }
    }
})

export default loadSlice.reducer;

export const {loaduserFail,loaduserRequest,loaduserSuccess,clearLoadError}=loadSlice.actions;