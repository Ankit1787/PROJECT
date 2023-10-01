import React from 'react'
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordian = ({selectedCategory,setSelectedCategory,handleCategoryChange,selectedRating, setselectedRating,handleratingChange}) => {
    const Categories=[
        "smartphones","laptops","fragrances","groceries","skincare","homedecoration"
      ]
      const Ratings=[1,2,3,4]
  return (
    <>
         <Accordion    className='accordian'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
         sx={{px:2}}
          
        >
           <Typography   sx={{fontWeight:'bolder',padding:'0',fontSize:'1.2rem' ,font:'Roboto'}}>
          Category

      </Typography>

        </AccordionSummary>
        <AccordionDetails>
        <List sx={{ bgcolor: 'background.paper' }} 
     className='list-div' >
      { Categories.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return <>
          <ListItem
            key={value}
            sx={{border:"0.0003rem solid #e0e0e0"}}
            disablePadding
            onClick={()=>handleCategoryChange(value)}

          >
            <ListItemButton role={undefined}  dense 
          >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  checked={selectedCategory===value}
                  onChange={()=>handleCategoryChange(value)}
                    name={value}
                
                />
              </ListItemIcon>
              
              <Typography id={labelId} sx={{textTransform:'capitalize' ,fontWeight:'medium',padding:'0',fontSize:'1rem' ,font:'Roboto',}} >{value}</Typography>
            </ListItemButton>
          </ListItem>
          </>;
      })}
    </List>
        </AccordionDetails>
      </Accordion>
         <Accordion    className='accordian'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
         sx={{px:2}}
          
        >
           <Typography   sx={{fontWeight:'bolder',padding:'0',fontSize:'1.2rem' ,font:'Roboto'}}>
          Rating

      </Typography>

        </AccordionSummary>
        <AccordionDetails>
        <List sx={{  bgcolor: 'background.paper' }} 
      className='list-div'>
      { Ratings.map((i)=> {
        const labelId = `checkbox-list-label-${i}`;

        return <>
          <ListItem
            key={i}
            sx={{border:"0.0003rem solid #e0e0e0"}}
            disablePadding
            onClick={()=>handleratingChange(i)}
          >
            <ListItemButton role={undefined}  dense 
          >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  checked={selectedRating===i}
                  onChange={()=>handleratingChange(i)}
                    name={i}
                
                />
              </ListItemIcon>
              
              <Typography id={labelId} sx={{textTransform:'capitalize' ,fontWeight:'medium',padding:'0',fontSize:'1rem' ,font:'Roboto',}} >{i} 🌟 &Above</Typography>
            </ListItemButton>
          </ListItem>
          </>;
      })}
    </List>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Accordian