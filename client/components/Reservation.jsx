import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import "../styles/reservation.css";

const Reservation = () => {
  return (
    <div id="res-control">
      <div id="reservation">
        <div id="res-top">
          <div id="rate">
            <span id="price">$500</span>
            <span id="per-night">night</span>
          </div>
          <div id="stars-rev">
            <span id="stars">
              <AiFillStar />
              <p>4.8</p>
            </span>
            <span id="reviews">reviews</span>
          </div>
        </div>
        <div id="date-guests">
          <div id="dates">
            <button id="in">Check-in</button>
            <button id="out">Check-out</button>
          </div>
          <div id="guests-box">
            <div id="guests">Guests</div>
            <AiOutlineDown id="arrow" />
          </div>
          <span id="reserve-box">
            <button id="reserve-btn">Reserve</button>
            <p>You won't be charged yet</p>
          </span>
          <div className="price-box">
            <div id="price-night" className="prices">
              $500 x 7 nights
            </div>
            <div id="priceXnight" className="prices">
              $3,500
            </div>
          </div>
          <div className="price-box">
            <div id="cleaning" className="prices">
              Cleaning fee
            </div>
            <div id="cleaning-fee" className="prices">
              $125
            </div>
          </div>
          <div className="price-box">
            <div id="service" className="prices">
              Airbnb service fee
            </div>
            <div id="service-fee" className="prices">
              $521
            </div>
          </div>
          <hr />
          <div className="price-box">
            <div id="total" className="prices">
              Total before taxes
            </div>
            <div id="total-price" className="prices">
              $4,146
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
