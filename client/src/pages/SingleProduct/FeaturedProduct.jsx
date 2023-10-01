import React from 'react'
import ReactStars from "react-rating-stars-component";
import "./SingleProduct.css"

import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const FeaturedProduct = ({item,options,product}) => {
  return (
    <>
<div className="featured-product">
            <div className="feature-heading">
              <h1 className='feature-heading-text '>Featured Products</h1>
            </div>
            <Box component="div" sx={{ display:'flex',justifyContent:'start' ,overflow: 'auto',backgroundColor:'#ffff',padding:'2vmax 2.5vmax'  }}>
              {item && item.length > 0 &&
                item.filter((data) => (data.category === product.category) && (data.name !== product.name)).map((element, index) => {
                  return (
                    <Link className='items  ' to={`/products/${element._id}`} element={element} key={index} >
                    
                      <Card sx={{ width: '18rem',margin:"20px" , }} className='card-main'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={element?.images[0].url && element?.images[0].url}
          alt="green iguana"
        />
        <CardContent  className='card-content'>
          <Typography gutterBottom variant="h5" component="div" noWrap>
          {element.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='description'>
           {element.description}
          </Typography>
          <Divider component="li" sx={{mt:1,mb:1}}/>

          <Box sx={{ justifyContent: 'space-between' ,marginTop:"10px",marginBottom:'10px' }} className='price-rating-div '>
            <Typography gutterBottom variant="h5" component="div"  className='price-div '>
            ₹{element.price && (element.price).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" className='rating-div '>
              <ReactStars {...options} />
             
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
                    </Link>
                  )
                })
              }

            </Box>
          </div>

    </>
  )
}

export default FeaturedProduct