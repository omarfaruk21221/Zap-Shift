import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const SendParcel = () => {
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
  const regionsDuplicate = serviesCenters.map((c) => c.region); // old mistake: c.district
  const regions = [...new Set(regionsDuplicate)];

  // useWatch with defaultValue
  const senderRegion = useWatch({
    control,
    name: "senderRegion",
    defaultValue: "",
  });
  const receiverRegion = useWatch({
    control,
    name: "reciverRegion",
    defaultValue: "",
  });

  // districts by region
  const districtsByRegion = (region) => {
    if (!region) return [];
    const regionDistricts = serviesCenters.filter((c) => c.region === region);
    const districts = [...new Set(regionDistricts.map((d) => d.district))];
    return districts;
  };

  // submit handler
  const handleSendParcel = (data) => {
    console.log("send parcel data", data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.reciverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCost = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCost = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCost + extraCost;
      }
    }

    data.cost = cost;
    console.log({ cost, data });
    Swal.fire({
      title: "Agree with the cost",
      text: `You have to pay ${cost}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confram and Continue payment",
    }).then((result) => {
      if (result.isConfirmed) {
        // save theke parcel into the db
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "center",
              title: "Parcel has Created. Please Pay",
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
            });
          }
          console.log("after saving db:", res.data);
        });
      }
    });
  };

  return (
    <div className="w-full min-h-screen px-25 py-20 space-y-2 bg-base-100 rounded-2xl my-10">
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="w-full mx-auto space-y-4"
      >
        {/* -------------------------------hrader title-------------------------------------------------------------- */}
        <legend className="space-y-4">
          <h1 className="text-4xl font-bold text-secondary">Send A Parcel</h1>
          <p className="text-lg font-bold text-secondary">
            Enter your parcel deatails
          </p>
        </legend>

        <main className="fieldset">
          <span className="divider"></span>

          {/* Parcel type */}
          <section className="w-full space-y-3">
            <fieldset className="fieldset md:col-span-2 text-lg text-secondary">
              <label className="label">
                <input
                  type="radio"
                  {...register("parcelType")}
                  value="Document"
                  className="radio radio-primary"
                  defaultChecked
                />
                Document
              </label>
              <label className="label mx-10">
                <input
                  type="radio"
                  {...register("parcelType")}
                  value="Non-Document"
                  className="radio radio-primary"
                />
                Non-Document
              </label>
            </fieldset>

            {/* Parcel Name */}
            <fieldset className="fieldset text-accent text-lg">
              <label className="label text-secondary/70 font-semibold">
                Parcel Name
              </label>
              <input
                type="text"
                {...register("parcelName", { required: true })}
                className="input w-full"
                placeholder="Parcel Name"
              />
              {errors.parcelName && (
                <p className="text-warning">Parcel Name is required</p>
              )}
            </fieldset>

            {/* Parcel Weight */}
            <fieldset className="fieldset text-accent text-lg">
              <label className="label text-secondary/70 font-semibold">
                Parcel Weight (KG)
              </label>
              <input
                type="text"
                {...register("parcelWeight", { required: true })}
                className="input w-full"
                placeholder="Parcel Weight (KG)"
              />
              {errors.parcelWeight && (
                <p className="text-warning">Parcel Weight (KG) is required</p>
              )}
            </fieldset>
          </section>

          <span className="divider"></span>
          {/* ------------------------------------------------------------------------------------------------ */}
          {/* Sender details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-center items-center">
            <aside className="w-full space-y-2">
              <legend className="md:col-span-2 text-xl text-secondary mb-5 font-bold">
                Sender Details
              </legend>
              {/* Sender Name */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Sender Name
                </label>
                <input
                  type="text"
                  {...register("senderName", { required: true })}
                  defaultValue={user?.displayName}
                  className="input w-full"
                  placeholder="Sender Name"
                />
                {errors.senderName && (
                  <p className="text-warning">Sender Name is required</p>
                )}
              </fieldset>
              {/* Sender Email */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Sender Email
                </label>
                <input
                  type="email"
                  {...register("senderEmail", { required: true })}
                  className="input w-full"
                  defaultValue={user?.email}
                  placeholder="Sender Email"
                />
                {errors.senderEmail && (
                  <p className="text-warning">Sender Name is required</p>
                )}
              </fieldset>
              {/* Sender phone no */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Sender Phone No.
                </label>
                <input
                  type="text"
                  {...register("senderPhone", { required: true })}
                  className="input w-full"
                  placeholder="Sender Phone No"
                />
                {errors.senderPhone && (
                  <p className="text-warning">Sender Phone is required</p>
                )}
              </fieldset>

              {/* Sender Region */}
              <fieldset className="fieldset text-lg text-accent">
                <legend className="fieldset-legend text-secondary/70 font-semibold text-xl">
                  Sender Region
                </legend>
                <select
                  {...register("senderRegion", { required: true })}
                  className="select w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Your Region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Sender District */}
              <fieldset className="fieldset text-lg text-accent">
                <legend className="fieldset-legend text-secondary/70 font-semibold text-xl">
                  Sender District
                </legend>
                <select
                  {...register("senderDistrict", { required: true })}
                  className="select w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Your District
                  </option>
                  {districtsByRegion(senderRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Sender Address */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Sender Address
                </label>
                <input
                  type="text"
                  {...register("senderAdress", { required: true })}
                  className="input w-full"
                  placeholder="Sender Address"
                />
                {errors.senderAdress && (
                  <p className="text-warning">Sender Address is required</p>
                )}
              </fieldset>

              {/* Pickup Instruction */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Pickup Instruction
                </label>
                <input
                  type="text"
                  {...register("pickupInstruction")}
                  className="input w-full min-h-[70px]"
                  placeholder="Pickup Instruction"
                />
              </fieldset>
            </aside>
            {/* ------------------------------------------------------------------------------------------------ */}
            {/* Receiver details */}
            <aside className="w-full space-y-2">
              <legend className="md:col-span-2 text-xl text-secondary mb-5 font-bold">
                Receiver Details
              </legend>
              {/* Receiver name */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Receiver Name
                </label>
                <input
                  type="text"
                  {...register("reciverName", { required: true })}
                  className="input w-full"
                  placeholder="Receiver Name"
                />
                {errors.reciverName && (
                  <p className="text-warning">Receiver Name is required</p>
                )}
              </fieldset>
              {/* Receiver Eamil */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Receiver Email
                </label>
                <input
                  type="email"
                  {...register("reciverEmail")}
                  className="input w-full"
                  placeholder="Receiver Email"
                />
                {errors.reciverEmail && (
                  <p className="text-warning">Receiver Email is required</p>
                )}
              </fieldset>
              {/* Receiver phone no */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Receiver Phone No.
                </label>
                <input
                  type="text"
                  {...register("reciverPhone", { required: true })}
                  className="input w-full"
                  placeholder="Receiver Phone No"
                />
                {errors.reciverPhone && (
                  <p className="text-warning">Receiver Phone is required</p>
                )}
              </fieldset>

              {/* Receiver Region */}
              <fieldset className="fieldset text-lg text-accent">
                <legend className="fieldset-legend text-secondary/70 font-semibold text-xl">
                  Receiver Region
                </legend>
                <select
                  {...register("reciverRegion", { required: true })}
                  className="select w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Receiver Region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Receiver District */}
              <fieldset className="fieldset text-lg text-accent">
                <legend className="fieldset-legend text-secondary/70 font-semibold text-xl">
                  Receiver District
                </legend>
                <select
                  {...register("reciverDistrict", { required: true })}
                  className="select w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Your District
                  </option>
                  {districtsByRegion(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Receiver Address */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Receiver Address
                </label>
                <input
                  type="text"
                  {...register("reciverAddress", { required: true })}
                  className="input w-full"
                  placeholder="Receiver Address"
                />
                {errors.reciverAddress && (
                  <p className="text-warning">Receiver Address is required</p>
                )}
              </fieldset>

              {/* Receiver Pickup Instruction */}
              <fieldset className="fieldset text-accent text-lg">
                <label className="label text-secondary/70 font-semibold">
                  Receiver Pickup Instruction
                </label>
                <input
                  type="text"
                  {...register("reciverPickupInstruction")}
                  className="input w-full min-h-[70px]"
                  placeholder="Receiver Pickup Instruction"
                />
              </fieldset>
            </aside>
          </section>
        </main>

        <input
          type="submit"
          className="btn btn-primary w-full text-lg"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
