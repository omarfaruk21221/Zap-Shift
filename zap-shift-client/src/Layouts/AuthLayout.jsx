import React from "react";
import Logo from "../Components/Logo/Logo";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className=" w-full min-h-screen bg-base-100 ">
      <Logo />
      <main className="flex flex-col-reverse md:flex-row min-h-[90vh] ">
        <div className="flex-1  justify-center items-center">
          <Outlet />
        </div>
        <div className=" flex-1  justify-center items-center bg-base-300">
          <img src={authImage} alt="resigter" />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
