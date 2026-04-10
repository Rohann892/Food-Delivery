import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { TbCurrentLocation, TbLockAccess } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../Redux/mapSlice";
import axios from "axios";
import { FaChessKing } from "react-icons/fa6";

function RecenterMap({ location }) {
  if (location?.lat !== undefined && location?.lon !== undefined) {
    const map = useMap();
    map.setView([location.lat, location.lon], 16, { animate: true });
  }
  return null;
}

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { location, address } = useSelector((state) => state.map);

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatlng(lat, lng);
  };

  const getAddressByLatlng = async (lat, lng) => {
    const apikey = import.meta.env.VITE_GEOAPIKEY;
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apikey}`,
      );
      dispatch(setAddress(res.data.results[0].formatted));
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      getAddressByLatlng(latitude, longitude);
    });
  };

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6">
      <div
        className="absolute top-[20px] left-[20px] z-[19]"
        onClick={() => navigate("/cart")}
      >
        <IoMdArrowRoundBack size={25} className="text-[#ff4d2d]" />
      </div>
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6 ">
        <h1 className="text-2xl font-bold text-gray-800">CheckOut</h1>
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-800">
            <IoLocation className="text-[#ff4d2d]" /> Delivery Location
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              placeholder="Enter your delivery location"
            />
            <button className="bg-[#ff4d2d] hover:bg-[#e65426] text-white px-3 py-2 rounded-lg flex items-center justify-between">
              <IoSearchOutline />
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-between"
              onClick={() => getCurrentLocation()}
            >
              <TbCurrentLocation />
            </button>
          </div>
          {/* map section */}
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center">
              <MapContainer
                className={`w-full h-full`}
                center={[location?.lat || 20.5937, location?.lon || 78.9629]}
                scrollWheelZoom={false}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker
                  position={[
                    location?.lat || 20.5937,
                    location?.lon || 78.9629,
                  ]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                ></Marker>
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
