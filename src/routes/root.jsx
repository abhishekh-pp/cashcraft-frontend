import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../features/auth/authSlice";

function Root(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  const trackLink = user ? '/tracker' : '/login'; // Destination based on user login status

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
              <Link to={trackLink}>Track</Link>
            </li>
            {!user && (
  <li>
    <Link to={'/singup'}>SignUp</Link>
  </li>
)}
            {user ? (
              <li>
                <button onClick={handleLogout} className="block px-6 py-2 text-white bg-[#002D74] rounded-xl hover:scale-105 duration-300">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to={'/login'} className="block px-6 py-2 text-white bg-[#002D74] rounded-xl hover:scale-105 duration-300">
                  Login
                </Link>
              </li>
            )}
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
        <span>&copy; CashCraft 2024</span>
      </footer>
    </>
  );
}

export default Root;
