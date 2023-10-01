import axios from 'axios';
import { allOrdersFail, allOrdersRequest, allOrdersSuccess, clearallOrdersErrors } from '../reducers/orderreducer';
import Cookies from 'js-cookie';
export const getallOrder=()=>async (dispatch) => {
    
    try {
        dispatch(allOrdersRequest())
        const response = await axios.get(`http://localhost:8002/api/v2/admin/orders/`,{
            headers:{
                Authorization: `Bearer ${Cookies.get('token')}`
            }
         })
        dispatch(allOrdersSuccess(response.data.orders))
    } catch (error) {
        console.log(error)
        dispatch(allOrdersFail(error.response.data.error.message || 'someting went wrong '))
        
    }


    }

    export const ClearAllOrdersErrors =()=>async(dispatch)=>{
        dispatch(clearallOrdersErrors())
    }