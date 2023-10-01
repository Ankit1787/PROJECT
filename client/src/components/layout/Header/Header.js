import React, { useEffect, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { SlUser } from "react-icons/sl";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { IoLogoVk } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import { CgMouse } from "react-icons/cg";
import Loader from "../Loader.js/Loader";
import { LoadUser, logoutUser } from "../../../Actions/useraction";
import { useDispatch, useSelector } from "react-redux";

import Badge from "@mui/material/Badge";
import Cookies from "js-cookie";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { items } = useSelector((state) => state.cart);
  const token = Cookies.get('token')
  const {  Load } = useSelector(
    (state) => state.LoadUser
  );
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const handleSearch = (e) => {
    if (search.trim()) {
      navigate(`/product/${search}`);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handlelogout = () => {
    dispatch(logoutUser()).then(() => dispatch(LoadUser()));

    navigate("/signup");
  };
  const [showdropdown, setshowdropdown] = useState(false);
 const [nvbar,setnvbar] = useState(true)
  useEffect(()=>{
   
    if(location.pathname==="/checkout/shipping" || location.pathname==="/myaccount" || location.pathname==='/checkout/shipping/confirmorder' || location.pathname==='/checkout/shipping/confirmorder/paymentsuccess'){
      setnvbar(false)
    }
   
    else{
      setnvbar(true)
    }
  
  },[location.pathname])
  if (Load) {
    return <Loader />;
  }

  return (
    <>
   { nvbar ?  
   <div className="top">
        {/* top nav bar */}
        {!show ? (
          <Navbar className="pt-5 px-3 navbar-light">
            <Navbar.Toggle
              onClick={handleToggle}
              aria-controls="navbar-nav"
              className="navbar-toggle d-md-none d-flex toggle-button"
            />

            <Link className="me-auto brand-first px-4" to="/">
              <IoLogoVk className="brand-logo" />
            </Link>

            {!token  ? (
              <Nav className="nav-main text-center w-100">
                <Nav.Item className=" mx-auto nav-brand text-center">
                  <Link className=" brand px-4 text-dark" to="/">
                    <IoLogoVk className="brand-logo" />
                  </Link>
                </Nav.Item>
                <div className="nav-main-div ">
                  <Nav.Item className="nav-search-logo">
                    <Link
                      className=" text-nowrap nav-link"
                      onClick={() => setShow(!show)}
                    >
                      <BsSearch className="react-icons" />
                    </Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Link className="text-nowrap nav-link " to="/signup">
                      <SlUser className="react-icons" />
                      <span className="nav-logo">Signup</span>
                    </Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Link className=" text-nowrap nav-link" to="/cart">
                      <HiOutlineShoppingBag className="react-icons" />
                      <span className="nav-logo"> Shopping Bag</span>
                    </Link>
                  </Nav.Item>
                </div>
              </Nav>
            ) : (
              <Nav className="nav-main text-center w-100">
                <Nav.Item className=" mx-auto nav-brand text-center">
                  <Link className=" brand px-4 text-dark" to="/">
                    <IoLogoVk className="brand-logo" />
                  </Link>
                </Nav.Item>
                <div className="nav-main-div ">
                  <Nav.Item className="nav-search-logo">
                    <Link
                      className=" text-nowrap nav-link"
                      onClick={() => setShow(!show)}
                    >
                      <BsSearch className="react-icons" />
                    </Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Link
                      className="text-nowrap nav-link "
                      onClick={() => setshowdropdown(!showdropdown)}
                      
                    >
                      <div className="nav-dropdown">
                        <SlUser className="react-icons" />
                        <span className="nav-logo">My Account</span>
                        {showdropdown && (
                          <div className="">
                            <ul>
                              <Link className="dropdownlink" to="/myaccount">
                                <li>
                                  <span className="menu">Profile</span>
                                </li>
                              </Link>
                              <Link className="dropdownlink" to="/myorders">
                                <li>
                                  <span className="menu">My Orders</span>
                                </li>
                              </Link>
                              <Link className="dropdownlink" to="/myaccount">
                                <li>
                                  <span className="menu">Help</span>
                                </li>
                              </Link>
                              <Link
                                className="dropdownlink"
                                onClick={handlelogout}
                              >
                                <li>
                                  <span className="menu">Logout</span>
                                </li>
                              </Link>
                            </ul>
                          </div>
                        )}
                      </div>
                    </Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Link className=" text-nowrap nav-link" to="/cart">
                     
                      <Badge color="primary" badgeContent={items?.length} max={10}>
                       
                     
                      <HiOutlineShoppingBag className="react-icons" />
                      </Badge>
                      <span className="nav-logo"> Shopping Bag</span>
                    
                    </Link>
                  </Nav.Item>
                </div>
              </Nav>
            )}
          </Navbar>
        ) : (
          <div className="d-flex pt-5 px-3">
            <form
              action="#"
              className="w-100  top-search-bar"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control border-secondary rounded-pill searchinput-top "
                type="search"
                placeholder="search"
                id="example-search-input2"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn search-icon-top text-dark border-0 rounded-circle submit-button "
                type="submit"
                onClick={handleSearch}
              >
                <AiOutlineSearch className=" rounded-circle" />
              </button>
            </form>
            <div className="ms-3 py-2">
              <RxCross1 className="close-btn" onClick={() => setShow(!show)} />
            </div>
          </div>
        )}

        <Navbar
          className="pt-0 mt-0 px-3 navbar-light"
          collapseOnSelect
          expand="md"
          expanded={expanded}
        >
          <Navbar.Collapse>
            <Nav
              className=" nav-third pt-3 pt-md-auto position-relative "
              variant="underline"
              defaultActiveKey="/"
            >
              <div className=" nav-third-top ">
                <Nav.Item className="me-5 me-md-0  ">
                  <NavLink
                    activeClassName="active"
                    className="nav-link "
                    exact
                    to="/"
                  >
                    Home
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    exact
                    to="/product"
                  >
                    Product
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    exact
                    to="/about"
                  >
                    About
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    exact
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </Nav.Item>
              </div>

              <div className="nav-third-div">
                <form action="#" className="d-flex " onSubmit={handleSubmit}>
                  <input
                    className="form-control border-secondary rounded-pill searchinput"
                    type="search"
                    placeholder="search"
                    id="example-search-input2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn search-icon text-dark border-0 rounded-circle  "
                    type="submit"
                    onClick={handleSearch}
                  >
                    <AiOutlineSearch className=" rounded-circle" />
                  </button>
                </form>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {location.pathname === "/" ? (
          <div className="banner">
            <p>Welocome to Vk Ecomerse</p>
            <h1>Find Amazing Products Below</h1>

            <a href="#products">
              <button className="btn btn-outline-primary btn-lg">
                <CgMouse /> Scroll
              </button>
            </a>
          </div>
        ) : (
          ""
        )}
      </div> : 
      <div className="checkout-nav">
        <div>
        <Link className="nav-link" to="/">
              <IoLogoVk className="checkout-nav-logo" />
        </Link>
        </div>
      </div>}
    </>
  );
};

export default Header;
