import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./SingleProduct.css"
import { AiFillCheckCircle } from "react-icons/ai"
import { getproducts, getproductdetail, clearerror, clearProdErrors, createReview, clearReviewError} from '../../Actions/productaction';
import Loader from '../../components/layout/Loader.js/Loader';

import { useAlert } from 'react-alert'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Reviews from './Reviews';
import FeaturedProduct from './FeaturedProduct';
import Metadata from '../../components/layout/Metadata';
import { ADDTOCART } from '../../Actions/cartaction';

const SingleProduct = () => {
  const { productid } = useParams();
  const { product,loading,error  } = useSelector((state) => state.productDetail);
  const {success,Loading,Error}=useSelector((state)=>state.rating)
  const item = useSelector((state) => state.custom.products.products);
  const alert = useAlert();
  const dispatch = useDispatch()
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

  // Replace with actual image URLs
  const [show, setShow] = useState(false);
  const [reviewsubmited, setreviewSubmited] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setreviewSubmited(false)
    setShow(true)

  };

  const handleSliderImageHover = (index) => {
    setHoveredImageIndex(index);
  };

 
  const [review, setreview] = useState({
    Comment:'',rating:0
  });

  const handleRatingChange = (newRating) => {
    setreview({ ...review, rating: newRating });
  };
  const handleReviewChange = (event) => {
    setreview({...review,[event.target.name]:event.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  console.log(review)
  dispatch(createReview(productid,review))
  dispatch(getproductdetail(productid))
    setreviewSubmited(true)
    setTimeout(() => {


      setShow(false)
    }, 1000)


  }

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 22 : 25,
    value: product.rating,
    isHalf: true,
  };

  const {items}= useSelector((state)=>state.cart)
        
        const [result,setresult]=useState({})
     

  const [qty, setQty] = useState(1)
  const handleqtyincr = () => {
    if (qty>=10 || qty>=result[0].stock || qty+result[0].quantity>=result[0].stock ) {
    
      
      return alert.show(`max qty is ${qty} only per order`, {
        timeout: 3000,
        type: 'error'
      })
    
    }

    setQty(qty + 1)




  }
  
  const handleqtydecr = () => {
    if (qty <= 1 ) {
      return alert.show('min qty is  1', {
        timeout: 5000,
        type: 'error'
      })
    }
    setQty(qty - 1)



  }

  const handleAddToCart=()=>{
    const totalprice=qty*(product.price)
    if(result.length>0 ? ((result[0].quantity>=result[0].stock) || (result[0].quantity>=10) ):false){
      return alert.show(`max qty reached  per order`)
    }
    dispatch(ADDTOCART(product,qty,totalprice))

  }
  useEffect(() => {
const callback=()=>{
  alert.error(error)
      dispatch(clearerror())
      dispatch(clearProdErrors())
      dispatch(clearReviewError())
}
    if(error||Error){
    return callback
    }
   
    else{
      dispatch(getproductdetail(productid))
    dispatch(getproducts())
    }
   

  }, [dispatch, alert,error,productid,success,Error]);
  useEffect(()=>{
   
      if(product && items){
      
        setresult(items.filter((item)=>product._id=== item._id))
      }
     
     
    
  },[product,items,result])
  if(loading||Loading){
    return <Loader/>
  }
  
  return (
    <>
     <Metadata title={product.name}/>
        <div className="container">

          <div className="product-container ">
            <div className="product-images">
              <div className="slider-images">
                {
                  product && product?.images?.map((image, index) => (
                    <div
                      key={index}
                      className={`slider-image ${hoveredImageIndex === index ? 'hovered' : ''}`}
                      onMouseEnter={() => handleSliderImageHover(index)}
                    >
                      <img src={image?.url} alt="slider" className='slider-small-img' />
                    </div>
                  ))

                }
              </div>
              <div className="main-image ">

                {product?.images && <div >
                  <img src={product?.images[hoveredImageIndex].url} alt="main" className='product-main-image ' />
                </div>}


              </div>

            </div>
            <div class="line"></div>
            <div className='main-image-div d-flex flex-column  '>

              <div className='d-flex flex-column  '>
                <h1 className='fw-bold fs-2 text-uppercase' >{product.name}</h1>
                <div className='rating-div'>
                  <span><ReactStars {...options} /> </span>
                  <span className='rating-count ps-2'>  ({product.numofreviews})</span>
                </div>
                <p className='fs-4 product-description'>
                  {product.description}
                </p>
                <span className={product.stock < 1 ? 'redcolor' : 'greencolor'}>
                  {product.stock < 1 ? <p>Out of Stock </p> : <p>In Stock </p>}
                </span>
              </div>

              <div className='price-rating-div  py-3 '>
                <span className='price-div  fw-bolder fs-3'>
                  ₹{product.price && (product.price).toFixed(2)}
                </span>
                {product.stock > 1 ? <div className='add-item-div pb-3'>


                  <button className='add-item-btn   plus  ' onClick={() => handleqtydecr()}>➖</button>
                  <input className='add-item-btn qty-input px-2' readOnly value={qty} type="number" min={1} max={10} />
                  <button className='add-item-btn minus  ' onClick={() => handleqtyincr()}>➕</button>
                </div> : ""}

              </div>


              {product.stock > 1 ? <><button onClick={handleAddToCart} className="btn btn-outline-primary button-image fs-4" type="button" variant="primary">Add to Cart</button></> : " "
              }
            </div>


          </div>
          <Reviews product={product} handleShow={handleShow} options={options} />


          <FeaturedProduct item={item} options={options} product={product} />
        </div>


     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviewsubmited ? <><div className='text-center'><AiFillCheckCircle size={40} className='mx-auto' /><h2>Review submitted successfully</h2></div></> : <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" onSubmit={handleSubmit} controlId="exampleForm.ControlInput1">
              <Form.Label>Rate product</Form.Label>
              <ReactStars
                count={5}
                name="rating"
                value={review.rating}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
              />
              <Form.Label>Review product</Form.Label>
              <Form.Control as="textarea" rows={3} name='Comment' value={review.Comment}
                onChange={handleReviewChange} />
            </Form.Group>
            <Button type='submit' className='btn btn-primary'> Submit</Button>
          </Form>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>





    </>
  )
}

export default SingleProduct


