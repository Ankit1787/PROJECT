import React, { useEffect } from 'react'
import Products from '../../components/layout/Products/Products';
import Metadata from "../../components/layout/Metadata"
import { clearerror, getproducts } from '../../Actions/productaction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/layout/Loader.js/Loader';
import { useAlert } from 'react-alert';
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { products } = useSelector((state) => state.custom.products);
  let { loading, error } = useSelector((state) => state.custom);
  console.log(products);
  console.log(loading);
  console.log(error);
 
  
 
 

  useEffect(() => {
    const callback = ()=>{
      alert.error(error)
      dispatch(clearerror());
     };
    if (error ) {
  return callback
   
     
    }
    
      dispatch(getproducts());

   

  }, [dispatch, error,alert]);

  if (loading) {
    return <Loader />;
  }
  if(error){
  }



  return (
    <>
      <Metadata title="Home Page" />
      <div className="home" id="products" >
        <div className="feature">
          <h1>Feature Products</h1>
        </div>
       { error ? <div className='text-center fs-1 fw-bolder pt-5 fs-italic text-uppercase'>{error}</div>:<div className="products"  >
          {products &&
            products.map((item, index) => {
              return <Products item={item} key={index} />
            })

          }
        </div>}
      </div>





    </>
  )
}

export default Home