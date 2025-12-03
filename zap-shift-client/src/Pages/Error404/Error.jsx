import React from "react";
import error404 from "../../assets/Error404.png";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen bg-base-100 rounded-2xl flex flex-col justify-center items-center">
      <img src={error404} alt="page not found" className="" />
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
