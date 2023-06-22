import React, { useState } from "react";
import axios from "axios";
import boatLogo from "../assets/boat.png";
import "../styles/login.css";

const SignUpTest = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(username, password);
		try {
			// Make an API call to your backend server
			const response = await axios.post("http://localhost:3000/api/signup", {
				username,
				password,
			});

			console.log(response.data); // You can handle the response as needed

			// Reset form fields
			setUsername("");
			setPassword("");
			// Close the modal or handle success state
			window.location.reload();
		} catch (error) {
			console.error("Error signing up:", error);

			if (error.response && error.response.status === 409) {
				// User already exists error
				setErrorMessage("User already exists. Please try a different email.");
			} else {
				// Other error
				setErrorMessage("An error occurred while signing up. Please try again later.");
			}
		}
	};
	return (
		<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
			<div className="grid grid-cols-1 sm:grid-cols-2">
				<div className="hidden sm:block">
					<img className="w-full h-full object-cover" id="LLogin" src={boatLogo} alt="" />
				</div>

				<div className="bg-gray-800 flex flex-col justify-center rounded-br-30" id="RLogin">
					<form onSubmit={handleSubmit} className="max-w-[90%] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
						<h2 className="text-4x1 dark:text-white font-bold text-center">(Sign Up Test) Register</h2>
						{errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
						<div className="flex flex-col text-gray-400 py-2">
							<label>Username</label>
							<input className="rounded-lg bg-gray-700 mt-1 p-1 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" placeholder="Enter Username" type="text" onChange={handleUsernameChange} />
						</div>
						<div className="flex flex-col text-gray-400 py-2">
							<label>Password</label>
							<input
								className="rounded-lg bg-gray-700 mt-1 p-1 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
								placeholder="Enter Password"
								type="password"
								onChange={handlePasswordChange}
							/>
						</div>
						<button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">
							Send to server to show up on UI
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUpTest;
