import React, { createContext, useState } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { TbWorld } from "react-icons/tb";
import { MdMenuOpen } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import DropDownLogin from "./DropDownLogin";
import Search from "./Search";
import ReactSwitch from "react-switch";



const Navbar = ({ onRemoveCard, onHideFilters, onSearchSuccess, theme, toggleTheme }) => {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = (searchData) => {
    // Perform search or any other action based on the selected inputs
    console.log("Search Data:", searchData);
  };

  const handleButtonClick = () => {
    setOpen(!open);
  };

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.reload();
    };


  return (
    <>
      <nav className="navbar">
        {/* left */}
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          {/* middle */}
          <div className="navbar-links">
            <button className="button-text" onClick={() => setShowForm(!showForm)}>Anywhere</button>
            <button className="button-text" onClick={() => setShowForm(!showForm)}>Any Week</button>
            <button className="button-text" onClick={() => setShowForm(!showForm)}>Add guests</button>
            <span className="search-icon">
              <BiSearchAlt />
            </span>
          </div>
          <div className="profile">
            <p> {localStorage.getItem("username") != null ? "Hi, "+ localStorage.getItem("username") :  " "}</p>
              <button onClick={handleLogout}>
                  {localStorage.getItem('username') ? (
                    'Logout'
                  ) : (
                    <TbWorld />
                  )}
              </button>
            <div className="profile-item">
              <button
                className="relative flex items-center"
                onClick={handleButtonClick}
              >
                <MdMenuOpen className="mr-2" />
                <BsPersonCircle />
              </button>
              {open && <DropDownLogin theme={theme} toggleTheme={toggleTheme} onHandleButtonClick={handleButtonClick}/>}
            </div>
          </div>
        </div>
        {/*right*/}
        {showForm && (
          <Search
            onSearch={handleSearch}
            onRemoveCard={onRemoveCard}
            onHideFilters={onHideFilters}
            onSearchSuccess={onSearchSuccess}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;