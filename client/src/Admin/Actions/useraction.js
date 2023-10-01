import axios from  'axios';
import { allusersFail, allusersRequest, allusersSuccess, clearallusersErrors } from '../reducers/userreducers';

export const getAllUsers=()=>async(dispatch)=>{
   
        try {
            dispatch(allusersRequest())
            const response = await axios.get(`http://localhost:8002/api/v2/admin/users`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
             })
            dispatch(allusersSuccess(response.data.users))
        } catch (error) {
            console.log(error)
            dispatch(allusersFail(error.response.data.error.message || 'someting went wrong '))
            
        }

    }
    
    
        
    
        export const ClearAllUsersError=()=>async(dispatch)=>{
            dispatch(clearallusersErrors())
        }

   