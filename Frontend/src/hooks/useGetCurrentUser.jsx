import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUserRole } from "../Redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/user/current`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCurrentUserRole(res.data.user.role));
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Error fetching current user:", error.message);
        } else {
          console.log("User not authenticated");
        }
      }
    };

    fetchCurrentUser();
  }, []);
};

export default useGetCurrentUser;
