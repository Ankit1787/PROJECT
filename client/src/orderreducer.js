import { createSlice } from "@reduxjs/toolkit";


const initialState={
    orders:[],
    loading:false,
    error:null,

}

const orderSlice=createSlice({
    initialState,
    name:"orders",
    reducers:{
        createorderRequest:(state)=>{
            state.loading=true;
            state.error=null;
            state.orders=[];
        },
        createorderSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.orders=action.payload;
        },
        createorderFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
           
        },
        clearorderError:(state)=>{
            state.error=null;
        }
    }
    

})

export default orderSlice.reducer;
export const {createorderRequest,createorderSuccess,createorderFail,clearorderError}=orderSlice.actions;