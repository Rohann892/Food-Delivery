import React, { useEffect } from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import axios from "axios";

const DeliveryBoyDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const handleGetAssignment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/order/get-assignments`,
        { withCredentials: true },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAssignment();
  }, [userData]);
  return (
    <div className="w-screen h-min-screen flex flex-col items-center justify-center">
      <Nav />
      <div className="w-full max-w-[800px] flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-start w-[90%] border border-orange-100 gap-2">
          <h1 className="text-2xl font-bold text-[#ff4d2d]">
            Welcome {userData.fullName}
          </h1>

          <p className="text-[#ff4d2d]">
            <span className="font-semibold">Latitude:</span>{" "}
            {userData.location.coordinates[1]},{" "}
            <span className="font-semibold">Longitude:</span>{" "}
            {userData.location.coordinates[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyDashboard;
