import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdated:false,
  Loading: false,
  Error: null,
  message:'',
  success:'',
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: { 
    updateprofileRequest: (state) => {
      state.Loading = true;
      state.Error = null;
      state.isUpdated=false;
      state.message='';  
      state.success='';  
         },
    updatepasswordRequest: (state) => {
      state.Loading = true;
      state.Error = null;
      state.message='';  
      state.isUpdated=false; 
      state.success='';   
    },
    forgotpasswordRequest: (state) => {
      state.Loading = true;
      state.Error = null;
      state.message='';  
      state.isUpdated=false; 
      state.success='';    
    },
    resetpasswordRequest:(state)=>{
      state.Loading = true;
      state.Error = null;
      state.message='';  
      state.isUpdated=false;   
      state.success='';  
    },
    updateprofileSuccess: (state, action) => {
      state.Loading = false;
      state.Error = null;
      state.message='';  
      state.isUpdated = true;  
      state.success='';   
    },
    updatepasswordSuccess: (state, action) => {
      state.Loading = false;
      state.Error = null;
      state.isUpdated = true;
      state.message='';  
      state.success='';  
    },
    forgotpasswordSuccess: (state, action) => {
      state.Loading = false;
      state.Error = null;
      state.message=action.payload;  
      state.isUpdated = true;   
      state.success='';  
    },
    resetpasswordSuccess: (state, action) => {
      state.Loading = false;
      state.Error = null;
      state.message='';  
      state.isUpdated = true; 
      state.success=action.payload;  
    },
    updateprofileFail: (state, action) => {
      state.Loading = false;
      state.message='';  
      state.Error = action.payload; 
      state.success='';  
      },
    updatepasswordFail: (state, action) => {
      state.Loading = false;
      state.message='';  
      state.Error = action.payload;  
      state.success='';  
     },
    forgotpasswordFail: (state, action) => {
      state.Loading = false;
      state.message='';  
      state.Error = action.payload;   
      state.success='';  
    },
    resetpasswordFail: (state, action) => {
      state.Loading = false;
      state.message='';  
      state.Error = action.payload;   
      state.success='';  
    },
    clearprofileerror:(state)=>{
      state.Error=null;
    
    }
  },
});

export default profileSlice.reducer;
export const { updateprofileRequest, updateprofileSuccess, updateprofileFail,clearprofileerror,updatepasswordRequest,updatepasswordSuccess,updatepasswordFail,forgotpasswordRequest,forgotpasswordSuccess,forgotpasswordFail,resetpasswordRequest,resetpasswordSuccess,resetpasswordFail} = profileSlice.actions