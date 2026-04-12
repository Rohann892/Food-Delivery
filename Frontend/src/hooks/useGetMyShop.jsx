import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData, clearMyShopData } from "../Redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // Only fetch shop data if user is logged in and is an owner
    if (!userData || userData.role !== "owner") {
      dispatch(clearMyShopData());
      return;
    }

    const getMyShop = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/shop/get-my`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.shop) {
          dispatch(setMyShopData(res.data.shop));
        } else {
          // No shop found for this owner
          dispatch(clearMyShopData());
        }
      } catch (error) {
        console.log(error);
        dispatch(clearMyShopData());
      }
    };
    getMyShop();
  }, [dispatch, userData]);
};

export default useGetMyShop;
