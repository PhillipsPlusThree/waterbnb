import React, { useEffect, useState, createContext } from "react";
import Cards from "./Cards";
import Boat from "./Boat";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";
import ReactSwitch from "react-switch";

const ThemeContext = createContext(null);

const App = () => {
  const [showCard, setShowCard] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [data, setData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [searchSuccesful, setSearchSuccesful] = useState(false);
  const [theme, setTheme] = useState("light");

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

  const handleSearchSuccess = () => {
    setSearchSuccesful(true);
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <div className="App" id={theme}>
        <form />

        <div className="Switch">
          <ReactSwitch
            className="rs"
            onChange={toggleTheme}
            checked={theme === "dark"}
            onColor="#333333"
          />
        </div>
        <Navbar
          onRemoveCard={handleRemoveCard}
          onChange={toggleTheme}
          onHideFilters={handleHideFilters}
          onSearchSuccess={handleSearchSuccess}
          checked={theme === "dark"}
        />
        {showFilters && <Filters onFilter={handleFilterApplied} />}
        {selectedRental && !searchSuccesful && !showFilters ? (
          <Boat rentalId={selectedRental} />
        ) : showCard && !filtersApplied ? (
          <Cards data={data} renderBoatPage={renderBoatPage} />
        ) : null}

        {/* Footer */}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;