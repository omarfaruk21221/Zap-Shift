import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AsignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  //   =======parcel query =======
  const { data: percels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["percels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });
  // console.log(selectedParcel);
  const { data: riders = [] } = useQuery({
    queryKey: [
      "riders",
      selectedParcel?.senderDistrict ?? "no-district",
      "available",
    ],
    enabled: !!selectedParcel?.senderDistrict,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const openRiderModal = (parcel) => {
    // console.log(parcel.senderDistrict);
    riderModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  // ==== handle asign ===
  const handleAsignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.riderName,
      riderEmail: rider.riderEmail,
      rideContact: rider.rideContact,
      parcelId: selectedParcel._id,
    };
    // console.log(riderAssignInfo.parcelId);
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold ">
        Asign Riders ({percels.length})
      </h1>
      <span className="divider"></span>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>CreatedAt</th>
              <th>Pick Up Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {percels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openRiderModal(parcel)}
                    className="btn btn-primary"
                  >
                    Find Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <dialog
        ref={riderModalRef}
        className="modal  modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-xl">
            Available Riders!{riders.length}
          </h3>
          <span className="divider"></span>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Rider Name</th>
                  <th>Rider Email</th>
                  <th>Rider Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{rider.riderName}</td>
                    <td>{rider.riderEmail}</td>
                    <td>{rider.rideContact}</td>
                    <td>
                      <button
                        onClick={() => handleAsignRider(rider)}
                        className="btn btn-primary"
                      >
                        Asign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AsignRiders;
