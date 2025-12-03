import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { NavLink } from "react-router";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
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
        <NavLink to="rider">Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <footer className="footer footer-horizontal bg-base-300 footer-center text-primary-content md:p-10 rounded-2xl">
      <figure className="text-3xl ">
        <Logo />
      </figure>
      <p className="text-accent md:px-50 lg:px-70">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      {/* --------- divider ------- */}
      <div
        className="w-full border-t border-dashed border-primary opacity-50
       "
      ></div>
      <ul className="flex flex-col md:flex-row gap-10 flex-wrap"> {Links}</ul>
      {/* --------- divider ------- */}
      <div className="w-full border-t border-dashed border-primary opacity-50 "></div>
      {/* ----social media ----  */}
      <nav>
        <div className="grid grid-cols-1 md:grid-flow-col gap-4 text-3xl">
          <FaLinkedin className="text-blue-400" />
          <FaXTwitter className="text-base-100" />
          <FaFacebook className="text-blue-500" />
          <FaYoutube className="text-red-500 " />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
