import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartContext } from "./CartProvider";
import "material-icons/iconfont/material-icons.css";
import logo from "./images/logo.png";
import { AuthContext } from "./AuthProvider";

const NavBar = ({ isLoggedIn, setIsLoggedIn, user, setUser, setIsLoading }) => {
  const handleClick = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="logoDiv">
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>
      </div>
      <div className="nav-main">
        <SearchBar className="search-bar" setIsLoading={setIsLoading} />
        <div className="links">
          <Link to="/" className="navlinks">
            Home
          </Link>
          <Link to="/Guitars/products" className="navlinks">
            Guitars
          </Link>
          <Link to="/Drums/products" className="navlinks">
            Drums
          </Link>
          <Link to="/Band/products" className="navlinks">
            Band/Orchestra
          </Link>
          <Link to="/Keyboards/products" className="navlinks">
            Keyboards/Synths
          </Link>
          <Link to="/Accessories/products" className="navlinks">
            Accessories
          </Link>
          <Link to="/products" className="navlinks">
            See All Products
          </Link>
        </div>
      </div>
      <div className="right-nav">
        <div className="cart-icon">
          <p>Hello, {user ? user : `guest`}</p>
          <div className="view-cart">
            <Link to="/cart/userid/:userId">
              <span class="material-icons">shopping_cart</span>
            </Link>
            <Link to="/cart/userid/:userId">
              <p>View cart (0)</p>
            </Link>
          </div>
        </div>
        <div>
          {isLoggedIn ? (
            <Link className="login-links" to="/login" onClick={handleClick}>
              Logout
            </Link>
          ) : (
            <>
              <Link className="login-links" to="/login">
                Login
              </Link>
              <Link className="login-links" to="/register">
                Sign Up
              </Link>
            </>
          )}
          <Link to="/" className="login-links">
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
