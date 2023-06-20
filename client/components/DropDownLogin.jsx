import React from 'react'

function DropDownLogin() {

  const Menus = ['Sign Up', 'Log in', 'Airbnb your home', 'Help']

  return (
    <div className='bg-white p-4 w-52 shadow-lg absolute -left-30 top-24' >
      <ul>
       {
        Menus.map((menu) => (
          <li 
            className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
            key={menu}
           >
           {menu}
          </li>
        ))
       }
      </ul>
    </div>
  )
}

export default DropDownLogin
