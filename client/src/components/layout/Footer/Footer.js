import React, { useEffect, useState } from "react";
import playstore from "../../../styles/pngegg.png"
import {FaFacebookSquare,FaTwitter,FaInstagram,FaTelegram} from "react-icons/fa"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Footer = () => {
  const location=useLocation()
  const [nvbar,setnvbar] = useState(true)
  useEffect(()=>{
   
    if(location.pathname==="/cart" || location.pathname==="/checkout/shipping" || location.pathname==="/myaccount" ||  location.pathname==='/checkout/shipping/confirmorder' || location.pathname==='/checkout/shipping/confirmorder/paymentsuccess'){
      setnvbar(false)
    }
    else{
      setnvbar(true)
    }
  },[location.pathname])
  return (
    <>
   {nvbar ? 
   <div className="footer ">
      <div className="containerfluid  w-100 ">
        <div className="  outer-box">
          <div className=" box-container">
            <ul>
              <li className="fs-4 fw-bolder pb-3 fst-italic"> About</li>

              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Corporate Information
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Flipkart Stories
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className=" box-container">
            <ul>
              <li className="fs-4 fw-bolder pb-3 fst-italic">
              
             policy
              </li>

              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Cancellation & Returns
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Grievance Redressal
                </Link>
              </li>
            </ul>
          </div>

          <div className=" box-container">
            <ul>
              <li className="fs-4 fw-bolder pb-3 fst-italic"> Help</li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Legal & Privacy
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Report a scam
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Cookie Notice
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Cookie Settings
                </Link>
              </li>
              <li>
                <Link to="/" className="link-light link-opacity-25-hover ">
                  Find a store
                </Link>
              </li>
            </ul>
          </div>
          <div className="box-container text-center">
          <div className="text">
          <p className=" fs-4 fw-bolder fst-italic"> Dowload our app</p>
          <span className="fs-5 fw-medium  fst-italic"> Dowload App for Android and IOS devices</span>
          </div>
        
          <div className="img">
          <Link to="/" className="link-light link-opacity-25-hover ">
                <img src={playstore} className="playstore" alt="" /> 
                </Link>
          </div>
          
              
             
       

        </div>
        </div>
        <div className="buttom-containter text-center py-3 ">
           <span className="text-secondary  "><FaFacebookSquare className="react-icons-buttom"/><FaTwitter className="react-icons-buttom"/><FaInstagram className="react-icons-buttom"/><FaTelegram className="react-icons-buttom"/></span>
        </div>
    
        <div className="buttom-containter text-center py-3 ">
           <span className="text-secondary  ">@ 2023 VK priviate limited all right reserved </span>
        </div>
        </div>
        </div>:     <div className="buttom-containter text-center py-4">
           <span className="text-secondary  ">@ 2023 VK priviate limited all right reserved </span>
        </div>}
    </>
  );
};

export default Footer;
