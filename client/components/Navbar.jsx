import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './navbar.css';
import { TbWorld } from 'react-icons/tb';
import { GrMenu } from 'react-icons/gr';
import { BsPersonCircle } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import Search from './search';

const Navbar = ({ onRemoveCard }) => {
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (searchData) => {
    // Perform search or any other action based on the selected inputs
    console.log('Search Data:', searchData);
  };

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
            <p>Airbnb your home</p>
            <TbWorld />
            <div className="profile-item">
              <GrMenu />
              <BsPersonCircle />
            </div>
          </div>
        </div>
        {/*right*/}
        {showForm && <Search onSearch={handleSearch} onRemoveCard={onRemoveCard} />}
      </nav>
    </>
  );
};

export default Navbar;
