import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/cashpot.jpg'

const Home = () => {
  return (
    <div className=" h-screen bg-[#ddeaff] py-12 px-4 text-center flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to CashCraft</h1>
            <p className="text-lg mb-6">Effortlessly manage your finances with our intuitive app.</p>
            <div className=" flex flex-row justify-center gap-4">
            <Link to={'/signup'} className="bg-[#002D74] rounded-xl text-white py-2 px-4 hover:scale-105 duration-300">Get Started</Link>
            <Link to={'/login'} className="bg-white rounded-xl text-black shadow-md py-2 px-6 hover:scale-105 duration-300">Login</Link>
            </div>
        </div>


  );
};

export default Home;