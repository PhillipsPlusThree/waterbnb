import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Boat from "./Boat";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";

const App = () => {
  const [showCard, setShowCard] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [data, setData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/rentals");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderBoatPage = (rentalId) => {
    setSelectedRental(rentalId);
    setShowFilters(false);
  };

  const handleRemoveCard = () => {
    setShowCard(false);
  };

  const handleFilterApplied = () => {
    setShowCard(false);
    setFiltersApplied(true);
  };

  const handleHideFilters = () => {
    setShowFilters(false);
  };

  return (
    <>
      <div className="App">
        <Navbar
          onRemoveCard={handleRemoveCard}
          onHideFilters={handleHideFilters}
        />
        {showFilters && <Filters onFilter={handleFilterApplied} />}
        {selectedRental ? (
          <Boat rentalId={selectedRental} />
        ) : showCard && !filtersApplied ? (
          <Cards data={data} renderBoatPage={renderBoatPage} />
        ) : null}

        {/* Footer */}
      </div>
    </>
  );
};

export default App;
