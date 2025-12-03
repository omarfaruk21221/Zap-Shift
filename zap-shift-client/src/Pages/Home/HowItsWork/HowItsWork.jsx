import React from "react";

const HowItsWork = ({ data }) => {
  const { icon, title, description } = data;
  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-md space-y-1">
      <img src={icon} alt="" />
      <h1 className="text-lg text-secondary font-bold">{title}</h1>
      <p className="text-accent">{description}</p>
    </div>
  );
};

export default HowItsWork;
