import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Boat from "./Boat";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";


const App = () => {

  const [showCard, setShowCard] = useState(true);

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
        {showCard && <Cards />}
        {/* Filter */}

        {/* Cards */}
        {/* <Cards /> */}
        {/* Footer */}
      </div>
    </>
  );
};

export default App;
