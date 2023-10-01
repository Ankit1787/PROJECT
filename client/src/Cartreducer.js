import {createSlice } from '@reduxjs/toolkit'

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return undefined; // Return undefined if there's no cart data in local storage
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error('Error loading cart from local storage:', error);
    return undefined;
  }
};
const loadCheckoutFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('checkout');
    if (serializedCart === null) {
      return undefined; // Return undefined if there's no cart data in local storage
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error('Error loading cart from local storage:', error);
    return undefined;
  }
};
const loadShippinginfoFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('shippinginfo');
    if (serializedCart === null) {
      return undefined; // Return undefined if there's no cart data in local storage
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error('Error loading cart from local storage:', error);
    return undefined;
  }
};

// Create a function to save cart items to local storage
const saveCartToLocalStorage = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem('cart', serializedCart);
  } catch (error) {
    console.error('Error saving cart to local storage:', error);
  }
};
const saveCheckoutToLocalStorage = (checkoutItems) => {
  try {
    const serializedCart = JSON.stringify(checkoutItems);
    localStorage.setItem('checkout', serializedCart);
  
   
  } catch (error) {
    console.error('Error saving cart to local storage:', error);
  }
};
const saveshippinginfoToLocalStorage = (shippinginfo) => {
  try {
   
  
  
      const serializedCart = JSON.stringify(shippinginfo);
      localStorage.setItem('shippinginfo', serializedCart);
    
  } catch (error) {
    console.error('Error saving cart to local storage:', error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage() || [], // Load cart items from local storage
  checkout:loadCheckoutFromLocalStorage() || [],
  shippinginfo: loadShippinginfoFromLocalStorage() || [],
  
 
};

const cartSlice=createSlice({
    initialState,
    name:'cart',
    reducers:{
        addtoCart:(state,action)=>{
          const item=action.payload;
            console.log(item);
      const existingItem = state.items.find(cartItem => cartItem._id === item._id);

      if (existingItem) {
        // If the item already exists in the cart, increase its quantity
        existingItem.quantity += item.quantity;
        existingItem.totalprice = existingItem.price * existingItem.quantity;
      saveCartToLocalStorage(state.items);

      } else {
        // If the item is not in the cart, add it
        item.totalprice = item.price * item.quantity;
        state.items.push(item);
      saveCartToLocalStorage(state.items);

      }
    },
        
        removefromCart:(state,action)=>{
          const itemIdToRemove = action.payload;
          state.items = state.items.filter(item => item._id !== itemIdToRemove);
          saveCartToLocalStorage(state.items);
      
        },
        updateCart:(state,action)=>{
          const item = action.payload;
          const itemToUpdate = state.items.find(data => data._id === item.itemId);
          if (itemToUpdate) {
            itemToUpdate.quantity = item.newQuantity;
            itemToUpdate.totalprice = itemToUpdate.price * item.newQuantity;
          saveCartToLocalStorage(state.items);

          }
      
        },
        clearCart:(state)=>{
             state.items=[];
             state.checkout=[];
      saveCartToLocalStorage(state.items);

        },
        checkoutCart:(state,action)=>{
            state.checkout=action.payload;
           
            saveCheckoutToLocalStorage(state.checkout);
        },
        updateShippingInfo:(state,action)=>{
         state.shippinginfo=action.payload;
          saveshippinginfoToLocalStorage(state.shippinginfo);

        }
        
    }
})

export default cartSlice.reducer
export const {addtoCart,removefromCart,updateCart,clearCart,checkoutCart,updateShippingInfo}=cartSlice.actions