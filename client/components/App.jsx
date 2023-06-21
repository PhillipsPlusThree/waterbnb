import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Boat from "./Boat";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";

document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1439405326854-014607f694d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80')";

const App = () => {

  const [showCard, setShowCard] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [data, setData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);


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
  };

  const handleRemoveCard = () => {
    setShowCard(false);
  };

  const handleFilterApplied = () => {
    setShowCard(false);

  };
  

  return (
    <>
      <div className="App">
        <Navbar onRemoveCard={handleRemoveCard} />
        <Filters onFilter={handleFilterApplied} />

        {selectedRental ? (
          <Boat rentalId={selectedRental} />
        ) : (
          showCard && <Cards data={data} renderBoatPage={renderBoatPage} />
        )}
        {showCard && selectedRental === null && !filtersApplied ? (
  <Cards data={data} renderBoatPage={renderBoatPage} />
) : null}

        {/* Filter */}

        {/* Cards */}
        {/* <Cards /> */}
        {/* Footer */}
      </div>
    </>
  );
};

export default App;
