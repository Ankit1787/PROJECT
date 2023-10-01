import React, { useEffect, useState } from 'react'
import "../Dashboard/Dashboard.css"

import Pagination from 'react-js-pagination';
import "../Dashboard/Dashboard.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearProdErrors, getallproducts } from '../../Actions/productaction';
import Loader from '../../components/layout/Loader.js/Loader';
import Sidebar from '../Dashboard/Sidebar';
const ALLProducts = () => {
  const dispatch= useDispatch()
const {products} = useSelector((state)=>state.custom.products)
const [currentPage, setcurrentPage] = useState(1)
  const{error,loading,productcount,resultperpage} = useSelector((state)=>state.custom)
  const setCurrentPageNo = (e) => {
    setcurrentPage(e)
    dispatch(getallproducts(e))
    console.log(currentPage)
    
    }
  useEffect(()=>{
  
    const callback=()=>{
        dispatch(clearProdErrors())
    }
 if(error){
    return callback
 }
 else if(!products){
  dispatch(getallproducts(currentPage))
 }
 
},[error,dispatch,products,currentPage])

if(loading){
    return <Loader />
}
  return (
    <>

<div className="dashboard">
      

            <div className="dashboard-main">
          
            

          <Sidebar />
          <div className="dashboard-body">
            
            <div>
        
                      <h2 className='myorders-h2'>Products</h2>

            <div className='myorder-body-det singleorder-prod-det allproducts-table'>
                                
                                <table>
                                <thead>
                                  <tr>
                                      <th>
                                        #  
                                      </th>
                                      <th>
                                       product 
                                      </th>
                                      <th>
                                       name 
                                      </th>
                                      <th>
                                       Description 
                                      </th>
                                      <th>
                                       Category 
                                      </th>
                                      <th>
                                       Rating 
                                      </th>
                                      <th>
                                       price 
                                      </th>
                                      <th>
                                      Stocks
                                      </th>
                                      <th>
                                      Status
                                      </th>
                                      <th>
                                      
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                   
                                   {products && products.map((item,index)=>(  
                                      <tr key={index}>
                                          <td>{index+1}</td>
                                          <td className='table-img'><img src={item.images[0].url} alt="" /></td>
                                          <td>{item.name}</td>
                                          <td style={{maxWidth:"200px" ,overflow:"ellipsis"}}>{item.description}</td>
                                          <td>{item.category}</td>
                                          <td>{item.rating}</td>
                                          <td>₹{item.price}/-</td>
                                          <td>{item.stock}</td>
                                          <td>{item.stock>0 ? "In Stock" : "Out of Stock"}</td>
                                         
                                      </tr>
                                      )) }
                                  </tbody>
                                </table>
  
                                
  
                                
                                 
                             
                          </div>
                          <div className="pagination-box">
            <Pagination 
              activePage={currentPage}
              itemsCountPerPage={resultperpage}
              totalItemsCount={productcount}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              lastPageText={"Last"}
              firstPageText={"First"}
              itemClass='page-item'
              activeClass='page-item-active'
              linkClass='page-link nav-link'
              activeLinkClass='page-link-active'
            />
            </div>
                       
            </div>
          </div>
               
            </div>
        </div>

       
    </>
  )
}

export default ALLProducts