import axios from "axios";
import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/auth/authSlice";
import cashpot from "../assets/cashpot.jpg"

const dbUrl = "http://localhost:3000"

function SignUp(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignUp = (e) => { 
        e.preventDefault()
    const form = e.target 
    const name = form['name'].value
    const email = form['email'].value
    const password = form['password'].value

    axios.post(dbUrl+'/auth/user/signup',{name, email, password},{withCredentials:true})
    .then(data=>{
        const user = data.data.user
        dispatch(addUser(user))
        navigate('/login')
    })
    .catch(err => {
        console.log(err)
    })

}

return(
    <main className="h-screen bg-[#ddeaff]">
        

<section className=" min-h-screen flex items-center justify-center">
      
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
      
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">And get your finance tracked</p>

          <form action="" className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input className="p-2 mt-8 rounded-xl border" type="text" name="name" id="name" placeholder="Name" />
            <input className="p-2  rounded-xl border" type="email" name="email" id="email" placeholder="Email" />
            <div className="relative">
              <input className="p-2 rounded-xl border w-full" type="password" name="password" id="password" placeholder="Password" />
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
          </form>

          

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300" to={"/login"} >Login</Link>
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

export default SignUp