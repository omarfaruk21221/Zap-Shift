import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaTrash } from "react-icons/fa6";
import { MdOutlineDoneAll, MdOutlineRemoveDone } from "react-icons/md";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  //   console.log(riders)
  const updateRiderStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.riderEmail,
    };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          title: `Rider has been ${status}.`,
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  //   --- accelpt rider feature ---
  const handleRiderAccept = (rider) => {
    console.log("clicked stats", rider);
    updateRiderStatus(rider, "approved");
  };
  //------- reaject Rider feature ------
  const handleRiderReject = (rider) => {
    updateRiderStatus(rider, "rejected");
    // console.log(rider);
  };

  //   };---delete Rider feature ---
  const handleRiderDelete = (id) => {
    Swal.fire({
      title: "Reject Rider",
      text: "You wont to reject rider application",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Confirm!",
              text: "Rider reject request has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary uppercase my-5">
        Riders Pending approval : {riders.length}
      </h1>
      <span className="divider"></span>

      <div className="overflow-x-auto p-10">
        <table className="table table-zebra border border-accent-content text-md">
          {/* head */}
          <thead className="text-center text-lg">
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Email</th>
              <th>NID</th>
              <th>Number</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {riders.map((rider, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderNID}</td>
                <td>{rider.rideContact}</td>
                <td>{rider.riderDistrict}</td>
                <td
                  className={`bage ${
                    rider.status === "approved"
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {rider.status}
                </td>
                <td>{rider.workStatus}</td>
                <td className=" space-x-2">
                  {/* -----acpprove---? ? */}
                  <button
                    // onClick={() => handleRiderAccept(rider)}
                    className="btn text-base-100 btn-square bg-secondary-content/60 hover:bg-secondary-content"
                  >
                    <FaEye />
                  </button>
                  {/* -----acpprove---? ? */}
                  <button
                    onClick={() => handleRiderAccept(rider)}
                    className="btn btn-square bg-secondary-content/60 hover:bg-secondary-content"
                  >
                    <MdOutlineDoneAll />
                  </button>
                  {/* ---reject btn---  */}
                  <button
                    onClick={() => handleRiderReject(rider)}
                    className="btn btn-square bg-secondary-content/80 hover:bg-secondary-content"
                  >
                    <MdOutlineRemoveDone />
                  </button>

                  {/* delete btn  */}
                  <button
                    onClick={() => handleRiderDelete(rider._id)}
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

export default ApproveRiders;