import React, { useEffect, useState, createContext } from "react";
import "../app.css";
import Cards from "./Cards";
import Boat from "./Boat";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";
import "../styles/themes.css";
import About from "./About";

const ThemeContext = createContext(null);

const App = () => {
  const [showCard, setShowCard] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [data, setData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [searchSuccesful, setSearchSuccesful] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showCardsAndFilters, setShowCardsAndFilters] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

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

  const renderAboutPage = () => {
    setShowAbout(true);
    setShowCard(false);
    setShowFilters(false);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
    setShowCard(false);
  };

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

  const handleNavbarImageClick = () => {
    setShowCardsAndFilters((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <div className="App" id={theme}>
        <form />

        {/* Render the Themes component */}

        <Navbar
          onClick={handleAboutClick}
          onAbout={renderAboutPage}
          theme={theme}
          toggleTheme={toggleTheme}
          onRemoveCard={handleRemoveCard}
          onChange={toggleTheme}
          onHideFilters={handleHideFilters}
          onSearchSuccess={handleSearchSuccess}
          onNavbarImageClick={handleNavbarImageClick}
          checked={theme === "dark"}
        />
        {showFilters && <Filters onFilter={handleFilterApplied} />}
        {selectedRental && !showFilters && !showCardsAndFilters ? (
          <Boat rentalId={selectedRental} />
        ) : showCard && !filtersApplied && !selectedRental ? (
          <Cards
            data={data}
            renderBoatPage={renderBoatPage}
            renderAboutPage={renderAboutPage}
          />
        ) : null}

        {showCardsAndFilters && (
          <>
            <Filters onFilters={handleFilterApplied} />
            <Cards data={data} renderBoatPage={renderBoatPage} />
          </>
        )}

        {/* {!showAbout && } */}

        {showAbout && <About onAbout={renderAboutPage} />}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
