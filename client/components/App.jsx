import React, { useEffect, useState, createContext } from "react";
import "../app.css";
import Card from "./Card";
import Boat from "./Boat";
import Navbar from "./Navbar";
// import Filters from "./Filters";
import axios from "axios";
import "../styles/themes.css";
import About from "./About";

const ThemeContext = createContext(null);

const App = () => {
  const [showCard, setShowCard] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [data, setData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [searchSuccesful, setSearchSuccesful] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showAbout, setShowAbout] = useState(false);
  const [likedCards, setLikedCards] = useState([]);

  useEffect(() => {
    const fetchAllBoats = async () => {
      try {
        const response = await axios.get("/api/rentals");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllBoats();
  }, []);

  const renderAboutPage = () => {
    setShowAbout(true);
    setShowCard(false);
    setShowFilters(false);
  };

  const renderBoatPage = (rentalId) => {
    setSelectedRental(rentalId);
  };

  const handleRemoveCard = () => {
    setShowCard(false);
  };

  const handleFilterApplied = () => {
    setShowCard(false);
    setFiltersApplied(true);
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleIconClick = () => {
    setShowCardsAndFilters((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <div className="App" id={theme}>
        <form />

        <Navbar
          onAbout={renderAboutPage}
          theme={theme}
          toggleTheme={toggleTheme}
          onChange={toggleTheme}
          checked={theme === "dark"}
          onRemoveCard={handleRemoveCard}
          // onSearchSuccess={handleSearchSuccess}
          onIconClick={handleIconClick}
        />
        {/* <Filters onFilter={handleFilterApplied} /> */}
        <div className="card-container">
          {data.map((rental) => (
            <Card
              key={rental.id}
              rental={rental}
              renderBoatPage={renderBoatPage}
              likedCards={likedCards}
              setLikedCards={setLikedCards}
            />
          ))}
        </div>
        {selectedRental && <Boat rentalId={selectedRental} />}
        {/* <Card onLiked={handleLike} /> */}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
