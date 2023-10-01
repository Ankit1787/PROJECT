import React from 'react'
import "./Cart.css"
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom'
import { CHECKOUTCART, CLEARCART, REMOVEFROMCART, UPDATECART } from '../../Actions/cartaction';
import Loader from '../../components/layout/Loader.js/Loader';
const Cart = () => {
  const alert = useAlert()
  const navigate = useNavigate()
  const { items ,loading} = useSelector((state) => state.cart)
  const { isAuth } = useSelector(
    (state) => state.LoadUser
  );
  const dispatch = useDispatch()
  const qty = 1;
  const handleqtyincr = (id, quantity, total, item) => {
    if (quantity >= 10 || item?.stock <= quantity) {


      return alert.show(`Max quantity is ${quantity}`)

    }
    const newQuantity = quantity + 1

    dispatch(UPDATECART(id, newQuantity, total))




  }
  const handleqtydecr = (id, quantity, total) => {
    if (quantity <= 1) {
      return
    }
    const newQuantity = quantity - 1
    dispatch(UPDATECART(id, newQuantity, total))



  }
  console.log(qty)


  const handleRemove = (id) => {
    dispatch(REMOVEFROMCART(id))
  }
  const handleClearCart = () => {
    dispatch(CLEARCART())
  }

  const subtotal = items?.reduce((acc, curr) => acc + parseInt(curr.totalprice), 0)
  const GST = subtotal * 0.18;
  const Shipping = 30;
  const Total = GST + subtotal + Shipping;

  
  const handleCheckout = () => {
    if (isAuth) {
      dispatch(CHECKOUTCART(subtotal, GST,Shipping, Total))
      navigate('/checkout/shipping')

    }
    else {
      navigate('/signup')

    }

  }
  
  if(loading){
    return <Loader />
  }

  return (
    <>
      <div className="cart" style={{ textAlign: 'center' }}>
        <h2>Cart Summary ({items?.length})</h2>
        {items.length > 0 ?
          <div className="cart-body">
            <div className='cart-body-firstchild'>
              <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow className='table-rw'>
                      <TableCell className='table-th'>#</TableCell>
                      <TableCell className='table-th' >Product</TableCell>
                      <TableCell className='table-th' align="right">Name</TableCell>
                      <TableCell className='table-th' align="right">Price</TableCell>
                      <TableCell className='table-th' align="right">Quantity</TableCell>
                      <TableCell className='table-th' align="right">Total Price</TableCell>
                      <TableCell className='table-th' align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items && items.map((item, index) => (

                      <TableRow
                        key={index}
                        className='table-row'
                      >
                        <TableCell className='table-items' component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell className='table-items' sx={{ height: '150px', width: '150px' }}><img src={item.images[0].url} style={{ height: "100%", width: "100%", objectFit: 'cover' }} alt="img" /></TableCell>
                        <TableCell className='table-items' align="right">{item.name}</TableCell>
                        <TableCell className='table-items' align="right">₹{item.price}/-</TableCell>
                        <TableCell className='table-items' align="right" sx={{ width: '240px' }}>
                          <div className='add-item-div  button-div'>
                            <button className='add-item-btn   plus  ' onClick={() => handleqtydecr(item._id, item.quantity, item.totalprice)}>➖</button>
                            <input className='add-item-btn qty-input px-2' readOnly value={item.quantity} type="number" min={1} max={10} />
                            <button className='add-item-btn minus  ' onClick={() => handleqtyincr(item._id, item.quantity, item.totalprice, item)}>➕</button>
                          </div> </TableCell>
                        <TableCell className='table-items' align="right">₹{item.totalprice}/-</TableCell>
                        <TableCell className='table-items' align="right"><RiDeleteBin6Line onClick={() => handleRemove(item._id)} className='del-icon' /></TableCell>
                      </TableRow>

                    ))}

                  </TableBody>
                </Table>
              </TableContainer>

            </div>

            <Box className="checkout  " component={Paper}>
              <div className="checkout-body ">

                <p className="det-heading  cart-summary" >Cart summary</p>

                <div className="checkout-detail">
                  <hr />


                  <p className="det-heading checkout-data">Cart Value: <span style={{ fontWeight: '500', paddingLeft: '30px' }}>₹{subtotal}</span> <span className="fw-bold "></span></p>
                  <hr />
                  <Button variant="contained" className='clear-cart' onClick={handleClearCart} >Clear Cart</Button>

                </div>
                <Button variant="contained" type='submit' onClick={handleCheckout} >Checkout</Button>

              </div>
            </Box>
          </div> : <div className='cart-empty'><h2>Cart is Empty</h2></div>}
      </div>
    </>
  )
}

export default Cart