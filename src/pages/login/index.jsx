// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dummyUsername = "admin";
  const dummyPassword = "Admin#1234";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === dummyUsername && password === dummyPassword) {
      const user = {
        username,
        password,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(user));
      setError("");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="md:bg-[url(./assets/background.jpg)] bg-cover w-full h-screen flex justify-center items-center">
        <div className=" bg-white py-8 px-4 rounded-md">
          <h2 className="text-xl font-bold text-center">Login</h2>
          <p className="text-center text-gray-500 text-lg mb-4">Silahkan masukan username dan password terlebih dahulu</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="font-semibold mb-1">Username :</p>
              <input type="text" value={username} onChange={handleUsernameChange} placeholder="Masukan Username" className="border border-[#FF7A28] rounded-md outline-0 w-full p-2" />
            </div>
            <div className="mb-4">
              <p className="font-semibold mb-1">Password :</p>
              <div className="flex items-center border border-[#FF7A28] rounded-md pr-2">
                <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} placeholder="Masukan Password" className=" rounded-md outline-0 w-full p-2" />
                <button type="button" onClick={togglePasswordVisibility} className="cursor-pointer">
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-center text-red-600 text-lg font-bold ">{error}</p>}
            <button type="submit" className="bg-[#FF7A28] text-white rounded-md py-2 px-8 font-semibold w-full my-5 cursor-pointer">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
