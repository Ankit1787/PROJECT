import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  Loading: false,
  Error: null,

  success:'',
};
const ratingSlice  = createSlice({
  name: "rating",
  initialState,
  reducers: { 
    createreviewRequest: (state) => {
      state.Loading = true;
      state.Error = null;
     
      state.success='';  
         },
    createreviewSuccess: (state, action) => {
      state.Loading = false;
      state.Error = null;
      state.success=action.payload;  
     
    },
   
    createreviewFail: (state, action) => {
        state.Error=action.payload;
      state.Loading = false;
    },
    
    clearreviewerror:(state)=>{
      state.Error=null;



    }

}

})

export default ratingSlice.reducer;
export const { createreviewRequest, createreviewSuccess, createreviewFail,clearreviewerror} = ratingSlice.actions;