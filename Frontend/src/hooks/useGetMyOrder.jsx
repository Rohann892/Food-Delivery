import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../Redux/userSlice";

const useGetMyOrder = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/order/my-orders`,
          { withCredentials: true },
        );
        console.log(res.data);
        if (res.data.success && res.data.orders) {
          dispatch(setMyOrders(res.data.orders));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userData) {
      fetchOrder();
    }
  }, [userData, dispatch]);
};

export default useGetMyOrder;
