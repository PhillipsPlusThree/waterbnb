import React, { useState } from "react";
import "../styles/search.css";
import axios from "axios";

const Search = ({
  onSearchSuccess,
  location,
  setLocation,
  date,
  setDate,
  groupSize,
  setGroupSize,
  noResults,
  setNoResults,
  handleSearch,
}) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
            <div className="modal-form-group">
              <label className="modal-label">Location</label>
              <input
                type="text"
                className="modal-input"
                value={location}
                onChange={setLocation}
              />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Start Date</label>
              <input
                type="date"
                className="modal-input"
                value={date}
                onChange={setDate}
              />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Guests</label>
              <input
                type="number"
                className="modal-input"
                value={groupSize}
                onChange={setGroupSize}
              />
            </div>
            <button className="modal-button" onClick={handleSearch}>
              Search
            </button>
            {noResults && <p>No Results found please try again. </p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
