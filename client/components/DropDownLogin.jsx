import React, { useState } from "react";
// import SignUp from "./SignUp";
import SignUpTest from "./SignUpTest.jsx";
import LogIn from "./Login.jsx";
import WaterBNBBoat from "./WaterBNBBoat";

function DropDownLogin() {
	const Menus = ["Sign Up", "Log in", "Waterbnb your boat", "Help"];
	const [selectedComponent, setSelectedComponent] = useState(null);

	const handleMenuClick = (menu) => {
		console.log(`${menu} clicked`);

		if (menu === "Sign Up") {
			setSelectedComponent(<SignUpTest />);
		} else if (menu === "Log in") {
			setSelectedComponent(<LogIn />);
		} else if (menu === "Waterbnb your boat") {
			setSelectedComponent(<WaterBNBBoat />);
		} else if (menu === "Help") {
			window.location.href = "https://www.youtube.com/@WillSwinson";
		}
	};

	return (
		<div className="bg-white p-4 w-52 shadow-lg absolute -left-30 top-24 z-10">
			<ul>
				{Menus.map((menu) => (
					<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100" key={menu} onClick={() => handleMenuClick(menu)}>
						{menu}
					</li>
				))}
			</ul>
			{selectedComponent}
		</div>
	);
}

export default DropDownLogin;
