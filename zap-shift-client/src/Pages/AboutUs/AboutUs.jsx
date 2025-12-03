import React from "react";
import { NavLink, Outlet } from "react-router";

const AboutUs = () => {
  const Links = (
    <>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-accent"
          }
        >
          Story
        </NavLink>
      </li>
      <li>
        <NavLink
          to="mission"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-accent"
          }
        >
          Mission
        </NavLink>
      </li>
      <li>
        <NavLink
          to="success"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-accent"
          }
        >
          Success
        </NavLink>
      </li>
      <li>
        <NavLink
          to="others"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-accent"
          }
        >
          Team & Others
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 p-15 space-y-2 rounded-2xl min-h-[50vh] my-5">
      <header>
        <h1 className="text-2xl text-secondary font-bold underline ">
          AboutUs
        </h1>
        <p className="text-accent w-2xl py-2 ">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="divider py-5"></div>

        <nav>
          <ul className="flex gap-5 items-center flex-wrap text-xl text-accent px-2 py-4">
            {Links}
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AboutUs;
