import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserData, setCity } from "../Redux/userSlice";
import { FaPlus } from "react-icons/fa6";
import { IoReceipt } from "react-icons/io5";

// Common cities in India
const COMMON_CITIES = [
  "Howrah",
  "Kolkata",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Ahmedabad",
];

const Nav = () => {
  const { userData, cartItems } = useSelector((state) => state.user);
  const [active, setActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { city } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/auth/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/signin");
        dispatch(setUserData(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = (selectedCity) => {
    dispatch(setCity(selectedCity));
    setShowLocationModal(false);
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6]">
      {/* Location selector modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:w-[400px] p-4 md:p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Select City</h2>
              <RxCross2
                size={24}
                className="cursor-pointer text-gray-600"
                onClick={() => setShowLocationModal(false)}
              />
            </div>
            <div className="space-y-2">
              {COMMON_CITIES.map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => handleLocationChange(cityName)}
                  className={`w-full py-3 px-4 rounded-lg text-left font-medium transition-colors ${
                    city === cityName
                      ? "bg-[#ff4d2d] text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* small device search bar */}
      {showSearch && userData.role === "user" && (
        <div className="fixed top-[80px] left-0 right-0 w-full px-3 py-3 bg-white shadow-lg md:hidden z-[9998] rounded-2xl">
          <div className="flex items-center gap-2 bg-white rounded-lg overflow-hidden">
            <div
              className="flex items-center w-[35%] gap-2 px-3 border-r-2 border-gray-200 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => setShowLocationModal(true)}
            >
              <IoLocationOutline
                size={20}
                className="text-[#ff4d2d] flex-shrink-0"
              />
              <div className="truncate text-gray-600 text-sm">{city}</div>
            </div>
            <div className="flex-1 flex items-center gap-2 px-3">
              <IoIosSearch size={20} className="text-[#ff4d2d] flex-shrink-0" />
              <input
                type="text"
                placeholder="search foods..."
                className="text-gray-700 outline-0 w-full text-sm bg-transparent"
              />
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      {userData.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
          <div
            className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400 cursor-pointer hover:bg-gray-50 rounded py-2"
            onClick={() => setShowLocationModal(true)}
            title="Click to change location"
          >
            <IoLocationOutline size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search for delicious foods..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        {userData.role === "user" && showSearch ? (
          <RxCross2
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <IoIosSearch
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(true)}
          />
        )}
        {userData.role === "owner" ? (
          <>
            {myShopData && (
              <>
                <button className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
                  <FaPlus size={20} />
                  <span onClick={() => navigate("/add-food")}>
                    Add food items
                  </span>
                </button>
                <button className="md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
                  <FaPlus size={20} />
                </button>
              </>
            )}
            <div
              className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
              onClick={() => navigate("/my-orders")}
            >
              <IoReceipt size={20} />
              <span className="hidden md:flex">My pending oders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaCartShopping size={25} className="text-[#ff4d2d]" />
              <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
                {cartItems.length}
              </span>
            </div>

            <button
              className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium"
              onClick={() => navigate("/my-orders")}
            >
              My orders
            </button>
          </>
        )}

        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setActive((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {active && (
          <div className="fixed top-[80px] right-[18px] md:right-[18%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            <div
              className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
