import { createSlice } from "@reduxjs/toolkit";


const initialState={
    Orders:[],
    loading:false,
   
    error:null,
    err:null,
    order:[],

}

const MyOrdersSlice=createSlice({
    initialState,
    name:"allorders",
    reducers:{
        getordersRequest:(state)=>{
            state.loading=true;
            state.error=null;
            state.Orders=[];
        },
        getsingleorderRequest:(state)=>{
            state.loading=true;
            state.err=null;
            state.order=[];
        },
        getordersSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.Orders=action.payload;
        },
        getsingleordersSuccess:(state,action)=>{
            state.loading=false;
            state.err=null;
            state.order=action.payload;
        },
        getordersFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
           
        },
        getsingleorderFail:(state,action)=>{
            state.loading=false;
            state.err=action.payload;
           
        },
        clearGetOrdersError:(state)=>{
            state.error=null;
        },
        cleargetSingleOrdersError:(state)=>{
            state.err=null;
        }
    }
    

})

export default MyOrdersSlice.reducer;
export const {getordersRequest,getordersSuccess,getordersFail,clearGetOrdersError,getsingleorderRequest,getsingleordersSuccess,getsingleorderFail,cleargetSingleOrdersError}=MyOrdersSlice.actions;