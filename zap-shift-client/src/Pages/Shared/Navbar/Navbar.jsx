import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  // console.log(user)
  // ------feature ----
  const handleSignOut = () => {
    signOutUser()
      .then()
      .then((error) => console.log(error));
  };
  const Links = (
    <>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm py-5 rounded ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <a className="btn btn-ghost text-4xl text-secondary">
          <Logo />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end gap-4 items-center">
        {user ? (
          <>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <img src={user.photoURL} />
              </div>
            </div>
            <Link onClick={handleSignOut} className="btn btn-primary  ">
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn btn-secondary  ">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary rounded ">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
