import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setCurentAddress, setState } from "../Redux/userSlice";
import { setAddress, setLocation } from "../Redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const apikey = import.meta.env.VITE_GEOAPIKEY;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(setLocation({ lat: latitude, lon: longitude }));

          const res = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`,
          );

          // Check if results exist and have data
          if (!res.data.results || res.data.results.length === 0) {
            dispatch(setCity("Delhi")); // Fallback
            return;
          }

          const firstResult = res.data.results[0];

          // Use city or town or state as fallback
          const cityName =
            firstResult.city ||
            firstResult.town ||
            firstResult.state ||
            "Delhi";
          const stateName = firstResult.state || "Unknown";
          const addresss = firstResult.formatted || "Unknown Address";

          console.log(
            "City:",
            cityName,
            "State:",
            stateName,
            "Address:",
            addresss,
          );

          dispatch(setState(stateName));
          dispatch(setCity(cityName));
          dispatch(setCurentAddress(addresss));
          dispatch(setAddress(addresss));
        } catch (error) {
          console.error("Error fetching city:", error.message);
          console.error("Error details:", error);
          dispatch(setCity("Delhi")); // Fallback
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        dispatch(setCity("Delhi")); // Fallback city
      },
      { timeout: 10000 }, // 10 second timeout
    );
  }, [dispatch, userData]);
};

export default useGetCity;
