import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Accordian from './Accordian';
const Aside = ({price,dprice,pricehandler,setprice,setdprice,isChanging,setIsChanging ,selectedCategory,setSelectedCategory,handleCategoryChange,selectedRating,setselectedRating,handleratingChange}) => {
   


    
  return (
    <>
         <div className="side " >
    <h3 className='' sx={{ fontWeight: 'bold' }}>Filters</h3>
    <Divider component="li" sx={{mt:1,mb:1}}/>
    <Box className="aside-box">
    <Typography id="range-slider" gutterBottom sx={{fontWeight:'bolder',padding:'0',fontSize:'1.2rem' ,font:'Roboto',paddingTop:'1vmax',px:2}}>
      Price
      </Typography>
          <Box sx={{padding:"0.5vmax 1.5vmax"}} className=' price-slider-box '>
       
      <Slider defaultValue={50}
      value={price}
      onChange={pricehandler}
      onMouseLeave={() => {
        setTimeout(()=>{
            setIsChanging(false); // User has left the price slider
          setdprice(price);
        },2000)
           // Set the final price before the user left
        }}
      aria-labelledby='range-slider'
      min={0}
      step={10}
      max={300000}
       aria-label="Default" 
       valueLabelDisplay="auto" 
       disableSwap
       
       />
   </Box>
   <Accordian selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} handleCategoryChange={handleCategoryChange} selectedRating={selectedRating} setselectedRating={setselectedRating} handleratingChange={handleratingChange}/>
   </Box>
   
   </div>
    </>
  )
}

export default Aside