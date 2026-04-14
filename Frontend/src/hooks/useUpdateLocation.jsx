import axios from "axios";
import React, { useEffect } from "react";
import { GiCardKingClubs } from "react-icons/gi";
import { useSelector } from "react-redux";

const useUpdateLocation = () => {
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const updateLocation = async (lat, lon) => {
      try {
        await axios.post(
          `http://localhost:8000/api/user/update-location`,
          { lat, lon },
          { withCredentials: true },
        );
      } catch (error) {
        console.log(error);
      }
    };
    navigator.geolocation.watchPosition((pos) => {
      updateLocation(pos.coords.latitude, pos.coords.longitude);
    });
  }, [userData]);
};

export default useUpdateLocation;
