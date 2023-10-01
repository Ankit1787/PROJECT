import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    products: [],
    loading: false,
    error: null,
    resultperpage:0,
    productcount:0
  };

 const productSlice = createSlice({
    name: 'product',
    initialState,
   reducers:{
    allProductRequest:(state)=>{
        state.loading=true;
        state.error=null;
        state.products=[];
    },
    allProductSuccess:(state,action)=>{
        state.loading=false;
        state.error=null;
        state.products=action.payload;
        state.resultperpage=action.payload.resultperpage;
        state.productcount=action.payload.productcount;
    },
    allProductFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.products=[];
    
   },
   clearErrors:(state,action)=>{
    state.error=null;
    
   }
}
})

//

export const {allProductRequest,allProductSuccess,allProductFail,clearErrors} = productSlice.actions
export default productSlice.reducer;