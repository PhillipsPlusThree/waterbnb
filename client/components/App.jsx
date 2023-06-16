import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Boat from "./Boat";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";

const App = () => {
  const [count, setCount] = useState(0);
  const [showCard, setShowCard] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/rentals");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderBoatPage = (rentalId) => {
    setSelectedRental(rentalId);
  };

  const handleRemoveCard = () => {
    setShowCard(false);
  };

  //Define a funciton that when called will render Boat Component page
  return (
    <>
      <div className="App">
        {/* Navbar */}
        <Navbar onRemoveCard={handleRemoveCard} />
        <Filters />
        {selectedRental ? (
          <Boat rentalId={selectedRental} />
        ) : (
          showCard && <Cards renderBoatPage={renderBoatPage} />
        )}
        {/* Filter */}

        {/* Cards */}
        {/* <Cards /> */}
        {/* Footer */}
      </div>
    </>
  );
};

export default App;
