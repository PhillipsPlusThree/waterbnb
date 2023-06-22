import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { TbWorld } from "react-icons/tb";
import { GrMenu } from "react-icons/gr";
import { BsPersonCircle } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import DropDownLogin from "./DropDownLogin";
import Search from "./Search";
// import { Link, animateScroll as scroll } from "react-scroll";

const Navbar = ({ onRemoveCard }) => {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);


  const handleSearch = (searchData) => {
    // Perform search or any other action based on the selected inputs
    console.log("Search Data:", searchData);
  };

  const handleButtonClick = () => {
    setOpen(!open);
  }

  return (
    <>
      <nav className="navbar">
        {/* left */}
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          {/* middle */}
          <div className="navbar-links">
            <button onClick={() => setShowForm(!showForm)}>Anywhere</button>
            <button onClick={() => setShowForm(!showForm)}>Any Week</button>
            <button onClick={() => setShowForm(!showForm)}>Add guests</button>
            <span className="search-icon">
              <BiSearchAlt />
            </span>
          </div>
          <div className="profile">
            <p>Waterbnb your boat</p>
            <TbWorld />       
            <div className="profile-item">
              <button 
                className="relative flex items-center"
                 onClick={handleButtonClick}
                 >          
                  <GrMenu className="mr-2" />
                  <BsPersonCircle />              
              </button>
              {open && <DropDownLogin />}
            </div>
          </div>
        </div>
        {/*right*/}
        {showForm && (
          <Search onSearch={handleSearch} onRemoveCard={onRemoveCard} />
        )}
      </nav>
    </>
  );
};

export default Navbar;
