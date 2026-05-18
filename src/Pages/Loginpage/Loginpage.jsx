import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Make sure to place your images in the `images` folder as `study.png` and `logo.png`
import study from "./images/study.svg";
import tatu from "./images/logo-md.png";

function Loginpage() {
  const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios({
      method: "POST",
      url: "https://najot-edu.softwareengineer.uz/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone: phone,
        password: password,
      },
    });

    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data?.accessToken || ""
    );

    navigate("/dashboard");

  } catch (error) {
    console.log(error.response?.data);
    console.log(error);

    alert("Login ishlamadi");
  }
};

  return (
    <div className="flex w-full h-screen font-sans overflow-hidden">
      {/* Left Side */}
      <div className="hidden lg:flex w-[50%] h-full bg-[#202c4b] items-center justify-center relative">
        <img
          src={study}
          alt="Study Illustration"
          className="w-[80%] max-w-[700px] z-10"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[50%] h-full flex flex-col items-center justify-between py-10 px-8 bg-white relative">
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-[380px] gap-8">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-[10px] sm:text-[11px] font-semibold text-gray-800 leading-relaxed tracking-wide uppercase">
              MUHAMMAD AL-XORAZMIY NOMIDAGI <br /> TOSHKENT AXBOROT
              TEXNOLOGIYALARI <br /> UNIVERSITETI
            </h2>
            <img
              className="w-[85px] h-[85px] object-contain rounded-full shadow-sm"
              src={tatu}
              alt="TUIT Logo"
            />
          </div>

          <h3 className="font-bold text-[#333] text-[18px] sm:text-[20px] tracking-wide mt-2">
            LEARNING MANAGEMENT SYSTEM
          </h3>

          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col gap-5 mt-2"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                Login
              </label>
             <TextField
  fullWidth
  variant="outlined"
  placeholder="Loginni kiriting"
  size="small"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
      backgroundColor: "#fff",
    },
  }}
/>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                Parol
              </label>
        <TextField
  fullWidth
  variant="outlined"
  type={showPassword ? "text" : "password"}
  placeholder="Parolni kiriting"
  size="small"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
      backgroundColor: "#fff",
    },
  }}
 
/>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                backgroundColor: "#202c4b",
                color: "white",
                textTransform: "none",
                fontWeight: "600",
                fontSize: "15px",
                padding: "10px",
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#162039",
                },
                marginTop: "12px",
              }}
            >
              Kirish
            </Button>
          </form>
        </div>

        <div className="w-full flex justify-center items-end pb-4">
          <p className="text-[12px] text-gray-500 w-full text-center">
            Copyright © 2021 of Tashkent University of Information Technologies
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
