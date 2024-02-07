import axios from "axios";
import React, {useState} from "react";

import { useDispatch } from "react-redux";
import { addUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import cashpot from "../assets/cashpot.jpg"

const dbUrl = "http://localhost:3000"

function Login(props){
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("");
    const handleLogin = (e) => { 
        e.preventDefault()
    const form = e.target 
    const email = form['email'].value
    const password = form['password'].value

    axios.post(dbUrl+'/auth/user/login',{email, password},{withCredentials:true})
    .then(data=>{
        const user = data.data.user
        dispatch(addUser(user));
       navigate('/tracker')
    })
    .catch(err => {
        console.log(err)
        if (err.response && err.response.status === 401) {
          setErrorMessage("Incorrect password. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
    })

}

return(
    <main>
        

<section className="bg-gray-50 min-h-screen flex items-center justify-center">
      
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
      
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
          {errorMessage && <p className="bg-[#ffc6c6] py-4 px-4 rounded-xl text-xs text-gray-900 mt-2">{errorMessage}</p>}

          <form action="" className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input className="p-2 mt-8 rounded-xl border" type="email" name="email" id="email" placeholder="Email" />
            <div className="relative">
              <input className="p-2 rounded-xl border w-full" type="password" name="password" id="password" placeholder="Password" />
              
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
          </form>

          

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300" to={"/signup"} >Register</Link>
          </div>
        </div>

        
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={cashpot} alt="Login" />
        </div>
      </div>
    </section>
    </main>
)


}

export default Login