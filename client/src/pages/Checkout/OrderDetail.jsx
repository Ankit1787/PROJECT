import React from 'react'

const OrderDetail = ({item}) => {
  return (
    <>
     <div>
                <div className="confirm-order-img">
                  <img src={item.images[0].url} alt="img" />

                </div>
                <div className="confirm-order-det">
                  <h3>{item?.name}</h3>
                  <div>
                    <p>{item?.description}</p>
                    <p>QTY :<span> {item.quantity}</span></p>
                    <p>Price : <span> ₹{item.price}/-</span></p>
                  </div>
                </div>
              </div>

    </>
  )
}

export default OrderDetail