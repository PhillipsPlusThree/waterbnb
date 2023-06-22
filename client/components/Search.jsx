import React, { useState } from "react";
import "../styles/search.css";
import axios from "axios";
// import SearchCard from './SearchCard';

const Search = ({ onSearch, onRemoveCard, onHideFilters }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  // const [endDate, setEndDate] = useState('');
  const [group_size, setGroup_size] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // const handleEndDateChange = (e) => {
  //   setEndDate(e.target.value);
  // };

  const handleGuestsChange = (e) => {
    setGroup_size(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post("/api/rentals", {
        location,
        date,
        group_size,
      });
      setSearchResults(response.data);
      onRemoveCard();
      onHideFilters();
      setShowModal(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-form-group">
              <label className="modal-label">Location</label>
              <input
                type="text"
                className="modal-input"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Start Date</label>
              <input
                type="date"
                className="modal-input"
                value={date}
                onChange={handleDateChange}
              />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Guests</label>
              <input
                type="number"
                className="modal-input"
                value={group_size}
                onChange={handleGuestsChange}
              />
            </div>
            <button className="modal-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}
      <div className="new-card-container">
        {searchResults.length === 0 ? (
          <p>No matches found</p>
        ) : (
          searchResults.map((rental) => (
            <div className="new-card" key={rental.id}>
              <img src={rental.image1} alt={rental.location} />
              <h2>{rental.location}</h2>
              <p>Price: ${rental.price}</p>
              <p>Date: {rental.date}</p>
              <p>Group Size: {rental.group_size}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
