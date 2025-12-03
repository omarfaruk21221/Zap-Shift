import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// ---------- band icons import -----
import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/casio.png";
import brand3 from "../../../assets/brands/moonstar.png";
import brand4 from "../../../assets/brands/randstad.png";
import brand5 from "../../../assets/brands/star.png";
import brand6 from "../../../assets/brands/amazon_vector.png";
import brand7 from "../../../assets/brands/start_people.png";

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];
const Brands = () => {
  return (
    <Swiper
        loopAdditionalSlides={brands.length}
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
    >
      {brands.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Brands;
