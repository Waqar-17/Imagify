import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  
  // Destructuring all necessary values from AppContext
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Login') {
        // Login Logic
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token); // Use setItem, not getItem
          setShowLogin(false);
          toast.success("Logged in successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        // Sign Up Logic
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token); // Use setItem, not getItem
          setShowLogin(false);
          toast.success("Account created successfully");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      // Better error handling for Axios
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form 
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 shadow-lg"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center mb-4">
          {state === "Login" ? "Welcome back! Please sign in to continue" : "Join us! Create an account to get started"}
        </p>

        {/* Full Name field - only shows during Sign Up */}
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="" className="w-4" />
            <input
              onChange={e => setName(e.target.value)} 
              value={name}
              className="outline-none text-sm w-full"
              placeholder="Full Name"
              type="text"
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" className="w-4" />
          <input
            onChange={e => setEmail(e.target.value)} 
            value={email}
            className="outline-none text-sm w-full"
            placeholder="Email ID"
            type="email"
            required
          />
        </div>

        {/* Password field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className="w-4" />
          <input
            onChange={e => setPassword(e.target.value)} 
            value={password}
            className="outline-none text-sm w-full"
            placeholder="Password"
            type="password"
            required
          />
        </div>

        {state === "Login" && (
          <p className="text-sm text-blue-600 my-4 cursor-pointer hover:underline">
            Forgot password?
          </p>
        )}

        <button className="bg-blue-600 w-full text-white py-2 rounded-full mt-4 hover:bg-blue-700 transition-all">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === 'Login' ? (
          <p className="mt-5 text-center text-sm">
            Don't have an account?{" "}
            <span 
              className="text-blue-500 cursor-pointer font-semibold" 
              onClick={() => setState('Sign Up')}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm">
            Already have an account?{" "}
            <span 
              className="text-blue-500 cursor-pointer font-semibold" 
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </p>
        )}

        {/* Close Icon */}
        <img 
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-5 right-5 cursor-pointer w-3"
        />
      </form>
    </div>
  );
};

export default Login;