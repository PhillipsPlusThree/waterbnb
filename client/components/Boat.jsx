import React, { useEffect, useState } from "react";
import axios from "axios";

const Boat = ({ rentalId }) => {
  const [rentalData, setRental] = useState(null);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const response = await axios.get("api/rentals/${rentalId}");
        setRentalData(response.data);
      } catch (error) {
        console.error("Error fetching rental data:", error);
      }
    };

    fetchRentalData();
  }, [rentalId]);

  if (!rentalData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{rentalData.location}</h2>
      <p>Price: ${rentalData.price}</p>
      <img src={rentalData.image} alt="boat" />
    </>
  );
};

export default Boat;
