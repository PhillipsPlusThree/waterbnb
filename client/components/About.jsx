import React, { useState } from 'react';
import "../styles/about.css";
import brooklyn from "../assets/brooklyn.png";
import phillipM from "../assets/PhillipM.png";
import phillipS from "../assets/PhillipS.png";
import fitz from "../assets/fitz.png";
import tayla from "../assets/tayla.png"



const About = ({ onAbout }) => {




  return (
    <div className='about'>
      <h1 className='waterbnb'>WaterBnb - About Us</h1>
      <h2 className='mission'> Our Mission</h2>
      <p className='desc'>At WaterBnb, our mission is to provide a seamless and unforgettable
         experience for water enthusiasts around the world. We understand the
          love for water-based activities and aim to connect travelers with 
          unique and exceptional accommodations on or near the water. We strive 
          to create a platform that celebrates the beauty of waterfront properties and 
          fosters a community of like-minded individuals who share a passion for aquatic
           adventures.</p>
           <div className='meet'>
      <h2 className='team'>Meet Our Team</h2>
      <div className='person'>
        <img
            src={tayla}
            alt="Logo"
            className="us-pic"
        />
        <div className='about-me'>
        <h2 className='name'>Tayla Enns</h2>
        <h2 className='job'>Project Manager</h2>
        <p className='desc'>Tayla Enns is a versatile professional serving as both a project 
        manager and software engineer. Currently a fullstack developer bootcamp student, Tayla 
        possesses a wide range of skills and knowledge in the field. She has a keen interest in 
        agile workflow management and debugging, ensuring projects are delivered efficiently and 
        with high quality. Tayla's expertise lies in workflow management, where she excels in 
        coordinating teams and optimizing processes. Additionally, she holds a boating license, 
        showcasing her affinity for water activities and safety. Inspired by the serene waters of 
        Huntington Beach and Virginia Beach, Tayla brings her passion for waterfront destinations 
        to the WaterBnb project, aiming to create a seamless and enjoyable experience for users 
        seeking unforgettable adventures by the ocean.</p>
        </div>
        </div>
        <div
        className='person'>
        <img
            src={brooklyn}
            alt="Logo"
            className="us-pic"
        />
        <div className='about-me'>
        <h2 className='name'>Brooklyn Parsons</h2>
        <h2 className='job'>Frontend Engineer</h2>
        <p className='desc'>Brooklyn is frontend engineer with a unique background in 
          hardware engineering who has recently delved into the world of computer coding.
          Despite the unconventional path, her passion for technology and dedication
          to learning has led them to excel in frontend development. She have a particular 
          interest in the dark/light mode feature and strive to create visually captivating 
          and user-friendly interfaces. With a strong focus on security, Brooklyn ensures that 
          the WaterBnb platform provides a safe and reliable user experience. When not coding, 
          Brooklyn finds solace at Canyon Lake, Tx, where they enjoy tubing and immersing themselves
           in the tranquil waters. This connection to water activities fuels their drive to create an
            exceptional platform for water enthusiasts like themselves.</p>
        </div>
        </div>
        </div>
        <div className='person'>
        <img
            src={phillipM}
            alt="Logo"
            className="us-pic"
        />
        <div className='about-me'>
        <h2 className='name'>Phillip Meija</h2>
        <h2 className='job'>React Subject Matter Expert</h2>
        <p className='desc' >Phillip Mejia is a React Subject Matter Expert and a full-stack web developer bootcamp
           student. With a passion for frontend development, Phillip specializes in state management
           using React hooks and is well-versed in creating efficient and interactive user interfaces.
           One of his standout contributions to the WaterBnb project is the development of the boat rendering
           page, where he brings his expertise in React to create a visually captivating and immersive experience.
           Outside of work, Phillip's love for the open waters extends to being an open water certified diver.
           The Dominican Republic holds a special place in his heart as his family is located there and it 
           serves as a great scuba diving destination. This personal connection to the water fuels his dedication 
           to ensuring that WaterBnb provides an exceptional platform for water enthusiasts to explore the world's
           most incredible diving spots.</p>
        </div>
        </div>
        <div className='person'>
        <img
            src={fitz}
            alt="Logo"
            className="us-pic"
        />
        <div className='about-me'>
        <h2 className='name'>Fitz Gerald Sicat</h2>
        <h2 className='job'>Backend Developer</h2>
        <p className='desc'>Fitz Gerald Sicat is a dedicated backend developer with a unique background 
          as an aircraft mechanic for six years. Currently, he is leveraging his mechanical 
          expertise to excel as a software engineer. Fitz Gerald's ability to troubleshoot complex 
          systems and attention to detail translates seamlessly into his backend development work. He 
          specializes in partially error handling and is adept at implementing basic authentication
          login/signup functionalities with token-based authentication. Drawing inspiration from his 
          time stationed in Virginia Beach Oceanfront, Fitz Gerald finds solace in the sound of the waves 
          and enjoys taking breaks to exercise near the ocean. This connection to the water fosters his 
          commitment to ensuring that WaterBnb provides a seamless and reliable platform for users to find 
          their ideal waterfront accommodations.

        </p>
          </div>
            </div>

        <div className='person'>
        <img
            src={phillipS}
            alt="Logo"
            className="us-pic"
        />
        <div className='about-me'>
        <h2 className='name'>Phillip Sussman</h2>
        <h2 className='job'>Backend Developer</h2>
        <p className='desc'>Phillip Sussman is a talented backend developer 
          and a full-stack web development and software engineering 
          bootcamp student. With a strong foundation in both frontend and 
          backend development, Phillip excels in building robust and secure applications. 
          His expertise lies in backend authentication, enabling seamless and secure user 
          experiences. Phillip also possesses a deep understanding of backend systems, 
          particularly in establishing smooth communication between the backend and frontend, 
          as well as implementing authentication and utilizing UUID (Universally Unique Identifier) 
          for unique identification. Having visited Honolulu, Hawaii twice and being captivated by its 
          breathtaking ocean views, Phillip's personal connection to the water fuels his commitment to 
          creating an exceptional WaterBnb platform that offers users memorable experiences amidst stunning 
          waterfront locations.</p>
        </div>
        </div>
              </div>
           
          

  )
}

export default About;
