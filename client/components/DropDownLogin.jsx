import React, { useState } from 'react';
import SignUp from './SignUp';
import LogIn from './Login.jsx';
import Themes from "./Themes";
import MyRental from './MyRental';
import '../styles/dropdown.css';
// import Themes from "./Themes";



const  DropDownLogin = ({ theme, toggleTheme, onHandleButtonClick }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const Menus = ['Sign Up', 'Log in', 'Liked Rental', 'Help'];


  const handleMenuClick = (menu) => {
    console.log(`${menu} clicked`);

    if (menu === 'Sign Up') {
      setSelectedComponent(<SignUp onHandleButtonClick={onHandleButtonClick}/>);
    } else if (menu === 'Log in') {
      setSelectedComponent(<LogIn onHandleButtonClick={onHandleButtonClick}/>);
    } else if (menu === 'Liked Rental') {
      setSelectedComponent(<MyRental onHandleButtonClick={onHandleButtonClick}/>);
    } else if (menu === 'Help') {
      alert("This will take you to real airbnb help website")
      window.location.href = 'https://www.airbnb.com/help?audience=guest'
    }
  };


  return (
    <div className='bg-white p-4 w-52 shadow-lg absolute -left-30 top-24 rounded-lg z-10'>
      <ul>
        {Menus.map((menu) => (
          <li
            className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100 "
            key={menu}
            onClick={() => handleMenuClick(menu)}
          >
            {menu}
          </li>
        ))}
        <div className='mode'>Theme
        <Themes theme={theme} toggleTheme={toggleTheme} />
        </div>
      </ul>
      {selectedComponent}
    </div>
  );
}

export default DropDownLogin;
