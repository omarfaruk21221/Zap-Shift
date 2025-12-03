import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Coverage = () => {
  const position = [23.685, 90.3563];
  const [serviesCenters, setServiesCenters] = useState([]);
  const mapRef = useRef(null)
  useEffect(() => {
    fetch("/serviesCenter.json")
      .then((res) => res.json())
      .then((data) => setServiesCenters(data));
  }, []);
  console.log(serviesCenters);
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviesCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      console.log(district, coord);
      mapRef.current.flyTo(coord,14)
    }
  };
  return (
    <div className="bg-base-100 rounded-xl my-5 p-10 space-y-3">
      <h1 className="text-2xl text-secondary font-bold ">
        We are available in 64 districts
      </h1>
      {/* ---search ----  */}
      <form onSubmit={handleSearch} className="flex">
        <FaSearch className=" relative left-8 top-3" />
        <input
          className="border border-primary rounded-3xl py-2 px-10"
          type="search"
          name="location"
          placeholder="Search here"
          required
        />
        <button
          type="submit"
          className="btn btn-primary rounded-3xl text-lg py-4 relative right-22 z-10"
        >
          Search
        </button>
      </form>
      <div className="divider"></div>
      <h3 className="text-xl text-secondary font-bold ">
        We deliver almost all over Bangladesh
      </h3>

      <div className="h-[600px] my-5 object-cover">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[600px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviesCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area :{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
