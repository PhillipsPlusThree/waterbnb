import React, { useState } from 'react';
import '../styles/filters.css';
import { TbSailboat, TbFishHook, TbSpeedboat } from 'react-icons/tb';
import { MdOutlineDirectionsBoatFilled } from 'react-icons/md';
import { HiOutlineFire } from 'react-icons/hi';
import { RiHomeSmileLine } from 'react-icons/ri';
import axios from 'axios';
import Cards from './Cards';

const Filters = ( { onFilter }) => {
  const sorting = [
    { type: 'trending', title: 'Trending', icon: <HiOutlineFire /> },
    { type: 'sail-boat', title: 'Sail Boats', icon: <TbSailboat /> },
    { type: 'power-boat', title: 'Power Boats', icon: <TbSpeedboat /> },
    { type: 'yacht', title: 'Yachts', icon: <MdOutlineDirectionsBoatFilled /> },
    { type: 'fishing-boat', title: 'Fishing Boats', icon: <TbFishHook /> },
    { type: 'house-boat', title: 'House Boats', icon: <RiHomeSmileLine /> },
  ];

  const [rentals, setRentals] = useState([]);
  
  const handleButtonClick = async (type) => {
    try {
      // Clear the rentals state
      setRentals([]);
      onFilter();
      // Make an HTTP GET request to the backend API
      const response = await axios.get(`/api/${type}`);
  
      // Update the state with the received rentals
      setRentals(response.data);

      
    } catch (error) {
      console.error(error);
      // Handle any errors that occurred during the request
    }
  };
  
  const handleRenderBoatPage = (rentalId) => {
    // Logic to navigate to the boat page using the rentalId
  };

  return (
    <div>
      <div className="filter-icons">
        {sorting.map((item, index) => (
          <div className="filter-icon" key={index}>
            <button className="filter-button" onClick={() => handleButtonClick(item.type)}>
              <span className="icon-wrapper">{item.icon}</span>
            </button>
            <span className="filter-title">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="card-section">
        <Cards data={rentals} renderBoatPage={handleRenderBoatPage} />
      </div>
    </div>
  );
};

export default Filters;
