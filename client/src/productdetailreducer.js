
import { createSlice } from "@reduxjs/toolkit"; 
const initialState = {
    product: [],
    loading: false,
    error: null,
  };
const productdetailSlice=createSlice({
    name:'productdetail',
    initialState,
    reducers:{
        allProductDetailRequest:(state)=>{
        state.loading=true;
        state.error=null;
        
    },
    allProductDetailSuccess:(state,action)=>{
        state.loading=false;
        state.error=null;
        state.product=action.payload;
    },
    allProductDetailFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
       
    
   },
   clearProductDetailErrors:(state,action)=>{
    state.error=null;
    
   }
    }
})
export const {allProductDetailRequest,allProductDetailSuccess,allProductDetailFail,clearProductDetailErrors} = productdetailSlice.actions

export default productdetailSlice.reducer;
