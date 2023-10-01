
import {addtoCart,removefromCart,updateCart,clearCart,checkoutCart,updateShippingInfo} from './../Cartreducer'

export const ADDTOCART=(item,quantity,totalprice)=>(dispatch)=>{
    dispatch(addtoCart({...item,quantity,totalprice}))

}
export const REMOVEFROMCART=(id)=>(dispatch)=>{
    dispatch(removefromCart(id))
}
export const UPDATECART=(itemId,newQuantity,totalprice)=>(dispatch)=>{
    dispatch(updateCart({itemId,newQuantity,totalprice}))

}
export const CLEARCART=()=>(dispatch)=>{
    dispatch(clearCart())
}
export const CHECKOUTCART=(subtotal, GST,Shipping, Total)=>(dispatch)=>{
    dispatch(checkoutCart({subtotal, GST,Shipping, Total}))
}
export const UPDATESHIPPINGINFO=(shippinginfo)=>(dispatch)=>{
    dispatch(updateShippingInfo(shippinginfo))

}

