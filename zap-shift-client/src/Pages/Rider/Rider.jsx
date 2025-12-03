import React, { useEffect, useState } from "react";
import agent_pending from "../../assets/agent-pending.png";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // ------ load data  and set---
  const [serviesCenters, setServiesCenters] = useState([]);
  useEffect(() => {
    fetch("/serviesCenter.json")
      .then((res) => res.json())
      .then((data) => setServiesCenters(data));
  }, []);

  // unique regions
  const districtDuplicate = serviesCenters.map((c) => c.district); // old mistake: c.district
  const districts = [...new Set(districtDuplicate)];
  // console.log(districts);

  // -----handleRiderApplication btn ---
  const handleRiderApplication = (data) => {
    const riderInfo = data;
    console.log(riderInfo);
    axiosSecure.post("/riders", riderInfo).then((res) => {
      console.log("rider added database", res.data);

      navigate("/");
      Swal.fire({
        position: "center",
        title:
          "Your Application Successful ! Please Wait ,we reach out 5 days!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  };

  return (
    <div className=" py-15 px-25 rounded-2xl mt-5 mb-10 bg-base-100 ">
      <header className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-3 text-secondary">Be a Rider</h1>
        <p className="mb-10 text-accent">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="divider"></div>
      </header>
      <main className="flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left side: Text and Form */}
        <aside className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-5 text-accent">
            Tell us about yourself
          </h2>

          {/* ===== from === */}
          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="space-y-4 w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center md:gap-4 "
          >
            {/* Rider Name */}
            <fieldset className="fieldset text-accent text-lg">
              <label className="label text-secondary font-semibold">
                Rider Name
              </label>
              <input
                type="text"
                {...register("riderName", { required: true })}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              />
              {errors.senderName && (
                <p className="text-warning">Rider Name is required</p>
              )}
            </fieldset>
            {/* Rider age */}
            <fieldset className="fieldset text-accent text-lg">
              <label className="label text-secondary font-semibold">
                Rider Age
              </label>
              <input
                type="text"
                {...register("riderAge", { required: true })}
                placeholder="Your Age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              />
              {errors.senderName && (
                <p className="text-warning">Rider Age is required</p>
              )}
            </fieldset>
            {/* Rider Email */}
            <fieldset className="fieldset text-accent text-lg">
              <label className="label text-secondary font-semibold">
                Rider Email
              </label>
              <input
                type="text"
                defaultValue={user.email}
                {...register("riderEmail", { required: true })}
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              />
              {errors.senderName && (
                <p className="text-warning">Rider Email is required</p>
              )}
            </fieldset>

            {/* rider District */}
            <fieldset className="fieldset text-lg text-accent">
              <legend className="fieldset-legend text-secondary font-semibold">
                Rider District
              </legend>
              <select
                {...register("riderDistrict", { required: true })}
                className="select w-full text-lg"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Your District
                </option>
                {districts.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* Rider NID */}
            <fieldset className="fieldset text-accent text-lg">
              <label className="label text-secondary font-semibold">
                Rider NID
              </label>
              <input
                type="text"
                {...register("riderNID", { required: true })}
                placeholder="Your NID"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              />
              {errors.senderName && (
                <p className="text-warning">Sender NID is required</p>
              )}
            </fieldset>
            {/* Rider Contact */}
            <fieldset className="fieldset text-accent text-lg">
              <label className="label text-secondary font-semibold">
                Rider Contact
              </label>
              <input
                type="text"
                {...register("rideContact", { required: true })}
                placeholder="Your Contact"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              />
              {errors.senderName && (
                <p className="text-warning">Sender Contact is required</p>
              )}
            </fieldset>
            {/*  Wire House */}
            <fieldset className="fieldset text-lg text-accent">
              <legend className="fieldset-legend text-secondary font-semibold">
                Wire House
              </legend>
              <select
                {...register("riderDistrict", { required: true })}
                className="select w-full text-lg"
                defaultValue=""
              >
                <option value="" disabled>
                  Select wire-house
                </option>
                {districts.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            <button
              type="submit"
              value="submit"
              className="w-full btn btn-primary md:col-span-2"
            >
              Submit
            </button>
          </form>
        </aside>
        {/* Right side: Rider Image */}
        <aside className="w-full md:w-1/2 flex justify-center items-center">
          {/* Use your local image or external source */}
          <img
            src={agent_pending} // Make sure this path is correct in your project
            alt="Rider agent"
            className="h-72 object-contain mb-15 mx-10"
          />
        </aside>
      </main>
    </div>
  );
};

export default Rider;
