import React from 'react'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import  Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import "./Prodoct.css"
const Products = ({ item }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: item.rating,
    isHalf: true,
  };
  return (
    
    <>
  
    <Link className='items' to={`/products/${item._id}`}>
     
      <Card sx={{boxShadow:2}} className='card-main'>
      <CardActionArea>
      <Box className='card-img-box'>
        <CardMedia
          component="img"
          height="240"
          image={item.images[0].url}
          alt="green iguana"
         className='card-img'
        />
        </Box>
        <CardContent className='card-content'>
          <Typography gutterBottom variant="h5" component="div" noWrap>
          {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='description'>
           {item.description}
          </Typography>
          <Divider component="li" sx={{mt:1,mb:1}}/>
          <Box sx={{marginTop:"10px",marginBottom:'10px' }} className='price-rating-box '>
            <Typography gutterBottom variant="h5" component="div"  className='price-div '>
            ₹{item.price &&(item.price).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" className='rating-div '>
              <ReactStars {...options} />
             
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </>
  )
}

export default Products



