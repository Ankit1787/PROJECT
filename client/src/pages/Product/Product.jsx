import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {  useDispatch, useSelector} from 'react-redux';
import { clearerror,getproducts } from '../../Actions/productaction';
import Products from '../../components/layout/Products/Products';
import Loader from '../../components/layout/Loader.js/Loader';
import Aside from './Aside';
import Pagination from 'react-js-pagination';
import Metadata from '../../components/layout/Metadata';
const Product = () => {
    const dispatch = useDispatch()
    const{ search} = useParams()
    const [currentPage, setcurrentPage] = useState(1)
    const [price, setprice] = useState([0, 300000])
    const [dprice, setdprice] = useState([0, 300000])
    const [isChanging, setIsChanging] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRating, setselectedRating] = useState(0);
    const [dselectedCategory, setdSelectedCategory] = useState(null);
   const category=dselectedCategory;
   const rating=selectedRating;
const {products,productcount,resultperpage} = useSelector((state)=>state.custom.products)
const {loading,error} = useSelector((state)=>state.custom)

const setCurrentPageNo = (e) => {
setcurrentPage(e)

}
    



    useEffect(()=>{
     const callback=()=>{
      dispatch(clearerror());
     
    };

    if (error) {
      return callback;
    }
    else if (!isChanging) {
        // Only dispatch when the user leaves the price slider
        console.log(category)
        if(category===null & category===Number){
          dispatch(getproducts(search, currentPage, dprice,rating));

        }
        else{
         
          dispatch(getproducts(search, currentPage, dprice,category,rating));

        }
      }
    
     
    
  }, [dispatch, error, search, currentPage, dprice, isChanging,category,rating]);

  const pricehandler = (event, newValue) => {
    event.preventDefault(); 
    setprice(newValue);
    setIsChanging(true); 
    const changeTimeout = setTimeout(() => {
      setIsChanging(false); // User has left the price slider
      
     }, 3000); 
    // Set a timeout to detect when the user leaves the price slider
    clearTimeout(changeTimeout);
   // Adjust the delay time as needed (in milliseconds)
  };
  const handleCategoryChange = (value) => {

    if(selectedCategory===value){
      setSelectedCategory(null);
      setTimeout(()=>{
        setdSelectedCategory(null)
      },1000)
     

    }
  else{
    setSelectedCategory(value)
 
        setdSelectedCategory(value)
   
  }
    }
   const handleratingChange =(i)=>{
    if(selectedRating===i){
      setselectedRating(0);

    }
  else{
    setselectedRating(i)
 
    
   
  }
   }

    if(loading){
      return  <Loader  />
    }
    
  
  return (
    <> 
    <Metadata title='Products Page'   />
    <div className="products-div" sx={{width:'100%'}}>

    { selectedCategory !==null ? <div className='feature'>
        <h1 sx={{ textAlign: 'center' }}>{selectedCategory}</h1>

    </div> : <div className='feature'>
        <h1 sx={{ textAlign: 'center'}}>Products</h1>

    </div> }
   
    <div className="products-box   ">
   <Aside  price={price} dprice={dprice} pricehandler={pricehandler} setprice={setprice} setdprice={setdprice} isChanging={isChanging} setIsChanging={setIsChanging} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} handleCategoryChange={handleCategoryChange} selectedRating={selectedRating} setselectedRating={setselectedRating} handleratingChange={handleratingChange}/>
 
   {(products && products.length>0) ? <div className=" prod-container ">
   
        {products &&
            products.map((item, index) => {
              return <Products item={item} key={index} selectedCategory={selectedCategory}/>
            })
            

          }
     
    </div> :   <div  className='prod-container no-product' >
         <h1 className='MuiTypography-h1' >No Product Found</h1>
          
         </div>}
   
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
       </>
  )
}

export default Product