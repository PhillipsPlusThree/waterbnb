// import React, { useState } from 'react';
// import { IoMdHeartEmpty } from 'react-icons/io';
// import { IoMdHeart } from 'react-icons/io';
// import '../styles/cards.css';
// import axios from 'axios';

// const Cards = ({ data, renderBoatPage, renderAboutPage }) => {
//   const [likedCards, setLikedCards] = useState([]);

//   const handleCardClick = (rentalId) => {
//     renderBoatPage(rentalId);
//   };

//   const handleClick = async (id) => {
//     console.log('clicked');
//     if (likedCards.includes(id)) {
//       // Remove the card from likedCards state
//       setLikedCards(likedCards.filter((cardId) => cardId !== id));

//       // Remove the card from my_rentals table
//       try {
//         await axios.delete(`/api/my-rentals/${id}`);
//         console.log(`Removed rental with ID ${id} from my_rentals`);
//       } catch (error) {
//         console.error(
//           `Error removing rental with ID ${id} from my_rentals:`,
//           error
//         );
//       }
//     } else {
//       // Add the card to likedCards state
//       setLikedCards([...likedCards, id]);

//       // Add the card to my_rentals table
//       const selectedCard = data.find((rental) => rental.id === id);
//       try {
//         await axios.post('/api/my-rentals', selectedCard);
//         console.log('Added to my_rentals:', selectedCard);
//       } catch (error) {
//         console.error('Error adding to my_rentals:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="card-container">
//         {data.map((rental) => (
//           <div
//             key={rental.id}
//             className="card"
//             onClick={() => handleCardClick(rental.id)}
//           >
//             <img src={rental.image1} alt={rental.location} />
//             <div
//               className={`like ${likedCards.includes(rental.id) ? 'liked' : ''}`}
//               onClick={() => handleClick(rental.id)}
//             >
//               {likedCards.includes(rental.id) ? (
//                 <IoMdHeart className="like" />
//               ) : (
//                 <IoMdHeartEmpty className="like" />
//               )}
//             </div>
//             <h2>{rental.location}</h2>
//             <p>${rental.price}</p>
//             <p>{rental.date}</p>
//             <p>Group Size: {rental.group_size}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cards;
