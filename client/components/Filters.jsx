import React from 'react'
import './filters.css'
import { TbBeach, TbSailboat, TbMountain, TbCoffee, TbUfo } from 'react-icons/tb';
import { BiBed } from 'react-icons/bi';
import { MdCabin, MdOutlineGridOff } from 'react-icons/md';
import { HiOutlineFire } from 'react-icons/hi';
import { LuCastle } from 'react-icons/lu';


const Filters = () => {
    const sorting = [

        {title: "Trending", icon: <HiOutlineFire />},
        {title: "Beach", icon: <TbBeach />},
        {title: "Boat House", icon: < TbSailboat/>},
        {title: "Mountain Side", icon: < TbMountain/>},
        {title: "Room", icon: <BiBed />},
        {title: "Cabin", icon: <MdCabin  />},
        {title: "Castle", icon: <LuCastle />},
        {title: "Off The Grid", icon: <MdOutlineGridOff />},
        {title: "Bed and Breakfast", icon: <TbCoffee />},
        {title: "OMG", icon: <TbUfo />},
        

    ]
  return (
    <div className="filter-icons">
      {sorting.map((item, index) => (
        <div className="filter-icon" key={index}>
          {item.icon}
          <span className="filter-title">{item.title}</span>
        </div>
      ))}
    </div>
  )
}

export default Filters
