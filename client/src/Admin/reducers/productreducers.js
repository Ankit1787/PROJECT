import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    products: [],
    Loading: false,
    Error: null,
   
  };

 const productSlice = createSlice({
    name: 'product',
    initialState,
   reducers:{
    createproductRequest:(state)=>{
        state.Loading=true;
        state.Error=null;
        state.products=[];
    },
    createproductSuccess:(state,action)=>{
        state.Loading=false;
        state.Error=null;
        state.products=action.payload;
       
    },
    createproductFail:(state,action)=>{
        state.Loading=false;
        state.Error=action.payload;
     
    
   },
   clearCREATEProductErrors:(state,action)=>{
    state.Error=null;
    
   }
}
})

//

export const {createproductRequest,createproductSuccess,createproductFail,clearCREATEProductErrors} = productSlice.actions
export default productSlice.reducer;