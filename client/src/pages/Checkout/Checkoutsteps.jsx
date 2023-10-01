import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./Checkout.css"
const Checkoutsteps = ({activeStep}) => {
   
    const steps=[
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        },
    ]
    const Stepstyles={
        boxSizing:'border-box',
    }
  return (
    <>
        <Stepper alternativeLabel activeStep={1} style={Stepstyles}>
           {
            steps.map((item,index)=>(
                <Step
                key={index}
                active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}
                >
                    <StepLabel style={{
                        color: activeStep >= index ? 'rgb(25 118 210)': 'rgba(0,0,0,0.649)',
                    }} icon={item.icon} >{item.label}</StepLabel>
                </Step>
            ))
           }
        </Stepper>
    </>
  )
}

export default Checkoutsteps