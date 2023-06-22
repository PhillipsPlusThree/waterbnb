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
          <div className="rate">
            <AiFillStar />
            <p>{rentalData.rating}</p>
          </div>
          <p>{rentalData.review} reviews</p>
          <p>{rentalData.location}</p>
        </div>

        <div className="boat-pics">
          <div className="img-container">
            <img src={rentalData.image1} alt="boat1" />
          </div>
          <div className="img-container">
            <img className="sec-pic" src={rentalData.image2} alt="boat2" />
            <img className="sec-pic" src={rentalData.image3} alt="boat3" />
          </div>
          <div className="img-container">
            <img className="sec-pic" src={rentalData.image4} alt="boat4" />
            <img className="sec-pic" src={rentalData.image5} alt="boat5" />
          </div>
        </div>
        <p>Boat hosted by Rebecca</p>
        <p>{rentalData.group_size} guests</p>
        {/* <p>${rentalData.description}</p> */}
      </div>
      <Reservation />
    </>
  );
};

export default Boat;
