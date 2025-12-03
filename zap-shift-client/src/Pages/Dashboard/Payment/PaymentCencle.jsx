import React from "react";
import { Link } from "react-router";

const PaymentCencle = () => {
  return (
    <div>
      <h1 className="text-2xl">Payment Canclled! Please try again...</h1>
      <Link className="btn btn-primary" to={"/dashboard/my-parcels"}>
        Try again
      </Link>
    </div>
  );
};

export default PaymentCencle;
