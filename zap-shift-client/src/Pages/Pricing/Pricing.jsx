import React from "react";

const Pricing = () => (
  <div className="min-h-[60ch] bg-base-100 py-15 px-20 mt-5 mb-10 rounded-2xl">
    {/* Header */}
    <header className=" w-full md:w-1/2  space-y-3">
      <h1 className="text-2xl font-bold text-secondary">Pricing Calculator</h1>
      <p className="text-accent ">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="divider"></div>
    </header>
    {/* Body */}
    <main>
      <h2 className="text-2xl font-bold  text-center bg-secondary text-base-200 rounded-lg p-1">
        Calculate Your Cost
      </h2>

      <section className=" grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 my-5">
        {/* ==== layout /from === */}
        <aside>
          <form className="w-full md:max-w-2/3 mx-auto grid  gap-4 ">
            {/* Parcel type */}
            <div>
              <label className="block text-sm font-medium text-accent mb-1">
                Parcel type
              </label>
              <select className="w-full border px-4 py-2 rounded focus:outline-none">
                <option>Select Parcel type</option>
                <option>Document</option>
                <option>Box</option>
                <option>Fragile</option>
              </select>
            </div>
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-accent mb-1">
                Delivery Destination
              </label>
              <select className="w-full border px-4 py-2 rounded focus:outline-none">
                <option>Select Delivery Destination</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
              </select>
            </div>
            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-accent mb-1">
                Weight (KG)
              </label>
              <input
                type="number"
                className="w-full border px-4 py-2 rounded focus:outline-none"
                placeholder="Weight (KG)"
                min="0"
              />
            </div>
            {/* Contact */}
            <div>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded focus:outline-none"
                placeholder="Contact"
              />
            </div>
            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                className="btn btn-wrong w-1/3 text-lg transition"
              >
                Reset
              </button>
              <button
                type="button"
                className="w-2/3 btn btn-primary transition"
              >
                Calculate
              </button>
            </div>
          </form>
        </aside>
        {/* Cost Display */}
        <aside className=" mx-10">
          <span className="text-7xl font-extrabold  block">
            50 Tk
          </span>
        </aside>
      </section>
    </main>
  </div>
);

export default Pricing;
