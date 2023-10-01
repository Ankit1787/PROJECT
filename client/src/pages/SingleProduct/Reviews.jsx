import React from 'react'
import ReactStars from "react-rating-stars-component";
import "./SingleProduct.css"
import { FaUserCircle } from "react-icons/fa"

const Reviews = ({product,handleShow,options}) => {
  return (
    <>
      <div className="reviews border ">
            <div className="review-heading  d-flex align-items-center justify-content-between">
              <h1 className='review-heading-text '>Ratings & Reviews</h1>
              <button className='btn btn-outline-primary Rate-btn fs-4' onClick={handleShow}>Rate Product</button>
            </div>
            <div className='d-flex ps-4 px-4'>
            <h1>{ product.rating && (product?.rating).toFixed(1)} </h1>
            <span><ReactStars count={1}  {...options} value={product?.rating} size={30} /> </span>

            </div>
            <span className='text-secondary ps-4'>{product && product.numofreviews} Reviews</span>
            <div className="review-body-container border py-5 px-5">


              { product?.numofreviews===0 ? <h1 className='text-center mx-auto'>No Reviews</h1>:
             product.reviews ? product?.reviews.map((review,index)=>{
                  return (
                    <div className="review-body border  text-center ">
                      <div className="rating-user d-flex flex-wrap flex-column flex-lg-row row-gap-3 col-gap-3 gap-2">
                        <span>

                          <FaUserCircle className=' review-user-icon' />

                        </span>
                        <span className=' review-user-name text-center fs-5 fw-bold'>
                          {review.name}
                        </span>
                      </div>

                      <div className='text-center mx-auto'>
                        <span className='review-rating'>
                          <ReactStars {...options} value={review.rating} className='   mx-auto' />

                        </span>

                        <p className='w-90 text-start'> {review?.Comment}</p>
                      </div>


                    </div>
                  )
                })
                :""
              }

            </div>




          </div>
    
    </>
  )
}

export default Reviews