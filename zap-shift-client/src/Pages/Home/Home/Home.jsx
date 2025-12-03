import React from "react";
import Bannar from "../Bannar/Bannar";
import HowItsWorkDatas from "../../../../public/HowItsWork.json";
import HowItsWork from "../HowItsWork/HowItsWork";
import services from "../../../../public/Services.json";
import OurServices from "../OurServices/ourServices";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import useAuth from "../../../Hooks/useAuth";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  const {user}=useAuth()
  console.log(user)
  return (
    <div>
      <header className="my-10">
        <Bannar />
      </header>
      <main>
        {/* ------ How its Work ------- */}
        <section className="my-10">
          <h1 className="text-secondary text-2xl font-bold  ">How it Works</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-4 px-4 py-5">
            {HowItsWorkDatas.map((data) => (
              <HowItsWork key={data.title} data={data} />
            ))}
          </div>
        </section>

        {/* -------Our Service ------ */}
        <section className="bg-secondary px-30 py-20 rounded-xl">
          <div className=" text-center text-base-100 space-y-2">
            <h1 className="text-2xl font-bold">Our Service</h1>
            <p className="text-base-200  lg:px-30">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-4 mt-5">
            {services.map((service) => (
              <OurServices key={service.title} service={service} />
            ))}
          </div>
        </section>

        {/* ------ sponsore ----  */}
        <section className="my-15 space-y-10">
          <h1 className="text-xl text-secondary text-center font-bold">
            We've helped thousands of sales teams
          </h1>
          <Brands />
        </section>
        {/* --------- divider ------- */}
        <div className="border-t border-dashed border-accent my-10"></div>
        {/* -------- Review Section ------------  */}
        <section>
          <Reviews reviewsPromise={reviewsPromise} />
        </section>
      </main>
    </div>
  );
};

export default Home;
