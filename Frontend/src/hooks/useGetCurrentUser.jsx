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
        // Handle error fetching current user
        if (error.response?.status !== 401) {
          // Error fetching user
        }
      }
    };

    fetchCurrentUser();
  }, []);
};

export default useGetCurrentUser;
