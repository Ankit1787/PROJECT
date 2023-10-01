import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    Users: [],
    Loading: false,
    Error: null,
   
  };

 const usersSlice = createSlice({
    name: 'users',
    initialState,
   reducers:{
    allusersRequest:(state)=>{
        state.Loading=true;
        state.Error=null;
        state.Users=[];
    },
    allusersSuccess:(state,action)=>{
        state.Loading=false;
        state.Error=null;
        state.Users=action.payload;
       
    },
    allusersFail:(state,action)=>{
        state.Loading=false;
        state.Error=action.payload;
     
    
   },
   clearallusersErrors:(state,action)=>{
    state.Error=null;
    
   }
}
})

//

export const {allusersRequest,allusersSuccess,allusersFail,clearallusersErrors} = usersSlice.actions
export default usersSlice.reducer;