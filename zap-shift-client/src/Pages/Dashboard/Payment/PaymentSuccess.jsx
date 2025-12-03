import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  // console.log(sessionId);
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          // console.log("after paymentInfo",res);
          setPaymentInfo({
            transactionalId: res.data.transactionalId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [axiosSecure, sessionId]);
// console.log(paymentInfo)
  // ---- output --
  return (
    <div className="p-20 ">
      <div className="card shadow-2xl border-accent-content w-96 ">
        <div className="card-body items-center ">
          <h2 className="card-title text-2xl text-secondary text-center font-bold">
            {" "}
            Payment Successfull !!!{" "}
          </h2>
          <span>
            <p className="text-accent">
              TransantionalId: {paymentInfo.transactionalId}
            </p>
            <p className="text-accent">TeackingId: {paymentInfo.trackingId}</p>
          </span>
          <div className="card-actions justify-end">
            <Link to={"/dashboard/payment-history"} className="btn btn-primary">
              View History
            </Link>
            <Link to="/" className="btn btn-ghost">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
