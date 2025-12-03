import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannarImg1 from "../../../assets/banner/banner1.png";
import bannarImg2 from "../../../assets/banner/banner2.png";
import bannarImg3 from "../../../assets/banner/banner3.png";
// import ArrowRightUp from "../../../assets/ArrowRightUp.jpg";
import { IoIosArrowDroprightCircle } from "react-icons/io";
const Bannar = () => {
  const BannarButtons = (
    <div className="flex gap-4 absolute bottom-20 left-30">
      <span className="flex justify-center items-center gap-1">
        <button className="btn btn-primary text-xl shadow-2xl">
          Track Your Parcel
        </button>
        <button>
          <IoIosArrowDroprightCircle className="text-4xl" />
        </button>
      </span>
      <button className="btn rounded-2xl text-xl shadow-2xl">Be A Rider</button>
    </div>
  );

  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div>
        <img src={bannarImg1} />
        {BannarButtons}
      </div>
      <div>
        <img src={bannarImg2} />
        {BannarButtons}
      </div>
      <div>
        <img src={bannarImg3} />
        {BannarButtons}
      </div>
    </Carousel>
  );
};

export default Bannar;
