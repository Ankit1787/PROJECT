import React from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import {Link} from 'react-router-dom'

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const Sidebar = () => {

   
 
 
    const data=[{icon:<DashboardIcon/>,
                 name:'dashboard'
},{icon:<ShoppingBagIcon/>,name:'products'},{icon:<ShoppingBagIcon/>,name:'add new product'},{icon:<LocalShippingIcon/>,name:'orders'}]




  return (
    <>
     <div  className={`sidebar`}>

<nav>
<div className='side-nav-btn'>


</div>
    <ul>
       { data.map((item,index)=>(

        <li key={index}>
            <Link  style={{textTransform:'capitalize'}} to={item.name==='add new product'?  `/admin/products/new`   :`/admin/${item.name}`} ><span>{item.icon}</span>{item.name}</Link>
        </li>
        ))}
    </ul>
</nav>
</div>
    </>
  )
}

export default Sidebar