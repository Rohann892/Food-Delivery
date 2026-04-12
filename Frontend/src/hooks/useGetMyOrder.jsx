import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const useGetMyOrder = () => {
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/order/my-orders`,
          { withCredentials: true },
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [userData]);
};

export default useGetMyOrder;
