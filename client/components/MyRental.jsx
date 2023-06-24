import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyRental({onHandleButtonClick}) {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const handleGetAllMyRentals = async () => {
      try {
        const result = await axios.get('/api/my-rentals');
        console.log(result.data);
        setRentals(result.data.likedIds);
      } catch (error) {
        console.log(error);
      }
    };

    handleGetAllMyRentals();
  }, []);


  console.log(rentals, "asdfaoisdjfgaiosdg")
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50" style={{ overflow: 'auto' }}>
      <div className="new-card-container" style={{marginTop: '20%'}}>
        {rentals.map((rental) => (
          <div className="new-card" key={rental.id}>
          <img src={rental.image1} alt={rental.location} />
              <h2>{rental.location}</h2>
              <p>${rental.price}</p>
              <p>{rental.date}</p>
              <p>{rental.group_size} guests</p>
          </div>
        ))}
      </div>
      <button
            className="absolute top-2 right-2 bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 focus:bg-gray-400"
            onClick={onHandleButtonClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
    </div>
    )
};

export default MyRental;
