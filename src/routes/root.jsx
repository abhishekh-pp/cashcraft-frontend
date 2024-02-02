import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

function Root(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="h-20 flex md:flex-row justify-between items-center p-4 shadow-lg">
        <div className="flex items-center">
          <Link className="font-bold text-lg" to={'/'}>
            CashCraft
          </Link>
        </div>
        <nav className={`mt-4 md:mt-0 md:flex md:items-center md:justify-between ${mobileMenuOpen ? 'flex' : 'hidden'}`}>
          <ul className="flex flex-col items-center md:flex-row gap-6">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/blank'}>Blank</Link>
            </li>
            <li>
              <Link to={'/signup'}>Sign up</Link>
            </li>
           
            <li>
              <Link to={'/login'} className="block px-6 py-2 text-white bg-[#002D74] rounded-xl hover:scale-105 duration-300">
                Login
              </Link>
            </li>
          </ul>
        </nav>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-800 focus:outline-none"
          >
          <IoMdMenu />
          </button>
        </div>
      </header>
      <Outlet />
      <footer className="flex flex-col md:flex-row justify-center items-center bg-black text-white p-4">
        <span>&copy; CashCraft 2023</span>
      </footer>
    </>
  );
}

export default Root;



