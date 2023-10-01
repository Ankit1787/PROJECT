import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading2: false,
    error2:null,
    ruser:{},
    isAuthenticated2:false,
}
const registerSlice=createSlice({
    name:"register",
    initialState,
    reducers:{
        registerRequest:(state)=>{
            state.loading2=true; 
            state.error2=null;
            state.isAuthenticated2=false;
        },
        registerSuccess:(state,action)=>{
            state.loading2=false; 
            state.error2=null;
            state.ruser=action.payload;
            state.isAuthenticated2=true;
        },
        registerFail:(state,action)=>{
            state.loading2=false; 
            state.error2=action.payload;
            state.isAuthenticated2=false;
        },
        clearregistererror:(state)=>{
            state.error2=null;
            state.loading2=false
        }
    }
})

export default registerSlice.reducer;

export const {registerRequest,registerSuccess,registerFail,clearregistererror} = registerSlice.actions;