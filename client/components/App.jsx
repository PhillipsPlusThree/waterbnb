import React, { useEffect, useState, createContext } from "react";
import "../app.css";
import Card from "./Card";
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
  const [searchSuccesful, setSearchSuccesful] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showAbout, setShowAbout] = useState(false);
  const [likedCards, setLikedCards] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [noResults, setNoResults] = useState(false);

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
  }, [showCard]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleGroupSizeChange = (e) => {
    setGroupSize(e.target.value);
  };

  const handleSearch = async () => {
    console.log("searched");
    if (groupSize.length > 0 && date.length > 0 && location.length > 0) {
      try {
        const response = await axios.post("/api/search", {
          location,
          date,
          groupSize,
        });
        if (response.data.length >= 1) {
          setShowModal(false);
          setData(response.data);
        } else {
          setLocation("");
          setGroupSize("");
          setDate("");
          setNoResults(true);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleFilterChange = async (type) => {
    if (selectedRental !== null) {
      setSelectedRental(null);
    }
    try {
      const response = await axios.get(`/api/categories/${type}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderAboutPage = () => {
    setShowAbout(true);
    setData([]);
  };

  const renderBoatPage = (rentalId) => {
    setSelectedRental(rentalId);
    setData([]);
  };

  const handleRemoveCard = () => {
    setShowCard(false);
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleIconClick = () => {
    if (selectedRental !== null) {
      setSelectedRental(null);
    }
    setShowCard((prevState) => !prevState);
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
          onIconClick={handleIconClick}
          location={location}
          setLocation={setLocation}
          date={date}
          setDate={setDate}
          groupSize={groupSize}
          setGroupSize={setGroupSize}
          noResults={noResults}
          setNoResults={setNoResults}
          handleSearch={handleSearch}
        />
        <Filters onFilterChange={handleFilterChange} />
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
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
