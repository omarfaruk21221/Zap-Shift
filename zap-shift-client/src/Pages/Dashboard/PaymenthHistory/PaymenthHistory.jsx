import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa6";

const PaymenthHistory = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  console.log("Histroy page data:", payments);
  return (
    <div className="p-4">
      <h2 className="text-4xl text-secondary font-bold ">
        Payment History {payments.length}
      </h2>
      {/* ------------------history table ------------ */}
      <table className="table table-zebra border border-accent-content text-md my-10">
        {/* head */}
        <thead className="text-center">
          <tr>
            <th>SL NO..</th>
            <th>Parcel Info</th>
            <th>Amount</th>
            <th>Payment Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {payments.map((payment, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{payment.parcelName}</td>
              <td>
                {payment.amount}  ({payment.paymentStatus})
              </td>
              <td>{payment.transactionalId}</td>
              <td>
                <FaEye className="btn btn-nature  md:hidden"/>
                <button className="btn btn-nature hidden md:block">View</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymenthHistory;
