import React, { useEffect, useState } from "react";
import Cards from "./cards";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";

const App = () => {
  const [count, setCount] = useState(0);
  const [showCard, setShowCard] = useState(true);


  const handleRemoveCard = () => {
    setShowCard(false);
  };
 
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
    
  )
}

export default App;