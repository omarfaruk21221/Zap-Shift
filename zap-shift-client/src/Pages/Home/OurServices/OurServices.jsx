import React from "react";

const OurServices = ({ service }) => {
  const { icon, title, description } = service;
  return (
    <div className="bg-base-100 rounded-xl w-full min-h-[300px] text-center mx-auto hover:bg-primary transform translate-0.5 ease-in-out ">
      <img className="mx-auto my-2" src={icon} alt={title} />
      <h1 className="text-xl px-4 py-2 font-bold text-secondary">{title}</h1>
      <p className="text-md px-4  text-accent">{description}</p>
    </div>
  );
};

export default OurServices;
