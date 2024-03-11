import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className=" bg-gray-800 md:px-24 py-12 text-white px-4 flex flex-col justify-center items-center grow">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Dive into the World of Anonymous Feedback
        </h1>
        <h3 className="md:text-lg text-base md:mt-4 mt-3 text-center">
          True Feedback - Where your identity remains a secret.
        </h3>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage
