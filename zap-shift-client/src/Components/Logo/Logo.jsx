import React from "react";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-end ">
      <img src={logo} alt="zapShift" />
      <h3 className="text3xl font-bold -ms-2.5">zapShift</h3>
    </div>
  );
};

export default Logo;
