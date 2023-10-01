import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    orders: [],
    Loading: false,
    Error: null,
   
  };

 const ordersSlice = createSlice({
    name: 'Orders',
    initialState,
   reducers:{
    allOrdersRequest:(state)=>{
        state.Loading=true;
        state.Error=null;
        state.orders=[];
    },
    allOrdersSuccess:(state,action)=>{
        state.Loading=false;
        state.Error=null;
        state.orders=action.payload;
       
    },
    allOrdersFail:(state,action)=>{
        state.Loading=false;
        state.Error=action.payload;
     
    
   },
   clearallOrdersErrors:(state,action)=>{
    state.Error=null;
    
   }
}
})

//

export const {allOrdersRequest,allOrdersSuccess,allOrdersFail,clearallOrdersErrors} = ordersSlice.actions
export default ordersSlice.reducer;