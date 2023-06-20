import React from 'react'
import '../styles/filters.css'
import { TbSailboat, TbFishHook, TbSpeedboat } from 'react-icons/tb';
import { MdOutlineDirectionsBoatFilled } from 'react-icons/md';
import { HiOutlineFire } from 'react-icons/hi';
import { RiHomeSmileLine } from 'react-icons/ri';






const Filters = () => {
    const sorting = [

        {title: "Trending", icon: <HiOutlineFire />},
        {title: "Sail Boats", icon: < TbSailboat/>},
        {title: "Power Boats", icon: <TbSpeedboat />},
        {title: "Yachts", icon: <MdOutlineDirectionsBoatFilled  />},
        {title: "Fishing Boats", icon: <TbFishHook />},
        {title: "House Boats", icon: <RiHomeSmileLine />}
        
     
        

    ]


    const handleButtonClick = (title) => {
      // Handle button click for a specific icon
      console.log(`Button clicked: ${title}`);
    };
  
  return (
    <div className="filter-icons">
      {sorting.map((item, index) => (
        <div className="filter-icon" key={index}>
          <button className="filter-button" onClick={() => handleButtonClick(item.title)}>
            <span className="icon-wrapper">{item.icon}</span>
          </button>
          <span className="filter-title">{item.title}</span>
        </div>
      ))}
    </div>
  )
}

export default Filters
