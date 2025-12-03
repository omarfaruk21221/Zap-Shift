import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DotLoading from "../../../Components/Spinner/DotLoading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  // --- payment feature-----
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <DotLoading />;
  }

  return (
    <div>
      <div className="card">
        <h1>Please Payable Percel Name : {parcel.parcelName}</h1>
        <h1>Please Payable ammount : {parcel.cost}</h1>
        <span className="divider"></span>
        <button onClick={handlePayment} className="btn btn-primary">
          Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
