import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { GrOverview } from "react-icons/gr";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  //   ----- btn features ---
  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Delete Your Parcel",
      text: "You wont to remove  your parcel ",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confram Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Confram!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // ---- Pay button handle---

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    // console.log(paymentInfo);
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary uppercase my-5">
        all of my parcels: {parcels.length}
      </h1>
      <span className="divider"></span>

      <div className="overflow-x-auto p-10">
        <table className="table table-zebra border border-accent-content text-md">
          {/* head */}
          <thead className="text-center text-lg">
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Reciver</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Tracking Id</th>
              <th>Delivary Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {parcels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.reciverName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <div className="badge badge-success text-lg font-semibold">
                      Paid
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary "
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.trackingId}</td>
                <td>
                  <div className={`badge p-4 ${parcel.deliveryStatus==="pending-pickup"&& "bg-primary-content "}||${parcel.deliveryStatus==="complete"&& "bg-success "} `}>
                    {parcel.deliveryStatus}
                  </div>
                </td>
                <td className=" space-x-2">
                  <button className="btn btn-square bg-primary-content/60 hover:bg-primary-content">
                    <GrOverview />
                  </button>
                  <button className="btn btn-square bg-secondary-content/60 hover:bg-secondary-content">
                    <FiEdit />
                  </button>

                  {/* delete btn  */}
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square bg-warning/50 hover:bg-warning/90"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
