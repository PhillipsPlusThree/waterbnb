import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import "../styles/boat.css";
import Reservation from "./Reservation.jsx";

const Boat = ({ rentalId }) => {
  const [rentalData, setRentalData] = useState(null);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const response = await axios.get(`/api/rentals/${rentalId}`);
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
      <div className="boat-des">
        {/* <h2>${rentalData.name}</h2> */}
        {/* <p>${rentalData.stars}${rentalData.location}</p> */}
        <h2>{rentalData.description}</h2>
        <div className="review">
          <container className="rate">
            <AiFillStar />
            <p>{rentalData.rating}</p>
          </container>
          <p>{rentalData.review} reviews</p>
          <p>{rentalData.location}</p>
        </div>
        <img src={rentalData.image} alt="boat" />
        <p>Entire boat hosted by Rebecca</p>
        <p>{rentalData.group_size} guests</p>
        {/* <p>${rentalData.description}</p> */}
        <Reservation />
      </div>
    </>
  );
};

export default Boat;
