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
        <h2 className="boat-title">{rentalData.description}</h2>
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
        <p id="host">Boat hosted by Rebecca</p>
        <p id="boat-details">
          {rentalData.group_size} guests | 1 cabin | 2 beds | 1 bath
        </p>
        {/* <p>${rentalData.description}</p> */}
      </div>
      <div id="boat-box">
        <div id="boat-description">
          <hr />
          <span>
            <p className="bold-p">Dedicated workspace</p>
            <p className="small-p">
              A room with wifi that's well-suited for working.
            </p>
          </span>
          <span>
            <p className="bold-p">Self check-in</p>
            <p className="small-p">Check yourself in with the keypad.</p>
          </span>
          <span>
            <p className="bold-p">Free cancellation for 48 hours.</p>
          </span>
          <hr />
          <p className="big-l">
            Welcome aboard the Aqua Haven! Prepare to embark on a remarkable
            waterfront retreat like no other. Step onto this enchanting boat and
            immerse yourself in a world of tranquility on the picturesque waters
            of Lake Serenity. The Aqua Haven offers a truly unique and
            unforgettable experience.
          </p>

          <p className="big-l">
            Indulge in the breathtaking views of the glistening lake from the
            expansive deck, where you can bask in the warm sunlight or marvel at
            the starlit sky during tranquil evenings. The deck is a perfect
            setting for alfresco dining, so savor delicious meals while
            surrounded by nature's splendor.
          </p>

          <p className="big-l">
            Inside, the cozy cabin beckons with its inviting atmosphere and
            comfortable sleeping quarters, ensuring restful nights. The
            well-appointed galley provides all the essentials for preparing
            delightful meals, making it a breeze to showcase your culinary
            skills.
          </p>

          <p className="big-l">
            Venture into the refreshing waters of Lake Serenity for a
            revitalizing swim or cast your fishing line for a chance to reel in
            the catch of the day. On lazy afternoons, recline on the plush
            lounge chairs and lose yourself in a captivating book as gentle
            waves lull you into relaxation.
          </p>

          <p>
            Escape the ordinary and embrace the serenity of life on the water at
            Aqua Haven. Discover the true meaning of tranquility as you create
            lasting memories in this idyllic retreat that seamlessly blends
            nature's beauty with modern comforts. Your extraordinary waterfront
            adventure awaits!
          </p>
        </div>
        <hr />
        <Reservation />
      </div>
    </>
  );
};

export default Boat;
